// MODO CLARO E ESCURO

// ==========================================
// MODO CLARO E ESCURO
// ==========================================

const body = document.body;
const sol = document.getElementById("sol");
const lua = document.getElementById("lua");

function atualizarTema(tema) {
    const escuro = tema === "escuro";

    body.classList.toggle("dark", escuro);

    if (sol) {
        sol.style.display = escuro ? "none" : "block";
    }

    if (lua) {
        lua.style.display = escuro ? "block" : "none";
    }
}

function carregarTema() {
    const temaSalvo = localStorage.getItem("tema") || "claro";
    atualizarTema(temaSalvo);
}

carregarTema();

if (sol) {
    sol.addEventListener("click", () => {
        localStorage.setItem("tema", "escuro");
        atualizarTema("escuro");
    });
}

if (lua) {
    lua.addEventListener("click", () => {
        localStorage.setItem("tema", "claro");
        atualizarTema("claro");
    });
}

// ==========================================
// FAVORITOS
// ==========================================

const lista = document.getElementById("listaFavoritos");
const semFavoritos = document.getElementById("semFavoritos");

function pegarFavoritos() {
    try {
        const favoritos = JSON.parse(
            localStorage.getItem("favoritos")
        );

        return Array.isArray(favoritos) ? favoritos : [];
    } catch {
        return [];
    }
}

function renderizarFavoritos() {
    if (!lista) return;

    const favoritos = pegarFavoritos();

    lista.replaceChildren();

    // Mostra a mensagem somente quando não há favoritos.
    if (semFavoritos) {
        semFavoritos.style.display =
            favoritos.length === 0 ? "block" : "none";
    }

    favoritos.forEach((noticia, index) => {
        const card = document.createElement("div");
        card.classList.add("noticia");

        // BOTÃO DE REMOVER

        const botaoFavorito = document.createElement("button");
        botaoFavorito.type = "button";
        botaoFavorito.className = "favorito ativo";
        botaoFavorito.dataset.index = index;
        botaoFavorito.title = "Remover dos favoritos";
        botaoFavorito.setAttribute(
            "aria-label",
            "Remover dos favoritos"
        );

        const icone = document.createElement("i");
        icone.className = "fa-solid fa-heart";

        botaoFavorito.appendChild(icone);

        // IMAGEM

        const imagem = document.createElement("img");

        const idNumerico = /^\d+$/.test(String(noticia.id));

        if (idNumerico) {
            const numeroNoticia = String(noticia.id).padStart(2, "0");

            imagem.src =
                `/bem-estar-mais/SRC/ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.${numeroNoticia}.png`;
        } else {
            imagem.src = noticia.imagem || "";
        }

        imagem.alt = noticia.titulo || "Notícia";

        // CONTEÚDO

        const conteudo = document.createElement("div");
        conteudo.classList.add("conteudo");

        const titulo = document.createElement("h2");
        titulo.textContent = noticia.titulo || "Notícia";

        conteudo.appendChild(titulo);

        if (noticia.data) {
            const data = document.createElement("p");
            data.classList.add("data");
            data.textContent = noticia.data;

            conteudo.appendChild(data);
        }

        const link = document.createElement("a");
        link.href = noticia.link || "#";

        const botaoSaibaMais = document.createElement("button");
        botaoSaibaMais.type = "button";
        botaoSaibaMais.textContent = "Saiba Mais";

        link.appendChild(botaoSaibaMais);
        conteudo.appendChild(link);

        card.appendChild(botaoFavorito);
        card.appendChild(imagem);
        card.appendChild(conteudo);

        lista.appendChild(card);

        // REMOVE E ATUALIZA A LISTA SEM RECARREGAR A PÁGINA.

        botaoFavorito.addEventListener("click", () => {
            const favoritosAtuais = pegarFavoritos();

            const indiceAtual = favoritosAtuais.findIndex(item =>
                String(item.id) === String(noticia.id)
            );

            if (indiceAtual !== -1) {
                favoritosAtuais.splice(indiceAtual, 1);

                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritosAtuais)
                );
            }

            renderizarFavoritos();
        });
    });
}

renderizarFavoritos();

// Atualiza ao voltar pelo navegador.
window.addEventListener("pageshow", () => {
    carregarTema();
    renderizarFavoritos();
});

// Atualiza quando outra aba altera o tema ou os favoritos.
window.addEventListener("storage", evento => {
    if (evento.key === "tema" || evento.key === null) {
        carregarTema();
    }

    if (evento.key === "favoritos" || evento.key === null) {
        renderizarFavoritos();
    }
});