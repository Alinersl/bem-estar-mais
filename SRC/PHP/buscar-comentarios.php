<?php

session_start();

require "conexao.php";

$noticia_id = intval(
    $_GET["noticia_id"] ?? 0
);

$sql = "SELECT
            id,
            usuario_id,
            nome,
            comentario,
            data_comentario
        FROM comentarios
        WHERE noticia_id = ?
        ORDER BY data_comentario DESC";

$stmt = $conexao->prepare($sql);

$stmt->bind_param(
    "i",
    $noticia_id
);

$stmt->execute();

$resultado = $stmt->get_result();

$comentarios = [];

$usuarioLogado = $_SESSION["usuario_id"] ?? null;

while ($linha = $resultado->fetch_assoc()) {

    $linha["pode_editar"] =
        $usuarioLogado !== null &&
        intval($linha["usuario_id"]) === intval($usuarioLogado);

    $comentarios[] = $linha;

}

header(
    "Content-Type: application/json; charset=UTF-8"
);

echo json_encode(
    $comentarios,
    JSON_UNESCAPED_UNICODE
);
?>