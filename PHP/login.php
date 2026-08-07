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

    // Procura o usuário pelo e-mail
    $sql = $conexao->prepare("SELECT * FROM usuarios WHERE email = ?");
    $sql->execute([$email]);

    if ($sql->rowCount() == 1) {

        $usuario = $sql->fetch(PDO::FETCH_ASSOC);

        // Verifica a senha
        if (password_verify($senha, $usuario["senha"])) {

            $_SESSION["id"] = $usuario["id"];
            $_SESSION["nome"] = $usuario["nome"];
            $_SESSION["email"] = $usuario["email"];

            header("Location: ../PÁGINAS/perfil.php");
            exit;

        } else {

            echo "Senha incorreta.";

        }

    } else {

        echo "E-mail não encontrado.";

    }

} else {

    header("Location: ../PÁGINAS/index.html");
    exit;

}

?>