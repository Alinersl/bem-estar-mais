<?php

session_start();

require "conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    die("Não autorizado.");
}

$id = intval($_POST["id"] ?? 0);
$comentario = trim($_POST["comentario"] ?? "");
$usuario_id = $_SESSION["usuario_id"];

if ($id <= 0) {
    die("Comentário inválido.");
}

if ($comentario === "") {
    die("Comentário vazio.");
}

$sql = $conexao->prepare(
    "UPDATE comentarios
     SET comentario = ?
     WHERE id = ?
     AND usuario_id = ?"
);

$sql->bind_param(
    "sii",
    $comentario,
    $id,
    $usuario_id
);

$sql->execute();

if ($sql->affected_rows > 0) {

    echo "Comentário editado.";

} else {

    echo "Você não pode editar esse comentário.";

}
?>