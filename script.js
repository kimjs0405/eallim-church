// 모바일 메뉴 토글
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// 메뉴 링크 클릭 시 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// 헤더 스크롤 효과
const header = document.getElementById('header');
let lastScroll = 0;

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (header && header.style) {
            if (currentScroll > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        }
        
        lastScroll = currentScroll;
    });
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 스크롤 애니메이션 적용
document.querySelectorAll('.worship-card, .program-card, .news-card, .vision-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// 문의 폼 제출
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // 성공 메시지
        alert('문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
        
        // 폼 초기화
        contactForm.reset();
    });
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 히어로 섹션 페이드인 애니메이션
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && heroContent.style) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            if (heroContent && heroContent.style) {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 100);
    }
});

// 예배 카드 hover 효과
const worshipCards = document.querySelectorAll('.worship-card');
worshipCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// 교회 활동 카드 효과
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// 공지사항 더보기 버튼
const moreNewsBtn = document.querySelector('.section-footer .btn');
if (moreNewsBtn) {
    moreNewsBtn.addEventListener('click', () => {
        alert('더 많은 소식을 준비 중입니다.');
    });
}

// 현재 활성화된 섹션 하이라이트
const updateActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return; // 섹션이 없으면 종료
    
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
};

// 스크롤 이벤트는 index.html에만 적용
if (document.querySelector('section[id]')) {
    window.addEventListener('scroll', updateActiveSection);
}

// 게시판 관련
const BOARD_STORAGE_KEY = 'elim-board-posts';
const ADMIN_STORAGE_KEY = 'elim-admin-auth';

// 해시 함수 (간단한 SHA-256 대체)
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 초기 admin 설정 (처음 한 번만 실행)
async function initAdmin() {
    // 환경 변수에서 관리자 정보를 가져오므로 기본값 없음
    // localStorage는 API 로그인 실패 시에만 사용 (환경 변수 기반)
    const adminData = localStorage.getItem(ADMIN_STORAGE_KEY);
    // 기본값 하드코딩 제거 - 보안상 환경 변수만 사용
}

// 관리자 로그인 확인
async function checkAdminLogin() {
    const id = document.getElementById('adminId').value;
    const pw = document.getElementById('adminPw').value;
    
    if (!id || !pw) {
        showLoginError();
        return;
    }
    
    // API를 통한 로그인 시도
    try {
        const result = await loginAPI(id, pw);
        if (result.success) {
            closeAdminLogin();
            updateAdminUI();
            alert('관리자로 로그인되었습니다.');
            return;
        }
    } catch (error) {
        console.log('API 로그인 실패, localStorage로 폴백:', error);
    }
    
    // 폴백: localStorage 사용
    const adminData = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY) || '{}');
    const idHash = await hashString(id);
    const pwHash = await hashString(pw);
    
    if (adminData.idHash === idHash && adminData.pwHash === pwHash) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        closeAdminLogin();
        updateAdminUI();
        alert('관리자로 로그인되었습니다.');
    } else {
        showLoginError();
    }
}

function showLoginError() {
    const errorEl = document.getElementById('loginError');
    if (errorEl && errorEl.style) {
        errorEl.style.display = 'block';
        setTimeout(() => {
            if (errorEl && errorEl.style) {
                errorEl.style.display = 'none';
            }
        }, 3000);
    }
}

function openAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal && modal.style) {
        modal.style.display = 'flex';
    }
}

function closeAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal && modal.style) {
        modal.style.display = 'none';
    }
    const adminId = document.getElementById('adminId');
    const adminPw = document.getElementById('adminPw');
    if (adminId) adminId.value = '';
    if (adminPw) adminPw.value = '';
}

function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    updateAdminUI();
    alert('로그아웃되었습니다.');
}

async function updateAdminUI() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminMenuBtn = document.getElementById('adminMenuBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    
    if (adminLoginBtn && adminLoginBtn.style) {
        adminLoginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    }
    if (adminMenuBtn && adminMenuBtn.style) {
        adminMenuBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    }
    if (adminLogoutBtn && adminLogoutBtn.style) {
        adminLogoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    }
    
    // 게시판 페이지에서만 renderBoardPosts 호출
    if (document.getElementById('boardPosts')) {
        await renderBoardPosts();
    }
}

function showAdminMenu() {
    window.open('admin.html', '_blank');
}

// 게시글 로드 (API 우선, 폴백: localStorage)
async function loadBoardPosts() {
    try {
        const posts = await boardAPI.getPosts();
        // API 데이터를 localStorage 형식으로 변환
        return posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author || '게시자',
            date: post.created_at ? new Date(post.created_at).getTime() : (post.date || Date.now())
        }));
    } catch (error) {
        console.log('API 로드 실패, localStorage로 폴백:', error);
        // 폴백: localStorage 사용
        return JSON.parse(localStorage.getItem(BOARD_STORAGE_KEY) || '[]');
    }
}

function saveBoardPosts(posts) {
    localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify(posts));
}

