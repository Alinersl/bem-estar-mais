(() => {
    function iniciar() {
        if (window.bemEstarNoticiaIniciada) return;
        window.bemEstarNoticiaIniciada = true;

        // ==========================================
        // MODO CLARO E ESCURO
        // ==========================================

        if (!window.bemEstarTemaIniciado) {
            window.bemEstarTemaIniciado = true;

            const sol = document.getElementById("sol");
            const lua = document.getElementById("lua");

            function lerTema() {
                try {
                    return localStorage.getItem("tema") === "escuro"
                        ? "escuro"
                        : "claro";
                } catch (erro) {
                    console.error("Erro ao ler o tema:", erro);
                    return "claro";
                }
            }

            function aplicarTema(tema) {
                const escuro = tema === "escuro";

                document.body.classList.toggle("dark", escuro);

                if (sol) {
                    sol.style.display = escuro ? "none" : "block";
                }

                if (lua) {
                    lua.style.display = escuro ? "block" : "none";
                }
            }

            function salvarTema(tema) {
                aplicarTema(tema);

                try {
                    localStorage.setItem("tema", tema);
                } catch (erro) {
                    console.error("Não foi possível salvar o tema:", erro);
                }
            }

            aplicarTema(lerTema());

            sol?.addEventListener("click", evento => {
                evento.preventDefault();
                salvarTema("escuro");
            });

            lua?.addEventListener("click", evento => {
                evento.preventDefault();
                salvarTema("claro");
            });

            window.addEventListener("pageshow", () => {
                aplicarTema(lerTema());
            });

            window.addEventListener("storage", evento => {
                if (evento.key === "tema" || evento.key === null) {
                    aplicarTema(lerTema());
                }
            });
        }

        // ==========================================
        // FAVORITOS
        // ==========================================

        const toast = document.getElementById("toast");
        const btnFinal = document.querySelector(".favorito2");
        let tempoToast;

        function mostrarMensagem(texto) {
            if (!toast) return;

            clearTimeout(tempoToast);
            toast.textContent = texto;
            toast.classList.add("show");

            tempoToast = setTimeout(() => {
                toast.classList.remove("show");
            }, 2000);
        }

        const nomeArquivo = window.location.pathname.split("/").pop();
        const resultadoNumero = nomeArquivo.match(/^noticia(\d+)\.html$/i);
        const resultadoNome = nomeArquivo.match(/^not\.(.+)\.html$/i);

        const idFavorito = resultadoNumero
            ? Number(resultadoNumero[1])
            : resultadoNome
                ? resultadoNome[1].toLowerCase()
                : null;

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

        function atualizarBotaoFavorito() {
            if (!btnFinal || idFavorito === null) return;

            const salvo = pegarFavoritos().some(
                item => String(item.id) === String(idFavorito)
            );

            btnFinal.classList.toggle("ativo", salvo);

            const icone = btnFinal.querySelector("i");

            if (icone) {
                icone.classList.toggle("fa-solid", salvo);
                icone.classList.toggle("fa-regular", !salvo);
            }
        }

        if (btnFinal && idFavorito !== null) {
            atualizarBotaoFavorito();

            btnFinal.addEventListener("click", evento => {
                evento.preventDefault();

                const favoritos = pegarFavoritos();

                const indice = favoritos.findIndex(
                    item => String(item.id) === String(idFavorito)
                );

                const removendo = indice !== -1;

                if (removendo) {
                    favoritos.splice(indice, 1);
                } else {
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

                    favoritos.push({
                        id: idFavorito,
                        titulo: titulo?.textContent.trim() || "Notícia",
                        data:
                            document.querySelector(".cabecalho span:last-child")
                                ?.textContent.trim() || "",
                        imagem:
                            document.querySelector(".topo-imagem img")?.src || "",
                        link: window.location.href
                    });
                }

                try {
                    localStorage.setItem(
                        "favoritos",
                        JSON.stringify(favoritos)
                    );

                    atualizarBotaoFavorito();

                    mostrarMensagem(
                        removendo
                            ? "🤍 Removido dos favoritos!"
                            : "❤️ Adicionado aos favoritos!"
                    );
                } catch (erro) {
                    console.error("Erro ao salvar favoritos:", erro);
                    mostrarMensagem("Não foi possível salvar os favoritos.");
                }
            });
        }

        window.addEventListener("pageshow", atualizarBotaoFavorito);

        window.addEventListener("storage", evento => {
            if (evento.key === "favoritos" || evento.key === null) {
                atualizarBotaoFavorito();
            }
        });

        // ==========================================
        // COMENTÁRIOS
        // ==========================================

        const pastaPHP = "/bem-estar-mais/SRC/PHP/";

        const noticiaId = Number(
            document.body.dataset.noticiaId ||
            (resultadoNumero ? resultadoNumero[1] : 0)
        );

        const btnComentar = document.getElementById("btnComentar");
        const campoComentario = document.getElementById("comentario");
        const listaComentarios = document.getElementById("listaComentarios");

        function noticiaValida() {
            return Number.isInteger(noticiaId) && noticiaId > 0;
        }

        async function enviarDados(arquivo, dados) {
            const resposta = await fetch(pastaPHP + arquivo, {
                method: "POST",
                body: dados
            });

            const texto = await resposta.text();

            if (!resposta.ok) {
                console.error(`Erro em ${arquivo}:`, texto);

                throw new Error(
                    resposta.status >= 500
                        ? "Erro no servidor. Não foi possível concluir a operação."
                        : texto.trim() || `Erro HTTP ${resposta.status}.`
                );
            }

            return texto.trim();
        }

        // ==========================================
        // PUBLICAR
        // ==========================================

        async function publicarComentario(evento) {
            evento.preventDefault();

            if (!btnComentar || !campoComentario || btnComentar.disabled) {
                return;
            }

            if (!noticiaValida()) {
                alert("Não foi possível identificar o ID desta notícia.");
                return;
            }

            const comentario = campoComentario.value.trim();

            if (!comentario) {
                alert("Digite um comentário.");
                return;
            }

            const dados = new FormData();
            dados.append("noticia_id", noticiaId);
            dados.append("comentario", comentario);

            btnComentar.disabled = true;

            try {
                const mensagem = await enviarDados("comentar.php", dados);

                if (mensagem !== "Comentário publicado!") {
                    alert(
                        mensagem || "O servidor não confirmou a publicação."
                    );
                    return;
                }

                campoComentario.value = "";
                alert(mensagem);
                await carregarComentarios();
            } catch (erro) {
                console.error("Erro ao comentar:", erro);
                alert(erro.message);
            } finally {
                btnComentar.disabled = false;
            }
        }

        if (btnComentar && campoComentario) {
            btnComentar.addEventListener("click", publicarComentario);

            const formulario = btnComentar.closest("form");

            if (formulario) {
                formulario.addEventListener("submit", publicarComentario);
            }
        }

        // ==========================================
        // CARREGAR, EDITAR E EXCLUIR
        // ==========================================

        async function carregarComentarios() {
            if (!listaComentarios) return;

            if (!noticiaValida()) {
                listaComentarios.textContent =
                    "Não foi possível identificar o ID desta notícia.";
                return;
            }

            try {
                const resposta = await fetch(
                    `${pastaPHP}buscar-comentarios.php?noticia_id=${noticiaId}`,
                    { cache: "no-store" }
                );

                if (!resposta.ok) {
                    throw new Error(
                        `Erro HTTP ${resposta.status} ao buscar comentários.`
                    );
                }

                const comentarios = await resposta.json();

                if (!Array.isArray(comentarios)) {
                    throw new Error(
                        "buscar-comentarios.php não retornou uma lista."
                    );
                }

                listaComentarios.replaceChildren();

                if (comentarios.length === 0) {
                    listaComentarios.textContent = "Nenhum comentário ainda.";
                    return;
                }

                comentarios.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("comentario-item");

                    const nome = document.createElement("strong");
                    nome.textContent = item.nome;

                    const texto = document.createElement("p");
                    texto.textContent = item.comentario;

                    div.append(nome, texto);

                    const podeEditar =
                        item.pode_editar === true ||
                        item.pode_editar === 1 ||
                        item.pode_editar === "1";

                    if (podeEditar) {
                        const acoes = document.createElement("div");
                        acoes.classList.add("acoes-comentario");

                        const editar = document.createElement("button");
                        editar.type = "button";
                        editar.textContent = "Editar";
                        editar.classList.add("btn-editar-comentario");

                        editar.addEventListener("click", async () => {
                            const novoTexto = prompt(
                                "Edite seu comentário:",
                                item.comentario
                            );

                            if (novoTexto === null || !novoTexto.trim()) {
                                return;
                            }

                            const dados = new FormData();
                            dados.append("id", item.id);
                            dados.append("comentario", novoTexto.trim());

                            editar.disabled = true;

                            try {
                                const resultado = await enviarDados(
                                    "editar-comentario.php",
                                    dados
                                );

                                console.log("Editar:", resultado);
                                await carregarComentarios();
                            } catch (erro) {
                                console.error("Erro ao editar:", erro);
                                alert(erro.message);
                            } finally {
                                editar.disabled = false;
                            }
                        });

                        const excluir = document.createElement("button");
                        excluir.type = "button";
                        excluir.textContent = "Excluir";
                        excluir.classList.add("btn-excluir-comentario");

                        excluir.addEventListener("click", async () => {
                            if (!confirm("Deseja excluir esse comentário?")) {
                                return;
                            }

                            const dados = new FormData();
                            dados.append("id", item.id);

                            excluir.disabled = true;

                            try {
                                const resultado = await enviarDados(
                                    "excluir-comentario.php",
                                    dados
                                );

                                console.log("Excluir:", resultado);
                                await carregarComentarios();
                            } catch (erro) {
                                console.error("Erro ao excluir:", erro);
                                alert(erro.message);
                            } finally {
                                excluir.disabled = false;
                            }
                        });

                        acoes.append(editar, excluir);
                        div.appendChild(acoes);
                    }

                    listaComentarios.appendChild(div);
                });
            } catch (erro) {
                console.error("Erro ao carregar comentários:", erro);

                listaComentarios.textContent =
                    "Não foi possível carregar os comentários.";
            }
        }

        carregarComentarios();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar, { once: true });
    } else {
        iniciar();
    }
})();
