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

const semFavoritos =
    document.getElementById("semFavoritos");

function pegarFavoritos() {
    try {
        const favoritos = JSON.parse(
            localStorage.getItem("favoritos")
        );

        return Array.isArray(favoritos)
            ? favoritos
            : [];

    } catch (erro) {
        console.error(
            "Erro ao carregar favoritos:",
            erro
        );

        return [];
    }
}


// ==========================================
// CAMINHOS DAS IMAGENS
// ==========================================

function corrigirCaminhoImagem(noticia) {
    const id = Number(noticia.id);

    /*
     * IMAGENS DOS QUATRO BANNERS
     */

    const imagensBanners = {
        26: "banner.chocolate.png",
        27: "banner.agua.png",
        28: "banner.ovo.png",
        29: "banner.banana.png"
    };

    if (imagensBanners[id]) {
        return (
            "/bem-estar-mais/SRC/ASSETS/IMAGENS/" +
            "BANNER PÁGINA PRINCIPAL/" +
            imagensBanners[id]
        );
    }

    /*
     * UTILIZA A IMAGEM SALVA NO FAVORITO
     */

    if (noticia.imagem) {
        const caminho = String(noticia.imagem)
            .replace(/\\/g, "/");

        if (
            caminho.startsWith("http://") ||
            caminho.startsWith("https://") ||
            caminho.startsWith("/")
        ) {
            return caminho;
        }

        const posicaoAssets =
            caminho.indexOf("ASSETS/");

        if (posicaoAssets !== -1) {
            return (
                "/bem-estar-mais/SRC/" +
                caminho.substring(posicaoAssets)
            );
        }

        const posicaoImagens =
            caminho.indexOf("IMAGENS/");

        if (posicaoImagens !== -1) {
            return (
                "/bem-estar-mais/SRC/ASSETS/" +
                caminho.substring(posicaoImagens)
            );
        }
    }

    /*
     * CAPAS DAS NOTÍCIAS NORMAIS
     */

    if (Number.isInteger(id) && id > 0) {
        const numeroNoticia =
            String(id).padStart(2, "0");

        return (
            "/bem-estar-mais/SRC/ASSETS/IMAGENS/" +
            "CAPA DAS NOTÍCIAS/" +
            `capa.not.${numeroNoticia}.png`
        );
    }

    return "";
}


// ==========================================
// CAMINHOS DAS NOTÍCIAS
// ==========================================

function corrigirCaminhoNoticia(noticia) {
    const id = Number(noticia.id);

    if (
        noticia.link &&
        (
            noticia.link.startsWith("http://") ||
            noticia.link.startsWith("https://") ||
            noticia.link.startsWith("/")
        )
    ) {
        return noticia.link;
    }

    const linkOriginal =
        String(noticia.link || "");

    const nomeArquivo = linkOriginal
        .replace(/\\/g, "/")
        .split("/")
        .pop();

    if (!nomeArquivo) {
        return "#";
    }

    if (id >= 26 && id <= 29) {
        return (
            "/bem-estar-mais/SRC/PAGES/" +
            "NOTÍCIAS DOS BANNERS PRINCIPAIS/" +
            nomeArquivo
        );
    }

    return (
        "/bem-estar-mais/SRC/PAGES/NOTÍCIAS/" +
        nomeArquivo
    );
}


// ==========================================
// FORMATAÇÃO DAS DATAS
// ==========================================

function formatarData(dataOriginal) {
    if (!dataOriginal) {
        return "";
    }

    const texto = String(dataOriginal)
        .trim()
        .toLowerCase();

    // Formato: 2025-02-20

    const formatoISO = texto.match(
        /^(\d{4})-(\d{2})-(\d{2})$/
    );

    if (formatoISO) {
        const ano = formatoISO[1];
        const mes = formatoISO[2];
        const dia = formatoISO[3];

        return `${dia}/${mes}/${ano}`;
    }

    // Formato: 20/02/2025

    const formatoBrasileiro = texto.match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    );

    if (formatoBrasileiro) {
        const dia = formatoBrasileiro[1]
            .padStart(2, "0");

        const mes = formatoBrasileiro[2]
            .padStart(2, "0");

        const ano = formatoBrasileiro[3];

        return `${dia}/${mes}/${ano}`;
    }

    // Formatos: 20 fev 2025 ou 20 de fevereiro de 2025

    const meses = {
        janeiro: "01",
        jan: "01",
        fevereiro: "02",
        fev: "02",
        março: "03",
        marco: "03",
        mar: "03",
        abril: "04",
        abr: "04",
        maio: "05",
        mai: "05",
        junho: "06",
        jun: "06",
        julho: "07",
        jul: "07",
        agosto: "08",
        ago: "08",
        setembro: "09",
        set: "09",
        outubro: "10",
        out: "10",
        novembro: "11",
        nov: "11",
        dezembro: "12",
        dez: "12"
    };

    const textoLimpo = texto
        .replace(/\./g, "")
        .replace(/\s+de\s+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const dataEscrita = textoLimpo.match(
        /^(\d{1,2})\s+([a-zç]+)\s+(\d{4})$/
    );

    if (dataEscrita) {
        const dia = dataEscrita[1]
            .padStart(2, "0");

        const nomeMes = dataEscrita[2];
        const mes = meses[nomeMes];
        const ano = dataEscrita[3];

        if (mes) {
            return `${dia}/${mes}/${ano}`;
        }
    }

    return dataOriginal;
}


