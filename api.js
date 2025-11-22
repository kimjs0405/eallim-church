// API 클라이언트 - 프론트엔드에서 사용할 API 함수들

const API_BASE_URL = '/.netlify/functions/api';

// API 호출 헬퍼 함수
async function apiCall(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  // 인증 토큰이 있으면 헤더에 추가
  const token = sessionStorage.getItem('authToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();
    
    if (!response.ok) {
      // 에러 응답도 result에 포함하여 반환
      return {
        success: false,
        error: result.error || `API 호출 실패 (${response.status})`,
        ...result
      };
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message || '네트워크 오류가 발생했습니다.'
    };
  }
}

// 로그인 API
async function loginAPI(id, password) {
  const result = await apiCall('/login', 'POST', { id, password });
  if (result.success) {
    sessionStorage.setItem('authToken', result.token);
    sessionStorage.setItem('adminLoggedIn', 'true');
  }
  return result;
}

// 게시판 API
const boardAPI = {
  // 게시글 목록 조회
  async getPosts() {
    const result = await apiCall('/posts', 'GET');
    return result.posts || [];
  },
  
  // 게시글 생성
  async createPost(title, content) {
    const result = await apiCall('/posts', 'POST', {
      title,
      content,
      author: '관리자',
      date: Date.now(),
    });
    // 에러가 있으면 그대로 반환
    if (result && result.error) {
      return result;
    }
    return result;
  },
  
  // 게시글 수정
  async updatePost(postId, title, content) {
    return await apiCall(`/posts/${postId}`, 'PUT', {
      title,
      content,
    });
  },
  
  // 게시글 삭제
  async deletePost(postId) {
    return await apiCall(`/posts/${postId}`, 'DELETE');
  },
};

// 주보 API
const bulletinAPI = {
  // 주보 목록 조회
  async getBulletins() {
    try {
      const result = await apiCall('/bulletins', 'GET');
      return result.bulletins || [];
    } catch (error) {
      console.error('주보 API 호출 실패:', error);
      // API 실패 시 빈 배열 반환 (폴백으로 localStorage 사용)
      return [];
    }
  },
  
  // 주보 생성
  async createBulletin(title, date, content, imageUrl) {
    return await apiCall('/bulletins', 'POST', {
      title,
      date,
      content,
      imageUrl,
    });
  },
  
  // 주보 수정
  async updateBulletin(bulletinId, title, date, content, imageUrl) {
    return await apiCall(`/bulletins/${bulletinId}`, 'PUT', {
      title,
      date,
      content,
      imageUrl,
    });
  },
  
  // 주보 삭제
  async deleteBulletin(bulletinId) {
    return await apiCall(`/bulletins/${bulletinId}`, 'DELETE');
  },
};

// 앨범 API
const albumAPI = {
  // 앨범 목록 조회
  async getAlbums() {
    const result = await apiCall('/albums', 'GET');
    return result.albums || [];
  },
  
  // 앨범 생성
  async createAlbum(imageUrl) {
    return await apiCall('/albums', 'POST', {
      imageUrl,
    });
  },
  
  // 앨범 삭제
  async deleteAlbum(albumId) {
    return await apiCall(`/albums/${albumId}`, 'DELETE');
  },
};

