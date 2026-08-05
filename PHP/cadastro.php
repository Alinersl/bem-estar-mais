<?php

require "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = trim($_POST["nome"]);
    $email = trim($_POST["email"]);
    $senha = $_POST["senha"];

    if (empty($nome) || empty($email) || empty($senha)) {
        die("Preencha todos os campos.");
    }

    // Verifica se o e-mail já existe
    $verifica = $conexao->prepare("SELECT id FROM usuarios WHERE email = ?");
    $verifica->bind_param("s", $email);
    $verifica->execute();
    $resultado = $verifica->get_result();

    if ($resultado->num_rows > 0) {
        die("Este e-mail já está cadastrado.");
    }

    // Criptografa a senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Insere o usuário
    $sql = $conexao->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $nome, $email, $senhaHash);

    if ($sql->execute()) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . $sql->error;
    }

    $sql->close();
    $verifica->close();
    $conexao->close();
}

?>