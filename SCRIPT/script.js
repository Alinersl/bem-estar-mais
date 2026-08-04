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

////////////////// HAMBURGUER //////////////////

const hamburguer = document.getElementById("hamburguer");
const menu = document.getElementById("menu");

hamburguer.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});

// Fecha o menu ao clicar fora
document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
        menu.classList.remove("ativo");
    }
});

// Favoritos
const toast = document.getElementById("toast");

function mostrarMensagem(texto) {
    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

document.querySelectorAll(".favorito").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.classList.toggle("ativo");

        const icone = btn.querySelector("i");

        if (btn.classList.contains("ativo")) {
            icone.classList.remove("fa-regular");
            icone.classList.add("fa-solid");

            mostrarMensagem("❤️ Adicionado com sucesso!");
        } else {
            icone.classList.remove("fa-solid");
            icone.classList.add("fa-regular");

            mostrarMensagem("🤍 Removido dos favoritos!");
        }

    });

});

// MODO CLARO E ESCURO
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const sol = document.getElementById("sol");
    const lua = document.getElementById("lua");

    // Carrega o tema salvo
    if (localStorage.getItem("tema") === "escuro") {
        body.classList.add("dark");

        if (sol) sol.style.display = "none";
        if (lua) lua.style.display = "block";
    } else {
        body.classList.remove("dark");

        if (sol) sol.style.display = "block";
        if (lua) lua.style.display = "none";
    }

    // Ativar modo escuro
    if (sol) {
        sol.addEventListener("click", () => {
            body.classList.add("dark");
            localStorage.setItem("tema", "escuro");

            sol.style.display = "none";
            if (lua) lua.style.display = "block";
        });
    }

    // Voltar ao modo claro
    if (lua) {
        lua.addEventListener("click", () => {
            body.classList.remove("dark");
            localStorage.setItem("tema", "claro");

            lua.style.display = "none";
            if (sol) sol.style.display = "block";
        });
    }
});