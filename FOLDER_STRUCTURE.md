# 폴더 구조 안내

## 현재 구조

프로젝트는 GitHub의 폴더 구조 제한을 고려하여 평탄화되었습니다.

### 루트에 있는 파일들

- **HTML 파일들**: `index.html`, `admin.html`, `board.html` 등
- **데이터 파일들**: 
  - `posts-data.json` - 게시판 데이터
  - `bulletins-data.json` - 주보 데이터
  - `albums-data.json` - 앨범 데이터
- **이미지 파일들** (수동 복사 필요):
  - `logo.png` - 로고 이미지
  - `elim-church-bg.jpg` - 배경 이미지

### 유지해야 하는 폴더

- **`netlify/functions/`**: Netlify Functions 표준 구조
  - `netlify/functions/api.js` - 백엔드 API 함수

## 수동 작업 필요

### 이미지 파일 복사

다음 파일들을 `images/` 폴더에서 루트로 복사하세요:

1. `images/logo.png` → `logo.png` (이미 복사됨)
2. `images/엘림교회.jpg` → `elim-church-bg.jpg` (수동 복사 필요)

복사 후 `images/` 폴더를 삭제할 수 있습니다.

## 폴더 삭제

다음 폴더들은 삭제해도 됩니다:

- `data/` - 이미 파일들이 루트로 이동됨
- `images/` - 이미지 파일을 루트로 복사한 후 삭제

## 주의사항

- `netlify/` 폴더는 **절대 삭제하지 마세요!** Netlify Functions가 작동하지 않습니다.

