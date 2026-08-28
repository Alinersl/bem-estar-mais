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

////////////////// FAVORITOS //////////////////

const toast = document.getElementById("toast");

function mostrarMensagem(texto) {

  if (!toast) return;

  toast.textContent = texto;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


// PEGA FAVORITOS SALVOS

function pegarFavoritos() {

  try {

    return JSON.parse(
      localStorage.getItem("favoritos")
    ) || [];

  } catch (erro) {

    return [];

  }

}


// PEGA TODOS OS CARDS DE NOTÍCIA

document.querySelectorAll(".noticia").forEach(card => {

  const btn = card.querySelector(".favorito");

  if (!btn) return;


  // PEGA O LINK DA NOTÍCIA

  const link = card.querySelector(".conteudo a");

  if (!link) return;


  const href = link.getAttribute("href");


  // DESCOBRE O ID DA NOTÍCIA

  const resultado = href.match(/noticia(\d+)\.html/i);

  if (!resultado) return;


  const idNoticia = Number(resultado[1]);


  const icone = btn.querySelector("i");


  // ==========================================
  // VERIFICA SE JÁ ESTÁ FAVORITADA
  // ==========================================

  let favoritos = pegarFavoritos();

  const jaFavoritada = favoritos.some(
    item => Number(item.id) === idNoticia
  );


  if (jaFavoritada) {

    btn.classList.add("ativo");

    icone.classList.remove("fa-regular");
    icone.classList.add("fa-solid");

  }


  // ==========================================
  // CLIQUE NO CORAÇÃO
  // ==========================================

  btn.addEventListener("click", () => {

    let favoritos = pegarFavoritos();


    const indice = favoritos.findIndex(
      item => Number(item.id) === idNoticia
    );


    // ========================================
    // SE JÁ EXISTE → REMOVE
    // ========================================

    if (indice !== -1) {

      favoritos.splice(indice, 1);

      localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
      );


      btn.classList.remove("ativo");

      icone.classList.remove("fa-solid");
      icone.classList.add("fa-regular");


      mostrarMensagem(
        "🤍 Removido dos favoritos!"
      );


      return;
    }


    // ========================================
    // SE NÃO EXISTE → ADICIONA
    // ========================================

    const tituloElemento =
      card.querySelector(".conteudo h2");

    const dataElemento =
      card.querySelector(".data");

    const imagemElemento =
      card.querySelector("img");


    const noticia = {

      id: idNoticia,

      titulo:
        tituloElemento
          ? tituloElemento.textContent.trim()
          : "Notícia",

      data:
        dataElemento
          ? dataElemento.textContent.trim()
          : "",

      imagem:
        imagemElemento
          ? imagemElemento.getAttribute("src")
          : "",

      link: href

    };


    favoritos.push(noticia);


    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );


    btn.classList.add("ativo");

    icone.classList.remove("fa-regular");
    icone.classList.add("fa-solid");


    mostrarMensagem(
      "❤️ Adicionado aos favoritos!"
    );


    console.log(
      "Favoritos:",
      favoritos
    );

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

////////////////// CONTADOR DE VISUALIZAÇÕES //////////////////

document.querySelectorAll('.noticia a').forEach(link => {

    link.addEventListener('click', async function (event) {

        const href = this.getAttribute('href');

        const resultado =
            href.match(/noticia(\d+)\.html/i);

        if (!resultado) {
            return;
        }

        event.preventDefault();

        const idNoticia = resultado[1];

        console.log(
            "Registrando notícia:",
            idNoticia
        );

        try {

            const resposta = await fetch(
                `../../PHP/registrarvisualizacoes.php?id=${idNoticia}`
            );

            const texto =
                await resposta.text();

            console.log(
                "PHP respondeu:",
                texto
            );

        } catch (erro) {

            console.log(
                "Erro ao registrar:",
                erro
            );

        }

        window.location.href = href;

    });

}); 
let encontrouNoticia = false;

noticias.forEach(noticia => {

  const texto = removerAcentos(
    noticia.textContent.toLowerCase()
  );

  if (valor === "" || texto.includes(valor)) {

    noticia.style.display = "";
    encontrouNoticia = true;

  } else {

    noticia.style.display = "none";

  }

});

/* MOVE PÁGINAS E FOOTER QUANDO NÃO TEM RESULTADO */

if (valor !== "" && !encontrouNoticia) {

  document.body.classList.add("sem-resultados");

} else {

  document.body.classList.remove("sem-resultados");

}