/* =====================================================================
   내 정보 설정 파일
   ---------------------------------------------------------------------
   이름, 연락처, 프로필 사진, 프로젝트 링크·스크린샷은 이 파일만 고치면
   한국어·영어 화면에 한꺼번에 반영됩니다.
   비워 둔 항목("")은 화면에 나오지 않습니다.
   ===================================================================== */
window.SITE = {

  /* 이름: 언어별 표기. 비워 두면 ko → en 순서로 대신 씁니다. */
  name: {
    ko: "소하은",
    en: "SOHAEUN"
  },

  /* 상단 왼쪽 ~/○○○/portfolio 에 들어갈 짧은 영문 이름 (비우면 name.en 사용) */
  handle: "sohaeun",

  /* 프로필 사진: assets 폴더에 넣고 파일 이름을 적습니다. 정사각형 권장 */
  photo: "",         // 사진을 넣을 때: "assets/profile.jpg"  (지금은 빈 틀만 보입니다)

  /* 연락처 */
  email: "sungf103@gmail.com",
  github: "https://github.com/sungf103-cmd",
  blog: "",          // 예: "https://velog.io/@아이디"
  linkedin: "",      // 예: "https://www.linkedin.com/in/아이디"
  phone: "",         // 예: "010-0000-0000" (공개가 부담되면 비워 두세요)

  /* 처음 접속했을 때 기본 언어: "ko" | "en"
     (방문자 브라우저 언어가 한국어나 영어면 그 언어가 우선합니다) */
  defaultLang: "ko",

  /* 대표 프로젝트와 카드 순서 (js/lang/*.js 의 프로젝트 id) */
  flagship: "gym",
  order: ["gym", "krx", "anilog", "k8s", "wonstory", "grade"],

  /* 프로젝트별 링크와 스크린샷
     links  : 상세 보기 위쪽에 버튼으로 표시  { label: "GitHub", url: "https://..." }
     images : 상세 보기의 스크린샷 영역       { src: "assets/projects/gym/01.png", caption: { ko: "", en: "" } }
              caption 은 문자열 하나로 써도 됩니다. */
  projects: {
    gym:      { links: [], images: [] },
    krx:      { links: [], images: [] },
    anilog:   { links: [], images: [] },
    k8s:      { links: [], images: [] },
    wonstory: { links: [], images: [] },
    grade:    { links: [], images: [] }
  }
};