// 게시글 렌더링
let currentPage = 1;
const postsPerPage = 10;
let allPosts = [];

async function renderBoardPosts() {
    const container = document.getElementById('boardPosts');
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    container.innerHTML = '<div class="loading-message"><p>게시글을 불러오는 중...</p></div>';
    
    try {
        allPosts = await loadBoardPosts();
        allPosts = allPosts.sort((a, b) => b.date - a.date);
        
        if (allPosts.length === 0) {
            container.innerHTML = '<div class="loading-message"><p>아직 게시글이 없습니다.</p></div>';
            return;
        }
        
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = allPosts.slice(start, end);
        
        let html = '<div class="board-posts">';
        pagePosts.forEach((post, index) => {
            const postDate = new Date(post.date).toLocaleDateString('ko-KR');
            html += `
                <div class="board-post-item" onclick="viewPost(${start + index})">
                    <div class="board-post-header">
                        <div>
                            <div class="board-post-title">${post.title}</div>
                            <div class="board-post-meta">
                                <span>📅 ${postDate}</span>
                                <span>👤 ${post.author || '게시자'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="board-post-preview">${post.content.substring(0, 100)}...</div>
                    ${isLoggedIn ? `
                        <div class="board-post-actions">
                            <button class="btn btn-primary" onclick="event.stopPropagation(); editPost(${start + index})">수정</button>
                            <button class="btn btn-secondary" onclick="event.stopPropagation(); deletePost(${start + index})" style="background: #dc3545;">삭제</button>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
        renderPagination(allPosts.length);
    } catch (error) {
        console.error('게시글 렌더링 오류:', error);
        container.innerHTML = '<div class="loading-message"><p>게시글을 불러오는데 실패했습니다.</p></div>';
    }
}

function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const container = document.getElementById('pagination');
    
    if (!container) return; // pagination 요소가 없으면 종료
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    container.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    renderBoardPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 글쓰기 모달
let editingPostIndex = null;

async function openWriteModal(postIndex = null) {
    editingPostIndex = postIndex;
    const modal = document.getElementById('postModal');
    if (!modal || !modal.style) return;
    
    const titleEl = document.getElementById('modalTitle');
    const authorInput = document.getElementById('postAuthor');
    const titleInput = document.getElementById('postTitle');
    const contentInput = document.getElementById('postContent');
    
    if (postIndex !== null) {
        // 수정 모드 - 관리자만 가능
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('게시글 수정은 관리자만 가능합니다.');
            return;
        }
        
        if (!allPosts || allPosts.length === 0) {
            allPosts = await loadBoardPosts();
            allPosts = allPosts.sort((a, b) => b.date - a.date);
        }
        
        const post = allPosts[postIndex];
        if (titleEl) titleEl.textContent = '글 수정';
        if (authorInput) authorInput.value = post.author || '';
        if (titleInput) titleInput.value = post.title || '';
        if (contentInput) contentInput.value = post.content || '';
    } else {
        // 새 글 작성 - 모든 사용자 가능
        if (titleEl) titleEl.textContent = '글쓰기';
        if (authorInput) authorInput.value = '';
        if (titleInput) titleInput.value = '';
        if (contentInput) contentInput.value = '';
    }
    
    modal.style.display = 'flex';
}

function closeWriteModal() {
    const modal = document.getElementById('postModal');
    if (modal) modal.style.display = 'none';
    editingPostIndex = null;
    // 입력 필드 초기화
    const authorInput = document.getElementById('postAuthor');
    const titleInput = document.getElementById('postTitle');
    const contentInput = document.getElementById('postContent');
    if (authorInput) authorInput.value = '';
    if (titleInput) titleInput.value = '';
    if (contentInput) contentInput.value = '';
}

async function savePost() {
    const author = document.getElementById('postAuthor').value.trim();
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    
    if (!author) {
        alert('작성자 이름을 입력해주세요.');
        return;
    }
    
    if (!title || !content) {
        alert('제목과 내용을 입력해주세요.');
        return;
    }
    
    try {
        if (editingPostIndex !== null) {
            // 수정
            const post = allPosts[editingPostIndex];
            const result = await boardAPI.updatePost(post.id, title, content, author);
            if (result && result.error) {
                alert('오류: ' + result.error);
                return;
            }
            alert('글이 수정되었습니다.');
        } else {
            // 새 글
            const result = await boardAPI.createPost(title, content, author);
            if (result && result.error) {
                alert('오류: ' + result.error + '\n\nGitHub 설정을 확인하세요:\n- GITHUB_TOKEN\n- GITHUB_REPO\n- GITHUB_BRANCH');
                console.error('게시글 생성 실패:', result);
                return;
            }
            if (!result || !result.success) {
                alert('게시글 저장에 실패했습니다. Netlify Functions 로그를 확인하세요.');
                console.error('게시글 생성 실패:', result);
                return;
            }
            alert('글이 등록되었습니다.');
        }
        closeWriteModal();
        await renderBoardPosts();
    } catch (error) {
        console.error('API 저장 실패:', error);
        alert('게시글 저장에 실패했습니다: ' + (error.message || error) + '\n\n로컬 저장소에만 저장됩니다.');
        // 폴백: localStorage 사용
        const posts = await loadBoardPosts();
        
        if (editingPostIndex !== null) {
            posts[editingPostIndex].title = title;
            posts[editingPostIndex].content = content;
            posts[editingPostIndex].author = author;
        } else {
            posts.push({
                id: Date.now(),
                title: title,
                content: content,
                author: author || '게시자',
                date: Date.now()
            });
        }
        
        saveBoardPosts(posts);
        closeWriteModal();
        await renderBoardPosts();
        alert(editingPostIndex !== null ? '글이 수정되었습니다. (로컬 저장소에만 저장됨)' : '글이 등록되었습니다. (로컬 저장소에만 저장됨)');
    }
}

async function editPost(index) {
    if (!allPosts || allPosts.length === 0) {
        allPosts = await loadBoardPosts();
        allPosts = allPosts.sort((a, b) => b.date - a.date);
    }
    openWriteModal(index);
}

async function deletePost(index) {
    // 삭제는 관리자만 가능
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('게시글 삭제는 관리자만 가능합니다.');
        return;
    }
    
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
        const post = allPosts[index];
        await boardAPI.deletePost(post.id);
        alert('글이 삭제되었습니다.');
        await renderBoardPosts();
    } catch (error) {
        console.log('API 삭제 실패, localStorage로 폴백:', error);
        // 폴백: localStorage 사용
        allPosts.splice(index, 1);
        saveBoardPosts(allPosts);
        await renderBoardPosts();
        alert('글이 삭제되었습니다.');
    }
}

