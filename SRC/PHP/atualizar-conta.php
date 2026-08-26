<?php

session_start();

require "conexao.php";


if (!isset($_SESSION["usuario_id"])) {

    header("Location: ../../index.html");
    exit;

}


$id = $_SESSION["usuario_id"];

$tipo = $_POST["tipo"] ?? "";



// ==========================================
// ALTERAR NOME
// ==========================================

if ($tipo === "nome") {

    $nome = trim(
        $_POST["nome"] ?? ""
    );


    if ($nome === "") {

        header(
            "Location: minha-conta.php"
        );

        exit;

    }


    $sql = $conexao->prepare(
        "UPDATE usuarios
         SET nome = ?
         WHERE id = ?"
    );


    $sql->bind_param(
        "si",
        $nome,
        $id
    );


    $sql->execute();


    header(
        "Location: minha-conta.php?sucesso=nome"
    );

    exit;

}



// ==========================================
// ALTERAR EMAIL
// ==========================================

if ($tipo === "email") {

    $email = trim(
        $_POST["email"] ?? ""
    );


    if (
        !filter_var(
            $email,
            FILTER_VALIDATE_EMAIL
        )
    ) {

        header(
            "Location: minha-conta.php"
        );

        exit;

    }


    // VERIFICA SE EMAIL JÁ EXISTE

    $verificar = $conexao->prepare(
        "SELECT id
         FROM usuarios
         WHERE email = ?
         AND id != ?"
    );


    $verificar->bind_param(
        "si",
        $email,
        $id
    );


    $verificar->execute();


    $resultado =
        $verificar->get_result();


    if ($resultado->num_rows > 0) {

        header(
            "Location: minha-conta.php?erro=email"
        );

        exit;

    }



    $sql = $conexao->prepare(
        "UPDATE usuarios
         SET email = ?
         WHERE id = ?"
    );


    $sql->bind_param(
        "si",
        $email,
        $id
    );


    $sql->execute();


    header(
        "Location: minha-conta.php?sucesso=email"
    );

    exit;

}



header(
    "Location: minha-conta.php"
);

exit;

?>