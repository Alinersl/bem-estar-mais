<?php

session_start();

require "conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    die("Não autorizado.");
}

$id = intval($_POST["id"] ?? 0);
$usuario_id = $_SESSION["usuario_id"];

if ($id <= 0) {
    die("Comentário inválido.");
}

$sql = $conexao->prepare(
    "DELETE FROM comentarios
     WHERE id = ?
     AND usuario_id = ?"
);

$sql->bind_param(
    "ii",
    $id,
    $usuario_id
);

$sql->execute();

if ($sql->affected_rows > 0) {

    echo "Comentário excluído.";

} else {

    echo "Você não pode excluir esse comentário.";

}
?>