<?php

session_start();

require "conexao.php";


if (!isset($_SESSION["usuario_id"])) {

    header(
        "Location: ../PÁGINAS/index.html"
    );

    exit;

}


$id = $_SESSION["usuario_id"];


// ==========================================
// VERIFICA ARQUIVO
// ==========================================

if (
    !isset($_FILES["foto"]) ||
    $_FILES["foto"]["error"] !== UPLOAD_ERR_OK
) {

    header(
        "Location: minha-conta.php?erro=foto"
    );

    exit;

}



// ==========================================
// TAMANHO MÁXIMO: 2MB
// ==========================================

if ($_FILES["foto"]["size"] > 2 * 1024 * 1024) {

    header(
        "Location: minha-conta.php?erro=foto"
    );

    exit;

}



// ==========================================
// DESCOBRE TIPO REAL
// ==========================================

$finfo = new finfo(
    FILEINFO_MIME_TYPE
);


$tipo = $finfo->file(
    $_FILES["foto"]["tmp_name"]
);



// ==========================================
// TIPOS PERMITIDOS
// ==========================================

$tiposPermitidos = [

    "image/jpeg" => "jpg",

    "image/png" => "png",

    "image/webp" => "webp"

];


if (
    !isset(
        $tiposPermitidos[$tipo]
    )
) {

    header(
        "Location: minha-conta.php?erro=foto"
    );

    exit;

}



$extensao =
    $tiposPermitidos[$tipo];



// ==========================================
// PASTA
// ==========================================

$pasta =
    __DIR__ .
    "/../IMAGENS/PERFIL_USUARIOS/";



if (!is_dir($pasta)) {

    mkdir(
        $pasta,
        0755,
        true
    );

}



// ==========================================
// NOME ALEATÓRIO
// ==========================================

$nomeArquivo =
    "perfil_" .
    $id .
    "_" .
    bin2hex(
        random_bytes(8)
    ) .
    "." .
    $extensao;



$caminhoCompleto =
    $pasta .
    $nomeArquivo;



// ==========================================
// MOVE ARQUIVO
// ==========================================

if (
    !move_uploaded_file(
        $_FILES["foto"]["tmp_name"],
        $caminhoCompleto
    )
) {

    header(
        "Location: minha-conta.php?erro=foto"
    );

    exit;

}



// CAMINHO SALVO NO BANCO

$caminhoBanco =
    "../IMAGENS/PERFIL_USUARIOS/" .
    $nomeArquivo;



// ==========================================
// ATUALIZA BANCO
// ==========================================

$sql = $conexao->prepare(
    "UPDATE usuarios
     SET foto_perfil = ?
     WHERE id = ?"
);


$sql->bind_param(
    "si",
    $caminhoBanco,
    $id
);


$sql->execute();



header(
    "Location: minha-conta.php?sucesso=foto"
);

exit;

?>