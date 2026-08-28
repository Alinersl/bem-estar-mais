<?php

require "conexao.php";

$sql = "SELECT * FROM noticias ORDER BY visualizacoes DESC";

$resultado = $conexao->query($sql);

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../ASSETS/CSS/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <title>Mais Lidas - Bem Estar+</title>
</head>

<body>

    <!-- NAVEGADOR -->
    <header>

        <nav>

            <div class="nav-esquerda">
                <a href="../PAGES/PÁGINAS/index1.html">
                    <img src="../ASSETS/IMAGENS/LOGO/logo (2).png" alt="Logo Bem Estar+" class="logo">
                </a>
            </div>

            <!-- MODO CLARO E ESCURO -->
            <div class="nav-direita">
                <div class="sol" id="sol">
                    <img src="../ASSETS/IMAGENS/ÍCONES/sol.png" alt="Modo claro">
                </div>

                <div class="lua" id="lua">
                    <img src="../ASSETS/IMAGENS/ÍCONES/lua.png" alt="Modo escuro">
                </div>
            </div>

        </nav>

    </header>

    <!-- NOTÍCAS MAIS LIDAS -->
    <h1 style="
            text-align: center;
            margin-top: 110px;
            margin-bottom: 35px;
            "
    >
        🔥 Notícias Mais Lidas</h1>

    <!-- NOTÍCIAS -->
    <div class="container">

        <?php while ($noticia = $resultado->fetch_assoc()) { ?>

            <div class="noticia">

                <!-- FAVORITOS -->
                <button class="favorito"><i class="fa-regular fa-heart"></i></button>

                <!-- imagem da notpicia -->
                <img src="<?php echo htmlspecialchars($noticia["imagem"]); ?>"
                alt="<?php echo htmlspecialchars($noticia["titulo"]); ?>">

                <div class="conteudo">

                <!-- título da notícia -->
                    <h2><?php echo htmlspecialchars($noticia["titulo"]); ?></h2>

                    <!-- VISUALIZAÇÕES -->
                    <p class="visualizacoes"> 
                        👁
                        <?php echo $noticia["visualizacoes"]; ?>
                        visualizações
                    </p>

                    <!-- botão da notícia -->
                    <a href="<?php echo htmlspecialchars($noticia["link"]); ?>">
                        <button>Saiba Mais</button>
                    </a>

                </div>

            </div>

        <?php } ?>

    </div>

    <!-- FOOTER -->
    <footer>
        <p>© 2025 BemEstar+ | Todos os direitos reservados</p>
    </footer>

    <!-- MENSAGEM DOS FAVORITOS -->
    <div id="toast"></div>


    <div style="display: none !important;">

        <!-- CARROSSEL INVISÍVEL -->
        <div class="slides">
            <div class="slide"></div>
        </div>

        <button type="button" class="btn-esquerda"></button>
        <button type="button" class="btn-direita"></button>

        <!-- PESQUISA INVISÍVEL -->
        <div class="busca-container">
            <input type="text" id="campoBusca">
            <div id="sugestoes"></div>
        </div>

        <input type="text" id="campoBuscaMobile">
        
        <div id="sugestoesMobile"></div>
        
        <p id="mensagemNaoEncontrada"></p>
        
        <div class="paginas"></div>

        <!-- HAMBÚRGUER INVISÍVEL -->
        <div class="dropdown">
            <button type="button" id="hamburguer"></button>
            <div id="menu"></div>
        </div>

    </div>

    <script src="../ASSETS/SCRIPT/script.js"></script>

</body>

</html>