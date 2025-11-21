# Netlify 배포 가이드

## 사전 준비

### 1. GitHub Personal Access Token 생성
1. GitHub → Settings → Developer settings → Personal access tokens
2. "Generate new token (classic)" 클릭
3. 토큰 이름 입력 (예: "Netlify Data Storage")
4. `repo` 권한 선택
5. 토큰 생성 및 **안전하게 보관** (다시 볼 수 없습니다!)

자세한 방법은 `github-setup.md` 파일을 참조하세요.

### 2. GitHub 저장소 준비
1. GitHub에 새 저장소 생성
2. 프로젝트를 Git으로 초기화하고 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

## 배포 방법

### 방법 1: GitHub 연동 (권장)
1. [Netlify](https://www.netlify.com)에 로그인
2. "Add new site" → "Import an existing project"
3. GitHub 인증 후 저장소 선택
4. 빌드 설정:
   - Build command: (비워둠)
   - Publish directory: `.`
5. 환경 변수 설정 (아래 참조)
6. "Deploy site" 클릭

### 방법 2: 드래그 앤 드롭
1. Netlify 대시보드에서 "Add new site" → "Deploy manually"
2. 프로젝트 폴더 전체를 드래그 앤 드롭
3. 환경 변수 설정 (아래 참조)
4. 배포 완료!

## 환경 변수 설정

Netlify 대시보드 → Site settings → Environment variables에서 다음 변수를 추가하세요:

### 필수 환경 변수
- `GITHUB_TOKEN`: GitHub Personal Access Token
- `GITHUB_REPO`: 저장소 이름 (형식: `사용자명/저장소명`, 예: `username/elim-church`)
- `GITHUB_BRANCH`: 브랜치 이름 (기본: `main`)
- `ADMIN_ID`: 관리자 아이디 (기본: eallim123)
- `ADMIN_PASSWORD`: 관리자 비밀번호 (기본: eallim321@)

### 설정 방법
1. Netlify 대시보드 → Site settings → Environment variables
2. "Add a variable" 클릭
3. 변수 이름과 값 입력
4. "Save" 클릭

## 배포 후 확인사항

✅ **정상 작동하는 기능들:**
- 모든 HTML 페이지
- CSS 스타일링
- JavaScript 기능
- 실시간 데이터 저장 (GitHub API)
- 관리자 로그인
- 게시판 (CRUD)
- 주보광고 및 행사앨범 관리

⚠️ **주의사항:**
- GitHub 환경 변수가 올바르게 설정되어야 실시간 기능이 작동합니다.
- 환경 변수가 없으면 localStorage로 폴백됩니다 (개별 브라우저에만 저장).
- 데이터는 GitHub 저장소 루트에 JSON 파일로 저장됩니다: `posts-data.json`, `bulletins-data.json`, `albums-data.json`
- YouTube RSS 피드는 CORS 프록시를 통해 가져오므로, 프록시 서비스가 다운되면 설교영상이 표시되지 않을 수 있습니다.
- 이미지 URL은 외부 링크를 사용하므로, 이미지 서버가 접근 가능해야 합니다.

## 도메인 설정

Netlify는 자동으로 `your-site.netlify.app` 도메인을 제공합니다.
커스텀 도메인을 사용하려면:
1. Netlify 대시보드 → Site settings → Domain management
2. "Add custom domain" 클릭
3. 도메인 입력 및 DNS 설정

## 문제 해결

### API 호출 실패
- GitHub 환경 변수가 올바르게 설정되었는지 확인
- GitHub 토큰에 `repo` 권한이 있는지 확인
- `GITHUB_REPO` 형식이 올바른지 확인 (`owner/repo`)
- Netlify Functions 로그 확인 (Site settings → Functions)
- 브라우저 콘솔에서 에러 확인

### 데이터가 표시되지 않음
- GitHub 저장소에 데이터 파일들이 있는지 확인
- GitHub API 응답 확인 (브라우저 개발자 도구 → Network 탭)
- Netlify Functions 로그에서 GitHub API 오류 확인

### 이미지가 표시되지 않는 경우
- 이미지 URL이 올바른지 확인
- CORS 설정 확인 (외부 이미지 서버)

### YouTube 영상이 로드되지 않는 경우
- 채널 ID가 올바른지 확인
- 브라우저 콘솔에서 에러 확인
- CORS 프록시 서비스 상태 확인

## 실시간 배포

GitHub에 푸시하면 Netlify가 자동으로 배포합니다:
1. GitHub에 코드 푸시
2. Netlify가 자동으로 감지
3. 자동 빌드 및 배포
4. 배포 완료 알림

배포 상태는 Netlify 대시보드의 "Deploys" 탭에서 확인할 수 있습니다.

