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

            <div class="nav-direita">

                <!-- PESQUISAR -->
                <div class="busca-container">
                    <input type="text" id="campoBusca" placeholder="🔍 Buscar...">
                    <div id="sugestoes"></div>
                </div>

                <!-- MODO CLARO E ESCURO -->
                <div class="sol" id="sol">
                    <img src="../ASSETS/IMAGENS/ÍCONES/sol.png" alt="Modo claro">
                </div>

                <div class="lua" id="lua">
                    <img src="../ASSETS/IMAGENS/ÍCONES/lua.png" alt="Modo escuro">
                </div>

                <!-- MENU -->
                <div class="dropdown">

                    <img
                        src="../ASSETS/IMAGENS/ÍCONES/hamburguer.png"
                        class="hamburguer"
                        id="hamburguer"
                        alt="Menu"
                    >

                    <div class="dropdown-content" id="menu">
                        <ul>
                            <li><a href="../../index.html">🏠 Sobre Nós</a></li>
                            <li><a href="#">🆕 Últimas Notícias</a></li>
                            <li><a href="./mais-lidas.php">🔥 Mais Lidas</a></li>
                            <li><a href="#">❤️ Favoritas</a></li>
                            <li><a href="../PHP/minha-conta.php">👤 Conta</a></li>
                        </ul>
                    </div>

                </div>

            </div>

        </nav>
    </header>


    <!-- TÍTULO -->
    <h1 style="text-align: center; margin-top: 110px; margin-bottom: 35px;">
        🔥 Notícias Mais Lidas
    </h1>


    <!-- NOTÍCIAS -->
    <div class="container">

        <?php while ($noticia = $resultado->fetch_assoc()) { ?>

            <div class="noticia">

                <button class="favorito">
                    <i class="fa-regular fa-heart"></i>
                </button>

                <img
                    src="<?php echo htmlspecialchars($noticia["imagem"]); ?>"
                    alt="<?php echo htmlspecialchars($noticia["titulo"]); ?>"
                >

                <div class="conteudo">

                    <h2>
                        <?php echo htmlspecialchars($noticia["titulo"]); ?>
                    </h2>

                    <p class="visualizacoes">
                        👁
                        <?php echo $noticia["visualizacoes"]; ?>
                        visualizações
                    </p>

                    <a href="<?php echo htmlspecialchars($noticia["link"]); ?>">
                        <button>
                            Saiba Mais
                        </button>
                    </a>

                </div>

            </div>

        <?php } ?>

    </div>


    <!-- FOOTER -->
    <footer>
        <p>© 2025 BemEstar+ | Todos os direitos reservados</p>
    </footer>

    <div id="toast"></div>

    <script src="../ASSETS/SCRIPT/script.js"></script>

</body>

</html>