// ==========================================
// RENDERIZAÇÃO DOS FAVORITOS
// ==========================================

function renderizarFavoritos() {
    if (!lista) {
        return;
    }

    const favoritos = pegarFavoritos();

    lista.replaceChildren();

    if (semFavoritos) {
        semFavoritos.style.display =
            favoritos.length === 0
                ? "flex"
                : "none";
    }

    favoritos.forEach((noticia, index) => {

        // CARD

        const card = document.createElement("div");
        card.classList.add("noticia");


        // BOTÃO DE REMOVER

        const botaoFavorito =
            document.createElement("button");

        botaoFavorito.type = "button";
        botaoFavorito.className =
            "favorito ativo";

        botaoFavorito.dataset.index = index;

        botaoFavorito.title =
            "Remover dos favoritos";

        botaoFavorito.setAttribute(
            "aria-label",
            "Remover dos favoritos"
        );

        const icone =
            document.createElement("i");

        icone.className =
            "fa-solid fa-heart";

        botaoFavorito.appendChild(icone);


        // IMAGEM

        const imagem =
            document.createElement("img");

        imagem.src =
            corrigirCaminhoImagem(noticia);

        imagem.alt =
            noticia.titulo || "Notícia";

        imagem.addEventListener("error", () => {
            console.error(
                "Imagem não encontrada:",
                imagem.src
            );
        });


        // CONTEÚDO

        const conteudo =
            document.createElement("div");

        conteudo.classList.add("conteudo");


        // TÍTULO

        const titulo =
            document.createElement("h2");

        titulo.textContent =
            noticia.titulo || "Notícia";

        conteudo.appendChild(titulo);


        // DATA

        const dataOriginal =
            noticia.data ||
            noticia.data_publicacao ||
            "";

        if (dataOriginal) {
            const data =
                document.createElement("p");

            data.classList.add("data");

            data.textContent =
                formatarData(dataOriginal);

            conteudo.appendChild(data);
        }


        // LINK

        const link =
            document.createElement("a");

        link.href =
            corrigirCaminhoNoticia(noticia);


        // BOTÃO SAIBA MAIS

        const botaoSaibaMais =
            document.createElement("button");

        botaoSaibaMais.type = "button";
        botaoSaibaMais.textContent =
            "Saiba Mais";

        link.appendChild(botaoSaibaMais);
        conteudo.appendChild(link);


        // MONTA O CARD

        card.appendChild(botaoFavorito);
        card.appendChild(imagem);
        card.appendChild(conteudo);

        lista.appendChild(card);


        // REMOVE O FAVORITO

        botaoFavorito.addEventListener(
            "click",
            () => {
                const favoritosAtuais =
                    pegarFavoritos();

                const indiceAtual =
                    favoritosAtuais.findIndex(
                        item =>
                            String(item.id) ===
                            String(noticia.id)
                    );

                if (indiceAtual !== -1) {
                    favoritosAtuais.splice(
                        indiceAtual,
                        1
                    );

                    localStorage.setItem(
                        "favoritos",
                        JSON.stringify(
                            favoritosAtuais
                        )
                    );
                }

                renderizarFavoritos();
            }
        );
    });
}


// PRIMEIRO CARREGAMENTO

renderizarFavoritos();


// ATUALIZA AO VOLTAR PELO NAVEGADOR

window.addEventListener("pageshow", () => {
    carregarTema();
    renderizarFavoritos();
});


// ATUALIZA QUANDO OUTRA ABA ALTERAR OS DADOS

window.addEventListener("storage", evento => {
    if (
        evento.key === "tema" ||
        evento.key === null
    ) {
        carregarTema();
    }

    if (
        evento.key === "favoritos" ||
        evento.key === null
    ) {
        renderizarFavoritos();
    }
});