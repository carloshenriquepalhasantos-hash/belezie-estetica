const DIAGNOSIS_OPTIONS = [
  {
    id: 'firmeza',
    label: 'Sinto o rosto menos firme e com perda de contorno',
    protocol: 'Bioestimulador de Colágeno + Lifting Facial / Ultrassom',
    description:
      'Para quem nota perda de firmeza e deseja estimular o próprio colágeno e reposicionar os tecidos sem cirurgia[cite: 1, 2].',
    whatsappMessage:
      'Olá, Dra. Liziane! Fiz o diagnóstico no site da Beleziē sobre firmeza e contorno facial e gostaria de agendar minha avaliação.'
  },
  {
    id: 'labios-contorno',
    label: 'Quero realçar lábios, queixo ou perfil nasal com naturalidade',
    protocol: 'Preenchimento Labial, Queixo ou Rinomodelação',
    description:
      'Planeamento anatómico focado nos pequenos detalhes para equilibrar o perfil e valorizar a sua identidade[cite: 1, 2, 3].',
    whatsappMessage:
      'Olá, Dra. Liziane! Fiz o diagnóstico no site da Beleziē sobre preenchimento e harmonia de perfil e quero agendar uma avaliação.'
  },
  {
    id: 'renovacao-pele',
    label: 'Quero renovar a textura, poros e preparar a pele',
    protocol: 'Protocolo Skin Reset & Laser de CO₂',
    description:
      'Indicado para revitalização profunda, estímulo de viço e preparação antecipada da pele para eventos especiais[cite: 2, 4].',
    whatsappMessage:
      'Olá, Dra. Liziane! Fiz o diagnóstico no site da Beleziē sobre renovação de pele / Skin Reset e gostaria de saber mais.'
  },
  {
    id: 'rugas-prevencao',
    label: 'Quero suavizar linhas de expressão e prevenir rugas',
    protocol: 'Toxina Botulínica (Botox Preventivo ou Corretivo)',
    description:
      'Suavização estratégica das marcas dinâmicas mantendo o olhar leve, descansado e natural[cite: 2, 3].',
    whatsappMessage:
      'Olá, Dra. Liziane! Fiz o diagnóstico no site da Beleziē sobre Botox e prevenção de linhas e gostaria de agendar uma avaliação.'
  },
  {
    id: 'corporal-intima',
    label: 'Busco tratamentos corporais, glúteos ou harmonização íntima',
    protocol: 'Protocolo Glúteos, Depilação a Laser ou Harmonização Íntima',
    description:
      'Atendimento personalizado e discreto com tecnologias avançadas para firmeza, bem-estar e autoestima.',
    whatsappMessage:
      'Olá! Fiz o diagnóstico no site da Beleziē sobre protocolos corporais / íntimos e gostaria de agendar uma consulta.'
  },
  {
    id: 'masculino-capilar',
    label: 'Procuro harmonização masculina, barba ou tratamento capilar',
    protocol: 'Harmonização Masculina, Laser na Barba ou Protocolo Capilar',
    description:
      'Definição estrutural discreta sem artificialidade e cuidados direcionados para calvície ou região da barba[cite: 1, 3, 4].',
    whatsappMessage:
      'Olá, Dra. Liziane! Fiz o diagnóstico no site da Beleziē sobre estética masculina / capilar e gostaria de agendar uma avaliação.'
  }
];

function initDiagnosisQuiz() {
  const optionsContainer = document.getElementById('quiz-options');
  const resultContainer = document.getElementById('quiz-result');
  if (!optionsContainer || !resultContainer) return;

  optionsContainer.innerHTML = DIAGNOSIS_OPTIONS.map(
    (opt) => `
      <button type="button" class="quiz-option-btn" data-diagnosis="${opt.id}">
        ${opt.label}
      </button>
    `
  ).join('');

  optionsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-diagnosis]');
    if (!button) return;

    optionsContainer
      .querySelectorAll('.quiz-option-btn')
      .forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');

    const selected = DIAGNOSIS_OPTIONS.find(
      (item) => item.id === button.dataset.diagnosis
    );
    if (!selected) return;

    const waLink =
      typeof buildWhatsAppUrl === 'function'
        ? buildWhatsAppUrl(selected.whatsappMessage)
        : `https://wa.me/5549999669010?text=${encodeURIComponent(selected.whatsappMessage)}`;

    resultContainer.hidden = false;
    resultContainer.innerHTML = `
      <span class="eyebrow">Indicação Inicial</span>
      <h3>${selected.protocol}</h3>
      <p>${selected.description}</p>
      <p style="font-size: 0.8rem; margin-top: 0.5rem;">
        *A indicação definitiva é sempre definida presencialmente após avaliação clínica com a Dra. Liziane Trombetta[cite: 2].
      </p>
      <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        Enviar este objetivo no WhatsApp
      </a>
    `;

    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

document.addEventListener('DOMContentLoaded', initDiagnosisQuiz);