<?php

session_start();

require "conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nome = trim($_POST["nome"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $senha = $_POST["senha"] ?? "";

    if ($nome === "" || $email === "" || $senha === "") {
        die("Preencha todos os campos.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Digite um e-mail válido.");
    }

    // VERIFICA SE O E-MAIL JÁ ESTÁ CADASTRADO
    $verifica = $conexao->prepare(
        "SELECT id FROM usuarios WHERE email = ?"
    );

    if (!$verifica) {
        die("Erro ao verificar o e-mail.");
    }

    $verifica->bind_param("s", $email);
    $verifica->execute();

    $resultado = $verifica->get_result();

    if ($resultado->num_rows > 0) {
        $verifica->close();
        $conexao->close();

        die("Este e-mail já está cadastrado.");
    }

    // CRIPTOGRAFA A SENHA
    $senhaHash = password_hash(
        $senha,
        PASSWORD_DEFAULT
    );

    // CADASTRA O USUÁRIO
    $sql = $conexao->prepare(
        "INSERT INTO usuarios (nome, email, senha)
         VALUES (?, ?, ?)"
    );

    if (!$sql) {
        $verifica->close();
        $conexao->close();

        die("Erro ao preparar o cadastro.");
    }

    $sql->bind_param(
        "sss",
        $nome,
        $email,
        $senhaHash
    );

    if ($sql->execute()) {

        // ID DO USUÁRIO CADASTRADO
        $idUsuario = $sql->insert_id;

        // RENOVA O ID DA SESSÃO
        session_regenerate_id(true);

        // FAZ LOGIN AUTOMATICAMENTE
        $_SESSION["usuario_id"] = $idUsuario;
        $_SESSION["usuario_nome"] = $nome;
        $_SESSION["usuario_email"] = $email;

        $sql->close();
        $verifica->close();
        $conexao->close();

        // REDIRECIONA DIRETAMENTE PARA O PERFIL
        header("Location: minha-conta.php");
        exit;

    } else {
        $erro = $sql->error;

        $sql->close();
        $verifica->close();
        $conexao->close();

        die("Erro ao cadastrar: " . $erro);
    }
}

?>