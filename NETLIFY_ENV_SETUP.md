# Netlify 환경 변수 설정 가이드 (초보자용)

이 가이드는 중학생도 쉽게 따라할 수 있도록 매우 자세하게 설명합니다! 🎓

## 📍 시작하기 전에 준비할 것

1. ✅ GitHub Personal Access Token (이미 생성하셨죠?)
   - 토큰 예시: `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`
   
2. ✅ GitHub 저장소 이름
   - 예시: `kimjs0405/eallim-church`
   - 형식: `사용자이름/저장소이름`

3. ✅ 관리자 아이디와 비밀번호
   - 아이디: 원하는 관리자 아이디 (예: `admin123`)
   - 비밀번호: 원하는 관리자 비밀번호 (예: `SecurePass123!`)

---

## 🚀 단계별 설정 방법

### 1단계: Netlify 사이트 대시보드 접속

1. 웹 브라우저를 엽니다 (Chrome, Edge 등)
2. 주소창에 `https://app.netlify.com` 입력하고 Enter
3. Netlify에 로그인합니다
4. **대시보드 화면**이 나타납니다
   - 여러 사이트가 보이면, 엘림교회 사이트를 찾아서 **클릭**합니다
   - 사이트가 하나면 자동으로 선택됩니다

---

### 2단계: 환경 변수 설정 페이지 찾기

Netlify 화면이 업데이트되어서 버튼 위치가 다를 수 있습니다. 아래 방법을 하나씩 시도해보세요!

#### 방법 A: 상단 메뉴에서 찾기 (가장 쉬운 방법)

1. 사이트 대시보드 화면에서 **상단 메뉴**를 봅니다
2. 다음 중 하나를 찾아서 클릭:
   - **"Site configuration"** (사이트 구성)
   - **"Configuration"** (구성)
   - **"Build & deploy"** (빌드 및 배포)
3. 왼쪽 사이드바에서 **"Environment variables"** (환경 변수) 클릭

#### 방법 B: 사이트 설정 아이콘 찾기

1. 사이트 대시보드 화면에서 **톱니바퀴 아이콘** ⚙️ 찾기
   - 보통 오른쪽 상단이나 사이트 이름 옆에 있습니다
2. 클릭하면 메뉴가 나타납니다
3. **"Site settings"** 또는 **"Settings"** 클릭
4. 왼쪽 메뉴에서 **"Environment variables"** 클릭

#### 방법 C: 직접 URL로 접근 (가장 확실한 방법)

1. 사이트 대시보드에서 주소창을 봅니다
2. URL이 이렇게 생겼을 겁니다:
   ```
   https://app.netlify.com/sites/사이트이름
   ```
3. URL 끝에 `/configuration/env` 추가합니다:
   ```
   https://app.netlify.com/sites/사이트이름/configuration/env
   ```
4. Enter를 누르면 환경 변수 설정 페이지로 바로 이동합니다!

#### 방법 D: 사이트 카드에서 찾기

1. 사이트 대시보드에서 사이트 카드(박스)를 봅니다
2. 사이트 카드 오른쪽 상단에 **"..." (점 3개)** 메뉴 찾기
3. 클릭하면 메뉴가 나타납니다
4. **"Site settings"** 또는 **"Configure site"** 클릭
5. 왼쪽 메뉴에서 **"Environment variables"** 클릭

---

### 3단계: 환경 변수 추가하기

환경 변수 설정 페이지에 도착했다면, 이제 변수를 추가합니다!

#### 화면 설명

- **"Add a variable"** 또는 **"Add variable"** 버튼이 보일 겁니다
- 이미 변수가 있으면 목록으로 보입니다
- 없으면 빈 화면일 수 있습니다

---

### 4단계: 첫 번째 변수 추가 - GITHUB_TOKEN

#### 4-1. 변수 추가 버튼 클릭

1. **"Add a variable"** 또는 **"Add variable"** 버튼 클릭
2. 입력 폼이 나타납니다

#### 4-2. 변수 이름 입력

**⚠️ 중요:** 변수 이름(Key)에는 **영문 대문자, 숫자, 언더스코어(_)만** 사용할 수 있습니다!

1. **"열쇠" (Key)** 또는 **"Variable name"** 입력란에 입력:
   ```
   GITHUB_TOKEN
   ```
   - 대문자로 정확히 입력하세요!
   - 언더스코어(_)도 정확히 입력하세요!
   - 슬래시(`/`), 하이픈(`-`), 공백 등은 사용할 수 없습니다!

#### 4-3. 변수 값 입력

