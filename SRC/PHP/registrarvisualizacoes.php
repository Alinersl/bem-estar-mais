<?php

require "conexao.php";

ini_set('display_errors', 1);
error_reporting(E_ALL);

$id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;

echo "ID recebido: " . $id . "<br>";

$sql = $conexao->prepare(
    "UPDATE noticias
     SET visualizacoes = visualizacoes + 1
     WHERE id = ?"
);

$sql->bind_param("i", $id);
$sql->execute();

echo "Linhas alteradas: " . $sql->affected_rows;

$sql->close();
$conexao->close();

?>