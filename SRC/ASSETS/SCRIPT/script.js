(() => {
    function iniciar() {
        // Evita executar este arquivo duas vezes na mesma página.
        if (window.bemEstarScriptIniciado) return;
        window.bemEstarScriptIniciado = true;

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

            // Reaplica ao voltar pelo botão do navegador.
            window.addEventListener("pageshow", () => {
                aplicarTema(lerTema());
            });

            // Atualiza se o tema mudar em outra aba.
            window.addEventListener("storage", evento => {
                if (evento.key === "tema" || evento.key === null) {
                    aplicarTema(lerTema());
                }
            });
        }

        // Caminhos da estrutura atual do projeto.
        const pastaPHP = "/bem-estar-mais/SRC/PHP/";
        const pastaPaginas = "/bem-estar-mais/SRC/PAGES/PÁGINAS/";

        // ==========================================
        // CARROSSEL
        // ==========================================

        function iniciarCarrossel() {
            const slides = document.querySelector(".slides");
            if (!slides) return;

            const originais = Array.from(slides.children).filter(
                elemento => elemento.classList.contains("slide")
            );

            if (originais.length <= 1) return;

            const btnEsquerda = document.querySelector(".btn-esquerda");
            const btnDireita = document.querySelector(".btn-direita");

            const primeiroClone = originais[0].cloneNode(true);
            const ultimoClone = originais[originais.length - 1].cloneNode(true);

            slides.prepend(ultimoClone);
            slides.appendChild(primeiroClone);

            let index = 1;
            let animando = false;
            let temporizador;

            function mover(animacao) {
                slides.style.transition = animacao
                    ? "transform 0.6s ease-in-out"
                    : "none";

                slides.style.transform = `translateX(-${index * 100}%)`;
            }

            function finalizarMovimento() {
                if (!animando) return;

                clearTimeout(temporizador);

                if (index === originais.length + 1) {
                    index = 1;
                } else if (index === 0) {
                    index = originais.length;
                }

                mover(false);
                animando = false;
            }

            function avancar(direcao) {
                if (animando) return;

                // Garante que o reposicionamento anterior foi aplicado.
                void slides.offsetWidth;

                animando = true;
                index += direcao;
                mover(true);

                temporizador = setTimeout(finalizarMovimento, 700);
            }

            slides.addEventListener("transitionend", evento => {
                if (
                    evento.target === slides &&
                    evento.propertyName === "transform"
                ) {
                    finalizarMovimento();
                }
            });

            btnDireita?.addEventListener("click", evento => {
                evento.preventDefault();
                avancar(1);
            });

            btnEsquerda?.addEventListener("click", evento => {
                evento.preventDefault();
                avancar(-1);
            });

            mover(false);

            setInterval(() => {
                if (!document.hidden) avancar(1);
            }, 3000);
        }

        iniciarCarrossel();

        // ==========================================
        // HAMBÚRGUER
        // ==========================================

        const hamburguer = document.getElementById("hamburguer");
        const menu = document.getElementById("menu");

        if (hamburguer && menu) {
            hamburguer.addEventListener("click", evento => {
                evento.preventDefault();
                menu.classList.toggle("ativo");
            });

            document.addEventListener("click", evento => {
                if (!evento.target.closest(".dropdown")) {
                    menu.classList.remove("ativo");
                }
            });
        }

        // ==========================================
        // FAVORITOS
        // ==========================================

        const toast = document.getElementById("toast");
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

        function identificarNoticia(link) {
            if (!link) return null;

            const nome = new URL(
                link.href,
                window.location.href
            ).pathname.split("/").pop();

            const resultado = nome.match(/^noticia(\d+)\.html$/i);
            return resultado ? Number(resultado[1]) : null;
        }

        function atualizarFavoritos() {
            const favoritos = pegarFavoritos();

            document.querySelectorAll(".noticia").forEach(card => {
                const botao = card.querySelector(".favorito");
                const link = card.querySelector(".conteudo a");
                const id = identificarNoticia(link);

                if (!botao || id === null) return;

                const salvo = favoritos.some(
                    item => String(item.id) === String(id)
                );

                botao.classList.toggle("ativo", salvo);

                const icone = botao.querySelector("i");

                if (icone) {
                    icone.classList.toggle("fa-solid", salvo);
                    icone.classList.toggle("fa-regular", !salvo);
                }
            });
        }

        // Funciona também nos cards criados pela pesquisa.
        document.addEventListener("click", evento => {
            const botao = evento.target.closest(".noticia .favorito");
            if (!botao) return;

            const card = botao.closest(".noticia");
            const link = card.querySelector(".conteudo a");
            const id = identificarNoticia(link);

            if (id === null) return;

            evento.preventDefault();

            const favoritos = pegarFavoritos();
            const indice = favoritos.findIndex(
                item => String(item.id) === String(id)
            );

            const removendo = indice !== -1;

            if (removendo) {
                favoritos.splice(indice, 1);
            } else {
                favoritos.push({
                    id,
                    titulo:
                        card.querySelector(".conteudo h2")
                            ?.textContent.trim() || "Notícia",
                    data:
                        card.querySelector(".data")
                            ?.textContent.trim() || "",
                    imagem: card.querySelector("img")?.src || "",
                    link: link.href
                });
            }

            try {
                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                );

                atualizarFavoritos();

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

        atualizarFavoritos();

        window.addEventListener("pageshow", atualizarFavoritos);

        window.addEventListener("storage", evento => {
            if (evento.key === "favoritos" || evento.key === null) {
                atualizarFavoritos();
            }
        });

        // ==========================================
        // CONTADOR DE VISUALIZAÇÕES
        // ==========================================

        document.addEventListener("click", evento => {
            const link = evento.target.closest(".noticia a");
            if (!link) return;

            const id = identificarNoticia(link);
            if (id === null) return;

            // Mantém a navegação normal do link.
            fetch(
                `${pastaPHP}registrarvisualizacoes.php?id=${id}`,
                {
                    keepalive: true,
                    cache: "no-store"
                }
            )
                .then(resposta => {
                    if (!resposta.ok) {
                        throw new Error(`HTTP ${resposta.status}`);
                    }
                })
                .catch(erro => {
                    console.error("Erro ao registrar visualização:", erro);
                });
        });

        // ==========================================
        // PESQUISA
        // ==========================================

        function iniciarPesquisa() {
            const container = document.querySelector(".container");
            const campoBusca = document.getElementById("campoBusca");
            const campoMobile = document.getElementById("campoBuscaMobile");

            if (!container || (!campoBusca && !campoMobile)) return;

            const sugestoesBox = document.getElementById("sugestoes");
            const sugestoesMobile = document.getElementById("sugestoesMobile");
            const paginas = document.querySelector(".paginas");
            const displayPaginas = paginas?.style.display || "";

            let mensagem = document.getElementById("mensagemNaoEncontrada");

            if (!mensagem) {
                mensagem = document.createElement("p");
                mensagem.id = "mensagemNaoEncontrada";
            }

            // A mensagem precisa estar fora de blocos invisíveis.
            container.prepend(mensagem);
            mensagem.style.display = "none";
            mensagem.setAttribute("role", "status");

            const originais = Array.from(
                container.querySelectorAll(".noticia")
            );

            let todasNoticias = [...originais];
            let carregamento;
            let falhaCarregamento = false;
            let versaoPesquisa = 0;

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

            function normalizar(texto) {
                return texto
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .trim();
            }

            async function carregarTodasNoticias() {
                const mapa = new Map();

                function adicionar(card) {
                    const link = card.querySelector(".conteudo a");
                    const chave = link?.href || card.textContent.trim();

                    if (!mapa.has(chave)) mapa.set(chave, card);
                }

                originais.forEach(adicionar);

                const resultados = await Promise.all(
                    [1, 2, 3, 4].map(async numero => {
                        const url = new URL(
                            `${pastaPaginas}index.pagina${numero}.html`,
                            window.location.origin
                        );

                        try {
                            const resposta = await fetch(url);

                            if (!resposta.ok) {
                                throw new Error(`HTTP ${resposta.status}`);
                            }

                            const html = await resposta.text();
                            const documento = new DOMParser().parseFromString(
                                html,
                                "text/html"
                            );

                            const cards = Array.from(
                                documento.querySelectorAll(".noticia")
                            );

                            cards.forEach(card => {
                                // Resolve os caminhos a partir da página original.
                                card.querySelectorAll("[href], [src]").forEach(
                                    elemento => {
                                        ["href", "src"].forEach(atributo => {
                                            const valor = elemento.getAttribute(
                                                atributo
                                            );

                                            if (valor) {
                                                elemento.setAttribute(
                                                    atributo,
                                                    new URL(valor, url).href
                                                );
                                            }
                                        });
                                    }
                                );
                            });

                            return cards;
                        } catch (erro) {
                            falhaCarregamento = true;
                            console.error("Erro ao carregar:", url.href, erro);
                            return [];
                        }
                    })
                );

                resultados.flat().forEach(adicionar);
                todasNoticias = Array.from(mapa.values());
            }

            async function filtrarNoticias(texto) {
                const versao = ++versaoPesquisa;
                const valor = normalizar(texto);

                if (!valor) {
                    container.querySelectorAll(".noticia").forEach(card => {
                        card.remove();
                    });

                    originais.forEach(card => container.appendChild(card));

                    mensagem.style.display = "none";
                    document.body.classList.remove("sem-resultados");

                    if (paginas) paginas.style.display = displayPaginas;

                    atualizarFavoritos();
                    return;
                }

                if (!carregamento) {
                    carregamento = carregarTodasNoticias();
                }

                mensagem.textContent = "Buscando notícias...";
                mensagem.style.display = "block";

                await carregamento;

                // Ignora uma pesquisa antiga se a pessoa já digitou outra.
                if (versao !== versaoPesquisa) return;

                container.querySelectorAll(".noticia").forEach(card => {
                    card.remove();
                });

                const encontradas = todasNoticias.filter(card => {
                    return normalizar(card.textContent).includes(valor);
                });

                encontradas.forEach(card => {
                    container.appendChild(card.cloneNode(true));
                });

                mensagem.textContent = falhaCarregamento
                    ? "Não foi possível pesquisar todas as páginas. Recarregue e tente novamente."
                    : "Notícia não encontrada.";

                mensagem.style.display =
                    encontradas.length === 0 || falhaCarregamento
                        ? "block"
                        : "none";

                document.body.classList.toggle(
                    "sem-resultados",
                    encontradas.length === 0
                );

                if (paginas) paginas.style.display = "none";

                atualizarFavoritos();
            }

            function configurarPesquisa(campo, caixa) {
                if (!campo) return;

                function pesquisar(texto) {
                    if (campoBusca) campoBusca.value = texto;
                    if (campoMobile) campoMobile.value = texto;

                    filtrarNoticias(texto);
                }

                campo.addEventListener("input", () => {
                    pesquisar(campo.value);

                    [sugestoesBox, sugestoesMobile].forEach(elemento => {
                        if (elemento) elemento.style.display = "none";
                    });

                    if (!caixa) return;

                    caixa.replaceChildren();

                    const valor = normalizar(campo.value);

                    if (!valor) return;

                    const filtradas = sugestoes.filter(item => {
                        return normalizar(item).includes(valor);
                    });

                    filtradas.forEach(item => {
                        const div = document.createElement("div");
                        div.classList.add("sugestao");
                        div.textContent = item;

                        div.addEventListener("click", () => {
                            pesquisar(item);
                            caixa.style.display = "none";
                        });

                        caixa.appendChild(div);
                    });

                    caixa.style.display = filtradas.length ? "block" : "none";
                });
            }

            configurarPesquisa(campoBusca, sugestoesBox);
            configurarPesquisa(campoMobile, sugestoesMobile);

            document.addEventListener("click", evento => {
                if (!evento.target.closest(".busca-container")) {
                    if (sugestoesBox) sugestoesBox.style.display = "none";
                    if (sugestoesMobile) sugestoesMobile.style.display = "none";
                }
            });
        }

        iniciarPesquisa();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar, { once: true });
    } else {
        iniciar();
    }
})();