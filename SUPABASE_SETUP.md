# Supabase 데이터베이스 설정 가이드

엘림교회 웹사이트의 실시간 데이터베이스 설정 방법입니다.

## 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (또는 이메일 가입)
4. "New Project" 클릭
5. 프로젝트 정보 입력:
   - **Name**: `elim-church` (원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정 (반드시 기록해두세요!)
   - **Region**: `Northeast Asia (Seoul)` (가장 가까운 지역)
6. "Create new project" 클릭
7. 프로젝트 생성 완료까지 2-3분 대기

## 2. 데이터베이스 테이블 생성

### 2.1 SQL Editor 열기

1. Supabase 대시보드 → 왼쪽 메뉴에서 "SQL Editor" 클릭
2. "New query" 클릭

### 2.2 테이블 생성 SQL 실행

다음 SQL을 복사하여 실행하세요:

```sql
-- 게시판 테이블
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT DEFAULT '관리자',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 주보 테이블
CREATE TABLE IF NOT EXISTS bulletins (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 행사앨범 테이블
CREATE TABLE IF NOT EXISTS albums (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) 비활성화 (공개 읽기, 관리자만 쓰기)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 정책 생성
CREATE POLICY "Public read access" ON posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON bulletins FOR SELECT USING (true);
CREATE POLICY "Public read access" ON albums FOR SELECT USING (true);
```

### 2.3 테이블 확인

1. 왼쪽 메뉴에서 "Table Editor" 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - `posts`
   - `bulletins`
   - `albums`

## 3. API 키 확인

1. Supabase 대시보드 → 왼쪽 메뉴에서 "Settings" (⚙️) 클릭
2. "API" 섹션 클릭
3. 다음 정보를 복사해두세요:
   - **Project URL**: `https://xxxxx.supabase.co` 형태
   - **service_role key** (Secret): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 형태
     - ⚠️ **주의**: `anon` key가 아닌 `service_role` key를 사용해야 합니다!

## 4. Netlify 환경 변수 설정

1. Netlify 대시보드 → Site settings → Environment variables
2. 다음 환경 변수 추가:

### 필수 환경 변수

| 변수 이름 | 값 | 설명 |
|---------|-----|------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase 프로젝트 URL |
| `SUPABASE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase service_role key |
| `ADMIN_ID` | `eallim123` | 관리자 아이디 (변경 가능) |
| `ADMIN_PASSWORD` | `eallim321@` | 관리자 비밀번호 (변경 가능) |

### 설정 방법

1. "Add a variable" 클릭
2. Key와 Value 입력
3. "Save" 클릭
4. 모든 변수 추가 후 사이트 재배포

## 5. 확인 및 테스트

1. Netlify에서 사이트 재배포
2. 관리자 페이지(`admin.html`) 접속
3. 로그인 후 게시물 작성/수정/삭제 테스트
4. Supabase 대시보드 → Table Editor에서 데이터 확인

## 문제 해결

### 데이터가 저장되지 않음

- Supabase 환경 변수가 올바르게 설정되었는지 확인
- `service_role` key를 사용하는지 확인 (anon key 아님!)
- Netlify Functions 로그 확인: Site settings → Functions → Logs

### 401 Unauthorized 오류

- `SUPABASE_KEY`가 `service_role` key인지 확인
- 환경 변수가 올바르게 설정되었는지 확인

### 테이블을 찾을 수 없음

- SQL Editor에서 테이블 생성 SQL이 실행되었는지 확인
- Table Editor에서 테이블이 존재하는지 확인

### RLS 정책 오류

- SQL Editor에서 RLS 정책이 생성되었는지 확인
- "Public read access" 정책이 있는지 확인

## 보안 주의사항

- ⚠️ `service_role` key는 절대 공개하지 마세요!
- ⚠️ GitHub에 환경 변수를 커밋하지 마세요!
- ⚠️ Netlify 환경 변수에만 저장하세요!

## 추가 기능

### 데이터 백업

Supabase는 자동으로 데이터를 백업합니다. 수동 백업이 필요하면:

1. Table Editor에서 데이터 확인
2. SQL Editor에서 `SELECT * FROM posts;` 실행하여 데이터 확인

### 데이터 마이그레이션

기존 localStorage 데이터를 Supabase로 마이그레이션하려면:

1. 브라우저 개발자 도구 → Application → Local Storage
2. 데이터 복사
3. 관리자 페이지에서 수동으로 다시 입력

