<?php
$servidor = "localhost";
$usuario = "root";
$senha = "senac";
$banco = "sistemanovo";
$conexao = new mysqli($servidor, $usuario, $senha, $banco, 3307);

if ($conexao->connect_error){
    die("Erro: " . $conexao->connect_error);
}

echo "Conectado com sucesso";
?>

