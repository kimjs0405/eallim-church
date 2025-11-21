// Netlify Function for API endpoints
// GitHub API를 사용하여 데이터 저장

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_REPO = process.env.GITHUB_REPO || ''; // 형식: owner/repo
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

// CORS 헤더
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// GitHub API 헬퍼 함수
async function githubRequest(path, method = 'GET', data = null) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  
  const options = {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'ElimChurch-Website',
    },
  };

  if (data && (method === 'PUT' || method === 'POST')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${error}`);
  }

  if (method === 'DELETE') {
    return { success: true };
  }

  const result = await response.json();
  return result;
}

// 파일 읽기
async function readFile(filename) {
  try {
    const result = await githubRequest(filename);
    if (result.content) {
      const content = Buffer.from(result.content, 'base64').toString('utf-8');
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    // 파일이 없으면 빈 배열 반환
    if (error.message.includes('404')) {
      return [];
    }
    throw error;
  }
}

// 파일 쓰기
async function writeFile(filename, data) {
  let sha = null;
  
  // 기존 파일이 있는지 확인하고 SHA 가져오기
  try {
    const existing = await githubRequest(filename);
    sha = existing.sha;
  } catch (error) {
    // 파일이 없으면 null 유지
    if (!error.message.includes('404')) {
      throw error;
    }
  }

  const content = JSON.stringify(data, null, 2);
  const encodedContent = Buffer.from(content).toString('base64');

  const payload = {
    message: `Update ${filename}`,
    content: encodedContent,
    branch: GITHUB_BRANCH,
  };

  if (sha) {
    payload.sha = sha;
  }

  const result = await githubRequest(filename, 'PUT', payload);
  return result;
}

// 파일에서 항목 삭제
async function deleteItem(filename, itemId) {
  const data = await readFile(filename);
  const filtered = data.filter(item => item.id !== itemId);
  await writeFile(filename, filtered);
  return { success: true };
}

// 파일에서 항목 추가
async function addItem(filename, newItem) {
  const data = await readFile(filename);
  const maxId = data.length > 0 ? Math.max(...data.map(item => item.id || 0)) : 0;
  newItem.id = maxId + 1;
  data.push(newItem);
  await writeFile(filename, data);
  return newItem;
}

// 파일에서 항목 업데이트
async function updateItem(filename, itemId, updates) {
  const data = await readFile(filename);
  const index = data.findIndex(item => item.id === itemId);
  if (index === -1) {
    throw new Error('Item not found');
  }
  data[index] = { ...data[index], ...updates };
  await writeFile(filename, data);
  return data[index];
}

exports.handler = async (event, context) => {
  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;

  // GitHub 설정 확인
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'GitHub not configured. Please set GITHUB_TOKEN and GITHUB_REPO environment variables.' 
      }),
    };
  }

  try {
    // 라우팅
    if (path === '/login' && method === 'POST') {
      return handleLogin(event);
    } else if (path === '/posts' && method === 'GET') {
      return handleGetPosts(event);
    } else if (path === '/posts' && method === 'POST') {
      return handleCreatePost(event);
    } else if (path.startsWith('/posts/') && method === 'PUT') {
      return handleUpdatePost(event);
    } else if (path.startsWith('/posts/') && method === 'DELETE') {
      return handleDeletePost(event);
    } else if (path === '/bulletins' && method === 'GET') {
      return handleGetBulletins(event);
    } else if (path === '/bulletins' && method === 'POST') {
      return handleCreateBulletin(event);
    } else if (path.startsWith('/bulletins/') && method === 'PUT') {
      return handleUpdateBulletin(event);
    } else if (path.startsWith('/bulletins/') && method === 'DELETE') {
      return handleDeleteBulletin(event);
    } else if (path === '/albums' && method === 'GET') {
      return handleGetAlbums(event);
    } else if (path === '/albums' && method === 'POST') {
      return handleCreateAlbum(event);
    } else if (path.startsWith('/albums/') && method === 'DELETE') {
      return handleDeleteAlbum(event);
    } else {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Not found' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// 로그인 처리
async function handleLogin(event) {
  const { id, password } = JSON.parse(event.body || '{}');
  
  const adminId = process.env.ADMIN_ID || 'eallim123';
  const adminPassword = process.env.ADMIN_PASSWORD || 'eallim321@';
  
  if (id === adminId && password === adminPassword) {
    const token = Buffer.from(`${id}:${Date.now()}`).toString('base64');
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, token }),
    };
  }
  
  return {
    statusCode: 401,
    headers: corsHeaders,
    body: JSON.stringify({ error: 'Invalid credentials' }),
  };
}

// 게시글 조회
async function handleGetPosts(event) {
  try {
    const posts = await readFile('posts-data.json');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ posts: posts || [] }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ posts: [] }),
    };
  }
}

// 게시글 생성
async function handleCreatePost(event) {
  const post = JSON.parse(event.body || '{}');
  
  const newPost = {
    title: post.title,
    content: post.content,
    author: post.author || '관리자',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const createdPost = await addItem('posts-data.json', newPost);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, post: createdPost }),
  };
}

// 게시글 수정
async function handleUpdatePost(event) {
  const postId = parseInt(event.path.split('/').pop());
  const post = JSON.parse(event.body || '{}');
  
  const updateData = {
    title: post.title,
    content: post.content,
    updated_at: new Date().toISOString(),
  };

  const updatedPost = await updateItem('posts-data.json', postId, updateData);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, post: updatedPost }),
  };
}

// 게시글 삭제
async function handleDeletePost(event) {
  const postId = parseInt(event.path.split('/').pop());
  await deleteItem('posts-data.json', postId);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true }),
  };
}

// 주보 조회
async function handleGetBulletins(event) {
  try {
    const bulletins = await readFile('bulletins-data.json');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ bulletins: bulletins || [] }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ bulletins: [] }),
    };
  }
}

// 주보 생성
async function handleCreateBulletin(event) {
  const bulletin = JSON.parse(event.body || '{}');
  
  const newBulletin = {
    title: bulletin.title,
    date: bulletin.date,
    content: bulletin.content || '',
    image_url: bulletin.imageUrl || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const createdBulletin = await addItem('bulletins-data.json', newBulletin);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, bulletin: createdBulletin }),
  };
}

// 주보 수정
async function handleUpdateBulletin(event) {
  const bulletinId = parseInt(event.path.split('/').pop());
  const bulletin = JSON.parse(event.body || '{}');
  
  const updateData = {
    title: bulletin.title,
    date: bulletin.date,
    content: bulletin.content || '',
    image_url: bulletin.imageUrl || '',
    updated_at: new Date().toISOString(),
  };

  const updatedBulletin = await updateItem('bulletins-data.json', bulletinId, updateData);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, bulletin: updatedBulletin }),
  };
}

// 주보 삭제
async function handleDeleteBulletin(event) {
  const bulletinId = parseInt(event.path.split('/').pop());
  await deleteItem('bulletins-data.json', bulletinId);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true }),
  };
}

// 앨범 조회
async function handleGetAlbums(event) {
  try {
    const albums = await readFile('albums-data.json');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ albums: albums || [] }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ albums: [] }),
    };
  }
}

// 앨범 생성
async function handleCreateAlbum(event) {
  const album = JSON.parse(event.body || '{}');
  
  const newAlbum = {
    image_url: album.imageUrl,
    created_at: new Date().toISOString(),
  };

  const createdAlbum = await addItem('albums-data.json', newAlbum);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, album: createdAlbum }),
  };
}

// 앨범 삭제
async function handleDeleteAlbum(event) {
  const albumId = parseInt(event.path.split('/').pop());
  await deleteItem('albums-data.json', albumId);

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true }),
  };
}

