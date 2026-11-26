document.addEventListener('DOMContentLoaded', () => {
  // 1. Acordeão exclusivo nas Dúvidas Frequentes
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

  // 2. Revela os elementos conforme entram na tela, em qualquer direção de rolagem
  if ('IntersectionObserver' in window) {
    const revealSelector = [
      '.hero-content > *',
      '.strip-list > *',
      '.section-header > *',
      '.filter-tabs',
      '.protocol-card',
      '.doctor-card-visual',
      '.doctor-copy > *',
      '.quiz-box > *',
      '.faq-item',
      '.site-footer .footer-inner > *'
    ].join(', ');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px'
    });

    const observeReveal = (element) => {
      if (element.classList.contains('scroll-reveal')) return;

      const siblingIndex = Array.prototype.indexOf.call(
        element.parentElement.children,
        element
      );
      element.style.setProperty(
        '--reveal-delay',
        `${Math.min(siblingIndex, 4) * 80}ms`
      );
      element.classList.add('scroll-reveal');
      revealObserver.observe(element);
    };

    document.querySelectorAll(revealSelector).forEach(observeReveal);

    const protocolsGrid = document.getElementById('protocols-grid');
    if (protocolsGrid) {
      const protocolsObserver = new MutationObserver(() => {
        protocolsGrid.querySelectorAll('.protocol-card').forEach(observeReveal);
      });
      protocolsObserver.observe(protocolsGrid, { childList: true });
    }
  }

  // 3. Fallback elegante caso assets/img/doutora.png não seja encontrada localmente
  document.querySelectorAll('img[src*="doutora.png"]').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.parentElement;
      if (!parent) return;
      img.style.display = 'none';
      parent.style.background =
        'linear-gradient(145deg, #3A0D27 0%, #681D48 60%, #A98657 100%)';
      parent.style.display = 'flex';
      parent.style.alignItems = 'center';
      parent.style.justifyContent = 'center';
      parent.style.padding = '2rem';
      parent.style.textAlign = 'center';
      parent.style.color = '#FAF7F5';
      if (!parent.querySelector('.fallback-note')) {
        const note = document.createElement('p');
        note.className = 'fallback-note';
        note.style.color = '#E5D3B8';
        note.textContent =
          'Beleziē Estética Avançada • Coloque a imagem em assets/img/doutora.png';
        parent.appendChild(note);
      }
    });
  });

  // 4. Botão flutuante do WhatsApp
  const waFloat = document.createElement('a');
  const defaultMsg =
    'Olá, Dra. Liziane! Vim pelo site da Beleziē Estética Avançada e gostaria de agendar uma consulta.';
  waFloat.href =
    typeof buildWhatsAppUrl === 'function'
      ? buildWhatsAppUrl(defaultMsg)
      : `https://wa.me/5549999669010?text=${encodeURIComponent(defaultMsg)}`;
  waFloat.target = '_blank';
  waFloat.rel = 'noopener noreferrer';
  waFloat.setAttribute('aria-label', 'Agendar consulta pelo WhatsApp');
  waFloat.title = 'Agendar consulta pelo WhatsApp';
  waFloat.className = 'whatsapp-float';
  waFloat.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 4.5a11 11 0 0 0-9.5 16.5L5 26.5l5.7-1.5A11 11 0 1 0 16 4.5Z"
        fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="m11.3 9.2-1.7-.8c-.6-.3-1.3 0-1.5.6-.5 1.4-.3 3 .6 4.5 1.7 3 4.1 5.4 7.1 7.1 1.5.8 3.1 1 4.5.6.6-.2.9-.9.6-1.5l-.8-1.7c-.3-.6-1-.9-1.6-.6l-1.2.6a13 13 0 0 1-4.8-4.8l.6-1.2c.3-.6 0-1.3-.6-1.6Z"
        fill="currentColor"/>
    </svg>
  `;

  document.body.appendChild(waFloat);
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  if (window.scrollY > 36) {
    header.style.backgroundColor = "rgba(250, 247, 245, 0.9)";
    header.style.backdropFilter = "blur(10px)";
    header.style.borderBottom = "1px solid var(--color-nude-200)";
  } else {
    header.style.backgroundColor = "transparent";
    header.style.backdropFilter = "none";
    header.style.borderBottom = "none";
  }
}, { passive: true });