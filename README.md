# 포트폴리오 사이트

HTML / CSS / JavaScript 만으로 만든 정적 사이트입니다. 빌드 과정이 없어서 폴더를 그대로 올리면 됩니다.

- 반응형: 데스크톱, 태블릿(900px 이하), 모바일(620px 이하)
- 언어: 한국어, 영어. 오른쪽 위 KO / EN 버튼으로 전환
- 밝은 화면 / 어두운 화면 전환

## 폴더 구성

```
index.html          페이지 뼈대
css/style.css       디자인 (색상은 맨 위 :root 변수)
js/site.js          ★ 내 정보: 이름, 연락처, 프로필 사진, 프로젝트 링크·스크린샷
js/lang/ko.js       한국어 글 내용
js/lang/en.js       영어 글 내용
js/main.js          화면을 그리는 스크립트 (보통 고칠 필요 없음)
assets/             프로필 사진, 프로젝트 스크린샷
netlify.toml        Netlify 설정
```

## 가장 먼저 할 일: js/site.js 채우기

메모장이나 VS Code로 `js/site.js` 를 열고 따옴표 안을 채웁니다.

```js
name:   { ko: "홍길동", en: "Gildong Hong" },
handle: "gildong",
photo:  "assets/profile.jpg",
email:  "me@example.com",
github: "https://github.com/아이디",
```

비워 둔 항목은 화면에 나오지 않습니다. 내 컴퓨터에서 `index.html` 을 열면 맨 위에 아직 비어 있는 항목이 노란 줄로 안내됩니다 (배포된 사이트에는 보이지 않습니다).

## 글 내용 고치기

- 한국어 문장은 `js/lang/ko.js`, 영어 문장은 `js/lang/en.js` 를 고칩니다.
- 두 파일은 구조가 똑같습니다. 한쪽에서 항목을 추가·삭제하면 다른 쪽도 같은 자리에 맞춰 주세요.
- 타임라인(학교, 교육과정, 자격증)은 두 파일의 `"timeline"` 에 한 줄씩 추가합니다.

```js
{ "date": "2026.03", "title": "○○대학교 ○○학과 입학", "desc": "" },
```

## 프로젝트 링크와 스크린샷

`js/site.js` 의 `projects` 에 넣습니다.

```js
gym: {
  links:  [ { label: "GitHub", url: "https://github.com/아이디/gym" } ],
  images: [ { src: "assets/projects/gym/01.png", caption: { ko: "QR 스캔 화면", en: "QR scan screen" } } ]
},
```

## 내 컴퓨터에서 미리 보기

`index.html` 을 더블클릭하면 브라우저에서 바로 열립니다.

## Netlify 에 올리기

방법 1. 끌어다 놓기 (가장 쉬움)
1. https://app.netlify.com 에 로그인합니다.
2. Sites 화면의 "Deploy manually" 영역에 이 폴더 전체를 끌어다 놓습니다.
3. 주소가 만들어지면 Site configuration → Change site name 에서 원하는 이름으로 바꿉니다.
4. 내용을 고친 뒤에는 Deploys 화면에 폴더를 다시 끌어다 놓으면 같은 주소에 반영됩니다.

방법 2. GitHub 연결 (고칠 때마다 자동 반영)
1. 이 폴더를 GitHub 저장소에 올립니다.
2. Netlify 에서 Add new site → Import an existing project → 저장소 선택.
3. Build command 는 비우고, Publish directory 는 `.` 로 둡니다.
4. 이후 GitHub 에 push 할 때마다 자동으로 다시 배포됩니다.

## 특정 언어·프로젝트로 바로 연결하기

- 언어 지정: `https://내주소.netlify.app/?lang=en` (ko, en)
- 프로젝트 상세 바로 열기: `https://내주소.netlify.app/#krx` (gym, krx, anilog, k8s, wonstory, grade)
