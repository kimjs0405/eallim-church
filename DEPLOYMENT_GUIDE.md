# 엘림교회 웹사이트 배포 가이드

GitHub와 Netlify를 사용한 완전한 배포 가이드입니다.

## 📋 사전 준비

1. **GitHub 계정** (없으면 [github.com](https://github.com)에서 가입)
2. **Netlify 계정** (없으면 [netlify.com](https://netlify.com)에서 가입)

## 🚀 배포 단계

### 1단계: GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단 "+" → "New repository" 클릭
3. 저장소 정보 입력:
   - **Repository name**: `elim-church` (원하는 이름)
   - **Description**: `엘림교회 공식 웹사이트`
   - **Visibility**: Public 또는 Private 선택
   - ✅ "Add a README file" 체크 해제 (이미 있음)
4. "Create repository" 클릭

### 2단계: 로컬 프로젝트를 GitHub에 푸시

#### 방법 1: Git 명령어 사용 (터미널)

```bash
# 프로젝트 폴더로 이동
cd 엘림교회

# Git 초기화 (이미 초기화되어 있으면 생략)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 엘림교회 웹사이트"

# GitHub 저장소 연결 (YOUR_USERNAME을 실제 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/elim-church.git

# 메인 브랜치로 변경
git branch -M main

# GitHub에 푸시
git push -u origin main
```

#### 방법 2: GitHub Desktop 사용

1. [GitHub Desktop](https://desktop.github.com) 다운로드 및 설치
2. GitHub Desktop 실행
3. "File" → "Add Local Repository"
4. 프로젝트 폴더 선택
5. "Publish repository" 클릭
6. 저장소 이름 입력 후 "Publish repository" 클릭

### 3단계: GitHub Personal Access Token 생성

자세한 내용은 `github-setup.md` 파일을 참고하세요.

**요약:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. "Generate new token (classic)" 클릭
3. 토큰 이름 입력 (예: "Netlify Data Storage")
4. `repo` 권한 선택
5. 토큰 생성 및 **안전하게 보관** (다시 볼 수 없습니다!)

### 4단계: Netlify 배포

#### 4.1 GitHub 연동 배포 (권장)

1. [Netlify](https://app.netlify.com)에 로그인
2. "Add new site" → "Import an existing project" 클릭
3. "Deploy with GitHub" 클릭
4. GitHub 인증 (처음만)
5. 저장소 선택: `elim-church`
6. 배포 설정:
   - **Branch to deploy**: `main`
   - **Build command**: (비워둠)
   - **Publish directory**: `.`
7. "Show advanced" 클릭 → "New variable" 클릭하여 환경 변수 추가:

```
GITHUB_TOKEN = ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_REPO = username/elim-church
GITHUB_BRANCH = main
ADMIN_ID = your-admin-id
ADMIN_PASSWORD = your-admin-password
```

8. "Deploy site" 클릭
9. 배포 완료까지 1-2분 대기

#### 4.2 수동 배포

1. Netlify 대시보드 → "Add new site" → "Deploy manually"
2. 프로젝트 폴더를 ZIP으로 압축
3. ZIP 파일을 드래그 앤 드롭
4. 환경 변수 설정 (위와 동일)
5. "Deploy site" 클릭

### 5단계: 환경 변수 설정

**📖 상세 가이드:** 초보자도 쉽게 따라할 수 있는 **자세한 단계별 가이드**는 [`NETLIFY_ENV_SETUP.md`](./NETLIFY_ENV_SETUP.md) 파일을 참고하세요!

**빠른 요약:**

1. **환경 변수 페이지 접근:**
   - 사이트 대시보드 → "Site configuration" → "Environment variables"
   - 또는 직접 URL: `https://app.netlify.com/sites/사이트이름/configuration/env`

2. **필요한 환경 변수:**

| 변수 이름 | 값 예시 | 비밀 여부 | Deploy Context 설정 |
|---------|--------|----------|-------------------|
| `GITHUB_TOKEN` | `ghp_xxxxxxxxxxxxxxxxxxxx` | ✅ 비밀 | "Different value for each deploy context" 선택 후, **모든 context에 동일한 값 입력** |
| `GITHUB_REPO` | `username/elim-church` | ❌ 공개 | "Same value for all deploy contexts" 선택 |
| `GITHUB_BRANCH` | `main` | ❌ 공개 | "Same value for all deploy contexts" 선택 |
| `ADMIN_ID` | `your-admin-id` | ✅ 비밀 | "Different value for each deploy context" 선택 후, **모든 context에 동일한 값 입력** |
| `ADMIN_PASSWORD` | `your-admin-password` | ✅ 비밀 | "Different value for each deploy context" 선택 후, **모든 context에 동일한 값 입력** |

3. **"Contains secret values" 체크:**
   - `GITHUB_TOKEN`, `ADMIN_ID`, `ADMIN_PASSWORD`는 ✅ 체크
   - 체크하면 자동으로 "Different value for each deploy context"가 선택됨
   - **각 context (Production, Deploy Previews, Branch deploys, Local development)에 동일한 값 입력**

4. **재배포:**
   - "Trigger deploy" → "Clear cache and deploy site" 클릭

**참고:** 프로젝트에 이미 빈 JSON 파일들이 포함되어 있어서, GitHub에 푸시하면 자동으로 데이터 저장소가 준비됩니다! (`posts-data.json`, `bulletins-data.json`, `albums-data.json`)

### 6단계: 도메인 설정 (선택사항)

1. Netlify 대시보드 → Site settings → Domain management
2. "Add custom domain" 클릭
3. 도메인 입력 (예: `elimchurch.org`)
4. DNS 설정 안내에 따라 도메인 제공업체에서 설정

또는 Netlify가 제공하는 무료 서브도메인 사용:
- `your-site-name.netlify.app`

## ✅ 배포 확인

1. Netlify 대시보드에서 배포 상태 확인
2. 사이트 URL 클릭하여 접속
3. 관리자 페이지(`/admin.html`) 접속
4. 로그인 테스트:
   - 아이디: 환경 변수에 설정한 값
   - 비밀번호: 환경 변수에 설정한 값
5. 게시물 작성/수정/삭제 테스트
6. Supabase 대시보드에서 데이터 확인

## 🔄 업데이트 배포

### 자동 배포 (GitHub 연동 시)

1. 로컬에서 파일 수정
2. Git 커밋 및 푸시:
```bash
git add .
git commit -m "업데이트 내용"
git push
```
3. Netlify가 자동으로 재배포

### 수동 배포

1. Netlify 대시보드 → "Deploys" 탭
2. "Trigger deploy" → "Deploy site" 클릭
3. 또는 ZIP 파일 다시 업로드

## 🛠️ 문제 해결

### 배포 실패

- Netlify Functions 로그 확인: Site settings → Functions → Logs
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 연결 확인

### 데이터가 표시되지 않음

- Supabase 테이블이 생성되었는지 확인
- 환경 변수가 올바른지 확인
- 브라우저 콘솔에서 에러 확인

### 관리자 로그인 실패

- 환경 변수 `ADMIN_ID`와 `ADMIN_PASSWORD` 확인
- Netlify Functions 로그 확인

## 📚 추가 자료

- [Supabase 설정 가이드](./SUPABASE_SETUP.md)
- [GitHub 설정 가이드](./github-setup.md)
- [Netlify 공식 문서](https://docs.netlify.com)

## 🔒 보안 체크리스트

- ✅ 환경 변수는 Netlify에만 저장
- ✅ GitHub에 환경 변수 커밋하지 않음
- ✅ Supabase service_role key 공개하지 않음
- ✅ 관리자 비밀번호를 강력하게 설정
- ✅ HTTPS 사용 (Netlify 자동 제공)

## 💡 팁

1. **로컬 테스트**: `npm run dev`로 로컬에서 Netlify Functions 테스트
2. **환경 변수**: 개발/프로덕션 환경 분리 가능
3. **백업**: Supabase는 자동 백업 제공
4. **모니터링**: Netlify 대시보드에서 트래픽 및 에러 모니터링

