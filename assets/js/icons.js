/* =========================================================
   리믹스 성수 · LOOK AND ME — 아이콘
   24px 칸 · 선 굵기 1.8 · 끝 둥글게. 색은 글자색(currentColor)을 따라갑니다.
   v3의 글자 기호(⌂ ♧ ▦ ⓘ ♡ ✳ ↗)를 대신합니다 — 아이폰에서 이모지로 바뀌는 문제도 같이 해결. 아이콘은 탭 막대 · 화살표 같은 기능에만 씁니다.
   쓰는 법: <span data-i="home"></span> → LAM_hydrateIcons() 가 그림을 채움
   ========================================================= */
(function (w) {
  var I = {
    /* 탭 바 */
    home: '<path d="M3.5 10.4 12 3.6l8.5 6.8"/><path d="M5.6 8.9v9.6c0 1 .8 1.9 1.9 1.9h3v-5.6h3v5.6h3c1.1 0 1.9-.9 1.9-1.9V8.9"/>',
    stylers: '<circle cx="9" cy="8.3" r="3.4"/><path d="M2.9 20.2c.5-3.4 3-5.8 6.1-5.8s5.6 2.4 6.1 5.8"/><path d="M15.4 5.1a3.4 3.4 0 0 1 0 6.4"/><path d="M17.7 14.8c1.9.8 3.2 2.7 3.4 5.4"/>',
    scan: '<path d="M4 8.6V5.8C4 4.8 4.8 4 5.8 4h2.8M15.4 4h2.8c1 0 1.8.8 1.8 1.8v2.8M20 15.4v2.8c0 1-.8 1.8-1.8 1.8h-2.8M8.6 20H5.8c-1 0-1.8-.8-1.8-1.8v-2.8"/><rect x="8.3" y="8.3" width="2.9" height="2.9" rx=".6"/><rect x="12.8" y="8.3" width="2.9" height="2.9" rx=".6"/><rect x="8.3" y="12.8" width="2.9" height="2.9" rx=".6"/><path d="M12.8 12.8h2.9v2.9"/>',
    info: '<circle cx="12" cy="12" r="8.8"/><path d="M12 11.1v5"/><path d="M12 7.8v.1"/>',
    heart: '<path d="M12 20.1c-4.8-3.2-8.4-6.5-8.4-10.4A4.3 4.3 0 0 1 7.9 5.3c1.7 0 3.2.9 4.1 2.3.9-1.4 2.4-2.3 4.1-2.3a4.3 4.3 0 0 1 4.3 4.4c0 3.9-3.6 7.2-8.4 10.4z"/>',

    /* 이동 · 상태 */
    'arrow-ur': '<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>',
    'arrow-left': '<path d="M19 12H5.5"/><path d="m11 5.8-6.2 6.2 6.2 6.2"/>',
    'chevron-right': '<path d="m9.5 5.8 6.2 6.2-6.2 6.2"/>',
    'chevron-left': '<path d="M15 5.2 8.2 12l6.8 6.8"/>',
    check: '<path d="m5 12.6 4.4 4.4L19 7.4"/>',
    close: '<path d="m6.5 6.5 11 11M17.5 6.5l-11 11"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',

    /* 기능 */
    search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.4 15.4 4.6 4.6"/>',
    camera: '<path d="M4 9c0-1 .8-1.8 1.8-1.8h2l1.6-2.2h5.2l1.6 2.2h2c1 0 1.8.8 1.8 1.8v8.2c0 1-.8 1.8-1.8 1.8H5.8c-1 0-1.8-.8-1.8-1.8z"/><circle cx="12" cy="12.9" r="3.4"/>',
    hash: '<path d="M5 9h14.5M4.5 15H19M10.2 4.5 8.4 19.5M15.6 4.5l-1.8 15"/>',
    instagram: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5"/><circle cx="12" cy="12" r="3.9"/><path d="M17.1 6.9v.1"/>',
    spark: '<path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6 6 18"/>',
    hanger: '<path d="M9.9 6.1a2.1 2.1 0 1 1 2.1 2.1v1.1"/><path d="M12 9.3 3.6 15.4c-.9.7-.4 2 .7 2h15.4c1.1 0 1.6-1.3.7-2z"/>',
    pin: '<path d="M12 20.8s-6.3-5.5-6.3-10.6a6.3 6.3 0 0 1 12.6 0c0 5.1-6.3 10.6-6.3 10.6z"/><circle cx="12" cy="10.2" r="2.3"/>',
    clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.6V12l2.9 1.9"/>',
    ticket: '<path d="M3.6 7.4h16.8v3a1.8 1.8 0 0 0 0 3.2v3H3.6v-3a1.8 1.8 0 0 0 0-3.2z"/><path d="M14.4 7.6v1.4M14.4 11.3v1.4M14.4 15v1.4"/>',

    /* 옷 종류 (사진이 없을 때) */
    jacket: '<path d="m9 3.9 3 4.4 3-4.4 3.8 1.8 1.6 14.5h-3.5l-.8-7.4v7.8H7.9v-7.8l-.8 7.4H3.6L5.2 5.7z"/><path d="M12 8.3v12.1"/>',
    tee: '<path d="M8.6 4.3 4.3 6.5 2.7 11l3.2 1.2v7.6h12.2v-7.6l3.2-1.2-1.6-4.5-4.3-2.2c-.6 1.5-1.9 2.4-3.4 2.4s-2.8-.9-3.4-2.4z"/>',
    pants: '<path d="M6.7 3.7h10.6l1.6 16.6h-4.5L12 10.3l-2.4 10H5.1z"/><path d="M6.5 6.8h11"/>',
    skirt: '<path d="M7.7 4.2h8.6l3.4 15.2H4.3z"/><path d="M7.3 7.2h9.4"/><path d="m10.2 7.2-1.3 12.2M13.8 7.2l1.3 12.2"/>',
    shoe: '<path d="M3.3 7.7v9.7h17.4c0-1.9-1.5-3.1-3.8-3.7l-4.7-1.2-2.4-3.5c-1 .9-2.4 1.3-3.8 1z"/><path d="M3.3 14.8h17.2"/>',
    bag: '<path d="M5.1 8.6h13.8L17.8 19.6c-.1.5-.5.9-1 .9H7.2c-.5 0-.9-.4-1-.9z"/><path d="M9 8.6V7.1a3 3 0 0 1 6 0v1.5"/>',
    hat: '<path d="M7.1 14.6 8.3 8a3.7 3.7 0 0 1 7.4 0l1.2 6.6"/><path d="M3.2 15.7c2.6-1.3 5.5-1.9 8.8-1.9s6.2.6 8.8 1.9"/>',
    ring: '<circle cx="12" cy="14.4" r="5.4"/><path d="m9.9 6.6 2.1-2.9 2.1 2.9L12 8.9z"/>'
  };

  /* 옷 종류 — 아이템 줄 · 설정 화면이 같이 씀 */
  var KIND = {
    outer: { label: '아우터', icon: 'jacket' },
    top: { label: '상의', icon: 'tee' },
    bottom: { label: '하의', icon: 'pants' },
    shoes: { label: '신발', icon: 'shoe' },
    bag: { label: '가방', icon: 'bag' },
    hat: { label: '모자', icon: 'hat' },
    acc: { label: '소품', icon: 'ring' }
  };

  function icon(name, opt) {
    opt = opt || {};
    var body = I[name] || I.spark;
    return '<svg class="i i-' + name + '" viewBox="0 0 24 24" width="24" height="24" fill="' + (opt.fill ? 'currentColor' : 'none') +
      '" stroke="currentColor" stroke-width="' + (opt.sw || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      body + '</svg>';
  }

  function kindIcon(kind, shape) {
    if (kind === 'bottom' && shape === 'skirt') return icon('skirt');
    return icon((KIND[kind] || KIND.acc).icon);
  }

  function hydrate(root) {
    (root || document).querySelectorAll('[data-i]').forEach(function (el) {
      el.innerHTML = icon(el.getAttribute('data-i'), { fill: el.hasAttribute('data-fill') });
    });
    (root || document).querySelectorAll('[data-kind]').forEach(function (el) {
      el.innerHTML = kindIcon(el.getAttribute('data-kind'), el.getAttribute('data-shape'));
    });
  }

  w.LAM_ICONS = I;
  w.LAM_KIND = KIND;
  w.LAM_icon = icon;
  w.LAM_kindIcon = kindIcon;
  w.LAM_hydrateIcons = hydrate;
})(window);
