/* English content — edit only the text inside the quotes */
window.I18N = window.I18N || {};
window.I18N.en = {
  "meta": {
    "title": "Backend & Data Engineering Portfolio",
    "description": "Six hands-on projects covering API ingestion, incremental loading, crontab automation, Spring back ends and Kubernetes deployment."
  },
  "ui": {
    "skip": "Skip to content",
    "sections": "Sections",
    "language": "Choose language",
    "theme": "Switch between light and dark",
    "photoAlt": "Profile photo",
    "logLabel": "Project history log",
    "nav": { "skills": "Skills", "journey": "Journey", "projects": "Projects", "contact": "Contact" },
    "viewProjects": "View projects",
    "skillsTitle": "Tech stack",
    "journeyTitle": "Timeline",
    "projectsTitle": "{n} projects",
    "flagship": "Flagship",
    "more": "Read more",
    "close": "Close",
    "toTop": "Back to top",
    "email": "Email", "blog": "Blog", "phone": "Phone",
    "copy": "Copy", "copied": "Copied",
    "s": {
      "screens": "Screens", "overview": "Overview", "problem": "Problem", "solution": "Solution",
      "arch": "Architecture", "stack": "Tech stack", "solving": "Problem solving",
      "p": "Issue", "c": "Cause", "f": "Fix", "r": "Result",
      "limits": "Limits and next steps", "learned": "What I learned"
    }
  },
  "profile": {
    "eyebrow": "Backend · Data Engineering",
    "h1a": "",
    "h1em": "",
    "h1b": "",
    "lede": "",
    "facts": ["6 projects", "Excellence Award", "Incremental UPSERT loading", "Kubernetes self-healing"],
    "skillsNote": "",
    "projectsNote": "Open “Read more” on a card for the architecture and how each problem was solved.",
    "contactTitle": "",
    "contactText": ""
  },
  "log": [
    { "d": "2025-11", "n": "WonStory", "t": "Excellence Award" },
    { "d": "2026-05", "n": "Anilog", "t": "Ollama recs · deployed on EC2" },
    { "d": "2026-05", "n": "GradeSys", "t": "Docker Compose OK" },
    { "d": "2026-06", "n": "KRX-ETL", "t": "UPSERT · crontab LOADED" },
    { "d": "2026-07", "n": "GymQR", "t": "Double check · final demo" },
    { "d": "2026-09", "n": "K8s-3Tier", "t": "backend 3/3 Running" }
  ],
  "cron": "0 19 * * 1-5 python etl.py >> etl.log",
  "skills": [
    { "name": "Backend", "tags": ["Java 17", "Spring Boot", "Spring MVC", "MyBatis", "Node.js Express", "FastAPI", "REST API"], "where": "Gym membership · Anilog · Grade management" },
    { "name": "Data", "tags": ["Python", "MySQL", "UPSERT", "KRX OpenAPI", "crontab", "DBeaver"], "where": "KRX market breadth ETL · Anilog data preparation" },
    { "name": "Infra", "tags": ["Kubernetes", "Docker Compose", "AWS EC2", "Tomcat", "Linux · WSL", "Git"], "where": "K8s 3-tier · Anilog deployment · Grade management" },
    { "name": "AI", "tags": ["Ollama (local LLM)", "Prompt design", "GPT · TTS pipeline"], "where": "Anilog recommendations · Won Story (team)" }
  ],
  "timeline": [
    {"date": "2022", "title": "", "desc": ""},
    {"date": "2024.03", "title": "", "desc": ""},
    {"date": "2025.05 – 11", "title": "", "desc": ""},
    {"date": "2026.03 – now", "title": "", "desc": ""}
  ],
  "projects": [
    {
      "id": "gym",
      "name": "Gym Membership Management System",
      "chips": ["Backend", "Security"],
      "badge": "",
      "period": "May – Jul 2026 · Solo project · Final presentation 24 Jul 2026",
      "summary": "A QR-based system that manages members, memberships and entry in one place",
      "points": [
        "Issues one-time QR tokens from UUIDs that expire 10 minutes after creation",
        "Entry control with a double check: token validity plus membership status",
        "Automatic entry logs and dashboards by date and by member"
      ],
      "stack": "Java 17 · Spring Boot · MyBatis · MySQL 8.0 · HTML/CSS/JS",
      "flowTitle": "Entry check flow",
      "flow": ["QR scan", "REST API (POST)", "Controller", "Service check", "Mapper", "MySQL"],
      "checks": [
        "Does the token exist, and is it within 10 minutes?",
        "Is the token still unused? (blocks reuse)",
        "Is the membership valid today?",
        "If all pass, entry is allowed and written to entry_log"
      ],
      "problem": "Member and membership records were kept by hand and in spreadsheets, so entries were often missing or wrong, and with no entry control there was no way to stop unauthorised or proxy entry.",
      "solution": "A one-time QR token is issued when a member registers. The token scanned at the door is checked on the server, which decides automatically whether to allow or refuse entry.",
      "arch": [
        "3-layer architecture (Controller – Service – Mapper) on embedded Tomcat, port 8181",
        "Four database entities: admin · member · qr_token · entry_log",
        "A passed check writes a row to entry_log, marks the token as used and updates the dashboard",
        "If the current token has expired when it is looked up, a new one is issued automatically"
      ],
      "code": "Check order (all must pass to allow entry)\n① token exists && EXPIRED_AT > now\n② IS_USED = 'N'  (blocks reuse)\n③ membership EXPIRE_DATE >= today",
      "issues": [
        {
          "t": "Two security holes when only one thing is checked",
          "p": "During design I found that relying on a single check leaves a gap.",
          "c": "Checking only the token lets someone with an expired membership get a new QR and walk in. Checking only the membership lets someone enter by name alone, without a QR.",
          "s": "I designed a double check that verifies token validity (expiry and use) together with membership status.",
          "r": "In the demo, scanning the same QR a second time was refused immediately."
        }
      ],
      "next": [
        "Passwords are stored in plain text and need hashing (BCrypt or similar).",
        "Concurrent scans are not handled yet (transactions and locks).",
        "Expired unused tokens keep piling up, so a real service would need a periodic cleanup job."
      ],
      "learned": ""
    },
    {
      "id": "krx",
      "name": "KRX Market Breadth ETL Automation",
      "chips": ["Data", "ETL"],
      "badge": "",
      "period": "Jun 2026 · Solo project",
      "summary": "Incrementally loads daily counts of advancing, declining and unchanged KOSPI and KOSDAQ stocks as a time series",
      "points": [
        "Incremental logic that collects only from the day after the last loaded date up to yesterday, per market",
        "Composite key (date, market) plus UPSERT, so reruns update rows without duplicates",
        "Runs by crontab at 19:00 on weekdays and fills in any missed days on the next run"
      ],
      "stack": "Python (venv) · KRX OpenAPI · MySQL · crontab · WSL Ubuntu · DBeaver",
      "flowTitle": "",
      "flow": ["KRX OpenAPI", "etl.py aggregation", "UPSERT", "MySQL", "Analysis views", "DBeaver chart"],
      "checks": [],
      "problem": "Single-stock prices (OHLCV) or one index line do not show the market's internal strength, such as how many stocks actually rose today.",
      "solution": "I aggregate the sign of every stock's daily change into advancing, declining and unchanged counts, which form their own time series, and load only the dates that are new each day.",
      "arch": [
        "krx_api.py (API calls) · db.py (connection, UPSERT, load log) · etl.py (incremental loader) · config.py (.env loader)",
        "The first run backfills about two years (760 days); later runs collect only what follows the last loaded date",
        "Each run is recorded in the etl_load_log table (LOADED / SKIPPED_HOLIDAY)",
        "Three analysis views: cumulative advance-decline line (v_ad_line), daily summary and load status"
      ],
      "code": "INSERT INTO market_breadth (bas_dd, mkt, advancing, declining, unchanged, ...)\nVALUES (...)\nON DUPLICATE KEY UPDATE advancing = VALUES(advancing), ...;\n\n# crontab: weekdays at 19:00 (KRX publishes final daily figures after 18:00)\n0 19 * * 1-5 cd ~/krx-market-breadth && .venv/bin/python etl.py >> etl.log 2>&1",
      "issues": [
        {
          "t": "cron does not pick up the virtual environment",
          "p": "A script that runs in the terminal behaves differently when registered in cron as is.",
          "c": "cron does not activate the venv, and the script uses relative paths such as sql/. On WSL the cron service is also off by default.",
          "s": "I call the venv's python by absolute path after cd-ing into the project folder, append output to etl.log, and start the cron service myself.",
          "r": "Running the exact cron command by hand printed “Up to date — nothing to load”."
        },
        {
          "t": "Data gaps on days the computer was off",
          "p": "cron on WSL only runs while the computer is on.",
          "c": "Collecting for a fixed date loses every day the job did not run.",
          "s": "The loader collects “everything after the last date in the database”, not “today's data”.",
          "r": "After several days off, one run fills in every missing trading day."
        }
      ],
      "next": [
        "Running the scheduler on an always-on server instead of WSL would prevent most gaps.",
        "I plan to add a web view with a KOSPI/KOSDAQ filter and trend charts."
      ],
      "learned": ""
    },
    {
      "id": "anilog",
      "name": "Anilog — AI Anime Recommendations",
      "chips": ["Backend", "AI"],
      "badge": "Deployed on EC2",
      "period": "May 2026 · Midterm project, AI/Java Programming",
      "summary": "A three-tier web service where a local LLM recommends anime by genre",
      "points": [
        "Three tiers with separate roles: Spring MVC, Node.js and FastAPI",
        "Multi-genre filtering over 200+ titles and top-3 recommendations from Ollama",
        "Deployed on AWS EC2, with troubleshooting and AI-usage notes documented"
      ],
      "stack": "Spring MVC · Node.js Express · FastAPI · Ollama · MySQL · AWS EC2",
      "flowTitle": "",
      "flow": ["Node.js UI :3000", "Spring CRUD :8181", "FastAPI analysis :8000", "Ollama", "MySQL"],
      "checks": [],
      "problem": "I wanted more than a list that only piles up watch records: a service that recommends titles by genre based on the records I entered myself.",
      "solution": "Spring handles record CRUD, Node.js serves the UI, and FastAPI with Ollama handles analysis and recommendations. A genre button or free text triggers a recommendation.",
      "arch": [
        "Spring MVC (Tomcat 9) provides the API to create, update, delete and list anime records",
        "FastAPI selects candidates by genre from the database, sorts them by rating and builds the prompt",
        "GET /api/analysis/ai-recommend/{genre} → top-3 recommendations from Ollama",
        "Cover images come from the Jikan API; one title can carry several comma-separated genres"
      ],
      "code": "# The answer format is fixed in the prompt\n1. [Title] - Rating: X.X - [one-line reason]\nRule: never use markdown symbols such as **, ##, * or |",
      "issues": [
        {
          "t": "Create, update and delete were not reaching the database",
          "p": "Clicking the buttons only produced a “No mapping for POST” warning and nothing changed.",
          "c": "The controller methods had no HTTP method set, so they were mapped to GET by default and could not handle POST.",
          "s": "I set method = RequestMethod.POST explicitly on @RequestMapping.",
          "r": "All CRUD operations worked."
        },
        {
          "t": "Markdown symbols showing up in AI answers",
          "p": "Symbols such as **title** and ## appeared on the page as plain text.",
          "c": "The LLM answers in markdown by default and no output format had been specified.",
          "s": "I added a no-markdown rule and a fixed output format to the prompt.",
          "r": "Recommendations now come back in one consistent plain-text format."
        },
        {
          "t": "Collation error (1273) when moving the database to EC2",
          "p": "Importing the local dump into MySQL on EC2 failed with “Unknown collation”.",
          "c": "The local version used utf8mb4_uca1400_ai_ci, which the MySQL on EC2 does not support.",
          "s": "I replaced the collation in the dump file with utf8mb4_unicode_ci using sed and imported again.",
          "r": "The service ran on EC2 with the same data."
        },
        {
          "t": "Tomcat did not auto-deploy the war file",
          "p": "After uploading the war and restarting, no folder was created and the page returned 404.",
          "c": "Automatic unpacking of the war did not work in the EC2 Tomcat environment.",
          "s": "I unzipped it under webapps by hand and restarted Tomcat.",
          "r": "The deployed path opened normally."
        }
      ],
      "next": [
        "Four servers (Ollama, FastAPI, Spring, Node) must be started in order; containers would make this a single step.",
        "Because the LLM runs locally, an answer takes 5 to 15 seconds."
      ],
      "learned": ""
    },
    {
      "id": "k8s",
      "name": "Kubernetes 3-Tier Guestbook",
      "chips": ["Infra", "Kubernetes"],
      "badge": "Self-healing",
      "period": "Aug – Sep 2026 · Lab assignment",
      "summary": "A three-tier web service deployed on a cluster I built myself in VirtualBox",
      "points": [
        "Built the master/worker cluster directly with kubeadm",
        "Three backend replicas; verified automatic recovery after force-deleting a pod",
        "Documented fixes for a pending PVC, MySQL access denied and an Ingress 404"
      ],
      "stack": "Kubernetes (kubeadm) · containerd · Flannel · Flask · nginx · MySQL 8.0 · Ingress",
      "flowTitle": "",
      "flow": ["Ingress", "frontend-service :80", "backend-service :8080 ×3", "mysql-service :3306", "PV / PVC"],
      "checks": [],
      "problem": "A pod's IP changes every time it restarts, so communication between tiers and failure handling had to be solved by structure, not by IP address.",
      "solution": "Tiers are connected by Service name (DNS), and the backend runs as three replicas so the ReplicaSet restores a pod automatically when one dies.",
      "arch": [
        "Namespace webapp · Ubuntu 24.04 VMs (NAT + host-only networks)",
        "Frontend: nginx:alpine with a ConfigMap, proxying /api/ requests to backend-service",
        "Backend: Flask + PyMySQL REST API; a readinessProbe (/api/healthz) sends traffic only to ready pods",
        "MySQL: password injected from a Secret, data persisted with a hostPath PV/PVC"
      ],
      "code": "kubectl get pods -n webapp -l app=backend\nkubectl delete pod <backend-pod> -n webapp\nkubectl get pods -n webapp -l app=backend -w   # watch the new pod appear",
      "issues": [
        {
          "t": "PVC stuck in Pending",
          "p": "mysql-pvc stayed Pending, so the MySQL pod never started.",
          "c": "On a self-built local cluster there is no provisioner (StorageClass) to create a PV automatically.",
          "s": "I created a hostPath PV by hand (static provisioning) and bound it to the PVC.",
          "r": "The PVC became Bound and MySQL started."
        },
        {
          "t": "MySQL access denied after changing the Secret",
          "p": "Connecting with the new password returned ERROR 1045.",
          "c": "The MySQL image initialises the password from the environment only when the data directory is empty, and old data was still in the hostPath.",
          "s": "I scaled the Deployment to 0, removed the hostPath data and started it again.",
          "r": "MySQL initialised with the new password and accepted connections."
        },
        {
          "t": "404 Not Found through the Ingress",
          "p": "curl returned the nginx 404 page.",
          "c": "The Ingress resource had no IngressClass, so the controller ignored its rules.",
          "s": "I set the IngressClass and applied it again.",
          "r": "The guestbook opened from outside the cluster."
        },
        {
          "t": "Pods could not talk across nodes",
          "p": "On VMs with two NICs (NAT + host-only), traffic between nodes failed.",
          "c": "Flannel had picked the NAT interface (enp0s3).",
          "s": "I added --iface=enp0s8 to kube-flannel-ds.",
          "r": "Pod traffic between master and worker went back to normal."
        }
      ],
      "next": [
        "hostPath ties data to one node; production needs network storage such as NFS.",
        "A Secret is only base64-encoded by default, so etcd encryption or an external secret manager is needed."
      ],
      "learned": ""
    },
    {
      "id": "wonstory",
      "name": "Won Story — Generative AI Storybooks",
      "chips": ["AI", "UI/UX"],
      "badge": "Excellence Award",
      "period": "May – Nov 2025 · Team of three",
      "summary": "Generates storybooks matched to a child's language level, with text, images and narration",
      "points": [
        "My role: overall UI/UX design and the visual design of the app's pages",
        "Applied the Fukatsu method of rewriting text into easy sentences to the screens",
        "Presented at the 2025 conference of the International Society for Artificial Intelligence; Excellence Award"
      ],
      "stack": "Unity · Python · GPT · TTS · Image generation AI · MySQL",
      "flowTitle": "",
      "flow": ["GPT scene JSON", "Image and audio per scene", "storybook.zip", "Unity app"],
      "checks": [],
      "problem": "Children in dual-income, single-parent and multicultural families often get too little language stimulation, and existing services only offer a fixed set of stories.",
      "solution": "We planned an app that uses generative AI to create a new story each time, matched to the child's language level and emotional development, and shows it with images and narration.",
      "arch": [
        "GPT writes the story scene by scene as JSON",
        "Images and audio are generated per scene under one naming rule (scene_1.png, scene_1.mp3) and packed into a zip",
        "Unity unpacks the zip and plays each page's image and narration automatically",
        "Roles: team lead built the app UI · a teammate built the story pipeline · I did the UI/UX design"
      ],
      "code": "",
      "issues": [],
      "next": [
        "The story pipeline and data storage were my teammates' work; my contribution was the screen design."
      ],
      "learned": ""
    },
    {
      "id": "grade",
      "name": "Student Grade Management System",
      "chips": ["Backend", "Docker"],
      "badge": "",
      "period": "May 2026 · Midterm project",
      "summary": "Registers and lists students and their subject scores, and calculates grades automatically",
      "points": [
        "Normalised students / scores tables with a cascading foreign key",
        "Five REST endpoints (GET/POST/PUT/DELETE) using prepared statements",
        "MySQL runs in a Docker Compose container with a volume to keep the data"
      ],
      "stack": "Node.js Express · mysql2 · MySQL 8.0 · Docker Compose · HTML/CSS/JS · GitHub",
      "flowTitle": "",
      "flow": ["HTML/JS UI", "Express REST API", "mysql2", "MySQL (Docker)"],
      "checks": [],
      "problem": "Keeping student details and scores in one table creates duplicates, and deleting a student can leave their scores behind.",
      "solution": "Students and scores live in separate tables linked by a cascading foreign key, so deleting a student also deletes the scores. Total, average and grade are calculated on the server.",
      "arch": [
        "Frontend: entry form and results table (Korean, English, maths; total, average, grade)",
        "Backend: database access with async/await and try-catch, plus CORS settings",
        "Database: MySQL 8.0 through Docker Compose (3307:3306), persisted in a named volume",
        "GitHub repository organised as backend / frontend / docker-compose.yml / README"
      ],
      "code": "services:\n  mysql:\n    image: mysql:8.0\n    ports: [\"3307:3306\"]\n    volumes: [mysql_data:/var/lib/mysql]",
      "issues": [],
      "next": [
        "Only the database is containerised for now; the back end and front end run locally. Containerising everything would start it all with one command."
      ],
      "learned": ""
    }
  ]
};
