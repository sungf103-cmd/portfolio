/* 한국어 내용 — 글자를 고치려면 따옴표 안의 문장만 바꾸세요 */
window.I18N = window.I18N || {};
window.I18N.ko = {
  "meta": {
    "title": "백엔드 · 데이터 엔지니어링 포트폴리오",
    "description": "외부 API 수집과 증분 적재, crontab 자동화, Spring 백엔드, Kubernetes 배포까지 직접 만든 6개 프로젝트를 정리한 포트폴리오입니다."
  },
  "ui": {
    "skip": "본문으로 건너뛰기",
    "sections": "섹션",
    "language": "언어 선택",
    "theme": "밝은 화면 / 어두운 화면 전환",
    "photoAlt": "프로필 사진",
    "logLabel": "프로젝트 이력 로그",
    "nav": {
      "skills": "기술",
      "journey": "이력",
      "projects": "프로젝트",
      "contact": "연락처"
    },
    "viewProjects": "프로젝트 보기",
    "skillsTitle": "기술 스택",
    "journeyTitle": "타임라인",
    "projectsTitle": "프로젝트 {n}개",
    "flagship": "대표",
    "more": "자세히 보기",
    "close": "닫기",
    "toTop": "맨 위로",
    "email": "Email",
    "blog": "Blog",
    "phone": "Phone",
    "copy": "복사",
    "copied": "복사됨",
    "s": {
      "screens": "화면",
      "overview": "개요",
      "problem": "문제",
      "solution": "해결",
      "arch": "구조",
      "stack": "기술 스택",
      "solving": "문제 해결 과정",
      "p": "문제",
      "c": "원인",
      "f": "해결",
      "r": "결과",
      "limits": "한계와 개선 방향",
      "learned": "배운 점"
    }
  },
  "profile": {
    "eyebrow": "Backend · Data Engineering",
    "h1a": "",
    "h1em": "",
    "h1b": "",
    "lede": "",
    "facts": [
      "6 Projects",
      "학술제 우수상",
      "UPSERT 증분 적재",
      "Kubernetes Self-Healing"
    ],
    "skillsNote": "",
    "projectsNote": "카드의 ‘자세히 보기’에서 구조와 문제 해결 과정을 볼 수 있습니다.",
    "contactTitle": "",
    "contactText": ""
  },
  "log": [
    {
      "d": "2025-11",
      "n": "WonStory",
      "t": "학술제 우수상"
    },
    {
      "d": "2026-05",
      "n": "Anilog",
      "t": "Ollama 추천 · EC2 배포"
    },
    {
      "d": "2026-05",
      "n": "GradeSys",
      "t": "Docker Compose OK"
    },
    {
      "d": "2026-06",
      "n": "KRX-ETL",
      "t": "UPSERT · crontab LOADED"
    },
    {
      "d": "2026-07",
      "n": "GymQR",
      "t": "이중 검증 · 최종발표"
    },
    {
      "d": "2026-09",
      "n": "K8s-3Tier",
      "t": "backend 3/3 Running"
    }
  ],
  "cron": "0 19 * * 1-5 python etl.py >> etl.log",
  "skills": [
    {
      "name": "Backend",
      "tags": [
        "Java 17",
        "Spring Boot",
        "Spring MVC",
        "MyBatis",
        "Node.js Express",
        "FastAPI",
        "REST API"
      ],
      "where": "헬스장 회원관리 · Anilog · 성적 관리"
    },
    {
      "name": "Data",
      "tags": [
        "Python",
        "MySQL",
        "UPSERT",
        "KRX OpenAPI",
        "crontab",
        "DBeaver"
      ],
      "where": "KRX 시장 폭 ETL · Anilog 데이터 전처리"
    },
    {
      "name": "Infra",
      "tags": [
        "Kubernetes",
        "Docker Compose",
        "AWS EC2",
        "Tomcat",
        "Linux · WSL",
        "Git"
      ],
      "where": "K8s 3-Tier · Anilog 배포 · 성적 관리"
    },
    {
      "name": "AI",
      "tags": [
        "Ollama (로컬 LLM)",
        "프롬프트 설계",
        "GPT · TTS 파이프라인"
      ],
      "where": "Anilog 추천 · Won Story (팀)"
    }
  ],
  "timeline": [
    {
      "date": "2022",
      "title": "",
      "desc": ""
    },
    {
      "date": "2024.03",
      "title": "",
      "desc": ""
    },
    {
      "date": "2025.05 – 11",
      "title": "",
      "desc": ""
    },
    {
      "date": "2026.03 – 현재",
      "title": "",
      "desc": ""
    }
  ],
  "projects": [
    {
      "id": "gym",
      "name": "헬스장 회원관리 시스템",
      "chips": [
        "Backend",
        "Security"
      ],
      "badge": "",
      "period": "2026.05 – 2026.07 · 1인 프로젝트 · 최종발표 2026.07.24",
      "summary": "QR 기반으로 회원·회원권·출입을 한곳에서 관리하는 시스템",
      "points": [
        "UUID 일회성 QR 토큰 발급, 생성 10분 후 자동 만료",
        "토큰 유효성 + 회원권 상태를 함께 확인하는 이중 검증 출입 통제",
        "출입 로그 자동 기록과 일자별·회원별 대시보드"
      ],
      "stack": "Java 17 · Spring Boot · MyBatis · MySQL 8.0 · HTML/CSS/JS",
      "flowTitle": "출입 검증 흐름",
      "flow": [
        "QR 스캔",
        "REST API (POST)",
        "Controller",
        "Service 검증",
        "Mapper",
        "MySQL"
      ],
      "checks": [
        "토큰이 존재하고 10분 만료 전인가",
        "아직 사용하지 않은 토큰인가 (재사용 차단)",
        "회원권이 오늘 기준 유효한가",
        "모두 통과하면 출입 허용, entry_log 기록"
      ],
      "problem": "회원·회원권 정보를 수기와 엑셀로 관리해 누락과 오류가 잦았음. 출입 통제 수단이 없어 무단·대리 출입을 막을 수 없었음.",
      "solution": "회원 등록 시 일회성 QR 토큰을 발급하고, 출입구에서 스캔한 토큰을 서버에서 검증해 허용·거부를 자동 판별하도록 바꿈.",
      "arch": [
        "3-Layer Architecture (Controller – Service – Mapper), Embedded Tomcat 8181",
        "DB 4개 엔티티: admin · member · qr_token · entry_log",
        "검증을 통과하면 entry_log에 출입 기록을 남기고 토큰을 사용 완료 처리, 대시보드에 반영",
        "유효한 토큰을 조회했을 때 만료 상태면 새 토큰을 자동 재발급"
      ],
      "code": "검증 순서 (모두 통과해야 출입 허용)\n① 토큰 존재 && EXPIRED_AT > 현재 시각\n② IS_USED = 'N'  (재사용 차단)\n③ 회원권 EXPIRE_DATE >= 오늘",
      "issues": [
        {
          "t": "하나만 확인하면 생기는 두 가지 보안 허점",
          "p": "설계 단계에서 검증 기준을 하나로 두면 허점이 생긴다는 것을 발견함.",
          "c": "토큰만 확인하면 회원권이 만료된 사람도 QR을 재발급받아 통과할 수 있음. 회원권만 확인하면 QR 없이 이름만으로 대리 출입이 가능함.",
          "s": "토큰 유효성(만료·사용 여부)과 회원권 상태를 함께 검사하는 이중 검증 로직으로 설계함.",
          "r": "같은 QR을 다시 스캔하면 즉시 거부되는 것을 시연으로 확인함."
        }
      ],
      "next": [
        "비밀번호가 평문 저장이라 해시(BCrypt 등) 적용이 필요함.",
        "동시 스캔에 대한 동시성 처리(트랜잭션·락)는 구현하지 않았음.",
        "만료된 미사용 토큰이 계속 쌓이는 구조라, 실무라면 주기적 정리 배치가 필요함."
      ],
      "learned": ""
    },
    {
      "id": "krx",
      "name": "KRX 시장 폭 데이터 ETL 자동화",
      "chips": [
        "Data",
        "ETL"
      ],
      "badge": "",
      "period": "2026.06 · 1인 프로젝트",
      "summary": "KOSPI·KOSDAQ 일별 상승/하락/보합 종목 수를 시계열로 증분 적재",
      "points": [
        "시장별 마지막 적재일 다음 날부터 전일까지만 수집하는 증분 로직",
        "(일자, 시장) 복합 PK + UPSERT로 재실행해도 중복 없이 갱신",
        "crontab 평일 19시 자동 실행, 누락 일자는 다음 실행에서 자동 보충"
      ],
      "stack": "Python (venv) · KRX OpenAPI · MySQL · crontab · WSL Ubuntu · DBeaver",
      "flowTitle": "",
      "flow": [
        "KRX OpenAPI",
        "etl.py 집계",
        "UPSERT",
        "MySQL",
        "분석 뷰",
        "DBeaver 차트"
      ],
      "checks": [],
      "problem": "개별 종목 시세(OHLCV)나 지수 한 줄로는 '오늘 시장 전체에서 몇 종목이 올랐는가' 같은 시장 내부 체력이 보이지 않음.",
      "solution": "일별매매정보의 전 종목 전일 대비 부호를 집계해 상승/하락/보합 종목 수라는 독립 시계열을 만듦. 매일 새로 생긴 날짜만 따라잡도록 적재함.",
      "arch": [
        "krx_api.py (API 호출) · db.py (접속·UPSERT·적재 로그) · etl.py (증분 적재 메인) · config.py (.env 로더)",
        "최초 실행 시 약 2년치(760일) 백필, 이후엔 마지막 적재일 이후만 수집",
        "etl_load_log 테이블에 실행 이력 기록 (LOADED / SKIPPED_HOLIDAY)",
        "분석 뷰 3종: 누적 등락주선(v_ad_line) · 일별 요약 · 적재 현황"
      ],
      "code": "INSERT INTO market_breadth (bas_dd, mkt, advancing, declining, unchanged, ...)\nVALUES (...)\nON DUPLICATE KEY UPDATE advancing = VALUES(advancing), ...;\n\n# crontab: 평일 저녁 7시 (KRX 당일 확정치는 18시 이후)\n0 19 * * 1-5 cd ~/krx-market-breadth && .venv/bin/python etl.py >> etl.log 2>&1",
      "issues": [
        {
          "t": "cron에서 가상환경이 잡히지 않는 문제",
          "p": "터미널에서는 돌던 스크립트를 cron에 그대로 등록하면 실행 환경이 달라짐.",
          "c": "cron은 venv를 활성화하지 않고, 스크립트가 sql/ 같은 상대경로를 사용함. WSL은 cron 서비스도 기본으로 꺼져 있음.",
          "s": "venv 안의 python을 절대경로로 지정하고 프로젝트 폴더로 cd한 뒤 실행함. 결과는 etl.log에 누적하고, cron 서비스는 직접 시작함.",
          "r": "cron이 부를 명령을 수동으로 실행해 '최신 상태 — 추가 적재 없음'이 뜨는 것을 확인함."
        },
        {
          "t": "컴퓨터를 꺼둔 날의 데이터 공백",
          "p": "WSL 기반 cron은 컴퓨터가 켜져 있을 때만 동작함.",
          "c": "날짜를 고정해 수집하면 실행되지 않은 날의 데이터가 빠짐.",
          "s": "'오늘 데이터'가 아니라 'DB의 마지막 적재일 이후 전부'를 수집하도록 증분 기준을 잡음.",
          "r": "며칠 꺼뒀다가 한 번만 실행해도 빠진 영업일을 모두 채움."
        }
      ],
      "next": [
        "WSL 대신 상시 서버에서 스케줄러를 돌리면 누락 자체를 줄일 수 있음.",
        "KOSPI/KOSDAQ 필터와 추이 그래프를 갖춘 웹 화면으로 확장할 계획임."
      ],
      "learned": ""
    },
    {
      "id": "anilog",
      "name": "Anilog — 애니메이션 AI 추천",
      "chips": [
        "Backend",
        "AI"
      ],
      "badge": "EC2 배포",
      "period": "2026.05 · AI/JAVA 프로그래밍 중간고사 과제",
      "summary": "로컬 LLM이 장르별 맞춤 애니를 추천하는 3계층 웹 서비스",
      "points": [
        "Spring MVC · Node.js · FastAPI로 역할을 나눈 3계층 구조",
        "200개 이상 애니 데이터 기반 다중 장르 필터링과 Ollama TOP 3 추천",
        "AWS EC2 배포와 트러블슈팅·AI 활용 내역 문서화"
      ],
      "stack": "Spring MVC · Node.js Express · FastAPI · Ollama · MySQL · AWS EC2",
      "flowTitle": "",
      "flow": [
        "Node.js 화면 :3000",
        "Spring CRUD :8181",
        "FastAPI 분석 :8000",
        "Ollama",
        "MySQL"
      ],
      "checks": [],
      "problem": "시청 기록만 쌓이는 목록이 아니라, 직접 등록한 기록을 바탕으로 장르별 추천까지 받을 수 있는 서비스가 필요했음.",
      "solution": "기록 CRUD는 Spring, 화면은 Node.js, 분석·추천은 FastAPI + Ollama로 분리함. 장르 버튼이나 직접 입력으로 추천을 받게 함.",
      "arch": [
        "Spring MVC(Tomcat 9)가 애니 기록 등록·수정·삭제·조회 API 담당",
        "FastAPI가 DB에서 장르 조건으로 후보를 골라 별점순 정렬 후 프롬프트 구성",
        "GET /api/analysis/ai-recommend/{genre} → Ollama TOP 3 추천 응답",
        "Jikan API로 애니 이미지 수집, 하나의 애니에 여러 장르를 쉼표로 지정"
      ],
      "code": "# 추천 응답 형식을 프롬프트로 고정\n1. [제목] - 별점: X.X - [추천 이유 한 줄]\n규칙: **, ##, *, | 같은 마크다운 기호는 사용하지 않는다",
      "issues": [
        {
          "t": "등록·수정·삭제가 DB에 반영되지 않음",
          "p": "버튼을 눌러도 'No mapping for POST' 경고만 뜨고 데이터가 바뀌지 않았음.",
          "c": "Controller가 메서드 지정 없이 기본(GET)으로만 매핑돼 POST 요청을 처리하지 못했음.",
          "s": "@RequestMapping에 method = RequestMethod.POST를 명시함.",
          "r": "CRUD 전 기능이 정상 반영됨."
        },
        {
          "t": "AI 추천 결과에 마크다운 기호가 그대로 노출",
          "p": "화면에 **제목**, ## 같은 기호가 그대로 보였음.",
          "c": "LLM이 기본적으로 마크다운으로 답하는데 출력 형식을 지정하지 않았음.",
          "s": "프롬프트에 마크다운 금지 규칙과 고정 출력 형식을 추가함.",
          "r": "추천 결과가 통일된 순수 텍스트 형식으로 나옴."
        },
        {
          "t": "EC2로 DB 이관 시 collation 오류 (1273)",
          "p": "로컬 덤프를 EC2 MySQL에 import하자 Unknown collation 오류로 실패함.",
          "c": "로컬 버전의 utf8mb4_uca1400_ai_ci를 EC2 MySQL이 지원하지 않았음.",
          "s": "sed로 덤프 파일의 collation을 utf8mb4_unicode_ci로 일괄 변경 후 다시 import함.",
          "r": "EC2에서 동일한 데이터로 서비스가 동작함."
        },
        {
          "t": "Tomcat war 자동 배포 실패",
          "p": "war를 올리고 재시작해도 폴더가 생기지 않아 404가 났음.",
          "c": "EC2 Tomcat 환경에서 war 자동 압축 해제가 동작하지 않았음.",
          "s": "unzip으로 webapps 아래에 직접 풀고 Tomcat을 재시작함.",
          "r": "배포 경로로 정상 접속됨."
        }
      ],
      "next": [
        "서버 4개(Ollama·FastAPI·Spring·Node)를 순서대로 켜야 해서, 컨테이너로 묶으면 실행이 단순해짐.",
        "로컬 LLM 특성상 응답에 5~15초가 걸림."
      ],
      "learned": ""
    },
    {
      "id": "k8s",
      "name": "Kubernetes 3-Tier 방명록",
      "chips": [
        "Infra",
        "Kubernetes"
      ],
      "badge": "Self-Healing",
      "period": "2026.08 – 2026.09 · 실습 과제",
      "summary": "VirtualBox로 직접 구축한 클러스터에 3계층 웹 서비스 배포",
      "points": [
        "Master/Worker 클러스터를 kubeadm으로 직접 구축",
        "Backend Replica 3개, 파드 강제 삭제 후 자동 복구 검증",
        "PVC Pending, MySQL 접속 거부, Ingress 404 해결 과정 기록"
      ],
      "stack": "Kubernetes (kubeadm) · containerd · Flannel · Flask · nginx · MySQL 8.0 · Ingress",
      "flowTitle": "",
      "flow": [
        "Ingress",
        "frontend-service :80",
        "backend-service :8080 ×3",
        "mysql-service :3306",
        "PV / PVC"
      ],
      "checks": [],
      "problem": "Pod IP는 재시작할 때마다 바뀌기 때문에, 계층 간 통신과 장애 대응을 IP가 아닌 구조로 해결해야 했음.",
      "solution": "Service 이름(DNS)으로 계층을 연결하고, Backend를 Replica 3개로 운영해 파드가 죽어도 ReplicaSet이 자동으로 복구하게 함.",
      "arch": [
        "Namespace webapp · Ubuntu 24.04 VM (NAT + Host-Only 네트워크)",
        "Frontend: nginx:alpine + ConfigMap, /api/ 요청을 backend-service로 프록시",
        "Backend: Flask + PyMySQL REST API, readinessProbe(/api/healthz)로 준비된 파드만 트래픽 수신",
        "MySQL: Secret으로 비밀번호 주입, hostPath PV/PVC로 데이터 영속화"
      ],
      "code": "kubectl get pods -n webapp -l app=backend\nkubectl delete pod <backend-pod> -n webapp\nkubectl get pods -n webapp -l app=backend -w   # 새 파드 자동 생성 확인",
      "issues": [
        {
          "t": "PVC가 Pending에서 멈춤",
          "p": "mysql-pvc가 계속 Pending이라 MySQL 파드가 뜨지 않았음.",
          "c": "직접 구성한 로컬 클러스터라 PV를 자동으로 만들어줄 프로비저너(StorageClass)가 없었음.",
          "s": "hostPath 기반 PV를 수동으로(Static Provisioning) 만들어 PVC와 연결함.",
          "r": "PVC가 Bound 상태가 되고 MySQL이 실행됨."
        },
        {
          "t": "Secret을 바꿨는데 MySQL Access denied",
          "p": "새 비밀번호로 접속하면 ERROR 1045가 났음.",
          "c": "MySQL 이미지는 데이터 디렉토리가 비어 있을 때만 환경변수 비밀번호로 초기화하는데, hostPath에 예전 데이터가 남아 있었음.",
          "s": "Deployment를 0으로 줄이고 hostPath 데이터를 지운 뒤 다시 띄움.",
          "r": "새 비밀번호로 초기화되어 정상 접속됨."
        },
        {
          "t": "Ingress 접속 시 404 Not Found",
          "p": "curl로 접속하면 nginx 404 페이지가 떴음.",
          "c": "Ingress 리소스에 IngressClass가 지정되지 않아 컨트롤러가 규칙을 처리하지 않았음.",
          "s": "IngressClass를 지정해 다시 적용함.",
          "r": "외부에서 방명록 화면에 접속됨."
        },
        {
          "t": "노드 간 Pod 통신 실패",
          "p": "NIC가 두 개(NAT + Host-Only)인 VM에서 노드 간 통신이 끊겼음.",
          "c": "Flannel이 NAT 인터페이스(enp0s3)를 잡았음.",
          "s": "kube-flannel-ds에 --iface=enp0s8 옵션을 추가함.",
          "r": "Master와 Worker 사이 Pod 통신이 정상화됨."
        }
      ],
      "next": [
        "hostPath는 특정 노드에 데이터가 묶여 실무에서는 NFS 등 네트워크 스토리지가 필요함.",
        "Secret은 기본적으로 base64 인코딩일 뿐이라 etcd 암호화나 외부 Secret 관리 도구가 필요함."
      ],
      "learned": ""
    },
    {
      "id": "wonstory",
      "name": "Won Story — 생성형 AI 맞춤 동화",
      "chips": [
        "AI",
        "UI/UX"
      ],
      "badge": "학술제 우수상",
      "period": "2025.05 – 2025.11 · 3인 팀 프로젝트",
      "summary": "아이의 언어 수준에 맞춘 동화를 텍스트·이미지·음성으로 자동 생성",
      "points": [
        "담당: UI/UX 전체 디자인, 앱 페이지 시각 설계",
        "쉬운 문장으로 재구성하는 후카츠 기법 콘셉트를 화면에 반영",
        "2025 국제인공지능학회 종합학술대회 발표, 우수상 수상"
      ],
      "stack": "Unity · Python · GPT · TTS · 이미지 생성 AI · MySQL",
      "flowTitle": "",
      "flow": [
        "GPT 장면 JSON",
        "장면별 이미지·음성",
        "storybook.zip",
        "Unity 앱"
      ],
      "checks": [],
      "problem": "맞벌이·한부모·다문화 가정의 아이들이 언어 자극을 충분히 받지 못하고, 기존 서비스는 정해진 동화만 제공한다는 점에 주목함.",
      "solution": "아이의 언어 수준과 감정 발달 단계에 맞는 동화를 생성형 AI로 매번 새로 만들어, 이미지와 음성까지 함께 보여주는 앱을 기획함.",
      "arch": [
        "GPT가 장면별 스토리를 JSON으로 생성",
        "장면마다 같은 규칙의 파일명(scene_1.png, scene_1.mp3)으로 이미지·음성 생성 후 zip 패키징",
        "Unity가 zip을 풀어 페이지별로 이미지와 음성을 자동 재생",
        "역할: 팀장 앱 UI 구현 · 팀원 동화 생성 파이프라인 · 본인 UI/UX 디자인"
      ],
      "code": "",
      "issues": [],
      "next": [
        "동화 생성 파이프라인과 데이터 저장은 팀원 담당이라, 본인 기여는 화면 설계 중심임."
      ],
      "learned": ""
    },
    {
      "id": "grade",
      "name": "학생 성적 관리 시스템",
      "chips": [
        "Backend",
        "Docker"
      ],
      "badge": "",
      "period": "2026.05 · 중간고사 프로젝트",
      "summary": "학생 정보와 과목별 성적을 등록·조회하고 등급을 자동 계산",
      "points": [
        "students / scores 테이블 정규화와 외래키 CASCADE",
        "REST API 5개(GET/POST/PUT/DELETE)와 Prepared Statement",
        "Docker Compose로 MySQL 컨테이너 실행, 볼륨으로 데이터 유지"
      ],
      "stack": "Node.js Express · mysql2 · MySQL 8.0 · Docker Compose · HTML/CSS/JS · GitHub",
      "flowTitle": "",
      "flow": [
        "HTML/JS 화면",
        "Express REST API",
        "mysql2",
        "MySQL (Docker)"
      ],
      "checks": [],
      "problem": "학생 정보와 성적을 한 표에 섞어 관리하면 중복이 생기고, 학생을 지웠을 때 성적만 남는 문제가 생김.",
      "solution": "학생과 성적 테이블을 분리하고 외래키 CASCADE로 묶어, 학생 삭제 시 성적이 함께 삭제되게 함. 총점·평균·등급은 서버에서 계산함.",
      "arch": [
        "프론트: 등록 폼 + 조회 표 (국어·영어·수학, 총점·평균·등급)",
        "백엔드: async/await + try-catch로 DB 처리, CORS 설정",
        "DB: Docker Compose로 MySQL 8.0 실행 (3307:3306), named volume으로 영속화",
        "GitHub에 backend / frontend / docker-compose.yml / README 정리"
      ],
      "code": "services:\n  mysql:\n    image: mysql:8.0\n    ports: [\"3307:3306\"]\n    volumes: [mysql_data:/var/lib/mysql]",
      "issues": [],
      "next": [
        "현재는 DB만 컨테이너이고 백엔드·프론트는 로컬 실행임. 전체를 컨테이너화하면 한 번에 띄울 수 있음."
      ],
      "learned": ""
    }
  ]
};
