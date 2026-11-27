/* =========================================================
   리믹스 성수 · LOOK AND ME — 관객 투표 모바일 웹 (11/27)
   해시 주소 한 페이지 · 저장은 이 휴대폰(localStorage)에만
   ========================================================= */
(function () {
  'use strict';

  var D = window.LAM_DATA;
  /* 어느 사이트인지는 페이지가 정함 — index.html = 관람객(티켓 QR), styler.html = 참가자(네임택 QR) */
  var SITE = document.documentElement.getAttribute('data-site') === 'participant' ? 'participant' : 'visitor';
  var KEY = 'lam.v1';
  var BASE_TITLE = 'LOOK AND ME · 리믹스 성수';
  var MADE = ['성수 슈메이커', '성수 가죽 공방', '성수 금속 공방'];
  var MADE_SUB = {
    '성수 슈메이커': '성수동 수제화 공방',
    '성수 가죽 공방': '성수동 가죽 공방',
    '성수 금속 공방': '성수동 금속 공방'
  };
  var SCAN_HINT = '옷에 달린 QR 태그를 네모 안에 맞춰 주세요';

  var view = document.getElementById('view');
  var tabbar = document.getElementById('tabbar');
  var sheetRoot = document.getElementById('sheet-root');

  /* ---------- 저장 ---------- */
  function blank() { return { me: null, scans: {}, tags: {}, votes: [], voted: false }; }
  function load() {
    var s = blank();
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && typeof o === 'object') {
          if (typeof o.me === 'number' && byNo(o.me)) s.me = o.me;
          if (o.scans && typeof o.scans === 'object') s.scans = o.scans;
          if (o.tags && typeof o.tags === 'object') s.tags = o.tags;
          if (Array.isArray(o.votes)) s.votes = o.votes.filter(function (n) { return byNo(n); }).slice(0, 2);
          s.voted = o.voted === true && s.votes.length === 2;
        }
      }
    } catch (e) { /* 저장 못 쓰는 브라우저 — 메모리로만 */ }
    return s;
  }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 무시 */ }
  }

  if (/[?&]reset\b/.test(location.search)) {
    try { window.localStorage.removeItem(KEY); } catch (e) { /* 무시 */ }
    try { history.replaceState(null, '', location.pathname + '#/'); } catch (e) { location.replace(location.pathname + '#/'); }
  }

  var S = load();
  /* 같은 휴대폰에서 참가자 · 관람객 페이지를 같이 열어 두면 서로 덮어쓰지 않게 — 화면마다 저장본을 다시 읽음 */
  var canStore = (function () {
    try { window.localStorage.setItem('lam.t', '1'); window.localStorage.removeItem('lam.t'); return true; } catch (e) { return false; }
  })();
  function refreshState() { if (canStore) S = load(); }

  /* ---------- 데이터 ---------- */
  function byNo(no) {
    for (var i = 0; i < D.stylers.length; i++) if (D.stylers[i].no === no) return D.stylers[i];
    return null;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function itemId(no, k) { return 'S' + pad(no) + '-' + k; }
  function itemById(id) {
    var m = /^S(\d{2})-([1-9])$/.exec(id || '');
    if (!m) return null;
    var st = byNo(Number(m[1]));
    var k = Number(m[2]);
    if (!st || !st.items[k - 1]) return null;
    var it = st.items[k - 1];
    return { id: id, no: st.no, k: k, cat: it.cat, brand: it.brand, name: it.name, material: it.material };
  }
  function itemsOf(no) {
    var saved = S.scans[no];
    if (Array.isArray(saved)) return saved.map(itemById).filter(Boolean);
    if (no === D.demoStyler) return [];
    var st = byNo(no);
    return st ? st.items.map(function (it, i) { return itemById(itemId(no, i + 1)); }) : [];
  }
  function tagsOf(no) {
    var saved = S.tags[no];
    /* 태그 목록이 바뀌어도(11/27) 폰에 남은 옛 태그는 버림 — 안 그러면 새 태그를 못 고름 */
    if (Array.isArray(saved)) return saved.filter(function (t) { return D.moodTags.indexOf(t) >= 0; }).slice(0, 2);
    if (no === D.demoStyler) return [];
    var st = byNo(no);
    return st ? st.tags.slice(0, 2) : [];
  }
  function isRegistered(no) { return itemsOf(no).length >= 1 && tagsOf(no).length === 2; }
  /* 프로필 · 옷 사진이 있는 7명 (참가자 사이트에서는 내 프로필도) */
  function isFull(no) { return (D.fullProfiles || []).indexOf(no) >= 0; }
  function hasProfile(no) { return isFull(no) || (SITE === 'participant' && S.me === no); }
  function materialsOf(no) {
    var out = [];
    itemsOf(no).forEach(function (it) { if (it.material && out.indexOf(it.material) < 0) out.push(it.material); });
    return out;
  }
  function role() { return SITE; }
  function isMade(it) { return MADE.indexOf(it.brand) >= 0; }
  function phCat(cat) {
    if (cat === '신발') return '신발 사진';
    if (cat === '가방') return '가방 사진';
    if (cat === '소품') return '소품 사진';
    return '의류 사진';
  }

  /* ---------- HTML 조각 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(name) { return '<span class="i" data-i="' + name + '"></span>'; }
  /* 사진 두 종류, 섞지 않기 — 참가자 사진(미리 받은 것) = 스타일러 목록 · 프로필 얼굴, 런웨이 사진 = 투표 · 시트 · 완료 · 프로필 '최종 룩' */
  function stylerSrc(no) { return 'assets/img/stylers/styler_' + pad(no) + '.jpg'; }
  function lookSrc(no) { return 'assets/img/looks/look_' + pad(no) + '.jpg'; }
  function itemSrc(id) { return 'assets/img/items/' + id + '.jpg'; }
  /* 사진이 없으면(onerror) 회색 칸으로 바뀜 */
  function img(src, alt, phNo, phText, extra) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async"' +
      ' data-ph-no="' + esc(phNo || '') + '" data-ph-text="' + esc(phText || '') + '"' + (extra || '') + '>';
  }
  function ph(no, text) { return '<span class="ph">' + (no ? '<b>' + esc(no) + '</b>' : '') + esc(text || '') + '</span>'; }
  document.addEventListener('error', function (e) {
    var el = e.target;
    if (!el || el.tagName !== 'IMG' || !el.hasAttribute('data-ph-text')) return;
    var span = document.createElement('span');
    span.innerHTML = ph(el.getAttribute('data-ph-no'), el.getAttribute('data-ph-text'));
    el.replaceWith(span.firstChild);
  }, true);

  function tagLine(tags) { return tags.map(function (t) { return '#' + t; }).join(' '); }
  function tileSub(no) {
    return isRegistered(no)
      ? '<span class="tile-sub">' + esc(tagLine(tagsOf(no))) + '</span>'
      : '<span class="tile-sub is-empty">룩 공개 전</span>';
  }
  function tileName(st) { return '<span class="tile-name"><span class="no">' + pad(st.no) + '</span>' + esc(st.name) + '</span>'; }
  function itemName(it) {
    return '<span class="item-name"><span class="brand">' + esc(it.brand) + '</span><span class="sep"> - </span>' + esc(it.name) + '</span>';
  }
  function itemCell(it, linkToProfile) {
    var inner = '<span class="item-img">' + img(itemSrc(it.id), it.brand + ' - ' + it.name, '', phCat(it.cat)) + '</span>' + itemName(it);
    return '<li>' + (linkToProfile ? '<a href="#/styler/' + pad(it.no) + '">' + inner + '</a>' : inner) + '</li>';
  }
  function navbarLogo() { return '<header class="navbar"><span class="logo" role="img" aria-label="리믹스 성수"></span></header>'; }
  function navbarBack(href, label) {
    return '<header class="navbar"><a class="back" href="' + href + '">' + icon('chevron-left') + esc(label) + '</a></header>';
  }
  function cxsRow() {
    return '<a class="group row" href="' + esc(D.event.creativeUrl) + '" target="_blank" rel="noopener">' +
      '<span class="cxs-mark" aria-hidden="true"></span>' +
      '<span class="row-main"><span class="row-title strong">크리에이티브X성수</span><span class="row-sub">성수의 다양한 문화와 창작을 연결하는 축제를 만나보세요.</span></span>' +
      '<span class="i trail" data-i="arrow-ur"></span></a>';
  }

  /* ---------- 탭 막대 ---------- */
  var TABS = {
    participant: [['home', '#/home', 'home', '홈'], ['stylers', '#/stylers', 'stylers', '스타일러'], ['scan', '#/scan', 'scan', '옷 스캔하기']],
    visitor: [['home', '#/home', 'home', '홈'], ['stylers', '#/stylers', 'stylers', '스타일러'], ['info', '#/info', 'info', '정보'], ['vote', '#/vote', 'heart', '투표']]
  };
  function renderTabbar(current) {
    if (!current) { tabbar.hidden = true; tabbar.innerHTML = ''; view.classList.remove('has-tabbar'); return; }
    tabbar.innerHTML = TABS[role()].map(function (t) {
      return '<a class="tab" href="' + t[1] + '"' + (t[0] === current ? ' aria-current="page"' : '') + '>' + icon(t[2]) + t[3] + '</a>';
    }).join('');
    tabbar.hidden = false;
    view.classList.add('has-tabbar');
  }

  /* ---------- 화면 ---------- */
  function screenStart() {
    return {
      title: '',
      html: navbarLogo() +
        '<figure class="cover"><img src="assets/img/hero-venue.jpg" alt="LOOK AND ME 런웨이 무대"></figure>' +
        '<div class="page-head"><h1>스타일을<br>새롭게 잇다.</h1><p class="intro">〈LOOK AND ME〉 런웨이의<br>관객 심사위원으로 초대합니다</p></div>' +
        '<div class="actions"><a class="btn btn-filled" href="#/home">입장하기</a></div>'
    };
  }

  function screenCode() {
    return {
      title: '참가자 입장',
      html: navbarLogo() +
        '<div class="page-head"><h1>LOOK AT MY LOOK</h1><p class="lead">참가자에게 사전 부여된 개인 코드번호를 입력하면 스타일러 관리 화면으로 이동합니다.</p></div>' +
        '<form class="form" id="code-form" novalidate>' +
          '<label class="field-label" for="code">사전 부여 개인 코드번호</label>' +
          '<input class="field" id="code" placeholder="예: STYLER01" autocomplete="off" autocapitalize="characters" spellcheck="false" enterkeyhint="go" aria-describedby="code-error">' +
          '<p class="field-error" id="code-error" aria-live="polite"></p>' +
        '</form>' +
        '<div class="actions" style="margin-top: 12px">' +
          '<button class="btn btn-filled" type="submit" form="code-form" id="code-go" disabled>참가자 모드로 입장하기</button>' +
        '</div>',
      after: function () {
        var input = document.getElementById('code');
        var go = document.getElementById('code-go');
        var err = document.getElementById('code-error');
        input.addEventListener('input', function () { go.disabled = !input.value.trim(); err.textContent = ''; });
        document.getElementById('code-form').addEventListener('submit', function (e) {
          e.preventDefault();
          var m = /^STYLER(\d{1,2})$/i.exec(input.value.trim());
          var no = m ? Number(m[1]) : 0;
          if (!m || !byNo(no) || (m[1].length === 1)) { err.textContent = '코드번호를 다시 확인해 주세요. 예: STYLER01'; input.focus(); return; }
          S.me = no; save();
          go_('#/home');
        });
      }
    };
  }

  function screenHome() {
    var visitor = role() === 'visitor';
    var steps = visitor
      ? '<h2 class="section-title">참여 방법</h2><ol class="steps">' +
          '<li><span class="step-no">01</span><b class="step-title">둘러보기</b><p class="step-text">30명의 스타일러와 각자의 취향을 확인해요.</p></li>' +
          '<li><span class="step-no">02</span><b class="step-title">룩 확인</b><p class="step-text">QR로 등록된 옷이 스타일러 프로필에 바로 떠요.</p></li>' +
          '<li><span class="step-no">03</span><b class="step-title">투표하기</b><p class="step-text">마음에 드는 최종 룩 두 개를 골라요.</p></li></ol>'
      : '<h2 class="section-title">스캔 방법</h2><ol class="steps">' +
          '<li><span class="step-no">01</span><b class="step-title">QR 스캔하기</b><p class="step-text">QR 코드를 스캔하고 리믹스 성수 플랫폼에 접속해 보세요. 프로그램 안내와 참여 방법을 확인할 수 있어요.</p></li>' +
          '<li><span class="step-no">02</span><b class="step-title">나의 룩 확인하기</b><p class="step-text">참가자 프로필에서 나의 스타일링과 최종 코디를 확인해 보세요. 완성된 룩과 함께 나만의 스타일을 소개할 수 있어요.</p></li></ol>';
    return {
      title: '',
      tab: 'home',
      html:
        '<div class="home-top"><p class="kicker">CREATIVE X SEONGSU</p><span class="logo logo-lg" role="img" aria-label="리믹스 성수"></span></div>' +
        '<div class="hero hero-a">' +
          '<img src="assets/img/backstage-rack.jpg" alt="">' +
          '<div class="hero-body">' +
            '<span class="kicker">PICK IT, MIX IT, LINK IT</span>' +
            '<span class="hero-title">REMIX YOURSELF.</span>' +
            '<span class="hero-sub">오늘의 나를 가장 잘 표현하는 한 벌.<br>성수의 과거와 현재를 조합해 새로움을 만들어보세요</span>' +
            (SITE === 'participant'
              ? '<a class="btn btn-white btn-sm" href="#/scan">옷 스캔하기</a>'
              : '<a class="btn btn-white btn-sm" href="#/stylers">스타일러 30명 만나기</a>') +
          '</div>' +
        '</div>' +
        '<section class="section"><h2 class="section-title">TRACK 1. 〈LOOK AND ME〉는?</h2>' +
          '<p class="text">LOOK AND ME는 성수의 과거와 현재가 리믹스되는 ‘오픈 백스테이지’에서 참가자 30명이 제한시간 안에 자신만의 룩을 완성하는 참여형 패션 콘테스트입니다. 참가자는 완성한 룩을 입고 직접 런웨이에 오르며, 관람객은 스타일링 과정부터 런웨이까지 지켜보고 가장 입고 싶은 룩에 투표합니다.</p></section>' +
        '<section class="section">' + steps + '</section>' +
        '<section class="section"><h2 class="section-title">더 넓은 성수의 창작을 만나기</h2>' + cxsRow() + '</section>'
    };
  }

  /* 프로필이 있는 사람만 누를 수 있는 칸, 나머지는 사진 · 이름만 */
  function tileWrap(st, inner) {
    return hasProfile(st.no)
      ? '<a class="tile" href="#/styler/' + pad(st.no) + '">' + inner + '</a>'
      : '<div class="tile is-static">' + inner + '</div>';
  }
  function stylerTile(st) {
    return tileWrap(st, '<span class="tile-img">' +
      img(stylerSrc(st.no), st.name, pad(st.no), '참가자 사진') + '</span>' + tileName(st) + tileSub(st.no));
  }
  function screenStylers() {
    return {
      title: '스타일러',
      tab: 'stylers',
      html: navbarLogo() +
        '<div class="page-head"><h1>Meet the STYLERS.</h1><p class="lead">프로필을 누르면 참가자가 고른 옷과 최종 룩을 볼 수 있어요.</p></div>' +
        '<label class="search">' + icon('search') + '<input type="search" id="q" placeholder="이름 또는 해시태그 검색" aria-label="스타일러 검색" autocomplete="off" enterkeyhint="search"></label>' +
        '<p class="meta" id="q-meta" aria-live="polite">전체 30명</p>' +
        '<div id="q-list"></div>',
      after: function () {
        var q = document.getElementById('q');
        var meta = document.getElementById('q-meta');
        var list = document.getElementById('q-list');
        function draw() {
          var term = q.value.trim().replace(/^#+/, '').toLowerCase();
          var shown = D.stylers.filter(function (st) {
            if (!term) return true;
            if (st.name.toLowerCase().indexOf(term) >= 0) return true;
            return tagsOf(st.no).some(function (t) { return t.toLowerCase().indexOf(term) >= 0; });
          });
          meta.textContent = term ? shown.length + '명' : '전체 ' + D.stylers.length + '명';
          list.innerHTML = shown.length
            ? '<div class="grid">' + shown.map(stylerTile).join('') + '</div>'
            : '<p class="note" style="padding: 0 var(--margin)">찾는 스타일러가 없어요.</p>';
        }
        q.addEventListener('input', draw);
        q.addEventListener('keydown', function (e) { if (e.key === 'Enter') q.blur(); });
        draw();
      }
    };
  }

  function screenProfile(no) {
    var st = byNo(no);
    var items = itemsOf(no);
    var reg = isRegistered(no);
    var tags = tagsOf(no).map(function (t) { return '#' + t; })
      .concat(materialsOf(no).slice(0, 2).map(function (t) { return '#' + t; }));
    var face = Array.isArray(st.face) ? st.face : [50, 18, 1.8];
    var faceStyle = ' style="--fx:' + Number(face[0]) + '%;--fy:' + Number(face[1]) + '%;--fs:' + Number(face[2]) + '"';
    var buttons = '';
    if (role() === 'visitor') {
      buttons = '<div class="actions">' +
        (reg ? '<button class="btn btn-filled" type="button" data-act="vote-for" data-no="' + no + '">이 룩에 투표하기</button>' : '') +
        '<a class="btn btn-gray" href="#/info">사용된 제품 정보 보기</a></div>';
    } else if (S.me === no) {
      buttons = '<div class="actions"><a class="btn btn-filled" href="#/scan">옷 스캔하기</a></div>';
    }
    return {
      title: st.name,
      tab: 'stylers',
      html: navbarBack('#/stylers', '스타일러') +
        '<div class="profile-head">' +
          '<span class="avatar">' + img(stylerSrc(no), st.name + ' 얼굴', pad(no), '', faceStyle) + '</span>' +
          '<div><p class="no">No. ' + pad(no) + '</p><h1>' + esc(st.name) + '</h1>' +
          '<a class="insta" href="https://www.instagram.com/' + encodeURIComponent(st.insta) + '/" target="_blank" rel="noopener">' + icon('instagram') + '@' + esc(st.insta) + '</a></div>' +
        '</div>' +
        (tags.length ? '<p class="tags profile-tags">' + tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</p>' : '') +
        '<section class="section" style="margin-top: 28px"><h2 class="section-title">최종 룩</h2>' +
          '<figure class="look-photo">' + (reg ? img(lookSrc(no), st.name + '의 최종 룩', pad(no), '최종 룩 사진') : ph('', '룩 공개 전')) + '</figure></section>' +
        '<section class="section"><h2 class="section-title">고른 옷 <span class="count">' + items.length + '</span></h2>' +
          (items.length ? '<ul class="items">' + items.map(function (it) { return itemCell(it, false); }).join('') + '</ul>'
                        : '<p class="note">아직 고른 옷이 없어요.</p>') +
        '</section>' + buttons
    };
  }

  /* ---------- 옷 스캔 ---------- */
  var cam = { stream: null, timer: null, video: null, canvas: null, last: '', lastAt: 0, hintTimer: null };

  function scanRows() {
    var items = itemsOf(S.me);
    return '<h2 class="section-title">스캔한 옷 정보 <span class="count">' + items.length + '</span></h2>' +
      (items.length
        ? '<ul class="list">' + items.map(function (it) {
            return '<li class="row has-thumb"><span class="thumb">' + img(itemSrc(it.id), it.brand + ' - ' + it.name, '', phCat(it.cat)) + '</span>' +
              '<span class="row-main"><span class="row-title">' + esc(it.brand + ' - ' + it.name) + '</span>' +
              '<span class="row-sub">' + esc(it.cat + ' · #' + it.material) + '</span></span>' +
              '<button class="row-action danger" type="button" data-act="remove" data-id="' + esc(it.id) + '" aria-label="' + esc(it.name + ' 빼기') + '">빼기</button></li>';
          }).join('') + '</ul>'
        : '<p class="note">옷에 달린 QR을 찍으면 여기에 떠요.</p>');
  }
  function chipsHtml() {
    var mine = tagsOf(S.me);
    return D.moodTags.map(function (t) {
      return '<button class="chip" type="button" data-tag="' + esc(t) + '" aria-pressed="' + (mine.indexOf(t) >= 0) + '">#' + esc(t) + '</button>';
    }).join('');
  }
  function screenScan() {
    return {
      title: '옷 스캔하기',
      tab: 'scan',
      html: navbarLogo() +
        '<div class="page-head"><h1>옷을 스캔해<br>룩을 등록해요.</h1></div>' +
        '<div class="scanner">' +
          '<div class="viewfinder" id="vf">' +
            '<span class="corners" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 26V12C2 6.5 6.5 2 12 2h14M74 2h14c5.5 0 10 4.5 10 10v14M98 74v14c0 5.5-4.5 10-10 10H74M26 98H12c-5.5 0-10-4.5-10-10V74"/></svg></span>' +
            '<p class="hint" id="hint" aria-live="polite">' + SCAN_HINT + '</p>' +
          '</div>' +
          '<button class="btn btn-filled" type="button" id="cam-btn" data-act="camera" aria-pressed="false">' + icon('camera') + '<span>카메라 켜기</span></button>' +
        '</div>' +
        '<section class="section" id="scan-list">' + scanRows() + '</section>' +
        '<section class="section"><h2 class="section-title">내 룩을 설명하는 해시태그</h2>' +
          '<p class="note">두 개를 골라 주세요. 고른 해시태그가 내 룩의 이름이 돼요.</p>' +
          '<div class="chips" id="chips" role="group" aria-label="내 룩 해시태그, 두 개까지">' + chipsHtml() + '</div></section>' +
        '<div class="actions"><a class="btn btn-gray" href="#/styler/' + pad(S.me) + '">내 프로필에서 확인하기</a></div>'
    };
  }
  function refreshScanList() {
    var box = document.getElementById('scan-list');
    if (box) { box.innerHTML = scanRows(); LAM_hydrateIcons(box); }
  }
  function setHint(text, ms) {
    var h = document.getElementById('hint');
    if (!h) return;
    clearTimeout(cam.hintTimer);
    h.textContent = text;
    if (ms) cam.hintTimer = setTimeout(function () { var x = document.getElementById('hint'); if (x) x.textContent = SCAN_HINT; }, ms);
  }
  function josa(word) {
    var c = word.charCodeAt(word.length - 1);
    if (c < 0xAC00 || c > 0xD7A3) return '을';
    return (c - 0xAC00) % 28 ? '을' : '를';
  }
  function myItemIds() { return itemsOf(S.me).map(function (it) { return it.id; }); }
  function handleCode(text) {
    var m = /^LOOKANDME:(S\d{2}-\d)$/.exec(String(text || '').trim());
    var it = m && itemById(m[1]);
    if (!it) { setHint('룩앤미 옷 QR이 아니에요', 2000); return 'other'; }
    var ids = myItemIds();
    if (ids.indexOf(it.id) >= 0) { setHint('이미 추가한 옷이에요', 2000); return 'dup'; }
    ids.push(it.id);
    S.scans[S.me] = ids; save();
    if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) { try { navigator.vibrate(40); } catch (e) { /* 무시 */ } }
    setHint(it.name + josa(it.name) + ' 추가했어요', 2000);
    refreshScanList();
    return 'added';
  }
  function camButton(on) {
    var b = document.getElementById('cam-btn');
    if (!b) return;
    b.setAttribute('aria-pressed', String(on));
    b.querySelector('span:last-child').textContent = on ? '카메라 끄기' : '카메라 켜기';
  }
  function stopCamera() {
    clearInterval(cam.timer); cam.timer = null;
    if (cam.stream) cam.stream.getTracks().forEach(function (t) { t.stop(); });
    cam.stream = null;
    if (cam.video) { cam.video.srcObject = null; cam.video.remove(); cam.video = null; }
    var vf = document.getElementById('vf');
    if (vf) vf.classList.remove('is-live');
    camButton(false);
  }
  function cameraFail() { stopCamera(); setHint('카메라를 켤 수 없어요. 브라우저에서 카메라를 허용해 주세요.'); }
  function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof window.jsQR !== 'function') { cameraFail(); return; }
    var token = routeToken;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false }).then(function (stream) {
      var vf = document.getElementById('vf');
      if (token !== routeToken || !vf) { stream.getTracks().forEach(function (t) { t.stop(); }); return; }
      cam.stream = stream;
      var v = document.createElement('video');
      v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
      v.muted = true; v.playsInline = true; v.srcObject = stream;
      vf.insertBefore(v, vf.firstChild);
      cam.video = v;
      var p = v.play(); if (p && p.catch) p.catch(function () { /* 자동 재생 막힘 — 다음 틱에서 다시 */ });
      vf.classList.add('is-live');
      camButton(true);
      setHint(SCAN_HINT);
      cam.canvas = cam.canvas || document.createElement('canvas');
      cam.timer = setInterval(scanTick, 125);
    }).catch(cameraFail);
  }
  function scanTick() {
    var v = cam.video;
    if (!v || v.readyState < 2 || !v.videoWidth) return;
    var scale = Math.min(1, 640 / Math.max(v.videoWidth, v.videoHeight));
    var w = Math.round(v.videoWidth * scale), h = Math.round(v.videoHeight * scale);
    var c = cam.canvas;
    if (c.width !== w) c.width = w;
    if (c.height !== h) c.height = h;
    var ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(v, 0, 0, w, h);
    var code;
    try { code = window.jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: 'dontInvert' }); } catch (e) { return; }
    if (!code || !code.data) return;
    var now = Date.now();
    if (code.data === cam.last && now - cam.lastAt < 2500) return; /* 같은 QR을 계속 비추고 있을 때 */
    cam.last = code.data; cam.lastAt = now;
    handleCode(code.data);
  }

  /* ---------- 정보 ---------- */
  function screenInfo() {
    var all = [];
    D.stylers.forEach(function (st) { if (isFull(st.no) && isRegistered(st.no)) all = all.concat(itemsOf(st.no)); });
    var wear = all.filter(function (it) { return !isMade(it); });
    var made = all.filter(isMade);
    function more(list, id) { return list.length > 9 ? '<div class="more"><button class="btn btn-gray btn-sm" type="button" data-act="more" data-target="' + id + '" aria-controls="' + id + '">더 보기</button></div>' : ''; }
    function hide(i) { return i >= 9 ? ' hidden' : ''; }
    var wearHtml = '<ul class="items" id="wear">' + wear.map(function (it, i) {
      return itemCell(it, true).replace('<li>', '<li' + hide(i) + '>');
    }).join('') + '</ul>' + more(wear, 'wear');
    var madeHtml = '<div class="group" id="made">' + made.map(function (it, i) {
      return '<a class="row has-thumb" href="#/styler/' + pad(it.no) + '"' + hide(i) + '><span class="thumb">' + img(itemSrc(it.id), it.brand + ' - ' + it.name, '', phCat(it.cat)) + '</span>' +
        '<span class="row-main"><span class="row-title">' + esc(it.brand + ' - ' + it.name) + '</span><span class="row-sub">' + esc(MADE_SUB[it.brand] + ' · ' + pad(it.no) + ' ' + (byNo(it.no) || {}).name + ' 착용') + '</span></span>' +
        '<span class="i chev" data-i="chevron-right"></span></a>';
    }).join('') + '</div>' + more(made, 'made');
    return {
      title: '정보',
      tab: 'info',
      html: navbarLogo() +
        '<div class="page-head"><h1>룩을 만든<br>아이템들.</h1><p class="lead">리믹스 성수 스타일링에 사용된 의류와 성수메이드 소품을 확인해보세요.</p></div>' +
        '<section class="section" style="margin-top: 28px"><h2 class="section-title">스타일링 의류</h2>' + wearHtml + '</section>' +
        '<section class="section"><h2 class="section-title">성수메이드 소품</h2>' + madeHtml + '</section>' +
        '<section class="section"><h2 class="section-title">크리에이티브X성수</h2>' + cxsRow() + '</section>'
    };
  }

  /* ---------- 투표 ---------- */
  function voteStatus() {
    var n = S.votes.length;
    var text = S.voted ? '투표를 마쳤어요' : (2 - n) + '표 남았어요';
    return '<span class="vote-bars" aria-hidden="true"><i' + (n >= 1 ? ' class="on"' : '') + '></i><i' + (n >= 2 ? ' class="on"' : '') + '></i></span>' + text;
  }
  function voteTile(st) {
    var picked = S.votes.indexOf(st.no) >= 0;
    return '<button class="tile' + (picked ? ' is-picked' : '') + '" type="button" data-act="sheet" data-no="' + st.no + '" aria-label="' + esc(pad(st.no) + ' ' + st.name + (picked ? ', 고른 룩' : '')) + '">' +
      '<span class="tile-img">' + img(lookSrc(st.no), '', pad(st.no), '최종 룩 사진') +
      '<span class="pick">' + icon('check') + '</span></span>' + tileName(st) + tileSub(st.no) + '</button>';
  }
  function screenVote() {
    return {
      title: '투표',
      tab: 'vote',
      html: navbarLogo() +
        '<div class="page-head"><h1>어떤 룩이<br>마음에 드나요?</h1><p class="lead">마음에 드는 룩을 꼭 두 개 골라 주세요. 사진을 누르면 투표 버튼이 나와요.</p></div>' +
        '<div class="vote-status" id="vote-status" aria-live="polite">' + voteStatus() + '</div>' +
        '<div class="grid" id="vote-grid">' + D.stylers.map(voteTile).join('') + '</div>'
    };
  }
  function refreshVote() {
    var s = document.getElementById('vote-status');
    var g = document.getElementById('vote-grid');
    if (s) s.innerHTML = voteStatus();
    if (g) { g.innerHTML = D.stylers.map(voteTile).join(''); LAM_hydrateIcons(g); }
  }

  /* ---------- 시트 ---------- */
  var sheet = { open: false, prevFocus: null, closeTimer: null };
  function reducedMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function openSheet(no) {
    var st = byNo(no);
    if (!st) return;
    closeSheet(true);
    var picked = S.votes.indexOf(no) >= 0;
    var reg = isRegistered(no);
    var btns;
    if (S.voted) btns = '<button class="btn btn-plain" type="button" data-act="sheet-close">닫기</button>';
    else if (picked) btns = '<button class="btn btn-gray" type="button" data-act="unvote" data-no="' + no + '">선택 취소</button><button class="btn btn-plain" type="button" data-act="sheet-close">닫기</button>';
    else if (reg) btns = '<button class="btn btn-filled" type="button" data-act="vote" data-no="' + no + '">이 룩에 투표하기</button><button class="btn btn-plain" type="button" data-act="sheet-close">닫기</button>';
    else btns = '<button class="btn btn-plain" type="button" data-act="sheet-close">닫기</button>';
    var tags = reg ? tagsOf(no).map(function (t) { return '<span>#' + esc(t) + '</span>'; }).join('') : '<span>룩 공개 전</span>';
    sheetRoot.innerHTML =
      '<div class="sheet-backdrop" data-act="sheet-close"></div>' +
      '<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-name" tabindex="-1">' +
        '<span class="grabber" aria-hidden="true"></span>' +
        '<div class="sheet-img">' + (reg ? img(lookSrc(no), st.name + '의 최종 룩', pad(no), '최종 룩 사진').replace(' loading="lazy"', '') : ph(pad(no), '최종 룩 사진')) + '</div>' +
        '<div class="sheet-info"><p class="no">' + pad(no) + '</p><h2 id="sheet-name">' + esc(st.name) + '</h2><p class="tags">' + tags + '</p></div>' +
        '<div class="actions">' + btns + '</div>' +
      '</div>';
    sheet.open = true;
    sheet.prevFocus = document.activeElement;
    document.body.classList.add('is-locked');
    view.setAttribute('aria-hidden', 'true');
    tabbar.setAttribute('aria-hidden', 'true');
    void sheetRoot.offsetHeight;
    sheetRoot.classList.add('is-open');
    var first = sheetRoot.querySelector('.sheet .btn');
    (first || sheetRoot.querySelector('.sheet')).focus({ preventScroll: true });
  }
  function closeSheet(instant) {
    if (!sheet.open) return;
    sheet.open = false;
    clearTimeout(sheet.closeTimer);
    sheetRoot.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    view.removeAttribute('aria-hidden');
    tabbar.removeAttribute('aria-hidden');
    var prev = sheet.prevFocus;
    var prevNo = prev && prev.getAttribute && prev.getAttribute('data-no');
    if (instant || reducedMotion()) sheetRoot.innerHTML = '';
    else sheet.closeTimer = setTimeout(function () { if (!sheet.open) sheetRoot.innerHTML = ''; }, 320);
    if (!instant) {
      /* 투표 칸을 다시 그렸으면 같은 번호 칸으로 */
      var target = prev && document.contains(prev) ? prev
        : (prevNo ? document.querySelector('#vote-grid [data-no="' + prevNo + '"]') : null);
      if (target) target.focus({ preventScroll: true });
    }
  }
  document.addEventListener('keydown', function (e) {
    if (!sheet.open) return;
    if (e.key === 'Escape') { e.preventDefault(); closeSheet(); return; }
    if (e.key === 'Tab') {
      var f = sheetRoot.querySelectorAll('.sheet button');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || !sheetRoot.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- 투표 완료 ---------- */
  function pickProgram(tags) {
    var best = null, bestHits = -1;
    D.programs.forEach(function (p) {
      var hits = tags.filter(function (t) { return p.tags.indexOf(t) >= 0; }).length;
      if (hits > bestHits) { best = p; bestHits = hits; }
    });
    var matched = [];
    tags.forEach(function (t) { if (best.tags.indexOf(t) >= 0 && matched.indexOf(t) < 0) matched.push(t); });
    if (!matched.length) matched = tags.slice(0, 2);
    return { program: best, tags: matched.slice(0, 2) };
  }
  function screenDone() {
    var looks = S.votes.map(byNo).filter(Boolean);
    var allTags = [];
    looks.forEach(function (st) { allTags = allTags.concat(tagsOf(st.no)); });
    var m = pickProgram(allTags);
    var p = m.program;
    return {
      title: '투표 완료',
      tab: 'vote',
      html: navbarLogo() +
        '<span class="done-mark">' + icon('check') + '</span>' +
        '<div class="page-head"><h1>투표가 완료됐어요!</h1><p class="lead">' + esc(looks.map(function (st) { return st.name; }).join(', ')) + ' 님의 룩을 골랐어요. 참여해 주셔서 감사합니다.</p></div>' +
        '<section class="section" style="margin-top: 32px"><h2 class="section-title">내가 고른 룩</h2><div class="grid">' +
          looks.map(function (st) {
            return tileWrap(st, '<span class="tile-img">' + img(lookSrc(st.no), st.name + '의 최종 룩', pad(st.no), '최종 룩 사진') + '</span>' + tileName(st) + tileSub(st.no));
          }).join('') + '</div></section>' +
        /* 옷 사진이 있는 룩만 (없으면 이 칸 전체를 뺌) */
        (looks.some(function (st) { return isFull(st.no); })
          ? '<section class="section"><h2 class="section-title">룩에 사용된 아이템</h2>' +
            looks.filter(function (st) { return isFull(st.no); }).map(function (st) {
              return '<p class="strip-head"><span class="no">' + pad(st.no) + '</span>' + esc(st.name) + '</p>' +
                '<ul class="strip">' + itemsOf(st.no).map(function (it) { return itemCell(it, false); }).join('') + '</ul>';
            }).join('') + '</section>'
          : '') +
        '<section class="section"><h2 class="section-title">' + esc(tagLine(m.tags)) + ' 룩에 어울리는 축제 더 알아보기</h2>' +
          '<div class="group">' +
            '<div class="row"><span class="row-main"><span class="row-sub">이어서 즐기는 크리에이티브X성수</span><span class="row-title strong">' + esc(p.title) + '</span></span></div>' +
            '<div class="row kv"><span>일시</span><span>' + esc(p.when) + '</span></div>' +
            '<div class="row kv"><span>장소</span><span>' + esc(p.where) + '</span></div>' +
            '<div class="row kv"><span>참여 방법</span><span>' + esc(p.how) + '</span></div>' +
            '<a class="row row-link" href="' + esc(D.event.creativeUrl) + '" target="_blank" rel="noopener"><span class="row-title">프로그램 자세히 보기</span><span class="i trail" data-i="arrow-ur"></span></a>' +
          '</div></section>' +
        '<div class="actions"><a class="btn btn-gray" href="#/vote">투표 화면으로 돌아가기</a></div>'
    };
  }

  /* ---------- 길 찾기 ---------- */
  var routeToken = 0;
  var pendingSheet = null;
  function go_(hash) { if (location.hash === hash) render(); else location.hash = hash; }

  function render(keepScroll) {
    routeToken++;
    refreshState();
    stopCamera();
    closeSheet(true);
    var h = location.hash.replace(/^#/, '') || '/';
    var scr, m;
    var P = SITE === 'participant';
    if (h === '/') {
      if (P && S.me) { location.replace('#/home'); return; }
      scr = P ? screenCode() : screenStart();
    }
    else if (P && !S.me) { location.replace('#/'); return; }
    else if (h === '/home') scr = screenHome();
    else if (h === '/stylers') scr = screenStylers();
    else if ((m = /^\/styler\/(\d{1,2})$/.exec(h))) {
      if (!byNo(Number(m[1])) || !hasProfile(Number(m[1]))) { location.replace('#/stylers'); return; }
      scr = screenProfile(Number(m[1]));
    }
    else if (h === '/code' || h === '/scan' || h === '/info' || h === '/vote' || h === '/done') {
      /* 다른 사이트의 화면 → 이 사이트 홈 */
      if (P ? h !== '/scan' : h !== '/info' && h !== '/vote' && h !== '/done') { location.replace('#/home'); return; }
      if (h === '/scan') scr = screenScan();
      else if (h === '/info') scr = screenInfo();
      else if (h === '/done' && !S.voted) { location.replace('#/vote'); return; }
      else scr = h === '/vote' ? screenVote() : screenDone();
    }
    else { location.replace('#/'); return; }

    view.innerHTML = scr.html;
    renderTabbar(scr.tab || null);
    LAM_hydrateIcons(view);
    LAM_hydrateIcons(tabbar);
    document.title = scr.title ? scr.title + ' · ' + BASE_TITLE : BASE_TITLE;
    var y = window.scrollY;
    window.scrollTo(0, keepScroll === true ? y : 0);
    onScroll();
    if (scr.after) scr.after();
    if (pendingSheet && h === '/vote') { var n = pendingSheet; pendingSheet = null; openSheet(n); }
    pendingSheet = null;
  }

  /* ---------- 누르기 ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act], [data-tag]');
    if (!el) return;
    if (el.hasAttribute('data-tag')) { toggleTag(el); return; }
    var act = el.getAttribute('data-act');
    var no = Number(el.getAttribute('data-no'));
    if (act === 'camera') { if (cam.stream) stopCamera(); else startCamera(); }
    else if (act === 'remove') {
      var id = el.getAttribute('data-id');
      S.scans[S.me] = myItemIds().filter(function (x) { return x !== id; }); save();
      refreshScanList();
    }
    else if (act === 'more') {
      var box = document.getElementById(el.getAttribute('data-target'));
      if (box) box.querySelectorAll('[hidden]').forEach(function (x) { x.hidden = false; });
      el.closest('.more').remove();
    }
    else if (act === 'vote-for') { pendingSheet = no; go_('#/vote'); }
    else if (act === 'sheet') openSheet(no);
    else if (act === 'sheet-close') closeSheet();
    else if (act === 'vote') {
      if (S.voted || S.votes.indexOf(no) >= 0 || S.votes.length >= 2) return;
      S.votes.push(no);
      if (S.votes.length === 2) { S.voted = true; save(); closeSheet(true); go_('#/done'); return; }
      save(); refreshVote(); closeSheet();
    }
    else if (act === 'unvote') {
      if (S.voted) return;
      S.votes = S.votes.filter(function (x) { return x !== no; }); save();
      refreshVote(); closeSheet();
    }
  });
  function toggleTag(chip) {
    if (!S.me) return;
    var t = chip.getAttribute('data-tag');
    var mine = tagsOf(S.me);
    var i = mine.indexOf(t);
    if (i >= 0) mine.splice(i, 1);
    else if (mine.length < 2) mine.push(t);
    else return;
    S.tags[S.me] = mine; save();
    document.querySelectorAll('#chips .chip').forEach(function (c) {
      c.setAttribute('aria-pressed', String(mine.indexOf(c.getAttribute('data-tag')) >= 0));
    });
  }

  function onScroll() {
    var bar = view.querySelector('.navbar');
    if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', function () { render(); });
  var stale = false;
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY && e.key !== null) return;
    if (document.hidden || sheet.open || cam.stream) { stale = true; refreshState(); return; }
    render(true);
  });
  window.addEventListener('pagehide', stopCamera);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stopCamera(); return; }
    if (stale && !sheet.open) { stale = false; render(true); }
  });

  render();
})();
