document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MODO CLARO E ESCURO
    // ==========================================

    const body = document.body;
    const sol = document.getElementById("sol");
    const lua = document.getElementById("lua");

    function atualizarTema(tema) {

        if (tema === "escuro") {

            body.classList.add("dark");

            if (sol) {
                sol.style.display = "none";
            }

            if (lua) {
                lua.style.display = "block";
            }

        } else {

            body.classList.remove("dark");

            if (sol) {
                sol.style.display = "block";
            }

            if (lua) {
                lua.style.display = "none";
            }
        }
    }

    const temaSalvo = localStorage.getItem("tema") || "claro";

    atualizarTema(temaSalvo);

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

    const nomeArquivo = window.location.pathname.split("/").pop();

    const resultadoFavorito = nomeArquivo.match(
        /^noticia(\d+)\.html$/i
    );

    let idFavorito = null;

    if (resultadoFavorito) {
        idFavorito = Number(resultadoFavorito[1]);

    } else {

        const resultadoNomeado = nomeArquivo.match(
            /^not\.(.+)\.html$/i
        );

        if (resultadoNomeado) {
            idFavorito = resultadoNomeado[1].toLowerCase();
        }
    }

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

    function estaFavoritada() {

        return pegarFavoritos().some(
            item => String(item.id) === String(idFavorito)
        );
    }

    function atualizarBotaoFavorito() {

        if (!btnFinal) return;

        const icone = btnFinal.querySelector("i");

        const salva = estaFavoritada();

        btnFinal.classList.toggle("ativo", salva);

        if (icone) {

            icone.className = salva
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart";
        }
    }

    if (btnFinal && idFavorito) {

        atualizarBotaoFavorito();

        btnFinal.addEventListener("click", evento => {

            evento.preventDefault();

            const favoritos = pegarFavoritos();

            const indice = favoritos.findIndex(
                item => String(item.id) === String(idFavorito)
            );

            if (indice !== -1) {

                favoritos.splice(indice, 1);

                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                );

                atualizarBotaoFavorito();

                mostrarMensagem("🤍 Removido dos favoritos!");

                return;
            }

            const titulo = document.querySelector(
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

            const data = document.querySelector(
                ".cabecalho span:last-child"
            );

            const imagem = document.querySelector(
                ".topo-imagem img"
            );

            favoritos.push({

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
            });

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

            atualizarBotaoFavorito();

            mostrarMensagem(
                "❤️ Adicionado aos favoritos!"
            );
        });
    }


    // ==========================================
    // COMENTÁRIOS
    // ==========================================

    // Caminho a partir das páginas em SRC/PAGES/...
    const pastaPHP = "/bem-estar-mais/SRC/PHP/";

    const resultadoId = nomeArquivo.match(
        /^noticia(\d+)\.html$/i
    );

    // Nas páginas com nome, permite informar o ID real no body:
    // <body data-noticia-id="ID REAL DA NOTÍCIA NO BANCO">

    const noticiaId = Number(

        document.body.dataset.noticiaId ||

        (resultadoId
            ? resultadoId[1]
            : 0)
    );

    const btnComentar =
        document.getElementById("btnComentar");

    const campoComentario =
        document.getElementById("comentario");

    const listaComentarios =
        document.getElementById("listaComentarios");


    function noticiaValida() {

        return Number.isInteger(noticiaId)
            && noticiaId > 0;
    }


    async function enviarDados(
        arquivo,
        dados
    ) {

        const resposta = await fetch(
            pastaPHP + arquivo,
            {

                method: "POST",

                body: dados
            }
        );

        const texto =
            await resposta.text();

        if (!resposta.ok) {

            console.error(
                `Erro em ${arquivo}:`,
                texto
            );

            throw new Error(

                resposta.status >= 500

                    ? "Erro no servidor. Não foi possível concluir a operação."

                    : texto.trim() ||
                    `Erro HTTP ${resposta.status}.`
            );
        }

        return texto.trim();
    }


    // ==========================================
    // PUBLICAR COMENTÁRIO
    // ==========================================

    async function publicarComentario(
        evento
    ) {

        evento.preventDefault();

        if (btnComentar.disabled) return;

        if (!noticiaValida()) {

            alert(
                "Não foi possível identificar o ID desta notícia."
            );

            return;
        }

        const comentario =
            campoComentario.value.trim();

        if (comentario === "") {

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
            comentario
        );

        btnComentar.disabled = true;

        try {

            const mensagem =
                await enviarDados(
                    "comentar.php",
                    dados
                );

            // Só limpa o campo se o PHP confirmar a publicação.

            if (
                mensagem !==
                "Comentário publicado!"
            ) {

                alert(
                    mensagem ||
                    "O servidor não confirmou a publicação."
                );

                return;
            }

            campoComentario.value = "";

            alert(mensagem);

            await carregarComentarios();

        } catch (erro) {

            console.error(
                "Erro ao comentar:",
                erro
            );

            alert(
                erro.message ||
                "Não foi possível publicar o comentário."
            );

        } finally {

            btnComentar.disabled = false;
        }
    }


    if (
        btnComentar &&
        campoComentario
    ) {

        btnComentar.addEventListener(
            "click",
            publicarComentario
        );

        // Impede que o formulário recarregue a página.

        const formulario =
            btnComentar.closest("form");

        if (formulario) {

            formulario.addEventListener(
                "submit",
                publicarComentario
            );
        }
    }


    // ==========================================
    // CARREGAR COMENTÁRIOS
    // ==========================================

    async function carregarComentarios() {

        if (!listaComentarios) return;

        if (!noticiaValida()) {

            listaComentarios.textContent =
                "Não foi possível identificar o ID desta notícia.";

            return;
        }

        try {

            const resposta =
                await fetch(

                    `${pastaPHP}buscar-comentarios.php?noticia_id=${noticiaId}`,

                    {
                        cache: "no-store"
                    }
                );

            if (!resposta.ok) {

                throw new Error(

                    `Erro HTTP ${resposta.status} ao buscar comentários.`
                );
            }

            const comentarios =
                await resposta.json();

            if (
                !Array.isArray(comentarios)
            ) {

                throw new Error(
                    "buscar-comentarios.php não retornou uma lista."
                );
            }

            listaComentarios.innerHTML = "";

            if (
                comentarios.length === 0
            ) {

                listaComentarios.textContent =
                    "Nenhum comentário ainda.";

                return;
            }

            comentarios.forEach(item => {

                const div =
                    document.createElement("div");

                div.classList.add(
                    "comentario-item"
                );

                const nome =
                    document.createElement(
                        "strong"
                    );

                nome.textContent =
                    item.nome;

                const texto =
                    document.createElement("p");

                texto.textContent =
                    item.comentario;

                div.appendChild(nome);

                div.appendChild(texto);


                const podeEditar =

                    item.pode_editar === true ||

                    item.pode_editar === 1 ||

                    item.pode_editar === "1";


                if (podeEditar) {

                    const acoes =
                        document.createElement(
                            "div"
                        );

                    acoes.classList.add(
                        "acoes-comentario"
                    );


                    // EDITAR

                    const editar =
                        document.createElement(
                            "button"
                        );

                    editar.type =
                        "button";

                    editar.textContent =
                        "Editar";

                    editar.classList.add(
                        "btn-editar-comentario"
                    );


                    editar.addEventListener(
                        "click",
                        async () => {

                            const novoTexto =
                                prompt(
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

                            editar.disabled = true;

                            try {

                                const resultado =
                                    await enviarDados(
                                        "editar-comentario.php",
                                        dados
                                    );

                                console.log(
                                    "Editar:",
                                    resultado
                                );

                                await carregarComentarios();

                            } catch (erro) {

                                console.error(
                                    "Erro ao editar:",
                                    erro
                                );

                                alert(
                                    erro.message
                                );

                            } finally {

                                editar.disabled = false;
                            }
                        }
                    );


                    // EXCLUIR

                    const excluir =
                        document.createElement(
                            "button"
                        );

                    excluir.type =
                        "button";

                    excluir.textContent =
                        "Excluir";

                    excluir.classList.add(
                        "btn-excluir-comentario"
                    );


                    excluir.addEventListener(
                        "click",
                        async () => {

                            if (
                                !confirm(
                                    "Deseja excluir esse comentário?"
                                )
                            ) {

                                return;
                            }

                            const dados =
                                new FormData();

                            dados.append(
                                "id",
                                item.id
                            );

                            excluir.disabled = true;

                            try {

                                const resultado =
                                    await enviarDados(
                                        "excluir-comentario.php",
                                        dados
                                    );

                                console.log(
                                    "Excluir:",
                                    resultado
                                );

                                await carregarComentarios();

                            } catch (erro) {

                                console.error(
                                    "Erro ao excluir:",
                                    erro
                                );

                                alert(
                                    erro.message
                                );

                            } finally {

                                excluir.disabled = false;
                            }
                        }
                    );


                    acoes.appendChild(
                        editar
                    );

                    acoes.appendChild(
                        excluir
                    );

                    div.appendChild(
                        acoes
                    );
                }

                listaComentarios.appendChild(
                    div
                );
            });

        } catch (erro) {

            console.error(
                "Erro ao carregar comentários:",
                erro
            );

            listaComentarios.textContent =
                "Não foi possível carregar os comentários.";
        }
    }


    carregarComentarios();

}); 