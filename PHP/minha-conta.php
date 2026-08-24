<?php

session_start();

require "conexao.php";


// =========================
// VERIFICA LOGIN
// =========================

if (!isset($_SESSION["usuario_id"])) {

    header("Location: ../PÁGINAS/index.html?abrir=cadastro");

    exit;

}


// =========================
// PEGA USUÁRIO LOGADO
// =========================

$id = $_SESSION["usuario_id"];


$sql = $conexao->prepare(
    "SELECT id, nome, email, data_cadastro, foto_perfil
     FROM usuarios
     WHERE id = ?"
);

$sql->bind_param("i", $id);

$sql->execute();

$resultado = $sql->get_result();


if ($resultado->num_rows == 0) {

    echo "Usuário não encontrado.";
    exit;

}


$usuario = $resultado->fetch_assoc();


// =========================
// FOTO
// =========================

if (!empty($usuario["foto_perfil"])) {

    $fotoPerfil = $usuario["foto_perfil"];

} else {

    $fotoPerfil = "../IMAGENS/perfil.png";

}


// =========================
// MENSAGENS
// =========================

$mensagem = "";

$tipoMensagem = "";


if (isset($_GET["sucesso"])) {

    if ($_GET["sucesso"] === "nome") {

        $mensagem = "Nome alterado com sucesso!";
        $tipoMensagem = "sucesso";

    }

    if ($_GET["sucesso"] === "email") {

        $mensagem = "Email alterado com sucesso!";
        $tipoMensagem = "sucesso";

    }

    if ($_GET["sucesso"] === "senha") {

        $mensagem = "Senha alterada com sucesso!";
        $tipoMensagem = "sucesso";

    }

    if ($_GET["sucesso"] === "foto") {

        $mensagem = "Foto de perfil alterada!";
        $tipoMensagem = "sucesso";

    }

}


