////////////////// CARROSSEL //////////////////
let index = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

const btnEsquerda = document.querySelector('.btn-esquerda');
const btnDireita = document.querySelector('.btn-direita');

btnDireita.addEventListener('click', () => {
  index++;

  if (index >= totalSlides) {
    index = 0;
  }

  mover();
});

btnEsquerda.addEventListener('click', () => {
  index--;

  if (index < 0) {
    index = totalSlides - 1;
  }

  mover();
});

function mover() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}
////////////////// PESQUISAR //////////////////
const campoBusca = document.getElementById('campoBusca');
const sugestoesBox = document.getElementById('sugestoes');

const sugestoes = [
  "água",
  "sono",
  "açúcar",
  "imunidade",
  "metabolismo",
  "frutas",
  "ultraprocessados",
  "proteína",
  "digestão"
];

// remover acento
function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// mostrar sugestões
campoBusca.addEventListener('input', () => {
  const valor = removerAcentos(campoBusca.value.toLowerCase());
  sugestoesBox.innerHTML = '';

  if (valor === '') {
    sugestoesBox.style.display = 'none';
    return;
  }

  const filtradas = sugestoes.filter(item =>
    removerAcentos(item.toLowerCase()).includes(valor)
  );

  filtradas.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('sugestao');
    div.textContent = item;

    div.addEventListener('click', () => {
      campoBusca.value = item;
      sugestoesBox.style.display = 'none';

      // dispara busca automaticamente
      campoBusca.dispatchEvent(new Event('input'));
    });

    sugestoesBox.appendChild(div);
  });

  sugestoesBox.style.display = filtradas.length ? 'block' : 'none';
});

// esconder ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('.busca-container')) {
    sugestoesBox.style.display = 'none';
  }
});
