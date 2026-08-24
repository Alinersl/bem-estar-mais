<?php

session_start();

require "conexao.php";


// =========================
// VERIFICA LOGIN
// =========================

if (!isset($_SESSION["usuario_id"])) {

    header("Location: ../PÁGINAS/index.html");

    exit;

}


// =========================
// PEGA USUÁRIO LOGADO
// =========================

$id = $_SESSION["usuario_id"];


$sql = $conexao->prepare(
    "SELECT id, nome, email, data_cadastro
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

?>

<!DOCTYPE html>

<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Minha Conta - Bem Estar+</title>

    <link rel="stylesheet" href="../CSS/styleperfil.css">

</head>


<body>


    <!-- =========================
         NAVEGAÇÃO
    ========================== -->

    <nav>

        <div>

            <span class="logo">
                Bem Estar+
            </span>

        </div>


        <div class="nav-direita">

            <!-- BOTÃO MODO ESCURO -->

            <button
                class="modo"
                type="button"
                onclick="alternarModo()"
                title="Alterar modo"
            >
                ☾
            </button>


            <!-- PERFIL -->

            <button
                class="perfil"
                type="button"
                title="Perfil"
            >
                👤
            </button>

        </div>

    </nav>



    <!-- =========================
         CONTEÚDO PRINCIPAL
    ========================== -->

    <main class="perfil-main">


        <!-- =========================
             CONTAINER
        ========================== -->

        <div class="perfil-container">


            <!-- =========================
                 TOPO DO PERFIL
            ========================== -->

            <div class="perfil-topo">


                <!-- FOTO -->

                <div class="foto-area">

                    <img
                        src="../IMAGENS/perfil.png"
                        alt="Foto de perfil"
                        class="foto-perfil"
                    >

                    <button
                        type="button"
                        class="trocar-foto"
                        title="Trocar foto"
                    >
                        ✎
                    </button>

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

            <div class="configuracoes">


                <h2>
                    Configurações
                </h2>


                <!-- NOME -->

                <div class="config-item">

                    <div class="config-texto">

                        <i>👤</i>

                        <div>

                            <h3>
                                Nome
                            </h3>

                            <p>
                                <?php echo htmlspecialchars($usuario["nome"]); ?>
                            </p>

                        </div>

                    </div>

                    <span class="seta">
                        ›
                    </span>

                </div>



                <!-- EMAIL -->

                <div class="config-item">

                    <div class="config-texto">

                        <i>✉</i>

                        <div>

                            <h3>
                                Email
                            </h3>

                            <p>
                                <?php echo htmlspecialchars($usuario["email"]); ?>
                            </p>

                        </div>

                    </div>

                    <span class="seta">
                        ›
                    </span>

                </div>



                <!-- DATA DE CADASTRO -->

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
                                        strtotime($usuario["data_cadastro"])
                                    )
                                );
                                ?>
                            </p>

                        </div>

                    </div>

                    <span class="seta">
                        ›
                    </span>

                </div>



                <!-- MODO ESCURO -->

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
                            onchange="alternarModoSwitch()"
                        >

                        <span class="slider"></span>

                    </label>

                </div>


            </div>



            <!-- =========================
                 SAIR
            ========================== -->

            <a
                href="logout.php"
                class="sair-conta"
            >
                ↪ Sair da conta
            </a>


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

    </script>


</body>

</html>
```