if (isset($_GET["erro"])) {

    $tipoMensagem = "erro";

    if ($_GET["erro"] === "email") {

        $mensagem = "Esse email já está sendo utilizado.";

    }

    if ($_GET["erro"] === "senha") {

        $mensagem = "A senha atual está incorreta.";

    }

    if ($_GET["erro"] === "confirmacao") {

        $mensagem = "As novas senhas não são iguais.";

    }

    if ($_GET["erro"] === "foto") {

        $mensagem = "Não foi possível enviar essa foto.";

    }

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

    <title>Minha Conta - Bem Estar+</title>

    <link
        rel="stylesheet"
        href="../CSS/styleperfil.css"
    >

</head>


<body>


<!-- =========================
     NAVEGAÇÃO
========================== -->

<nav>


    <!-- LOGO CLICÁVEL -->

    <div>

        <a
            href="../PÁGINAS/index.html"
            class="logo-link"
            title="Voltar para a página inicial"
        >

            <span class="logo">
                Bem Estar+
            </span>

        </a>

    </div>



    <div class="nav-direita">


        <!-- MODO ESCURO -->

        <button
            class="modo"
            id="btnModo"
            type="button"
            title="Alterar modo"
        >
            ☾
        </button>



        <!-- PERFIL -->

        <button
            class="perfil"
            id="btnPerfil"
            type="button"
            title="Ir para meu perfil"
        >
            👤
        </button>


    </div>

</nav>



<!-- MENSAGEM -->

<?php if ($mensagem !== ""): ?>

    <div
        class="mensagem-perfil <?php echo $tipoMensagem; ?>"
        id="mensagemPerfil"
    >

        <?php echo htmlspecialchars($mensagem); ?>

    </div>

<?php endif; ?>



<!-- =========================
     CONTEÚDO
========================== -->

<main class="perfil-main">


    <div
        class="perfil-container"
        id="perfilContainer"
    >



        <!-- =========================
             TOPO
        ========================== -->

        <div class="perfil-topo">


            <!-- FOTO -->

            <div class="foto-area">


                <img
                    src="<?php echo htmlspecialchars($fotoPerfil); ?>"
                    alt="Foto de perfil"
                    class="foto-perfil"
                    id="fotoPerfil"
                >



                <form
                    action="upload-foto.php"
                    method="POST"
                    enctype="multipart/form-data"
                    id="formFoto"
                >

                    <input
                        type="file"
                        name="foto"
                        id="fotoInput"
                        accept="image/png,image/jpeg,image/webp"
                        hidden
                    >


                    <button
                        type="button"
                        class="trocar-foto"
                        id="btnTrocarFoto"
                        title="Trocar foto"
                    >
                        ✎
                    </button>

                </form>


            </div>



            <!-- DADOS -->

            <div class="dados-perfil">


                <h1>
                    <?php echo htmlspecialchars($usuario["nome"]); ?>
                </h1>


                <p>
                    <?php echo htmlspecialchars($usuario["email"]); ?>
                </p>


                <button
                    type="button"
                    class="entrar-conta"
                    id="btnMinhaConta"
                >
                    Minha conta
                </button>


            </div>


        </div>



        <!-- =========================
             ESTATÍSTICAS
        ========================== -->

        <div class="estatisticas">


            <div class="estatistica">

                <i>👤</i>

                <strong>
                    <?php echo $usuario["id"]; ?>
                </strong>

                <span>
                    ID da conta
                </span>

            </div>



            <div class="estatistica">

                <i>📧</i>

                <strong>
                    ✓
                </strong>

                <span>
                    Email cadastrado
                </span>

            </div>



            <div class="estatistica">

                <i>📅</i>

                <strong>

                    <?php

                    echo date(
                        "d/m",
                        strtotime($usuario["data_cadastro"])
                    );

                    ?>

                </strong>

                <span>
                    Data de cadastro
                </span>

            </div>


        </div>



        <!-- =========================
             CONFIGURAÇÕES
        ========================== -->

        <div
            class="configuracoes"
            id="configuracoes"
        >


            <h2>
                Configurações
            </h2>



            <!-- =====================
                 NOME
            ====================== -->

            <div
                class="config-item config-clicavel"
                id="abrirNome"
            >


                <div class="config-texto">

                    <i>👤</i>


                    <div>

                        <h3>
                            Nome
                        </h3>

                        <p>
                            <?php
                            echo htmlspecialchars(
                                $usuario["nome"]
                            );
                            ?>
                        </p>

                    </div>

                </div>


                <span class="seta">
                    ›
                </span>


            </div>



            <!-- FORM NOME -->

            <form
                action="atualizar-conta.php"
                method="POST"
                class="form-edicao"
                id="formNome"
            >


                <input
                    type="hidden"
                    name="tipo"
                    value="nome"
                >


                <label>
                    Novo nome
                </label>


                <input
                    type="text"
                    name="nome"
                    maxlength="100"
                    value="<?php echo htmlspecialchars($usuario["nome"]); ?>"
                    required
                >


                <button type="submit">

                    Salvar nome

                </button>


            </form>



            <!-- =====================
                 EMAIL
            ====================== -->

            <div
                class="config-item config-clicavel"
                id="abrirEmail"
            >


                <div class="config-texto">

                    <i>✉</i>


                    <div>

                        <h3>
                            Email
                        </h3>


                        <p>

                            <?php
                            echo htmlspecialchars(
                                $usuario["email"]
                            );
                            ?>

                        </p>

                    </div>

                </div>


                <span class="seta">
                    ›
                </span>


            </div>



            <!-- FORM EMAIL -->

            <form
                action="atualizar-conta.php"
                method="POST"
                class="form-edicao"
                id="formEmail"
            >


                <input
                    type="hidden"
                    name="tipo"
                    value="email"
                >


                <label>
                    Novo email
                </label>


                <input
                    type="email"
                    name="email"
                    value="<?php echo htmlspecialchars($usuario["email"]); ?>"
                    required
                >


                <button type="submit">

                    Salvar email

                </button>


            </form>



            <!-- =====================
                 SENHA
            ====================== -->

            <div
                class="config-item config-clicavel"
                id="abrirSenha"
            >


                <div class="config-texto">

                    <i>🔒</i>


                    <div>

                        <h3>
                            Senha
                        </h3>

                        <p>
                            Alterar sua senha
                        </p>

                    </div>

                </div>


                <span class="seta">
                    ›
                </span>


            </div>



            <!-- FORM SENHA -->

            <form
                action="trocar-senha.php"
                method="POST"
                class="form-edicao"
                id="formSenha"
            >


                <label>
                    Senha atual
                </label>


                <input
                    type="password"
                    name="senha_atual"
                    required
                >


                <label>
                    Nova senha
                </label>


                <input
                    type="password"
                    name="nova_senha"
                    minlength="6"
                    required
                >


                <label>
                    Confirmar nova senha
                </label>


                <input
                    type="password"
                    name="confirmar_senha"
                    minlength="6"
                    required
                >


                <button type="submit">

                    Alterar senha

                </button>


            </form>



            <!-- =====================
                 DATA
            ====================== -->

            <div class="config-item">


                <div class="config-texto">

                    <i>📅</i>


                    <div>

                        <h3>
                            Data de cadastro
                        </h3>


                        <p>

                            <?php

                            echo htmlspecialchars(

                                date(
                                    "d/m/Y",
                                    strtotime(
                                        $usuario["data_cadastro"]
                                    )
                                )

                            );

                            ?>

                        </p>


                    </div>

                </div>


            </div>



            <!-- =====================
                 MODO ESCURO
            ====================== -->

            <div class="config-item">


                <div class="config-texto">

                    <i>🌙</i>


                    <div>

                        <h3>
                            Modo escuro
                        </h3>

                        <p>
                            Alterar aparência do site
                        </p>

                    </div>

                </div>



                <label class="switch">


                    <input
                        type="checkbox"
                        id="modoEscuro"
                    >


                    <span class="slider"></span>


                </label>


            </div>


        </div>



        <!-- =========================
             SAIR
        ========================== -->

        <button
            type="button"
            class="sair-conta"
            id="btnSair"
        >

            ↪ Sair da conta

        </button>


    </div>

</main>



<!-- =========================
     FOOTER
========================== -->

<footer>

    <p>

        © 2026 Bem Estar+ - Todos os direitos reservados.

    </p>

</footer>



<script>


// ==========================================
// MODO CLARO / ESCURO
// ==========================================

const body = document.body;

const btnModo =
    document.getElementById("btnModo");

const modoEscuro =
    document.getElementById("modoEscuro");



function carregarTema() {

    const tema =
        localStorage.getItem("tema");


    if (tema === "escuro") {

        body.classList.add("dark");

        modoEscuro.checked = true;

        btnModo.textContent = "☀";

    } else {

        body.classList.remove("dark");

        modoEscuro.checked = false;

        btnModo.textContent = "☾";

    }

}



function alternarTema() {

    body.classList.toggle("dark");


    if (
        body.classList.contains("dark")
    ) {

        localStorage.setItem(
            "tema",
            "escuro"
        );

        modoEscuro.checked = true;

        btnModo.textContent = "☀";

    } else {

        localStorage.setItem(
            "tema",
            "claro"
        );

        modoEscuro.checked = false;

        btnModo.textContent = "☾";

    }

}



btnModo.addEventListener(
    "click",
    alternarTema
);



modoEscuro.addEventListener(
    "change",
    alternarTema
);



carregarTema();



// ==========================================
// PERFIL DO TOPO
// ==========================================

const btnPerfil =
    document.getElementById("btnPerfil");


btnPerfil.addEventListener(
    "click",
    () => {

        document
            .getElementById("perfilContainer")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



// ==========================================
// BOTÃO MINHA CONTA
// ==========================================

document
    .getElementById("btnMinhaConta")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("configuracoes")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );



// ==========================================
// ABRIR EDIÇÕES
// ==========================================

const abrirNome =
    document.getElementById("abrirNome");

const abrirEmail =
    document.getElementById("abrirEmail");

const abrirSenha =
    document.getElementById("abrirSenha");


const formNome =
    document.getElementById("formNome");

const formEmail =
    document.getElementById("formEmail");

const formSenha =
    document.getElementById("formSenha");



function fecharFormularios() {

    formNome.classList.remove("aberto");

    formEmail.classList.remove("aberto");

    formSenha.classList.remove("aberto");

}



abrirNome.addEventListener(
    "click",
    () => {

        const aberto =
            formNome.classList.contains("aberto");

        fecharFormularios();

        if (!aberto) {

            formNome.classList.add("aberto");

        }

    }
);



abrirEmail.addEventListener(
    "click",
    () => {

        const aberto =
            formEmail.classList.contains("aberto");

        fecharFormularios();

        if (!aberto) {

            formEmail.classList.add("aberto");

        }

    }
);



abrirSenha.addEventListener(
    "click",
    () => {

        const aberto =
            formSenha.classList.contains("aberto");

        fecharFormularios();

        if (!aberto) {

            formSenha.classList.add("aberto");

        }

    }
);



// ==========================================
// TROCAR FOTO
// ==========================================

const btnTrocarFoto =
    document.getElementById("btnTrocarFoto");

const fotoInput =
    document.getElementById("fotoInput");

const formFoto =
    document.getElementById("formFoto");



btnTrocarFoto.addEventListener(
    "click",
    () => {

        fotoInput.click();

    }
);



fotoInput.addEventListener(
    "change",
    () => {

        if (fotoInput.files.length > 0) {

            formFoto.submit();

        }

    }
);



// ==========================================
// LOGOUT
// ==========================================

document
    .getElementById("btnSair")
    .addEventListener(
        "click",
        () => {

            const confirmar = confirm(
                "Tem certeza que deseja sair da sua conta?"
            );


            if (confirmar) {

                window.location.href =
                    "logout.php";

            }

        }
    );



// ==========================================
// MENSAGEM
// ==========================================

const mensagem =
    document.getElementById("mensagemPerfil");


if (mensagem) {

    setTimeout(
        () => {

            mensagem.style.opacity = "0";

        },
        3500
    );

}


</script>


</body>

</html>