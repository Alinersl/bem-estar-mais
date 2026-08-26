<?php

include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $noticia_id = intval($_POST["noticia_id"] ?? 0);

    $nome = trim($_POST["nome"] ?? "");

    $comentario = trim($_POST["comentario"] ?? "");


    if ($noticia_id <= 0) {

        die("Notícia inválida.");

    }


    if ($nome === "" || $comentario === "") {

        die("Preencha todos os campos.");

    }


    $sql = "INSERT INTO comentarios
            (noticia_id, nome, comentario)
            VALUES (?, ?, ?)";


    $stmt = $conexao->prepare($sql);


    $stmt->bind_param(
        "iss",
        $noticia_id,
        $nome,
        $comentario
    );


    if ($stmt->execute()) {

        echo "Comentário publicado!";

    } else {

        echo "Erro ao publicar comentário.";

    }

}
?>