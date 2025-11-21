# 🎉 GitHub 없이 Netlify + Supabase로 운영하기

## ✅ 가능합니다!

**네, 할 수 있습니다!** 이 프로젝트는 이제 **GitHub 없이** Netlify와 Supabase만으로 작동합니다.

## 📦 필요한 것

1. **Netlify** (호스팅) - 이미 사용 중
2. **Supabase** (데이터베이스) - 무료로 가입 필요

## 🚀 빠른 시작

### 1. Supabase 가입 및 프로젝트 생성
- [supabase.com](https://supabase.com) 가입
- 새 프로젝트 생성
- 자세한 설정은 `SUPABASE_SETUP.md` 참고

### 2. 데이터베이스 테이블 생성
Supabase 대시보드에서 다음 테이블 생성:
- `posts` (게시판)
- `bulletins` (주보)
- `albums` (행사앨범)

### 3. Netlify 환경 변수 설정
Netlify 대시보드 → Site settings → Environment variables:
- `SUPABASE_URL`: Supabase 프로젝트 URL
- `SUPABASE_KEY`: Supabase service_role key
- `ADMIN_ID`: 관리자 아이디
- `ADMIN_PASSWORD`: 관리자 비밀번호

### 4. 배포
환경 변수 설정 후 Netlify에서 사이트 재배포

## 📚 상세 가이드

자세한 설정 방법은 **`SUPABASE_SETUP.md`** 파일을 참고하세요.

## ✨ 주요 기능

- ✅ 관리자 로그인
- ✅ 게시물 작성/수정/삭제
- ✅ 주보 관리
- ✅ 행사앨범 관리
- ✅ GitHub 불필요!

## 🔒 보안

- Supabase는 PostgreSQL 데이터베이스 사용
- 서비스 역할 키는 Netlify 환경 변수에만 저장
- 관리자 인증은 Netlify Functions에서 처리

## 💡 장점

1. **GitHub 불필요**: 코드 저장소 없이도 작동
2. **무료**: Supabase 무료 티어로 충분
3. **빠름**: PostgreSQL 데이터베이스로 빠른 응답
4. **안정적**: Supabase는 안정적인 인프라 제공


