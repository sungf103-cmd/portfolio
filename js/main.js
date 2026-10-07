/* =====================================================================
   포트폴리오 화면을 그리는 스크립트
   - 글 내용: js/lang/ko.js, en.js
   - 개인 정보·링크·이미지: js/site.js
   ===================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var I18N = window.I18N || {};

  var LANGS = [
    { code: "ko", label: "한국어", short: "KO", html: "ko" },
    { code: "en", label: "English", short: "EN", html: "en" }
  ].filter(function (l) { return I18N[l.code]; });

  /* 언어별 본문 글꼴 (필요한 언어만 불러옵니다) */
  var FONTS = {
    ko: "IBM+Plex+Sans+KR:wght@400;500;600;700"
  };

  var app = document.getElementById("app");
  var root = document.documentElement;
  var lang = pickLang();
  var T = I18N[lang];
  var openId = null;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function has(code) { return LANGS.some(function (l) { return l.code === code; }); }

  function pickLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (q && has(q)) return q;
    var saved = load("pf-lang");
    if (saved && has(saved)) return saved;
    var nav = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]);
    for (var i = 0; i < nav.length; i++) {
      var two = String(nav[i]).toLowerCase().slice(0, 2);
      if (has(two)) return two;
    }
    return has(SITE.defaultLang) ? SITE.defaultLang : (LANGS[0] && LANGS[0].code);
  }

  function myName() {
    var n = SITE.name || {};
    return n[lang] || n.ko || n.en || "";
  }
  function handle() {
    var n = SITE.name || {};
    return SITE.handle || n.en || n.ko || "";
  }
  function hostOf(url) { return String(url).replace(/^https?:\/\//, "").replace(/\/$/, ""); }
  function project(id) {
    for (var i = 0; i < T.projects.length; i++) if (T.projects[i].id === id) return T.projects[i];
    return null;
  }
  function extra(id) { return (SITE.projects && SITE.projects[id]) || {}; }
  function orderedIds() {
    var ids = T.projects.map(function (p) { return p.id; });
    var out = (SITE.order || []).filter(function (id) { return ids.indexOf(id) >= 0; });
    ids.forEach(function (id) { if (out.indexOf(id) < 0) out.push(id); });
    return out;
  }

  /* ---------- pieces ---------- */
  function chips(p, isFlag) {
    var h = isFlag ? '<span class="chip warn">' + esc(T.ui.flagship) + "</span>" : "";
    h += (p.chips || []).map(function (c) { return '<span class="chip">' + esc(c) + "</span>"; }).join("");
    if (p.badge) h += '<span class="chip ok">' + esc(p.badge) + "</span>";
    return h;
  }
  function points(p) {
    return '<ul class="points">' + (p.points || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }
  function flow(p) {
    if (!p.flow || !p.flow.length) return "";
    return '<div class="flow">' + p.flow.map(function (x, i) {
      return (i ? '<i aria-hidden="true">→</i>' : "") + "<span>" + esc(x) + "</span>";
    }).join("") + "</div>";
  }
  function moreBtn(p) {
    return '<button type="button" class="more" data-open="' + esc(p.id) + '">' + esc(T.ui.more) + ' <span aria-hidden="true">→</span></button>';
  }

  function card(p) {
    return '<article class="card">' +
      '<div class="kind">' + chips(p, false) + "</div>" +
      "<h3>" + esc(p.name) + "</h3>" +
      '<div class="meta">' + esc(p.period) + "</div>" +
      '<p class="summary">' + esc(p.summary) + "</p>" +
      points(p) +
      '<p class="stack">' + esc(p.stack) + "</p>" +
      '<div class="card-foot">' + moreBtn(p) + "</div></article>";
  }

  function flagshipCard(p) {
    var marks = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];
    var checks = p.checks || [];
    var aside = "";
    if (p.flowTitle || checks.length || (p.flow && p.flow.length)) {
      aside = '<div class="aside">' +
        (p.flowTitle ? '<div class="eyebrow muted">' + esc(p.flowTitle) + "</div>" : "") +
        flow(p) +
        checks.map(function (c, k) {
          var last = k === checks.length - 1 && checks.length > 1;
          return '<div class="check-row"><b' + (last ? ' class="to"' : "") + ' aria-hidden="true">' + (last ? "→" : (marks[k] || "·")) + "</b><span>" + esc(c) + "</span></div>";
        }).join("") + "</div>";
    }
    return '<article class="flagship' + (aside ? "" : " solo") + '">' +
      '<div class="body">' +
      '<div class="kind">' + chips(p, true) + "</div>" +
      "<h3>" + esc(p.name) + "</h3>" +
      '<div class="meta">' + esc(p.period) + "</div>" +
      '<p class="summary">' + esc(p.summary) + "</p>" +
      points(p) +
      '<p class="stack">' + esc(p.stack) + "</p>" +
      '<div class="card-foot">' + moreBtn(p) + "</div>" +
      "</div>" + aside + "</article>";
  }

  function langSwitch() {
    return '<div class="langs" role="group" aria-label="' + esc(T.ui.language) + '">' +
      LANGS.map(function (l) {
        return '<button type="button" data-lang="' + l.code + '" lang="' + l.html + '" title="' + esc(l.label) + '" aria-label="' + esc(l.label) + '"' +
          (l.code === lang ? ' aria-pressed="true"' : ' aria-pressed="false"') + ">" + l.short + "</button>";
      }).join("") + "</div>";
  }

  function avatar() {
    /* 사진 틀은 항상 보입니다. js/site.js 의 photo 를 채우면 틀 안에 사진이 들어갑니다. */
    var name = myName();
    var blank = '<svg class="avatar-blank" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>';
    return '<div class="avatar' + (SITE.photo ? "" : " empty") + '">' + blank +
      (SITE.photo ? '<img src="' + esc(SITE.photo) + '" alt="' + esc(name || T.ui.photoAlt) + '" width="96" height="96" onerror="this.parentNode.classList.add(\'empty\');this.remove()">' : "") +
      "</div>";
  }

  function contactRows() {
    var rows = [];
    if (SITE.email) rows.push('<div class="crow"><span class="clabel">' + esc(T.ui.email) + '</span><span class="cval">' + (window.PF_PREVIEW ? '<span class="mailtext">' + esc(SITE.email) + '</span>' : '<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + '</a>') +
      '<button type="button" class="copy" data-copy="' + esc(SITE.email) + '">' + esc(T.ui.copy) + "</button></span></div>");
    [["github", "GitHub"], ["blog", T.ui.blog], ["linkedin", "LinkedIn"]].forEach(function (r) {
      var v = SITE[r[0]];
      if (v) rows.push('<div class="crow"><span class="clabel">' + esc(r[1]) + '</span><span class="cval"><a href="' + esc(v) + '" target="_blank" rel="noopener">' + esc(hostOf(v)) + "</a></span></div>");
    });
    if (SITE.phone) rows.push('<div class="crow"><span class="clabel">' + esc(T.ui.phone) + '</span><span class="cval"><a href="tel:' + esc(String(SITE.phone).replace(/[^0-9+]/g, "")) + '">' + esc(SITE.phone) + "</a></span></div>");
    return rows.join("");
  }

  /* 내 컴퓨터에서 미리 볼 때만 보이는 안내 (배포된 사이트에는 나오지 않습니다) */
  function devHint() {
    var local = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    if (!local) return "";
    var miss = [];
    var n = SITE.name || {};
    if (!n.ko && !n.en) miss.push("name");
    if (!SITE.email) miss.push("email");
    if (!SITE.github) miss.push("github");
    if (!miss.length) return "";
    return '<div class="dev-hint">미리보기 안내: <code>js/site.js</code>에 아직 비어 있는 항목이 있어요 → ' + miss.join(", ") + " (이 안내는 배포된 사이트에는 보이지 않습니다)</div>";
  }

  /* ---------- page ---------- */
  function render() {
    var P = T.profile, U = T.ui;
    var ids = orderedIds();
    var flagId = ids.indexOf(SITE.flagship) >= 0 ? SITE.flagship : null;
    var name = myName(), hd = handle();
    var h = "";

    h += devHint();
    h += '<header class="nav"><div class="wrap">' +
      '<a class="brand" href="#top">~/' + (hd ? "<b>" + esc(hd) + "</b>/" : "") + "portfolio</a>" +
      '<nav aria-label="' + esc(U.sections) + '">' +
      '<a href="#skills">' + esc(U.nav.skills) + "</a>" +
      '<a href="#journey">' + esc(U.nav.journey) + "</a>" +
      '<a href="#projects">' + esc(U.nav.projects) + "</a>" +
      '<a href="#contact">' + esc(U.nav.contact) + "</a></nav>" +
      '<div class="controls">' + langSwitch() + "</div>" +
      "</div></header>";

    h += '<main class="wrap" id="top">';

    /* hero */
    h += '<div class="hero"><div>' +
      '<div class="who">' + avatar() + "<div>" +
      (name ? '<div class="name">' + esc(name) + "</div>" : "") +
      '<div class="eyebrow">' + esc(P.eyebrow) + "</div></div></div>" +
      /* 문구를 비워 두면 자리만 잡힌 빈 틀로 보입니다. js/lang/*.js 의 h1a·h1em·h1b·lede 를 채우면 글이 들어갑니다. */
      ((P.h1a || P.h1em || P.h1b)
        ? "<h1>" + esc(P.h1a) + "<em>" + esc(P.h1em) + "</em>" + esc(P.h1b) + "</h1>"
        : '<div class="slot slot-h1" aria-hidden="true"></div>') +
      (P.lede ? '<p class="lede">' + esc(P.lede) + "</p>" : '<div class="slot slot-lede" aria-hidden="true"></div>') +
      '<div class="facts">' + (P.facts || []).map(function (f) { return '<span class="fact">' + esc(f) + "</span>"; }).join("") + "</div>" +
      '<div class="cta"><a class="btn primary" href="#projects">' + esc(U.viewProjects) + '</a><a class="btn ghost" href="#contact">' + esc(U.nav.contact) + "</a></div></div>";

    h += '<div class="term" role="img" aria-label="' + esc(U.logLabel) + '">' +
      '<div class="term-bar"><div class="dots"><i></i><i></i><i></i></div><span>~/work/history.log</span></div>' +
      '<div class="term-body"><div class="t-dim">$ tail history.log</div>' +
      (T.log || []).map(function (l) {
        return '<div class="t-line"><span class="t-dim">' + esc(l.d) + '</span> <span class="t-acc">' + esc(l.n) + '</span> <span class="t-ok">' + esc(l.t) + "</span></div>";
      }).join("") +
      '<div class="t-dim t-gap">$ crontab -l</div><div class="t-line"><span class="t-warn">' + esc(T.cron) + "</span></div></div></div></div>";

    /* skills */
    h += '<section id="skills"><div class="sec-head"><div><div class="eyebrow">Skills</div><h2>' + esc(U.skillsTitle) + "</h2></div>" +
      (P.skillsNote ? '<p class="sec-note">' + esc(P.skillsNote) + "</p>" : "") + '</div><div class="skills">' +
      (T.skills || []).map(function (g) {
        return '<div class="skill-group"><h3>' + esc(g.name) + '</h3><div class="tags">' +
          g.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
          (g.where ? '<p class="where">' + esc(g.where) + "</p>" : "") + "</div>";
      }).join("") + "</div></section>";

    /* journey */
    if (T.timeline && T.timeline.length) {
      h += '<section id="journey"><div class="sec-head"><div><div class="eyebrow">Journey</div><h2>' + esc(U.journeyTitle) + '</h2></div></div><ol class="timeline">' +
        T.timeline.map(function (t) {
          return '<li><div class="tl-date">' + esc(t.date) + '</div><div>' + (t.title ? '<div class="tl-title">' + esc(t.title) + "</div>" : "") +
            (t.desc ? '<div class="tl-desc">' + esc(t.desc) + "</div>" : "") + "</div></li>";
        }).join("") + "</ol></section>";
    }

    /* projects */
    h += '<section id="projects"><div class="sec-head"><div><div class="eyebrow">Projects</div><h2>' + esc(U.projectsTitle.replace("{n}", ids.length)) + "</h2></div>" +
      (P.projectsNote ? '<p class="sec-note">' + esc(P.projectsNote) + "</p>" : "") + "</div>";
    if (flagId) h += flagshipCard(project(flagId));
    h += '<div class="grid">' + ids.filter(function (id) { return id !== flagId; }).map(function (id) { return card(project(id)); }).join("") + "</div></section>";

    /* contact */
    var rows = contactRows();
    h += '<section id="contact"><div class="contact' + (rows ? "" : " solo") + '"><div><div class="eyebrow">Contact</div>' + (P.contactTitle ? "<h2>" + esc(P.contactTitle) + "</h2>" : "") +
      (P.contactText ? '<p class="contact-text">' + esc(P.contactText) + "</p>" : "") + "</div>" +
      (rows ? '<div class="clist">' + rows + "</div>" : "") + "</div></section>";

    h += "<footer><span>© " + new Date().getFullYear() + (name ? " " + esc(name) : "") + '</span><a href="#top">' + esc(U.toTop) + ' <span aria-hidden="true">↑</span></a></footer></main>';

    app.innerHTML = h;
    if (openId) renderDetail();
  }

  /* ---------- detail dialog ---------- */
  var dlg = document.createElement("dialog");
  dlg.id = "detail";
  dlg.setAttribute("aria-labelledby", "d-title");
  document.body.appendChild(dlg);

  function caption(c) {
    if (!c) return "";
    if (typeof c === "string") return c;
    return c[lang] || c.ko || c.en || "";
  }

  function renderDetail() {
    var p = project(openId);
    if (!p) { closeDetail(); return; }
    var U = T.ui, X = extra(p.id);
    var isFlag = SITE.flagship === p.id;
    var links = (X.links || []).filter(function (l) { return l && l.url; });
    var images = (X.images || []).filter(function (im) { return im && im.src; });

    var h = '<div class="d-head"><div><div class="kind">' + chips(p, isFlag) + '</div><h3 id="d-title">' + esc(p.name) + '</h3><div class="meta">' + esc(p.period) + "</div>" +
      (links.length ? '<div class="d-links">' + links.map(function (l) {
        return '<a class="btn ghost sm" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label || hostOf(l.url)) + ' <span aria-hidden="true">↗</span></a>';
      }).join("") + "</div>" : "") +
      '</div><button type="button" class="close" id="d-close" aria-label="' + esc(U.close) + '">✕</button></div><div class="d-body">';

    if (images.length) {
      h += '<div class="d-sec"><h4>' + esc(U.s.screens) + '</h4><div class="shots">' + images.map(function (im) {
        var cap = caption(im.caption);
        return '<figure><a href="' + esc(im.src) + '" target="_blank" rel="noopener"><img src="' + esc(im.src) + '" alt="' + esc(cap || p.name) + '" loading="lazy"></a>' +
          (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") + "</figure>";
      }).join("") + "</div></div>";
    }
    if (p.problem || p.solution) {
      h += '<div class="d-sec"><h4>' + esc(U.s.overview) + '</h4><div class="ps">' +
        (p.problem ? "<div><b>" + esc(U.s.problem) + "</b>" + esc(p.problem) + "</div>" : "") +
        (p.solution ? "<div><b>" + esc(U.s.solution) + "</b>" + esc(p.solution) + "</div>" : "") + "</div></div>";
    }
    if ((p.flow && p.flow.length) || (p.arch && p.arch.length) || p.code) {
      h += '<div class="d-sec"><h4>' + esc(U.s.arch) + "</h4>" + flow(p) +
        (p.arch && p.arch.length ? '<ul class="d-list">' + p.arch.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" : "") +
        (p.code ? '<pre class="code" tabindex="0"><code>' + esc(p.code) + "</code></pre>" : "") + "</div>";
    }
    if (p.stack) h += '<div class="d-sec"><h4>' + esc(U.s.stack) + '</h4><p class="stack">' + esc(p.stack) + "</p></div>";
    if (p.issues && p.issues.length) {
      h += '<div class="d-sec"><h4>' + esc(U.s.solving) + "</h4>" + p.issues.map(function (q) {
        return '<div class="ts"><div class="ts-title">' + esc(q.t) + '</div><dl class="ts-grid">' +
          "<dt>" + esc(U.s.p) + "</dt><dd>" + esc(q.p) + "</dd><dt>" + esc(U.s.c) + "</dt><dd>" + esc(q.c) + "</dd>" +
          "<dt>" + esc(U.s.f) + "</dt><dd>" + esc(q.s) + "</dd><dt>" + esc(U.s.r) + "</dt><dd>" + esc(q.r) + "</dd></dl></div>";
      }).join("") + "</div>";
    }
    if (p.next && p.next.length) h += '<div class="d-sec"><h4>' + esc(U.s.limits) + '</h4><ul class="d-list">' + p.next.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div>";
    if (p.learned) h += '<div class="d-sec"><h4>' + esc(U.s.learned) + "</h4><p>" + esc(p.learned) + "</p></div>";
    h += "</div>";
    dlg.innerHTML = h;
  }

  function openDetail(id, fromHash) {
    if (!project(id)) return;
    openId = id;
    renderDetail();
    if (!dlg.open) { try { dlg.showModal(); } catch (e) { dlg.setAttribute("open", ""); } }
    dlg.scrollTop = 0;
    if (!fromHash) setHash(id);
  }
  function closeDetail() {
    openId = null;
    if (dlg.open) dlg.close();
  }
  function setHash(id) {
    try { history.replaceState(null, "", location.pathname + location.search + (id ? "#" + id : "")); } catch (e) {}
  }
  dlg.addEventListener("close", function () { openId = null; setHash(""); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDetail(); });

  /* ---------- language ---------- */
  function loadFont(code) {
    if (!FONTS[code] || document.getElementById("font-" + code)) return;
    var l = document.createElement("link");
    l.id = "font-" + code;
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=" + FONTS[code] + "&display=swap";
    document.head.appendChild(l);
  }

  function applyMeta() {
    var meta = LANGS.filter(function (l) { return l.code === lang; })[0];
    root.lang = meta ? meta.html : lang;
    var name = myName();
    var title = (name ? name + " | " : "") + T.meta.title;
    document.title = title;
    var set = function (sel, v) { var el = document.querySelector(sel); if (el) el.setAttribute("content", v); };
    set('meta[name="description"]', T.meta.description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', T.meta.description);
    var skip = document.querySelector(".skip"); if (skip) skip.textContent = T.ui.skip;
  }

  function setLang(code, quiet) {
    if (!has(code)) return;
    lang = code; T = I18N[code];
    loadFont(code);
    applyMeta();
    render();
    if (!quiet) {
      store("pf-lang", code);
      try {
        var u = new URL(location.href);
        u.searchParams.set("lang", code);
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) {}
    }
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("button");
    if (!t) return;
    var d = t.dataset;
    if (d.open) { openDetail(d.open); return; }
    if (d.lang) { setLang(d.lang); var b = document.querySelector('.langs [data-lang="' + d.lang + '"]'); if (b) b.focus(); return; }
    if (t.id === "d-close") { closeDetail(); return; }
    if (d.copy) {
      var done = function () { t.textContent = T.ui.copied; setTimeout(function () { t.textContent = T.ui.copy; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(d.copy).then(done, function () {});
      return;
    }
  });

  window.addEventListener("hashchange", function () {
    var id = (location.hash || "").slice(1);
    if (project(id)) openDetail(id, true);
    else if (openId) closeDetail();
  });

  /* ---------- boot ---------- */
  if (!T) { app.textContent = "Language files are missing."; return; }
  setLang(lang, true);
  var h0 = (location.hash || "").slice(1);
  if (project(h0)) openDetail(h0, true);
})();
