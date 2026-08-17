<?php

session_start();

require "conexao.php";


// Verifica se a pessoa está logada

if (!isset($_SESSION["usuario_id"])) {

    header("Location: ../PÁGINAS/index.html");

    exit;

}


// Pega o ID do usuário que está logado

$id = $_SESSION["usuario_id"];


$sql = $conexao->prepare("SELECT id, nome, email, data_cadastro FROM usuarios WHERE id = ?");

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


    <div class="conta">

        <h1>Minha Conta</h1>

        <p class="subtitulo">
            Bem-vindo, <?php echo htmlspecialchars($usuario["nome"]); ?>!
        </p>


        <div class="perfil">


            <div class="informacao">

                <strong>Nome</strong>

                <span>
                    <?php echo htmlspecialchars($usuario["nome"]); ?>
                </span>

            </div>


            <div class="informacao">

                <strong>Email</strong>

                <span>
                    <?php echo htmlspecialchars($usuario["email"]); ?>
                </span>

            </div>


            <div class="informacao">

                <strong>Data de cadastro</strong>

                <span>
                    <?php echo htmlspecialchars($usuario["data_cadastro"]); ?>
                </span>

            </div>


        </div>


        <a href="logout.php" class="btn-sair">
            Sair da conta
        </a>


        <a href="../PÁGINAS/index.html" class="btn-voltar">
            Voltar para o site
        </a>


    </div>


</body>

</html>