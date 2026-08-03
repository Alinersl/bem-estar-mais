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
    $verifica->execute([$email]);

    if ($verifica->rowCount() > 0) {
        die("Este e-mail já está cadastrado.");
    }

    // Criptografa a senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Cadastra o usuário
    $sql = $conexao->prepare("
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    ");

    $sql->execute([
        $nome,
        $email,
        $senhaHash
    ]);

    echo "Cadastro realizado com sucesso!";

}

?>