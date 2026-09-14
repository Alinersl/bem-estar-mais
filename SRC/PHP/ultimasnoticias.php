<?php

require "conexao.php";

/*
 * BUSCA AS NOTÍCIAS DA MAIS NOVA
 * PARA A MAIS ANTIGA
 */

$sql = "SELECT
            id,
            titulo,
            link,
            imagem,
            visualizacoes,
            data_publicacao
        FROM noticias
        ORDER BY data_publicacao DESC";

$resultado = $conexao->query($sql);

if (!$resultado) {
    die(
        "Erro ao carregar as notícias: " .
        $conexao->error
    );
}

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <link
        rel="stylesheet"
        href="../ASSETS/CSS/style.css"
    >

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    >

    <title>Últimas Notícias | Bem Estar+</title>

</head>

<body>

    <!-- NAVEGADOR -->
    <header>

        <nav>

            <div class="nav-esquerda">

                <a href="/bem-estar-mais/SRC/PAGES/PÁGINAS/index.pagina1.html">

                    <img
                        src="/bem-estar-mais/SRC/ASSETS/IMAGENS/LOGO/logo (2).png"
                        alt="Logo Bem Estar+"
                        class="logo"
                    >

                </a>

            </div>

            <!-- MODO CLARO E ESCURO -->
            <div class="nav-direita">

                <div class="sol" id="sol">

                    <img
                        src="../ASSETS/IMAGENS/ÍCONES/sol.png"
                        alt="Ativar modo escuro"
                    >

                </div>

                <div class="lua" id="lua">

                    <img
                        src="../ASSETS/IMAGENS/ÍCONES/lua.png"
                        alt="Ativar modo claro"
                    >

                </div>

            </div>

        </nav>

    </header>


    <!-- TÍTULO -->
    <div class="titulo-ultimas">

        <h1>🆕 Últimas Notícias</h1>

        <p>
            Confira as notícias mais recentes do Bem Estar+
        </p>

    </div>


    <!-- NOTÍCIAS -->
    <div class="container">

        <?php if (
            $resultado &&
            $resultado->num_rows > 0
        ) { ?>

            <?php while (
                $noticia = $resultado->fetch_assoc()
            ) { ?>

                <?php

                $idNoticia = (int) $noticia["id"];

                $nomeArquivoImagem = basename(
                    str_replace(
                        "\\",
                        "/",
                        $noticia["imagem"]
                    )
                );

                $nomeArquivoNoticia = basename(
                    str_replace(
                        "\\",
                        "/",
                        $noticia["link"]
                    )
                );

                /*
                 * IDs 26 A 29 SÃO OS BANNERS
                 */

                $ehBanner =
                    $idNoticia >= 26 &&
                    $idNoticia <= 29;

                if ($ehBanner) {

                    $caminhoImagem =
                        "../ASSETS/IMAGENS/" .
                        "BANNER PÁGINA PRINCIPAL/" .
                        $nomeArquivoImagem;

                    $caminhoNoticia =
                        "../PAGES/" .
                        "NOTÍCIAS DOS BANNERS PRINCIPAIS/" .
                        $nomeArquivoNoticia;

                } else {

                    $numeroImagem = str_pad(
                        $idNoticia,
                        2,
                        "0",
                        STR_PAD_LEFT
                    );

                    $caminhoImagem =
                        "../ASSETS/IMAGENS/" .
                        "CAPA DAS NOTÍCIAS/" .
                        "capa.not." .
                        $numeroImagem .
                        ".png";

                    $caminhoNoticia =
                        "../PAGES/NOTÍCIAS/" .
                        $nomeArquivoNoticia;
                }

                /*
                 * FORMATA A DATA
                 */

                $dataFormatada = "";

                if (!empty(
                    $noticia["data_publicacao"]
                )) {

                    $dataPublicacao =
                        DateTime::createFromFormat(
                            "Y-m-d",
                            $noticia["data_publicacao"]
                        );

                    if ($dataPublicacao) {
                        $dataFormatada =
                            $dataPublicacao->format(
                                "d/m/Y"
                            );
                    }
                }

                ?>

                <div
                    class="noticia"
                    data-id="<?php echo $idNoticia; ?>"
                >

                    <!-- FAVORITO -->
                    <button
                        type="button"
                        class="favorito"
                        data-id="<?php echo $idNoticia; ?>"
                        aria-label="Adicionar aos favoritos"
                    >
                        <i class="fa-regular fa-heart"></i>
                    </button>

                    <!-- IMAGEM -->
                    <img
                        src="<?php echo htmlspecialchars(
                            $caminhoImagem,
                            ENT_QUOTES,
                            "UTF-8"
                        ); ?>"
                        alt="<?php echo htmlspecialchars(
                            $noticia["titulo"],
                            ENT_QUOTES,
                            "UTF-8"
                        ); ?>"
                    >

                    <div class="conteudo">

                        <!-- TÍTULO -->
                        <h2>
                            <?php echo htmlspecialchars(
                                $noticia["titulo"],
                                ENT_QUOTES,
                                "UTF-8"
                            ); ?>
                        </h2>

                        <!-- DATA -->
                        <?php if (
                            $dataFormatada !== ""
                        ) { ?>

                            <p class="data">
                                <?php echo htmlspecialchars(
                                    $dataFormatada,
                                    ENT_QUOTES,
                                    "UTF-8"
                                ); ?>
                            </p>

                        <?php } ?>

                        <!-- BOTÃO -->
                        <a
                            class="link-noticia"
                            data-id="<?php echo $idNoticia; ?>"
                            href="<?php echo htmlspecialchars(
                                $caminhoNoticia,
                                ENT_QUOTES,
                                "UTF-8"
                            ); ?>"
                        >
                            <button type="button">
                                Saiba Mais
                            </button>
                        </a>

                    </div>

                </div>

            <?php } ?>

        <?php } else { ?>

            <p>Nenhuma notícia encontrada.</p>

        <?php } ?>

    </div>


    <!-- FOOTER -->
    <footer>

        <p>
            © 2025 BemEstar+ | Todos os direitos reservados
        </p>

    </footer>


    <!-- MENSAGEM DOS FAVORITOS -->
    <div id="toast"></div>


    <script>

        // =====================================
        // FAVORITOS
        // =====================================

        const toast =
            document.getElementById("toast");

        function mostrarMensagem(texto) {
            if (!toast) {
                return;
            }

            toast.textContent = texto;
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 2000);
        }

        function pegarFavoritos() {
            try {
                const favoritos = JSON.parse(
                    localStorage.getItem("favoritos")
                );

                return Array.isArray(favoritos)
                    ? favoritos
                    : [];

            } catch (erro) {
                return [];
            }
        }

        function salvarFavoritos(favoritos) {
            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );
        }

        function atualizarCoracoes() {
            const favoritos = pegarFavoritos();

            document
                .querySelectorAll(".favorito")
                .forEach(botao => {

                    const id = String(
                        botao.dataset.id
                    );

                    const favoritada =
                        favoritos.some(
                            noticia =>
                                String(noticia.id) === id
                        );

                    const icone =
                        botao.querySelector("i");

                    botao.classList.toggle(
                        "ativo",
                        favoritada
                    );

                    if (icone) {
                        icone.classList.toggle(
                            "fa-solid",
                            favoritada
                        );

                        icone.classList.toggle(
                            "fa-regular",
                            !favoritada
                        );
                    }
                });
        }

        document
            .querySelectorAll(".favorito")
            .forEach(botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        const card =
                            botao.closest(".noticia");

                        if (!card) {
                            return;
                        }

                        const id =
                            String(card.dataset.id);

                        const titulo =
                            card.querySelector("h2")
                                ?.textContent
                                .trim() || "Notícia";

                        const imagem =
                            card.querySelector("img")
                                ?.src || "";

                        const data =
                            card.querySelector(".data")
                                ?.textContent
                                .trim() || "";

                        const link =
                            card.querySelector(
                                ".link-noticia"
                            )?.href || "#";

                        const favoritos =
                            pegarFavoritos();

                        const indice =
                            favoritos.findIndex(
                                noticia =>
                                    String(noticia.id) === id
                            );

                        if (indice === -1) {

                            favoritos.push({
                                id: id,
                                titulo: titulo,
                                imagem: imagem,
                                data: data,
                                link: link
                            });

                            mostrarMensagem(
                                "❤️ Adicionado com sucesso!"
                            );

                        } else {

                            favoritos.splice(
                                indice,
                                1
                            );

                            mostrarMensagem(
                                "🤍 Removido dos favoritos!"
                            );
                        }

                        salvarFavoritos(favoritos);
                        atualizarCoracoes();
                    }
                );
            });

        atualizarCoracoes();


        // =====================================
        // MODO CLARO E ESCURO
        // =====================================

        const body = document.body;
        const sol = document.getElementById("sol");
        const lua = document.getElementById("lua");

        function atualizarTema(tema) {
            const escuro = tema === "escuro";

            body.classList.toggle(
                "dark",
                escuro
            );

            if (sol) {
                sol.style.display =
                    escuro ? "none" : "block";
            }

            if (lua) {
                lua.style.display =
                    escuro ? "block" : "none";
            }
        }

        const temaSalvo =
            localStorage.getItem("tema") ||
            "claro";

        atualizarTema(temaSalvo);

        if (sol) {
            sol.addEventListener(
                "click",
                () => {
                    localStorage.setItem(
                        "tema",
                        "escuro"
                    );

                    atualizarTema("escuro");
                }
            );
        }

        if (lua) {
            lua.addEventListener(
                "click",
                () => {
                    localStorage.setItem(
                        "tema",
                        "claro"
                    );

                    atualizarTema("claro");
                }
            );
        }


        // =====================================
        // VISUALIZAÇÕES
        // =====================================

        document
            .querySelectorAll(".link-noticia")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    async function (evento) {

                        const href =
                            this.getAttribute("href");

                        const idNoticia =
                            this.dataset.id;

                        if (
                            !href ||
                            !idNoticia
                        ) {
                            return;
                        }

                        evento.preventDefault();

                        try {
                            await fetch(
                                "registrarvisualizacoes.php?id=" +
                                encodeURIComponent(idNoticia)
                            );

                        } catch (erro) {
                            console.log(
                                "Erro ao registrar visualização:",
                                erro
                            );
                        }

                        window.location.href = href;
                    }
                );
            });

    </script>

</body>

</html>