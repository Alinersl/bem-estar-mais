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


    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }


        body {
            min-height: 100vh;

            background: #f4f4f4;

            display: flex;
            justify-content: center;
            align-items: center;

            color: #000;
        }


        .conta {
            width: 500px;
            max-width: 90%;

            background: white;

            padding: 40px;

            border-radius: 20px;

            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

            text-align: center;
        }


        .conta h1 {
            color: #ff2b2b;

            margin-bottom: 10px;
        }


        .conta p.subtitulo {
            color: #555;

            margin-bottom: 35px;
        }


        .perfil {
            text-align: left;
        }


        .informacao {
            margin-bottom: 20px;

            padding: 15px;

            background: #f4f4f4;

            border-radius: 10px;
        }


        .informacao strong {
            display: block;

            color: #ff2b2b;

            margin-bottom: 5px;
        }


        .informacao span {
            color: #222;

            word-break: break-word;
        }


        .btn-sair {
            display: block;

            margin-top: 30px;

            padding: 15px;

            width: 100%;

            background: #ff2b2b;

            color: white;

            text-decoration: none;

            border-radius: 30px;

            font-weight: bold;

            transition: 0.3s;
        }


        .btn-sair:hover {
            background: #ff4d4d;

            transform: scale(1.03);
        }


        .btn-voltar {
            display: block;

            margin-top: 15px;

            color: #ff2b2b;

            text-decoration: none;

            font-weight: bold;
        }


        .btn-voltar:hover {
            text-decoration: underline;
        }

    </style>

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