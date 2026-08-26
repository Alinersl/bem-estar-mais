/* RENOMEIE ESSE ARQUIVO COMO conexao.php */
<?php
$servidor = '[INSIRA-SERVIDOR-MYSQL]';
$usuario = '[INSIRA-USUARIO-MYSQL]';
$senha = '[INSIRA-SENHA-MYSQL]';
$banco = '[INSIRA-BANCO-DE-DADOS]';
$porta = '[INSIRA-PORTA-DO-SERVIDOR]';

$conexao = new mysqli($servidor, $usuario, $senha, $banco, $porta);

if ($conexao->connect_error){
    die("Erro: " . $conexao->connect_error);
}
?>