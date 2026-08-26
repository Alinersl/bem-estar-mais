<?php

session_start();

require "conexao.php";


// Pega os dados enviados pelo formulário

$email = $_POST["email"];
$senha = $_POST["senha"];


// Procura o usuário pelo email

$sql = $conexao->prepare("SELECT id, nome, email, senha FROM usuarios WHERE email = ?");

$sql->bind_param("s", $email);

$sql->execute();

$resultado = $sql->get_result();


// Verifica se o email existe

if ($resultado->num_rows == 0) {

    header("Location: ../../index.html?erro=login");
    exit;

}


// Pega os dados do usuário

$usuario = $resultado->fetch_assoc();


// Verifica a senha

if (!password_verify($senha, $usuario["senha"])) {

    header("Location: ../../index.html?erro=login");
    exit;

}


// Login correto

$_SESSION["usuario_id"] = $usuario["id"];

$_SESSION["usuario_nome"] = $usuario["nome"];


// Vai para a página da conta

header("Location: minha-conta.php");
exit;

?>