**💡 구분:** 변수 이름(Key)과 변수 값(Value)을 구분하세요!
- **Key (열쇠)**: 변수의 이름 (예: `GITHUB_TOKEN`)
- **Value (가치)**: 변수의 실제 값 (예: `ghp_...`)

1. **"가치" (Value)** 또는 **"Variable value"** 입력란에 입력:
   ```
   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
   ```
   - 여러분이 생성한 실제 토큰을 입력하세요!
   - 토큰은 `ghp_`로 시작하는 긴 문자열입니다
   - **이 값은 Value 필드에 입력하는 것입니다!**

#### 4-4. "Contains secret values" 체크

1. **"Contains secret values"** 체크박스를 찾습니다
2. ✅ **체크합니다** (토큰은 비밀 정보이므로!)

#### 4-5. Deploy context 설정

**"Contains secret values"를 체크하면** 자동으로 **"Different value for each deploy context"**가 선택됩니다.

이제 각 deploy context에 **동일한 토큰 값**을 입력해야 합니다:

1. **"Production"** (프로덕션) 입력란:
   - 같은 토큰 값 입력: `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`

2. **"Deploy Previews"** (배포 미리보기) 입력란:
   - 같은 토큰 값 입력: `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`

3. **"Branch deploys"** (브랜치 배포) 입력란:
   - 같은 토큰 값 입력: `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`

4. **"Local development"** (로컬 개발) 입력란:
   - 같은 토큰 값 입력: `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`

**💡 중요:** 모든 입력란에 **똑같은 토큰 값**을 입력하세요!

#### 4-6. 저장

1. **"Save"** 또는 **"Add variable"** 버튼 클릭
2. 첫 번째 변수가 추가되었습니다! ✅

---

### 5단계: 두 번째 변수 추가 - GITHUB_REPO

#### 5-1. 다시 변수 추가 버튼 클릭

1. **"Add a variable"** 버튼 다시 클릭

#### 5-2. 변수 이름 입력

**⚠️ 중요:** 변수 이름(Key)에는 **영문 대문자, 숫자, 언더스코어(_)만** 사용할 수 있습니다!

**"열쇠" (Key)** 입력란에 입력:
```
GITHUB_REPO
```
- 대문자로 정확히 입력하세요!
- 슬래시(`/`)나 하이픈(`-`)은 사용할 수 없습니다!
- 오류가 나면 변수 이름 형식을 확인하세요!

#### 5-3. 변수 값 입력

**"가치" (Value)** 입력란에 여러분의 GitHub 저장소 이름을 입력합니다:
```
kimjs0405/eallim-church
```
- 형식: `사용자이름/저장소이름`
- 여러분의 실제 저장소 이름으로 변경하세요!
- **이 값은 Value 필드에 입력하는 것입니다!**

#### 5-4. "Contains secret values" 체크 안 함

이 변수는 비밀이 아니므로 **체크하지 않습니다**!

#### 5-5. Deploy context 설정

**"Same value for all deploy contexts"**를 선택할 수 있습니다:
1. **"Same value for all deploy contexts"** 선택
2. 또는 각 context에 동일한 값 입력

#### 5-6. 저장

**"Save"** 버튼 클릭 ✅

---

### 6단계: 세 번째 변수 추가 - GITHUB_BRANCH

#### 6-1. 변수 추가 버튼 클릭

#### 6-2. 변수 이름 입력

```
GITHUB_BRANCH
```

#### 6-3. 변수 값 입력

```
main
```
- 보통 `main`입니다
- 다른 브랜치를 사용한다면 그 이름을 입력하세요

#### 6-4. "Contains secret values" 체크 안 함

#### 6-5. "Same value for all deploy contexts" 선택

#### 6-6. 저장

**"Save"** 버튼 클릭 ✅

---

### 7단계: 네 번째 변수 추가 - ADMIN_ID

#### 7-1. 변수 추가 버튼 클릭

#### 7-2. 변수 이름 입력

```
ADMIN_ID
```

#### 7-3. 변수 값 입력

관리자 아이디를 입력합니다:
```
your-admin-id
```
- 원하는 아이디로 변경하세요 (예: `admin123`)

#### 7-4. "Contains secret values" 체크

✅ **체크합니다** (관리자 아이디도 비밀 정보입니다! 공개하면 무차별 대입 공격에 노출될 수 있습니다!)

#### 7-5. Deploy context 설정

**"Different value for each deploy context"**가 선택됩니다.

각 context에 **동일한 아이디 값**을 입력:
1. **"Production"**: `your-admin-id` (실제 아이디 입력)
2. **"Deploy Previews"**: `your-admin-id` (실제 아이디 입력)
3. **"Branch deploys"**: `your-admin-id` (실제 아이디 입력)
4. **"Local development"**: `your-admin-id` (실제 아이디 입력)

