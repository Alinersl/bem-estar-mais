<?php

require "conexao.php";

$sql = "SELECT * FROM noticias ORDER BY visualizacoes DESC";

$resultado = $conexao->query($sql);

if (!$resultado) {
    die("Erro ao carregar as notícias: " . $conexao->error);
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

    <title>Mais Lidas - Bem Estar+</title>
</head>

<body>

    <!-- NAVEGADOR -->
    <header>
        <nav>

            <div class="nav-esquerda">
                <a href="../PAGES/PÁGINAS/index1.html">

                    <img
                        src="../ASSETS/IMAGENS/LOGO/logo (2).png"
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
    <h1
        style="
            text-align: center;
            margin-top: 110px;
            margin-bottom: 35px;
        "
    >
        🔥 Notícias Mais Lidas
    </h1>

    <!-- NOTÍCIAS -->
    <div class="container">

        <?php while ($noticia = $resultado->fetch_assoc()) { ?>

            <?php

            $idNoticia = (int) $noticia["id"];

            $nomeArquivoImagem = basename(
                str_replace("\\", "/", $noticia["imagem"])
            );

            $nomeArquivoNoticia = basename(
                str_replace("\\", "/", $noticia["link"])
            );

            /*
             * IDs 26, 27, 28 e 29 são as notícias
             * dos banners da página principal.
             */

            $ehBanner =
                $idNoticia >= 26 &&
                $idNoticia <= 29;

            if ($ehBanner) {

                $caminhoImagem =
                    "../ASSETS/IMAGENS/BANNER PÁGINA PRINCIPAL/" .
                    $nomeArquivoImagem;

                $caminhoNoticia =
                    "../PAGES/NOTÍCIAS DOS BANNERS PRINCIPAIS/" .
                    $nomeArquivoNoticia;

            } else {

                $numeroCapa = str_pad(
                    $idNoticia,
                    2,
                    "0",
                    STR_PAD_LEFT
                );

                $caminhoImagem =
                    "../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not." .
                    $numeroCapa .
                    ".png";

                $caminhoNoticia =
                    "../PAGES/NOTÍCIAS/" .
                    $nomeArquivoNoticia;
            }

            /*
             * PADRONIZA A DATA COMO:
             * 20/02/2025
             */

            $dataFormatada = "";

            if (!empty($noticia["data_publicacao"])) {

                $dataPublicacao = DateTime::createFromFormat(
                    "Y-m-d",
                    $noticia["data_publicacao"]
                );

                if ($dataPublicacao) {
                    $dataFormatada =
                        $dataPublicacao->format("d/m/Y");
                }
            }

            ?>

            <div class="noticia">

                <!-- FAVORITOS -->
                <button
                    type="button"
                    class="favorito"
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

                    <!-- TÍTULO DA NOTÍCIA -->
                    <h2>
                        <?php echo htmlspecialchars(
                            $noticia["titulo"],
                            ENT_QUOTES,
                            "UTF-8"
                        ); ?>
                    </h2>

                    <!-- DATA -->
                    <?php if ($dataFormatada !== "") { ?>

                        <p class="data">
                            <?php echo htmlspecialchars(
                                $dataFormatada,
                                ENT_QUOTES,
                                "UTF-8"
                            ); ?>
                        </p>

                    <?php } ?>

                    <!-- VISUALIZAÇÕES -->
                    <p class="visualizacoes">
                        👁
                        <?php echo (int) $noticia["visualizacoes"]; ?>
                        visualizações
                    </p>

                    <!-- BOTÃO -->
                    <a
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

    </div>

    <!-- FOOTER -->
    <footer>
        <p>
            © 2025 BemEstar+ | Todos os direitos reservados
        </p>
    </footer>

    <!-- MENSAGEM DOS FAVORITOS -->
    <div id="toast"></div>

    <!-- ELEMENTOS NECESSÁRIOS PARA O SCRIPT.JS -->
    <div style="display: none !important;">

        <!-- CARROSSEL INVISÍVEL -->
        <div class="slides">
            <div class="slide"></div>
        </div>

        <button
            type="button"
            class="btn-esquerda"
        ></button>

        <button
            type="button"
            class="btn-direita"
        ></button>

        <!-- PESQUISA INVISÍVEL -->
        <div class="busca-container">

            <input
                type="text"
                id="campoBusca"
            >

            <div id="sugestoes"></div>

        </div>

        <input
            type="text"
            id="campoBuscaMobile"
        >

        <div id="sugestoesMobile"></div>

        <p id="mensagemNaoEncontrada"></p>

        <div class="paginas"></div>

        <!-- HAMBÚRGUER INVISÍVEL -->
        <div class="dropdown">

            <button
                type="button"
                id="hamburguer"
            ></button>

            <div id="menu"></div>

        </div>

    </div>

    <script src="../ASSETS/SCRIPT/script.js"></script>

</body>

</html>