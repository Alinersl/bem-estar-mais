<?php

session_start();

require "conexao.php";


// Verifica se a pessoa está logada

if (!isset($_SESSION["usuario_id"])) {

    header("Location: ../../index.html");

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
    <title>Meu Perfil - Bem Estar+</title>

    <link rel="stylesheet" href="../ASSETS/CSS/styleperfil.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body>

    <div class="perfil">

        <div class="topo">

            <img src="https://i.imgur.com/V5bJQ9R.png" class="foto">

           <h2><?= htmlspecialchars($_SESSION["nome"]) ?></h2>

            <p><?= htmlspecialchars($_SESSION["email"]) ?></p>

            <button>Editar Perfil</button>

        </div>

        <div class="opcoes">
            <div class="cards">

                <div class="card">
                    <i class="fa-regular fa-newspaper"></i>
                    <h3>24</h3>
                    <span>Notícias Lidas</span>
                </div>

                <div class="card">
                    <i class="fa-solid fa-heart"></i>
                    <h3>8</h3>
                    <span>Favoritos</span>
                </div>

            </div>


            <div class="secao">

                <h3><i class="fa-solid fa-heart"></i> Favoritos</h3>
            </div>


            <div class="secao">

                <h3><i class="fa-solid fa-clock-rotate-left"></i> Histórico</h3>


            </div>


            <div class="secao">

                <h3><i class="fa-solid fa-gear"></i> Configurações</h3>

            </div>

        </div>
        <button class="sair">

            <i class="fa-solid fa-right-from-bracket"></i>

            Sair da Conta

        </button>

    </div>

</body>

</html>
