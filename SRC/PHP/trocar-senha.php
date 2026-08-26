<?php

session_start();

require "conexao.php";


if (!isset($_SESSION["usuario_id"])) {

    header("Location: ../../index.html");
    exit;

}


$id = $_SESSION["usuario_id"];


$senhaAtual =
    $_POST["senha_atual"] ?? "";


$novaSenha =
    $_POST["nova_senha"] ?? "";


$confirmarSenha =
    $_POST["confirmar_senha"] ?? "";



// ==========================================
// CONFIRMAÇÃO
// ==========================================

if ($novaSenha !== $confirmarSenha) {

    header(
        "Location: minha-conta.php?erro=confirmacao"
    );

    exit;

}



// ==========================================
// TAMANHO MÍNIMO
// ==========================================

if (strlen($novaSenha) < 6) {

    header(
        "Location: minha-conta.php?erro=confirmacao"
    );

    exit;

}



// ==========================================
// BUSCA SENHA ATUAL
// ==========================================

$sql = $conexao->prepare(
    "SELECT senha
     FROM usuarios
     WHERE id = ?"
);


$sql->bind_param(
    "i",
    $id
);


$sql->execute();


$resultado =
    $sql->get_result();


$usuario =
    $resultado->fetch_assoc();



// ==========================================
// VERIFICA SENHA
// ==========================================

if (
    !password_verify(
        $senhaAtual,
        $usuario["senha"]
    )
) {

    header(
        "Location: minha-conta.php?erro=senha"
    );

    exit;

}



// ==========================================
// NOVA SENHA CRIPTOGRAFADA
// ==========================================

$senhaHash =
    password_hash(
        $novaSenha,
        PASSWORD_DEFAULT
    );



$atualizar = $conexao->prepare(
    "UPDATE usuarios
     SET senha = ?
     WHERE id = ?"
);


$atualizar->bind_param(
    "si",
    $senhaHash,
    $id
);


$atualizar->execute();



header(
    "Location: minha-conta.php?sucesso=senha"
);

exit;

?>
