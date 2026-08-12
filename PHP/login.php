<?php

session_start();

require "conexao.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST["email"]);
    $senha = $_POST["senha"];


    // Verifica se os campos foram preenchidos

    if (empty($email) || empty($senha)) {

        die("Preencha todos os campos.");

    }


    // Procura o usuário pelo email

    $sql = $conexao->prepare("SELECT id, nome, email, senha, data_cadastro FROM usuarios WHERE email = ?");

    $sql->bind_param("s", $email);

    $sql->execute();

    $resultado = $sql->get_result();


    // Verifica se encontrou o usuário

    if ($resultado->num_rows == 0) {

        die("Email ou senha incorretos.");

    }


    $usuario = $resultado->fetch_assoc();


    // Verifica a senha

    if (!password_verify($senha, $usuario["senha"])) {

        die("Email ou senha incorretos.");

    }


    // Guarda os dados do usuário na sessão

    $_SESSION["usuario_id"] = $usuario["id"];

    $_SESSION["usuario_nome"] = $usuario["nome"];

    $_SESSION["usuario_email"] = $usuario["email"];


    // Vai para Minha Conta

    header("Location: minha-conta.php");

    exit;

}


?>