function viewPost(index) {
    const post = allPosts[index];
    
    if (!post) return;
    
    const container = document.getElementById('boardPosts');
    const postDate = new Date(post.date).toLocaleDateString('ko-KR');
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    container.innerHTML = `
        <div class="board-post-detail">
            <h2 class="board-post-detail-title">${post.title}</h2>
            <div class="board-post-meta" style="margin-bottom: 20px;">
                <span>📅 ${postDate}</span>
                <span>👤 ${post.author || '게시자'}</span>
            </div>
            <div class="board-post-detail-content">${post.content.replace(/\n/g, '<br>')}</div>
            <div class="board-post-detail-actions">
                ${isLoggedIn ? `
                    <button class="btn btn-primary" onclick="editPost(${index})">수정</button>
                    <button class="btn btn-secondary" onclick="deletePost(${index})" style="background: #dc3545;">삭제</button>
                ` : ''}
                <button class="btn btn-secondary" onclick="renderBoardPosts()">목록</button>
            </div>
        </div>
    `;
}

// 주보광고 및 행사앨범 로드
const STORAGE_KEY = 'elim-admin-data';

// 주보광고 로드 (GitHub API만 사용, localStorage 폴백 제거)
async function loadBulletins() {
    const container = document.getElementById('bulletinList');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-message"><p>주보를 불러오는 중...</p></div>';
    
    try {
        // GitHub API에서 주보 데이터 가져오기
        const bulletins = await bulletinAPI.getBulletins();
        
        // API 데이터 형식 변환
        let formattedBulletins = [];
        if (bulletins && bulletins.length > 0) {
            formattedBulletins = bulletins.map(b => ({
                id: b.id,
                title: b.title || '',
                date: b.date || '',
                content: b.content || '',
                imageUrl: b.image_url || b.imageUrl || ''
            }));
        }
        
        if (formattedBulletins.length === 0) {
            container.innerHTML = '<div class="loading-message"><p>등록된 주보가 없습니다.</p></div>';
            window.bulletinsData = [];
            return;
        }
        
        // 날짜순 정렬 (최신순)
        const sortedBulletins = [...formattedBulletins].sort((a, b) => {
            try {
                // 날짜 형식 변환 (YYYY.MM.DD -> Date 객체)
                const dateA = a.date ? new Date(a.date.replace(/\./g, '-')) : new Date(0);
                const dateB = b.date ? new Date(b.date.replace(/\./g, '-')) : new Date(0);
                return dateB - dateA;
            } catch (e) {
                // 날짜 파싱 실패 시 ID로 정렬
                return (b.id || 0) - (a.id || 0);
            }
        });
        
        // 최신 5개만 표시
        const displayBulletins = sortedBulletins.slice(0, 5);
        
        let html = '';
        displayBulletins.forEach((bulletin, index) => {
            const escapedData = JSON.stringify(sortedBulletins).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            html += `
                <div class="board-list-item">
                    <a href="javascript:void(0)" onclick="showBulletinDetail(${index}, ${escapedData})">
                        <span class="date">${bulletin.date || ''}</span>
                        <span class="text">${bulletin.title || '제목 없음'}</span>
                    </a>
                </div>
            `;
        });
        
        container.innerHTML = html;
        window.bulletinsData = sortedBulletins; // 전역 변수로 저장
    } catch (error) {
        console.error('주보 로드 실패:', error);
        container.innerHTML = '<div class="loading-message"><p>주보를 불러오는 중 오류가 발생했습니다.</p></div>';
        window.bulletinsData = [];
    }
}

