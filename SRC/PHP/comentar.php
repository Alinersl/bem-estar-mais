<?php

session_start();

require "conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $noticia_id = intval($_POST["noticia_id"] ?? 0);
    $comentario = trim($_POST["comentario"] ?? "");

    if (!isset($_SESSION["usuario_id"])) {
        die("Você precisa estar logado para comentar.");
    }

    $usuario_id = $_SESSION["usuario_id"];
    $nome = $_SESSION["usuario_nome"];

    if ($noticia_id <= 0) {
        die("Notícia inválida.");
    }

    if ($comentario === "") {
        die("Digite um comentário.");
    }

    $sql = "INSERT INTO comentarios
            (noticia_id, usuario_id, nome, comentario)
            VALUES (?, ?, ?, ?)";

    $stmt = $conexao->prepare($sql);

    $stmt->bind_param(
        "iiss",
        $noticia_id,
        $usuario_id,
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