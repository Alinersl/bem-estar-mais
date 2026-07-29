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
const noticias = document.querySelectorAll('.noticia');

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

// mostrar sugestões e filtrar notícias
campoBusca.addEventListener('input', () => {

  const valor = removerAcentos(campoBusca.value.toLowerCase());

  // Filtrar notícias
  noticias.forEach(noticia => {
    const texto = removerAcentos(noticia.textContent.toLowerCase());

    if (valor === "" || texto.includes(valor)) {
      noticia.style.display = "";
    } else {
      noticia.style.display = "none";
    }
  });

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
      campoBusca.dispatchEvent(new Event('input'));
      sugestoesBox.style.display = 'none';
    });

    sugestoesBox.appendChild(div);
  });

  sugestoesBox.style.display = filtradas.length ? 'block' : 'none';
});

// esconder sugestões ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('.busca-container')) {
    sugestoesBox.style.display = 'none';
  }
});