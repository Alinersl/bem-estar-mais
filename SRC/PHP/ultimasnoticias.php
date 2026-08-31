<?php

include 'conexao.php';

/* BUSCA AS NOTÍCIAS DA MAIS NOVA PARA A MAIS ANTIGA */
$sql = "SELECT id, titulo, data_publicacao
        FROM noticias
        ORDER BY data_publicacao DESC";

$resultado = $conexao->query($sql);

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../ASSETS/CSS/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <title>Últimas Notícias | Bem Estar+</title>
</head>

<body>

<!-- NAVEGADOR -->
<header>

    <nav>

        <div class="nav-esquerda">
            <a href="../../index.html">
                <img src="../ASSETS/IMAGENS/LOGO/logo (2).png" alt="Logo Bem Estar+" class="logo">
            </a>
        </div>

        <!-- MODO CLARO E MODO ESCURO-->
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

<!-- ÚLTIMAS NOTÍCIAS -->
<div class="titulo-ultimas">
    <h1>🆕 Últimas Notícias</h1>
    <p>Confira as notícias mais recentes do Bem Estar+</p>
</div>

<!-- NOTÍCIAS -->
<div class="container">

<?php

if ($resultado && $resultado->num_rows > 0) {
    while ($noticia = $resultado->fetch_assoc()) {
        $id = $noticia['id'];
        /*Converte:
        1 -> 01
        2 -> 02
        9 -> 09
        10 -> 10*/

        $numeroImagem = str_pad(
            $id,
            2,
            '0',
            STR_PAD_LEFT
        );
        /*Converte:
        2025-09-18
        para:
        18/09/2025*/

        $data = date(
            'd/m/Y',
            strtotime($noticia['data_publicacao'])
        );

?>

<!-- NOTÍCIAS -->
    <div class="noticia">

        <button class="favorito"><i class="fa-regular fa-heart"></i></button>

        <img src="../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.<?= $numeroImagem ?>.png" alt="<?= htmlspecialchars($noticia['titulo']) ?>">

        <div class="conteudo">
            <!-- título da notícia -->
            <h2><?= htmlspecialchars($noticia['titulo']) ?></h2>

            <!-- data da notícia -->
            <p class="data"><?= $data ?></p>

            <!-- botão da notícia -->
            <a href="../PAGES/NOTÍCIAS/noticia<?= $id ?>.html">
                <button>Saiba Mais</button>
            </a>
        </div>

    </div>

<?php

    }

} else {
    echo "<p>Nenhuma notícia encontrada.</p>";
}

?>

</div>

<!-- FOOTER -->
<footer>
    <p>© 2025 BemEstar+ | Todos os direitos reservados</p>
</footer>

<!-- MENSAGEM FAVORITOS -->
<div id="toast"></div>


<script>

// FAVORITOS
const toast = document.getElementById("toast");

function mostrarMensagem(texto) {
    if (!toast) return;
    toast.textContent = texto;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

document.querySelectorAll(".favorito").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("ativo");
        const icone = btn.querySelector("i");

        if (!icone) return;

        if (btn.classList.contains("ativo")) {
            icone.classList.remove(
                "fa-regular"
            );

            icone.classList.add(
                "fa-solid"
            );

            mostrarMensagem(
                "❤️ Adicionado com sucesso!"
            );

        } else {
            icone.classList.remove(
                "fa-solid"
            );

            icone.classList.add(
                "fa-regular"
            );

            mostrarMensagem(
                "🤍 Removido dos favoritos!"
            );

        }

    });

});

// MODO CLARO E MODO ESCURO
const body = document.body;
const sol = document.getElementById("sol");
const lua = document.getElementById("lua");


// carrega o tema salvo
if (
    localStorage.getItem("tema")
    ===
    "escuro"
) {

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

// ativa o modo escuro
if (sol) {
    sol.addEventListener(
        "click",
        () => {
            body.classList.add("dark");

            localStorage.setItem(
                "tema",
                "escuro"
            );

            sol.style.display = "none";

            if (lua) {
                lua.style.display = "block";
            }

        }
    );

}

// ativa o modo claro
if (lua) {

    lua.addEventListener(
        "click",
        () => {

            body.classList.remove("dark");

            localStorage.setItem(
                "tema",
                "claro"
            );

            lua.style.display = "none";

            if (sol) {
                sol.style.display = "block";
            }

        }
    );

}

// VISUALIZAÇÕES
document
    .querySelectorAll(".noticia a")
    .forEach(link => {

        link.addEventListener(
            "click",
            async function(event) {

                const href =
                    this.getAttribute("href");

                if (!href) {
                    return;
                }

                const resultado =
                    href.match(
                        /noticia(\d+)\.html/i
                    );

                if (!resultado) {
                    return;
                }

                event.preventDefault();

                const idNoticia =
                    resultado[1];

                try {

                    await fetch(
                        `registrarvisualizacoes.php?id=${idNoticia}`
                    );

                } catch (erro) {
                    console.log(
                        "Erro ao registrar visualização:",
                        erro
                    );

                }

                window.location.href =
                    href;

            }
        );

    });

</script>

</body>

</html>