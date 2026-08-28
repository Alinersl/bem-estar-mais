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


// ==========================================
// FAVORITOS
// ==========================================

const toast = document.getElementById("toast");
const btnFinal = document.querySelector(".favorito2");

function mostrarMensagem(texto) {

    if (!toast) return;

    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}


// ==========================================
// DESCOBRE QUAL NOTÍCIA ESTÁ ABERTA
// ==========================================

const paginaAtual = window.location.pathname;

const nomeArquivo = paginaAtual
    .split("/")
    .pop();

let idFavorito = null;


// noticia1.html, noticia2.html, noticia3.html...
const resultadoFavorito = nomeArquivo.match(
    /^noticia(\d+)\.html$/i
);

if (resultadoFavorito) {

    idFavorito = Number(
        resultadoFavorito[1]
    );

} else {

    // not.agua.html, not.banana.html,
    // not.chocolate.html, not.ovo.html

    const resultadoNomeado = nomeArquivo.match(
        /^not\.(.+)\.html$/i
    );

    if (resultadoNomeado) {

        idFavorito =
            resultadoNomeado[1].toLowerCase();

    }

}


// ==========================================
// PEGA FAVORITOS
// ==========================================

function pegarFavoritos() {

    try {

        return JSON.parse(
            localStorage.getItem("favoritos")
        ) || [];

    } catch {

        return [];

    }

}


// ==========================================
// VERIFICA SE JÁ ESTÁ SALVA
// ==========================================

function estaFavoritada() {

    const favoritos = pegarFavoritos();

    return favoritos.some(item =>
        String(item.id) === String(idFavorito)
    );

}


// ==========================================
// MUDA O BOTÃO
// ==========================================

function atualizarBotaoFavorito() {

    if (!btnFinal) return;

    const icone = btnFinal.querySelector("i");

    if (estaFavoritada()) {

        btnFinal.classList.add("ativo");

        if (icone) {
            icone.className = "fa-solid fa-heart";
        }

    } else {

        btnFinal.classList.remove("ativo");

        if (icone) {
            icone.className = "fa-regular fa-heart";
        }

    }

}


// ==========================================
// CLIQUE
// ==========================================

if (btnFinal && idFavorito) {

    atualizarBotaoFavorito();

    btnFinal.addEventListener("click", () => {

        let favoritos = pegarFavoritos();

        const existe = favoritos.findIndex(
            item =>
                String(item.id) ===
                String(idFavorito)
        );


        // REMOVE

        if (existe !== -1) {

            favoritos.splice(existe, 1);

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

            atualizarBotaoFavorito();

            mostrarMensagem(
                "🤍 Removido dos favoritos!"
            );

            return;
        }


        // PEGA DADOS DA NOTÍCIA

        const titulo =
            document.querySelector(
                ".tema h1, " +
                ".tema-editado1 h1, " +
                ".tema-editado2 h1, " +
                ".tema-editado3 h1, " +
                ".tema-editado4 h1, " +
                ".tema-editado5 h1, " +
                ".tema-editado6 h1, " +
                ".tema-editado7 h1, " +
                ".tema-editado8 h1"
            );

        const data =
            document.querySelector(
                ".cabecalho span:last-child"
            );

        const imagem =
            document.querySelector(
                ".topo-imagem img"
            );


        const noticia = {

            id: idFavorito,

            titulo: titulo
                ? titulo.textContent.trim()
                : "Notícia",

            data: data
                ? data.textContent.trim()
                : "",

            imagem: imagem
                ? imagem.src
                : "",

            link: window.location.href

        };


        favoritos.push(noticia);


        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );


        atualizarBotaoFavorito();


        mostrarMensagem(
            "❤️ Adicionado aos favoritos!"
        );


        console.log(
            "Favoritos salvos:",
            favoritos
        );

    });

}



////////////////// COMENTÁRIOS //////////////////

const btnComentar = document.getElementById("btnComentar");
const listaComentarios = document.getElementById("listaComentarios");

// DESCOBRE QUAL NOTÍCIA ESTÁ ABERTA
const caminhoPagina = window.location.pathname;

const resultadoNoticia = caminhoPagina.match(/noticia(\d+)\.html/i);

const noticiaId = resultadoNoticia
    ? resultadoNoticia[1]
    : null;


// ==========================================
// PUBLICAR COMENTÁRIO
// ==========================================

// PUBLICAR COMENTÁRIO

