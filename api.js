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
  async createPost(title, content, author) {
    const result = await apiCall('/posts', 'POST', {
      title,
      content,
      author: author || '게시자',
      date: Date.now(),
    });
    // 에러가 있으면 그대로 반환
    if (result && result.error) {
      return result;
    }
    return result;
  },
  
  // 게시글 수정
  async updatePost(postId, title, content, author) {
    return await apiCall(`/posts/${postId}`, 'PUT', {
      title,
      content,
      author: author,
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
  
  // 주보광고 초기화
  async resetBulletins() {
    return await apiCall('/bulletins/reset', 'POST');
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
  
  // 행사앨범 초기화
  async resetAlbums() {
    return await apiCall('/albums/reset', 'POST');
  },
};

// 교회소식 바 API
const newsScrollAPI = {
  // 교회소식 목록 조회
  async getNewsScrollItems() {
    try {
      const result = await apiCall('/news-scroll', 'GET');
      return result.items || [];
    } catch (error) {
      console.error('교회소식 API 호출 실패:', error);
      return [];
    }
  },
  
  // 교회소식 생성
  async createNewsScrollItem(text) {
    return await apiCall('/news-scroll', 'POST', {
      text,
    });
  },
  
  // 교회소식 수정
  async updateNewsScrollItem(itemId, text) {
    return await apiCall(`/news-scroll/${itemId}`, 'PUT', {
      text,
    });
  },
  
  // 교회소식 삭제
  async deleteNewsScrollItem(itemId) {
    return await apiCall(`/news-scroll/${itemId}`, 'DELETE');
  },
};

// 공지사항 API
const noticeAPI = {
  // 공지사항 목록 조회
  async getNotices() {
    try {
      const result = await apiCall('/notices', 'GET');
      return result.notices || [];
    } catch (error) {
      console.error('공지사항 API 호출 실패:', error);
      return [];
    }
  },
  
  // 공지사항 생성
  async createNotice(title, content, author, category) {
    return await apiCall('/notices', 'POST', {
      title,
      content,
      author: author || '관리자',
      category: category || '공지',
    });
  },
  
  // 공지사항 수정
  async updateNotice(noticeId, title, content, author, category) {
    return await apiCall(`/notices/${noticeId}`, 'PUT', {
      title,
      content,
      author,
      category,
    });
  },
  
  // 공지사항 삭제
  async deleteNotice(noticeId) {
    return await apiCall(`/notices/${noticeId}`, 'DELETE');
  },
};

// 설정 API (YouTube 채널 ID 등)
const settingsAPI = {
  // 설정 조회
  async getSettings() {
    try {
      const result = await apiCall('/settings', 'GET');
      return result.settings || { youtubeChannelId: '' };
    } catch (error) {
      console.error('설정 API 호출 실패:', error);
      return { youtubeChannelId: '' };
    }
  },
  
  // 설정 업데이트
  async updateSettings(youtubeChannelId) {
    return await apiCall('/settings', 'PUT', {
      youtubeChannelId,
    });
  },
};

// 영상 API
const videosAPI = {
  // 영상 목록 조회
  async getVideos() {
    try {
      const result = await apiCall('/videos', 'GET');
      return result.videos || [];
    } catch (error) {
      console.error('영상 API 호출 실패:', error);
      return [];
    }
  },
  
  // 영상 추가
  async createVideo(videoId) {
    return await apiCall('/videos', 'POST', {
      videoId,
    });
  },
  
  // 영상 삭제
  async deleteVideo(videoId) {
    return await apiCall(`/videos/${videoId}`, 'DELETE');
  },
};