// 주보 데이터 새로고침 함수 추가
async function refreshBulletins() {
    await loadBulletins();
}

// 주보 상세 보기 (GitHub API 데이터만 사용)
async function showBulletinDetail(index, bulletinsData = null) {
    let bulletins = bulletinsData || window.bulletinsData || [];
    
    // 데이터가 없으면 API에서 다시 가져오기
    if (!bulletins || bulletins.length === 0) {
        try {
            bulletins = await bulletinAPI.getBulletins();
            if (bulletins && bulletins.length > 0) {
                bulletins = bulletins.map(b => ({
                    id: b.id,
                    title: b.title || '',
                    date: b.date || '',
                    content: b.content || '',
                    imageUrl: b.image_url || b.imageUrl || ''
                }));
                // 날짜순 정렬
                bulletins.sort((a, b) => {
                    try {
                        const dateA = a.date ? new Date(a.date.replace(/\./g, '-')) : new Date(0);
                        const dateB = b.date ? new Date(b.date.replace(/\./g, '-')) : new Date(0);
                        return dateB - dateA;
                    } catch (e) {
                        return (b.id || 0) - (a.id || 0);
                    }
                });
                window.bulletinsData = bulletins;
            }
        } catch (error) {
            console.error('주보 상세 로드 실패:', error);
            alert('주보를 불러올 수 없습니다.');
            return;
        }
    }
    
    const bulletin = bulletins[index];
    if (!bulletin) {
        alert('주보를 찾을 수 없습니다.');
        return;
    }
    
    displayBulletinModal(bulletin);
}