if (btnComentar && noticiaId) {

    btnComentar.addEventListener(
        "click",
        async () => {

            const comentarioInput =
                document.getElementById(
                    "comentario"
                );

            const texto =
                comentarioInput.value.trim();

            if (texto === "") {

                alert(
                    "Digite um comentário."
                );

                return;
            }

            const dados =
                new FormData();

            dados.append(
                "noticia_id",
                noticiaId
            );

            dados.append(
                "comentario",
                texto
            );

            try {

                const resposta =
                    await fetch(
                        "../../PHP/comentar.php",
                        {
                            method: "POST",
                            body: dados
                        }
                    );

                const retorno =
                    await resposta.text();

                console.log(retorno);

                comentarioInput.value = "";

                carregarComentarios();

            } catch (erro) {

                console.log(
                    "Erro ao publicar comentário:",
                    erro
                );

            }

        }
    );

}



// ==========================================
// CARREGAR COMENTÁRIOS
// ==========================================

async function carregarComentarios() {

    if (!listaComentarios || !noticiaId) {
        return;
    }

    try {

        const resposta = await fetch(
            `../../PHP/buscar-comentarios.php?noticia_id=${noticiaId}`
        );

        const comentarios = await resposta.json();

        listaComentarios.innerHTML = "";

        if (comentarios.length === 0) {

            const vazio = document.createElement("p");

            vazio.textContent =
                "Ainda não há comentários.";

            listaComentarios.appendChild(vazio);

            return;
        }

        comentarios.forEach(item => {

            const caixa = document.createElement("div");
            caixa.className = "comentario";

            // NOME
            const nomeUsuario = document.createElement("h4");
            nomeUsuario.textContent = item.nome;

            // DATA
            const data = document.createElement("small");

            data.textContent =
                formatarDataComentario(
                    item.data_comentario
                );

            // TEXTO DO COMENTÁRIO
            const texto = document.createElement("p");

            texto.textContent =
                item.comentario;

            caixa.appendChild(nomeUsuario);
            caixa.appendChild(data);
            caixa.appendChild(texto);


            // ==========================================
            // SÓ MOSTRA EDITAR/EXCLUIR PARA O DONO
            // ==========================================

            if (item.pode_editar) {

                const acoes =
                    document.createElement("div");

                acoes.className =
                    "acoes-comentario";


                // ==========================
                // BOTÃO EDITAR
                // ==========================

                const btnEditar =
                    document.createElement("button");

                btnEditar.textContent = "Editar";

                btnEditar.className =
                    "btn-editar-comentario";


                btnEditar.addEventListener(
                    "click",
                    async () => {

                        const novoTexto = prompt(
                            "Edite seu comentário:",
                            item.comentario
                        );

                        if (
                            novoTexto === null ||
                            novoTexto.trim() === ""
                        ) {
                            return;
                        }

                        const dados =
                            new FormData();

                        dados.append(
                            "id",
                            item.id
                        );

                        dados.append(
                            "comentario",
                            novoTexto.trim()
                        );

                        try {

                            const resposta =
                                await fetch(
                                    "../../PHP/editar-comentario.php",
                                    {
                                        method: "POST",
                                        body: dados
                                    }
                                );

                            const retorno =
                                await resposta.text();

                            console.log(retorno);

                            carregarComentarios();

                        } catch (erro) {

                            console.log(
                                "Erro ao editar:",
                                erro
                            );

                        }

                    }
                );


                // ==========================
                // BOTÃO EXCLUIR
                // ==========================

                const btnExcluir =
                    document.createElement("button");

                btnExcluir.textContent = "Excluir";

                btnExcluir.className =
                    "btn-excluir-comentario";


                btnExcluir.addEventListener(
                    "click",
                    async () => {

                        const confirmar = confirm(
                            "Deseja excluir este comentário?"
                        );

                        if (!confirmar) {
                            return;
                        }

                        const dados =
                            new FormData();

                        dados.append(
                            "id",
                            item.id
                        );

                        try {

                            const resposta =
                                await fetch(
                                    "../../PHP/excluir-comentario.php",
                                    {
                                        method: "POST",
                                        body: dados
                                    }
                                );

                            const retorno =
                                await resposta.text();

                            console.log(retorno);

                            carregarComentarios();

                        } catch (erro) {

                            console.log(
                                "Erro ao excluir:",
                                erro
                            );

                        }

                    }
                );


                acoes.appendChild(
                    btnEditar
                );

                acoes.appendChild(
                    btnExcluir
                );

                caixa.appendChild(
                    acoes
                );

            }


            listaComentarios.appendChild(
                caixa
            );

        });

    } catch (erro) {

        console.log(
            "Erro ao carregar comentários:",
            erro
        );

    }

}


// ==========================================
// FORMATAR DATA
// ==========================================

function formatarDataComentario(dataMysql) {

    const data = new Date(dataMysql);

    return (
        data.toLocaleDateString("pt-BR") +
        " às " +
        data.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    );

}


// ==========================================
// CARREGA AO ABRIR A NOTÍCIA
// ==========================================

carregarComentarios();