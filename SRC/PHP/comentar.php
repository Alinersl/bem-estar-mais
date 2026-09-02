<?php

session_start();

header("Content-Type: text/plain; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header("Allow: POST");
    exit("Método não permitido.");
}

if (!isset($_SESSION["usuario_id"])) {
    http_response_code(401);
    exit("Você precisa estar logado para comentar.");
}

$noticia_id = filter_var(
    $_POST["noticia_id"] ?? null,
    FILTER_VALIDATE_INT,
    ["options" => ["min_range" => 1]]
);

$comentarioRecebido = $_POST["comentario"] ?? "";

if (!is_string($comentarioRecebido)) {
    http_response_code(400);
    exit("Comentário inválido.");
}

$comentario = trim($comentarioRecebido);

if ($noticia_id === false) {
    http_response_code(400);
    exit("Notícia inválida.");
}

if ($comentario === "") {
    http_response_code(400);
    exit("Digite um comentário.");
}

$usuario_id = (int) $_SESSION["usuario_id"];
$nome = trim((string) ($_SESSION["usuario_nome"] ?? ""));

if ($usuario_id <= 0 || $nome === "") {
    http_response_code(401);
    exit("Sua sessão está incompleta. Saia da conta e entre novamente.");
}

try {
    require __DIR__ . "/conexao.php";

    $sql = "INSERT INTO comentarios
            (noticia_id, usuario_id, nome, comentario)
            VALUES (?, ?, ?, ?)";

    $stmt = $conexao->prepare($sql);

    if (!$stmt) {
        throw new RuntimeException("Falha ao preparar o comentário.");
    }

    $stmt->bind_param(
        "iiss",
        $noticia_id,
        $usuario_id,
        $nome,
        $comentario
    );

    if (!$stmt->execute()) {
        throw new RuntimeException("Falha ao salvar o comentário.");
    }

    $stmt->close();

    echo "Comentário publicado!";
} catch (Throwable $erro) {
    error_log("Erro em comentar.php: " . $erro->getMessage());

    http_response_code(500);
    echo "Erro ao publicar comentário. Verifique a conexão e a tabela comentarios.";
}