function displayBulletinModal(bulletin) {
    const modal = document.getElementById('bulletinModal');
    const content = document.getElementById('bulletinModalContent');
    
    if (!modal || !content) return;
    
    let html = `
        <h2 style="margin-bottom: 20px; color: #2C3E50;">${bulletin.title}</h2>
        <div style="margin-bottom: 20px; color: #666; font-size: 0.95rem;">
            <span>📅 ${bulletin.date}</span>
        </div>
    `;
    
    const imageUrl = bulletin.imageUrl || bulletin.image_url;
    if (imageUrl) {
        html += `
            <div style="margin-bottom: 20px;">
                <img src="${imageUrl}" alt="${bulletin.title}" style="width: 100%; max-height: 500px; object-fit: contain; border-radius: 8px;" onerror="this.style.display='none'">
            </div>
        `;
    }
    
    if (bulletin.content) {
        html += `
            <div style="line-height: 1.8; color: #333; white-space: pre-wrap;">
                ${bulletin.content.replace(/\n/g, '<br>')}
            </div>
        `;
    }
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeBulletinModal() {
    const modal = document.getElementById('bulletinModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

async function loadAlbums() {
    const container = document.getElementById('albumGrid');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-message"><p>앨범을 불러오는 중...</p></div>';
    
    try {
        const result = await albumAPI.getAlbums();
        let albums = result;
        
        // API 데이터 형식 변환
        if (albums && albums.length > 0) {
            albums = albums.map(a => ({
                id: a.id,
                imageUrl: a.image_url
            }));
        }
        
        if (albums.length === 0) {
            // 폴백: localStorage 사용
            const adminData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"albums":[]}');
            albums = adminData.albums || [];
        }
        
        if (albums.length === 0) {
            container.innerHTML = '<div class="loading-message"><p>등록된 사진이 없습니다.</p></div>';
            return;
        }
        
        // 최신 6개만 표시
        const displayAlbums = albums.slice(-6).reverse();
        
        let html = '';
        displayAlbums.forEach(album => {
            const imageUrl = album.imageUrl || album.image_url;
            html += `
                <div class="album-item">
                    <div class="album-thumb" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
                        <img src="${imageUrl}" alt="행사앨범" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.parentElement.innerHTML='<div class=\\'album-placeholder\\'>📷</div>'">
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.log('API 로드 실패, localStorage로 폴백:', error);
        // 폴백: localStorage 사용
        const adminData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"albums":[]}');
        const albums = adminData.albums || [];
        
        if (albums.length === 0) {
            container.innerHTML = '<div class="loading-message"><p>등록된 사진이 없습니다.</p></div>';
            return;
        }
        
        const displayAlbums = albums.slice(-6).reverse();
        
        let html = '';
        displayAlbums.forEach(album => {
            html += `
                <div class="album-item">
                    <div class="album-thumb" style="background-image: url('${album.imageUrl}'); background-size: cover; background-position: center;">
                        <img src="${album.imageUrl}" alt="행사앨범" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.parentElement.innerHTML='<div class=\\'album-placeholder\\'>📷</div>'">
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
}

// 저장된 채널 ID가 있으면 자동으로 불러오기
window.addEventListener('load', async () => {
    // 게시판 초기화
    await initAdmin();
    await updateAdminUI();
    
    // 게시판 페이지에서 게시글 로드
    if (document.getElementById('boardPosts')) {
        await renderBoardPosts();
    }
    
    // 주보와 앨범 로드
    await loadBulletins();
    await loadAlbums();
    
    // 교회소식 바 로드
    await loadNewsScrollItems();
    
    // 모달 외부 클릭시 닫기
    window.onclick = function(event) {
        const loginModal = document.getElementById('adminLoginModal');
        const postModal = document.getElementById('postModal');
        const bulletinModal = document.getElementById('bulletinModal');
        if (loginModal && event.target === loginModal) {
            closeAdminLogin();
        }
        if (postModal && event.target === postModal) {
            closeWriteModal();
        }
        if (bulletinModal && event.target === bulletinModal) {
            closeBulletinModal();
        }
    }
    
    // 설교영상 페이지에서만 YouTube 영상 로드
    const latestVideoContainer = document.getElementById('latest-video');
    if (latestVideoContainer) {
        // admin.html에서 저장한 채널 ID 확인
        const adminData = JSON.parse(localStorage.getItem('elim-admin-data') || '{}');
        // GitHub에서 YouTube 채널 ID 로드
        // YouTube 채널 ID 로드 (GitHub API만 사용, localStorage 폴백 제거)
        let savedChannelId = '';
        try {
            const settings = await settingsAPI.getSettings();
            savedChannelId = settings.youtubeChannelId || '';
        } catch (error) {
            console.error('설정 로드 실패:', error);
            savedChannelId = '';
        }
        
        if (!savedChannelId) {
            if (latestVideoContainer) {
                latestVideoContainer.innerHTML = `
                    <div class="loading-message">
                        <p>⚠️ YouTube 채널 ID가 설정되지 않았습니다.</p>
                        <p style="font-size: 0.9rem; margin-top: 10px;">관리자 페이지에서 채널 ID를 설정해주세요.</p>
                    </div>
                `;
            }
            return;
        }
        
        const channelIdInput = document.getElementById('youtube-channel-id');
        if (channelIdInput) {
            channelIdInput.value = savedChannelId;
        }
        
        // 자동으로 최신 영상 불러오기
        console.log('Loading YouTube videos for channel:', savedChannelId);
        loadYouTubeVideos(savedChannelId).catch(error => {
            console.error('자동 로드 실패:', error);
            if (latestVideoContainer) {
                latestVideoContainer.innerHTML = `
                    <div class="loading-message">
                        <p>❌ 영상을 불러오는데 실패했습니다.</p>
                        <p style="font-size: 0.9rem; margin-top: 10px; color: #999;">
                            ${error.message || '알 수 없는 오류가 발생했습니다.'}<br>
                            잠시 후 다시 시도해주세요.
                        </p>
                    </div>
                `;
            }
        });
    }
});

// 초기 스크롤 위치 설정 (섹션이 있는 페이지에서만)
if (document.querySelector('section[id]')) {
    updateActiveSection();
}

console.log('엘림교회 홈페이지가 로드되었습니다.');

// 교회소식 스크롤 기능
let currentNewsIndex = 0;
let newsItems = [];

// 교회소식 데이터 로드
async function loadNewsScrollItems() {
    const container = document.getElementById('newsScrollContent');
    if (!container) return;
    
    try {
        // API에서 데이터 로드
        const result = await newsScrollAPI.getNewsScrollItems();
        let items = result || [];
        
        // API에서 데이터가 없거나 빈 배열이면 localStorage 확인
        if (!items || items.length === 0) {
            const STORAGE_KEY = 'elim-admin-data';
            const adminData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"newsScrollItems":[]}');
            items = adminData.newsScrollItems || [];
        }
        
        if (items.length === 0) {
            // 기본값 설정
            container.innerHTML = `
                <div class="news-scroll-item active">교회소식을 관리자 페이지에서 추가해주세요.</div>
            `;
            newsItems = container.querySelectorAll('.news-scroll-item');
            return;
        }
        
        container.innerHTML = '';
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'news-scroll-item';
            if (index === 0) div.classList.add('active');
            div.textContent = item.text;
            container.appendChild(div);
        });
        
        newsItems = container.querySelectorAll('.news-scroll-item');
        
        if (newsItems.length > 0) {
            initNewsScroll();
        }
    } catch (error) {
        console.error('교회소식 로드 실패:', error);
        // 폴백: localStorage 사용
        const STORAGE_KEY = 'elim-admin-data';
        const adminData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"newsScrollItems":[]}');
        const items = adminData.newsScrollItems || [];
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="news-scroll-item active">교회소식을 관리자 페이지에서 추가해주세요.</div>
            `;
            newsItems = container.querySelectorAll('.news-scroll-item');
            return;
        }
        
        container.innerHTML = '';
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'news-scroll-item';
            if (index === 0) div.classList.add('active');
            div.textContent = item.text;
            container.appendChild(div);
        });
        
        newsItems = container.querySelectorAll('.news-scroll-item');
        
        if (newsItems.length > 0) {
            initNewsScroll();
        }
    }
}

function initNewsScroll() {
    if (newsItems.length === 0) return;
    
    // 첫 번째 항목 활성화
    if (newsItems[0]) {
        newsItems[0].classList.add('active');
    }
    
    // 자동 스크롤 (5초마다)
    if (window.newsScrollInterval) {
        clearInterval(window.newsScrollInterval);
    }
    
    window.newsScrollInterval = setInterval(() => {
        if (newsItems.length === 0) return;
        
        if (newsItems[currentNewsIndex]) {
            newsItems[currentNewsIndex].classList.remove('active');
        }
        currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
        if (newsItems[currentNewsIndex]) {
            newsItems[currentNewsIndex].classList.add('active');
        }
    }, 5000);
}

// 수동 스크롤 함수
function scrollNews(direction) {
    if (newsItems.length === 0) return;
    
    if (newsItems[currentNewsIndex]) {
        newsItems[currentNewsIndex].classList.remove('active');
    }
    
    if (direction === 'up') {
        currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
    } else {
        currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    }
    
    if (newsItems[currentNewsIndex]) {
        newsItems[currentNewsIndex].classList.add('active');
    }
}

// 페이지 로드시 초기화
if (document.querySelector('.news-scroll-content')) {
    loadNewsScrollItems();
}

// YouTube 설교영상 관련
// RSS에서 비디오 ID 추출 함수
function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// YouTube 채널의 최신 영상 불러오기
async function loadYouTubeVideos(channelId) {
    const latestVideoContainer = document.getElementById('latest-video');
    const sermonsGrid = document.getElementById('sermons-grid');
    const configStatus = document.getElementById('config-status');
    
    // latest-video가 있으면 (sermons.html)
    if (latestVideoContainer) {
        latestVideoContainer.innerHTML = '<div class="loading-spinner"></div><p style="text-align: center;">영상을 불러오는 중...</p>';
    }
    
    // sermons-grid가 있으면 (기존 방식)
    if (sermonsGrid) {
        sermonsGrid.innerHTML = '<div class="loading-spinner"></div><p style="text-align: center;">영상을 불러오는 중...</p>';
    }
    
    if (configStatus) {
        configStatus.className = 'config-status loading';
        configStatus.textContent = '영상을 불러오는 중입니다...';
    }
    
    try {
        // YouTube RSS 피드 URL
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        
        // 여러 CORS 프록시 서비스 시도 (더 많은 옵션 추가)
        const proxyServices = [
            {
                url: `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`,
                type: 'allorigins'
            },
            {
                url: `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
                type: 'corsproxy'
            },
            {
                url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
                type: 'codetabs'
            },
            {
                url: `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(rssUrl)}`,
                type: 'thingproxy'
            }
        ];
        
        let xmlData = null;
        let lastError = null;
        
        // 각 프록시 서비스를 시도
        for (const proxy of proxyServices) {
            try {
                console.log(`Trying proxy: ${proxy.type}`);
                const response = await fetch(proxy.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/xml, text/xml, */*'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let text = await response.text();
                
                // allorigins.win의 경우 JSON으로 감싸져 있음
                if (proxy.type === 'allorigins') {
                    try {
                        const json = JSON.parse(text);
                        if (json.contents) {
                            xmlData = json.contents;
                            break;
                        }
                    } catch (e) {
                        // JSON 파싱 실패시 원본 텍스트 사용
                        xmlData = text;
                        break;
                    }
                } else {
                    xmlData = text;
                    break;
                }
            } catch (err) {
                lastError = err;
                console.log(`Proxy ${proxy.type} failed:`, err.message);
                continue;
            }
        }
        
        if (!xmlData) {
            throw lastError || new Error('모든 프록시 서비스에 실패했습니다.');
        }
        
        // XML 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        
        // 파싱 에러 확인
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
            throw new Error('XML 파싱 실패: ' + parseError.textContent);
        }
        
        // 영상 항목 추출
        const entries = xmlDoc.querySelectorAll('entry');
        
        if (entries.length === 0) {
            throw new Error('영상을 찾을 수 없습니다. 채널 ID를 확인해주세요.');
        }
        
        // 최신 6개 영상만 표시
        const videos = Array.from(entries).slice(0, 6);
        
        // 최신 영상 하나만 표시 (sermons.html용)
        const latestVideo = videos[0];
        
        // videoId 추출 (더 견고한 방법)
        let videoId = null;
        
        // 방법 1: yt:videoId 요소에서 추출
        const videoIdElement = latestVideo.querySelector('yt\\:videoId') || 
                              latestVideo.querySelector('videoid') ||
                              latestVideo.querySelector('[name="videoId"]');
        if (videoIdElement) {
            videoId = videoIdElement.textContent.trim();
        }
        
        // 방법 2: link[rel="alternate"]에서 추출 (더 안정적)
        if (!videoId) {
            const linkElements = latestVideo.querySelectorAll('link[rel="alternate"]');
            for (const link of linkElements) {
                const href = link.getAttribute('href');
                if (href && href.includes('youtube.com/watch')) {
                    const match = href.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
                    if (match && match[1]) {
                        videoId = match[1];
                        break;
                    }
                }
            }
        }
        
        // 방법 3: id 요소에서 추출
        if (!videoId) {
            const idElement = latestVideo.querySelector('id');
            if (idElement) {
                const idText = idElement.textContent.trim();
                const match = idText.match(/video:([a-zA-Z0-9_-]{11})/);
                if (match && match[1]) {
                    videoId = match[1];
                }
            }
        }
        
        console.log('Extracted videoId:', videoId);
        console.log('Full entry XML:', new XMLSerializer().serializeToString(latestVideo));
        
        if (!videoId || videoId.length !== 11) {
            throw new Error(`영상 ID를 추출할 수 없습니다. 추출된 값: ${videoId || 'null'}`);
        }
        
        // videoId 유효성 검사 (11자리 영문자/숫자/하이픈/언더스코어)
        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
            throw new Error(`유효하지 않은 영상 ID입니다: ${videoId}`);
        }
        
        const titleElement = latestVideo.querySelector('title');
        const title = titleElement ? titleElement.textContent.trim() : '제목 없음';
        
        const updatedElement = latestVideo.querySelector('updated') || latestVideo.querySelector('published');
        const updated = updatedElement ? new Date(updatedElement.textContent) : new Date();
        const pubDate = updated.toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // latest-video 컨테이너가 있으면 (sermons.html)
        if (latestVideoContainer) {
            console.log('Video ID extracted:', videoId);
            console.log('Video title:', title);
            
            // videoId 유효성 검사 (11자리 영문자/숫자)
            if (!videoId || videoId.length !== 11 || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
                throw new Error(`유효하지 않은 영상 ID입니다: ${videoId}`);
            }
            
            latestVideoContainer.innerHTML = `
                <div class="sermon-video-container">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="sermon-video-info" style="margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 5px;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;">${title}</h3>
                    <p style="color: #666; font-size: 0.95rem;">📅 ${pubDate}</p>
                </div>
            `;
        }
        
        // sermons-grid가 있으면 (기존 방식)
        if (sermonsGrid) {
            let videosHtml = '';
            videos.forEach(entry => {
                let vidId = null;
                const vidIdElement = entry.querySelector('yt\\:videoId') || 
                                    entry.querySelector('videoid') ||
                                    entry.querySelector('*|videoId');
                if (vidIdElement) {
                    vidId = vidIdElement.textContent.trim();
                } else {
                    const linkElement = entry.querySelector('link[rel="alternate"]');
                    if (linkElement) {
                        const href = linkElement.getAttribute('href');
                        const match = href.match(/[?&]v=([^&]+)/);
                        if (match) vidId = match[1];
                    }
                }
                
                if (!vidId) return; // videoId가 없으면 스킵
                
                const vidTitleElement = entry.querySelector('title');
                const vidTitle = vidTitleElement ? vidTitleElement.textContent.trim() : '제목 없음';
                
                const vidUpdatedElement = entry.querySelector('updated') || entry.querySelector('published');
                const vidUpdated = vidUpdatedElement ? new Date(vidUpdatedElement.textContent) : new Date();
                const vidPubDate = vidUpdated.toLocaleDateString('ko-KR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                videosHtml += `
                    <div class="sermons-grid-item">
                        <iframe 
                            src="https://www.youtube.com/embed/${vidId}" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                        <div class="sermon-info">
                            <h3 class="sermon-title">${vidTitle}</h3>
                            <p class="sermon-date">📅 ${vidPubDate}</p>
                        </div>
                    </div>
                `;
            });
            sermonsGrid.innerHTML = videosHtml;
        }
        
        if (configStatus) {
            configStatus.className = 'config-status success';
            configStatus.textContent = `✓ 최신 영상을 불러왔습니다!`;
        }
        
    } catch (error) {
        console.error('영상 로드 실패:', error);
        
        // latest-video 컨테이너가 있으면 (sermons.html)
        if (latestVideoContainer) {
            latestVideoContainer.innerHTML = `
                <div class="loading-message">
                    <p>❌ 영상을 불러오는데 실패했습니다.</p>
                    <p style="font-size: 0.9rem; margin-top: 10px; color: #999;">
                        ${error.message}<br>
                        관리자 페이지에서 채널 ID를 확인해주세요.
                    </p>
                </div>
            `;
        }
        
        // sermons-grid가 있으면 (기존 방식)
        if (sermonsGrid) {
            sermonsGrid.innerHTML = `
                <div class="loading-message">
                    <p>❌ 영상을 불러오는데 실패했습니다.</p>
                    <p style="font-size: 0.9rem; margin-top: 10px; color: #999;">
                        ${error.message}<br>
                        채널 ID를 다시 확인해주세요.
                    </p>
                </div>
            `;
        }
        
        if (configStatus) {
            configStatus.className = 'config-status error';
            configStatus.textContent = '❌ ' + error.message;
        }
    }
}

// 채널 URL 또는 ID에서 실제 채널 ID 추출
function extractChannelId(input) {
    // 이미 채널 ID인 경우 (UC로 시작)
    if (input.startsWith('UC') && input.length > 20) {
        return input;
    }
    
    // @username 형태인 경우
    if (input.startsWith('@')) {
        // 커스텀 URL에서 채널 ID를 찾을 수 없으므로 알림
        alert('커스텀 URL(@username)은 직접 채널 ID를 찾아서 입력해야 합니다.\n\n채널 ID 찾는 방법:\n1. YouTube 채널 페이지에서 우클릭 → 페이지 소스 보기\n2. "channelId" 검색\n3. UCxxxxx 형태의 ID 복사');
        return null;
    }
    
    // youtube.com/channel/UCxxxxx 형태
    const channelMatch = input.match(/channel\/(UC[\w-]+)/);
    if (channelMatch) {
        return channelMatch[1];
    }
    
    // youtube.com/@username 형태
    const userMatch = input.match(/youtube\.com\/@([\w-]+)/);
    if (userMatch) {
        alert('커스텀 URL(@username)은 채널 ID가 필요합니다.\n채널 설정 → 고급 정보에서 채널 ID를 확인해주세요.');
        return null;
    }
    
    return input;
}

// 영상 불러오기 버튼 이벤트
const loadVideosBtn = document.getElementById('load-videos');
if (loadVideosBtn) {
    loadVideosBtn.addEventListener('click', () => {
        const input = document.getElementById('youtube-channel-id').value.trim();
        
        if (!input) {
            alert('채널 ID 또는 채널 URL을 입력해주세요.');
            return;
        }
        
        const channelId = extractChannelId(input);
        
        if (!channelId) {
            return;
        }
        
        // 채널 ID를 GitHub에 저장
        try {
            const result = await settingsAPI.updateSettings(channelId);
            if (result && result.error) {
                alert('오류: ' + result.error);
                return;
            }
            alert('YouTube 채널 ID가 저장되었습니다.');
            loadYouTubeVideos(channelId);
        } catch (error) {
            console.error('채널 ID 저장 실패:', error);
            alert('채널 ID 저장에 실패했습니다: ' + (error.message || error));
        }
    });
}


// 수동 영상 추가
const addVideoBtn = document.getElementById('add-video-btn');
const videoUrlInput = document.getElementById('video-url-input');
const manualVideosContainer = document.getElementById('manual-videos-container');

if (addVideoBtn) {
    addVideoBtn.addEventListener('click', () => {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            alert('YouTube 비디오 URL을 입력해주세요.');
            return;
        }
        
        const videoId = extractVideoId(videoUrl);
        
        if (!videoId) {
            alert('유효한 YouTube URL을 입력해주세요.');
            return;
        }
        
        // 기존 수동 영상 불러오기
        let manualVideos = JSON.parse(localStorage.getItem('manualVideos') || '[]');
        
        // 중복 확인
        if (manualVideos.includes(videoId)) {
            alert('이 영상은 이미 추가되어 있습니다.');
            return;
        }
        
        // 영상 추가
        manualVideos.unshift(videoId);
        localStorage.setItem('manualVideos', JSON.stringify(manualVideos));
        
        // UI 업데이트
        updateManualVideos();
        videoUrlInput.value = '';
    });
}

// 수동 영상 업데이트 (GitHub에서 로드)
async function updateManualVideos() {
    if (!manualVideosContainer) return;
    
    try {
        // GitHub에서 영상 목록 로드
        const videos = await videosAPI.getVideos();
        const videoIds = videos.map(v => v.videoId || v.id).filter(id => id);
        
        if (videoIds.length === 0) {
            // 폴백: localStorage 사용
            const manualVideos = JSON.parse(localStorage.getItem('manualVideos') || '[]');
            if (manualVideos.length === 0) {
                manualVideosContainer.innerHTML = '<p style="color: #999; text-align: center;">추가된 영상이 없습니다.</p>';
                return;
            }
            renderVideos(manualVideos);
            return;
        }
        
        renderVideos(videoIds);
    } catch (error) {
        console.error('영상 목록 로드 실패:', error);
        // 폴백: localStorage 사용
        const manualVideos = JSON.parse(localStorage.getItem('manualVideos') || '[]');
        if (manualVideos.length === 0) {
            manualVideosContainer.innerHTML = '<p style="color: #999; text-align: center;">추가된 영상이 없습니다.</p>';
            return;
        }
        renderVideos(manualVideos);
    }
}

function renderVideos(videoIds) {
    let html = '';
    videoIds.forEach(videoId => {
        html += `
            <div class="sermons-grid-item">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
    });
    
    manualVideosContainer.innerHTML = html;
}

// 초기 로드시 수동 영상 표시
if (manualVideosContainer) {
    updateManualVideos();
}