**💡 중요:** 모든 입력란에 **똑같은 아이디 값**을 입력하세요!

#### 7-6. 저장

**"Save"** 버튼 클릭 ✅

---

### 8단계: 다섯 번째 변수 추가 - ADMIN_PASSWORD

#### 8-1. 변수 추가 버튼 클릭

#### 8-2. 변수 이름 입력

```
ADMIN_PASSWORD
```

#### 8-3. 변수 값 입력

관리자 비밀번호를 입력합니다:
```
your-admin-password
```
- 원하는 비밀번호로 변경하세요 (예: `SecurePass123!`)
- 강력한 비밀번호를 사용하세요!

#### 8-4. "Contains secret values" 체크

✅ **체크합니다** (비밀번호는 비밀 정보입니다!)

#### 8-5. Deploy context 설정

**"Different value for each deploy context"**가 선택됩니다.

각 context에 **동일한 비밀번호 값**을 입력:
1. **"Production"**: `your-admin-password` (실제 비밀번호 입력)
2. **"Deploy Previews"**: `your-admin-password` (실제 비밀번호 입력)
3. **"Branch deploys"**: `your-admin-password` (실제 비밀번호 입력)
4. **"Local development"**: `your-admin-password` (실제 비밀번호 입력)

**💡 중요:** 모든 입력란에 **똑같은 비밀번호 값**을 입력하세요!

#### 8-6. 저장

**"Save"** 버튼 클릭 ✅

---

## ✅ 완료 확인

모든 변수가 추가되었는지 확인하세요:

| 변수 이름 | 값 예시 | 비밀 여부 |
|---------|--------|----------|
| `GITHUB_TOKEN` | `ghp_...` | ✅ 비밀 |
| `GITHUB_REPO` | `kimjs0405/eallim-church` | ❌ 공개 |
| `GITHUB_BRANCH` | `main` | ❌ 공개 |
| `ADMIN_ID` | `your-admin-id` | ✅ 비밀 |
| `ADMIN_PASSWORD` | `your-admin-password` | ✅ 비밀 |

---

## 🔄 재배포하기

환경 변수를 추가한 후에는 **재배포**해야 합니다!

### 재배포 방법

1. 환경 변수 설정 페이지에서 **"Trigger deploy"** 버튼 찾기
   - 보통 페이지 상단이나 하단에 있습니다
2. 클릭하면 메뉴가 나타납니다
3. **"Clear cache and deploy site"** 선택
4. 재배포가 시작됩니다 (1-2분 소요)

또는:

1. 사이트 대시보드로 돌아가기
2. **"Deploys"** 탭 클릭
3. **"Trigger deploy"** → **"Deploy site"** 클릭

---

## 🎉 완료!

이제 모든 환경 변수가 설정되었습니다!

### 다음 단계

1. 재배포 완료까지 1-2분 대기
2. 사이트 URL로 접속하여 테스트
3. `/admin.html` 페이지에서 로그인 테스트
   - 아이디: 환경 변수에 설정한 값
   - 비밀번호: 환경 변수에 설정한 값

---

## ❓ 문제 해결

### Q: "Add variable" 버튼이 안 보여요
A: 페이지를 새로고침(F5)하거나, 다른 방법으로 환경 변수 페이지에 접근해보세요.

### Q: 변수를 잘못 입력했어요
A: 변수 목록에서 변수를 찾아서 **"Edit"** 또는 **"수정"** 버튼을 클릭하여 수정할 수 있습니다.

### Q: 변수를 삭제하고 싶어요
A: 변수 목록에서 변수를 찾아서 **"Delete"** 또는 **"삭제"** 버튼을 클릭합니다.

### Q: 재배포 후에도 작동하지 않아요
A: 
1. 환경 변수가 정확히 입력되었는지 확인
2. 변수 이름이 대문자로 정확히 입력되었는지 확인
3. Netlify Functions 로그 확인: Site settings → Functions → Logs

---

## 📝 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] GITHUB_TOKEN 추가 완료 (모든 context에 동일한 값 입력)
- [ ] GITHUB_REPO 추가 완료
- [ ] GITHUB_BRANCH 추가 완료
- [ ] ADMIN_ID 추가 완료 (모든 context에 동일한 값 입력)
- [ ] ADMIN_PASSWORD 추가 완료 (모든 context에 동일한 값 입력)
- [ ] 재배포 완료
- [ ] 사이트 접속 테스트 완료
- [ ] 관리자 로그인 테스트 완료

---

**축하합니다! 환경 변수 설정이 완료되었습니다! 🎊**

