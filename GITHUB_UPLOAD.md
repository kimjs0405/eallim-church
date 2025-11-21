# GitHub 업로드 가이드

엘림교회 웹사이트를 GitHub에 업로드하는 방법입니다.

## 📋 사전 준비

1. **GitHub 계정** (없으면 [github.com](https://github.com)에서 가입)
2. **Git 설치** (없으면 [git-scm.com](https://git-scm.com)에서 다운로드)

## 🚀 단계별 가이드

### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **"+"** 버튼 클릭 → **"New repository"** 선택
3. 저장소 정보 입력:
   - **Repository name**: `elim-church` (원하는 이름)
   - **Description**: `엘림교회 공식 웹사이트`
   - **Visibility**: Public 또는 Private 선택
   - ✅ **"Add a README file"** 체크 해제 (이미 있음)
4. **"Create repository"** 클릭
5. 저장소 URL 복사 (예: `https://github.com/사용자명/elim-church.git`)

### 2단계: Git 초기화 및 커밋

프로젝트 폴더에서 다음 명령어를 실행하세요:

```bash
# 1. Git 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 첫 커밋
git commit -m "Initial commit: 엘림교회 웹사이트"

# 4. 메인 브랜치로 변경
git branch -M main

# 5. GitHub 저장소 연결 (YOUR_USERNAME과 REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/elim-church.git

# 6. GitHub에 푸시
git push -u origin main
```

### 3단계: GitHub Personal Access Token 생성

GitHub에 푸시할 때 인증이 필요합니다:

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **"Generate new token (classic)"** 클릭
3. 토큰 이름 입력 (예: "Netlify Data Storage")
4. 권한 선택:
   - ✅ **`repo`** (전체 저장소 접근 권한)
5. **"Generate token"** 클릭
6. **토큰을 복사해 안전한 곳에 보관** (다시 볼 수 없습니다!)

### 4단계: Git 인증 설정

푸시할 때 토큰을 사용하거나, Git Credential Manager를 사용할 수 있습니다:

**방법 1: 토큰 사용 (권장)**
```bash
# 푸시할 때 사용자명과 토큰 입력
# Username: GitHub 사용자명
# Password: Personal Access Token
git push -u origin main
```

**방법 2: GitHub Desktop 사용**
- [GitHub Desktop](https://desktop.github.com) 다운로드 및 설치
- GitHub Desktop에서 저장소 열기
- "Publish repository" 클릭

## ✅ 확인

GitHub 저장소에 다음 파일들이 있는지 확인하세요:

- ✅ 모든 HTML 파일들
- ✅ `posts-data.json`, `bulletins-data.json`, `albums-data.json`
- ✅ `logo.png`, `elim-church-bg.jpg`
- ✅ `netlify/functions/api.js`
- ✅ `netlify.toml`

## 🔄 이후 업데이트

파일을 수정한 후:

```bash
git add .
git commit -m "업데이트 내용 설명"
git push
```

## ⚠️ 주의사항

- `.gitignore` 파일에 환경 변수나 민감한 정보가 포함되지 않도록 확인
- GitHub에 토큰이나 비밀번호를 커밋하지 마세요!

## 📚 다음 단계

GitHub에 업로드한 후:
1. Netlify에서 GitHub 저장소 연결
2. 환경 변수 설정 (`GITHUB_TOKEN`, `GITHUB_REPO` 등)
3. 배포 완료!

자세한 내용은 `DEPLOYMENT_GUIDE.md`를 참고하세요.

