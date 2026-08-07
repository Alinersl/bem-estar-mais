<?php
$servidor = "localhost";
$usuario = "root";
$senha = "senac";
$banco = "bem_estar_definitivo";
$porta = 3307;
$conexao = new mysqli($servidor, $usuario, $senha, $banco, $porta);

if ($conexao->connect_error){
    die("Erro: " . $conexao->connect_error);
}
?>