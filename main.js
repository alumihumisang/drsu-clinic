(() => {
  'use strict';
  const content = window.clinicContent;
  if (!content) return;
  const byId = (id) => document.getElementById(id);
  document.querySelectorAll('[data-field]').forEach((element) => {
    element.textContent = content[element.dataset.field] || '';
  });
  document.title = `${content.name} ${content.englishName}｜${content.tagline}`;
  document.querySelector('meta[name="description"]').content = `${content.name} ${content.englishName}｜療程資訊、醫師介紹與預約聯絡。`;
  // 首頁標語需要換行，因此在預設文案時保留設計；修改文案則自動換成新文字。
  if (content.tagline !== '讓美，回到自己的節奏。') byId('hero-title').textContent = content.tagline;
  document.querySelector('.footer-inner > div > p').textContent = content.tagline;
  document.querySelector('.brand').setAttribute('aria-label', `${content.name}首頁`);
  byId('hero-portrait').src = content.doctorImage;
  byId('hero-portrait').alt = `診所提供的${content.doctorName}醫師照片`;
  byId('clinic-logo').src = content.logo;
  byId('clinic-logo').alt = `${content.name} Logo`;
  byId('year').textContent = new Date().getFullYear();
  content.credentials.forEach((credential) => {
    const li = document.createElement('li');
    li.textContent = credential;
    byId('credentials').append(li);
  });
  ['address', 'hours'].forEach((field) => { byId(field).textContent = content[field] || '待診所提供'; });
  if (content.phone) {
    const phone = document.createElement('a');
    phone.textContent = content.phone;
    phone.href = `tel:${content.phone.replace(/[^+\d]/g, '')}`;
    byId('phone').append(phone);
  } else byId('phone').textContent = '待診所提供';
  const setExternalLink = (id, value) => {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return false;
      const link = byId(id);
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.hidden = false;
      return true;
    } catch { return false; }
  };
  const hasLine = setExternalLink('line-link', content.lineUrl);
  byId('booking-pending').hidden = hasLine || Boolean(content.phone);
  setExternalLink('map-link', content.mapUrl);
  if (content.notice.trim()) {
    byId('notice-text').textContent = content.notice;
    byId('notice').hidden = false;
  }
  const categories = ['全部療程', ...new Set(content.treatments.map((treatment) => treatment.category))];
  const renderTreatments = (category) => {
    byId('treatment-list').replaceChildren();
    let count = 0;
    content.treatments.forEach((treatment, index) => {
      if (category !== '全部療程' && category !== treatment.category) return;
      count += 1;
      const item = document.createElement('article');
      item.className = 'treatment-item';
      const number = document.createElement('span');
      number.className = 'treatment-number';
      number.textContent = String(index + 1).padStart(2, '0');
      number.setAttribute('aria-hidden', 'true');
      const copy = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = treatment.name;
      const label = document.createElement('p');
      label.textContent = treatment.category;
      copy.append(title, label);
      const link = document.createElement('a');
      link.href = '#contact';
      link.textContent = '↗';
      link.setAttribute('aria-label', `聯絡診所諮詢${treatment.name}`);
      item.append(number, copy, link);
      byId('treatment-list').append(item);
    });
    byId('result-count').textContent = `${category}，共 ${count} 項療程`;
  };
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = category;
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      byId('filters').querySelectorAll('button').forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
      renderTreatments(category);
    });
    byId('filters').append(button);
  });
  renderTreatments('全部療程');
  // Let the decorative butterfly drift once when the section comes into view.
  const butterfly = document.querySelector('.butterfly--treatments');
  if (butterfly && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        butterfly.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(butterfly);
  }
})();
