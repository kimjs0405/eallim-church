# GitHub API 설정 가이드

GitHub API를 사용하여 데이터를 저장하는 방법입니다.

## 1. GitHub Personal Access Token 생성

1. GitHub에 로그인
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token (classic)" 클릭
4. 토큰 이름 입력 (예: "Netlify Data Storage")
5. 권한 선택:
   - ✅ `repo` (전체 저장소 접근 권한)
6. "Generate token" 클릭
7. **토큰을 복사해 안전한 곳에 보관** (다시 볼 수 없습니다!)

## 2. Netlify 환경 변수 설정

Netlify 대시보드 → Site settings → Environment variables에서 다음 변수를 추가:

### 필수 환경 변수

- `GITHUB_TOKEN`: 위에서 생성한 Personal Access Token
- `GITHUB_REPO`: 저장소 이름 (형식: `사용자명/저장소명`)
  - 예: `username/elim-church`
- `GITHUB_BRANCH`: 브랜치 이름 (기본: `main` 또는 `master`)
- `ADMIN_ID`: 관리자 아이디 (기본: eallim123)
- `ADMIN_PASSWORD`: 관리자 비밀번호 (기본: eallim321@)

### 설정 방법

1. Netlify 대시보드 → Site settings → Environment variables
2. "Add a variable" 클릭
3. 변수 이름과 값 입력
4. "Save" 클릭

## 3. 데이터 저장 위치

데이터는 GitHub 저장소 루트에 JSON 파일로 저장됩니다:

- `posts-data.json` - 게시판 게시글
- `bulletins-data.json` - 주보
- `albums-data.json` - 행사앨범

## 4. 초기 데이터 파일

프로젝트에 이미 빈 JSON 파일들이 포함되어 있습니다:
- `posts-data.json` - 게시판 게시글
- `bulletins-data.json` - 주보
- `albums-data.json` - 행사앨범

GitHub에 프로젝트를 푸시하면 자동으로 포함됩니다. 별도로 생성할 필요가 없습니다!

## 5. 확인

설정이 완료되면:

1. Netlify Functions가 GitHub API를 통해 데이터 읽기/쓰기
2. 모든 변경사항이 GitHub 저장소에 커밋됨
3. GitHub에서 데이터 변경 이력 확인 가능

## 주의사항

- GitHub API는 시간당 5,000회 요청 제한이 있습니다 (인증된 사용자)
- 토큰은 절대 공개하지 마세요
- 토큰이 유출되면 즉시 삭제하고 새로 생성하세요

## 문제 해결

### 401 Unauthorized 오류
- GitHub 토큰이 올바른지 확인
- 토큰에 `repo` 권한이 있는지 확인

### 404 Not Found 오류
- `GITHUB_REPO` 형식이 올바른지 확인 (`owner/repo`)
- 저장소가 존재하는지 확인
- 토큰에 해당 저장소 접근 권한이 있는지 확인

### 403 Forbidden 오류
- 저장소가 private인 경우, 토큰에 접근 권한이 있는지 확인
- 저장소 소유자에게 권한 요청

