
CREATE DATABASE bem_estar_definitivo;


USE bem_estar_definitivo;



-- ==========================================
-- TABELA DE USUÁRIOS
-- ==========================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255) DEFAULT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- TABELA DE NOTÍCIAS
-- ==========================================

CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    visualizacoes INT NOT NULL DEFAULT 0,
    data_publicacao DATE
);


-- ==========================================
-- NOTÍCIAS NORMAIS
-- ==========================================

INSERT INTO noticias
(
    id,
    titulo,
    link,
    imagem,
    visualizacoes,
    data_publicacao
)
VALUES

(
    1,
    'Beber muita água durante a refeição pode prejudicar a digestão',
    '../NOTÍCIAS/noticia1.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.01.png',
    0,
    '2025-06-22'
),

(
    2,
    'Comer devagar reduz 20% das calorias',
    '../NOTÍCIAS/noticia2.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.02.png',
    0,
    '2025-01-27'
),

(
    3,
    'Fibras alimentam as bactérias boas do intestino',
    '../NOTÍCIAS/noticia3.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.03.png',
    0,
    '2025-03-30'
),

(
    4,
    'Comer frutas coloridas fortalece a imunidade',
    '../NOTÍCIAS/noticia4.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.04.png',
    0,
    '2025-09-18'
),

(
    5,
    'Açúcar em excesso enfraquece o sistema imunológico',
    '../NOTÍCIAS/noticia5.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.05.png',
    0,
    '2025-02-20'
),

(
    6,
    'Nem toda gordura engorda, algumas ajudam a emagrecer e proteger o coração',
    '../NOTÍCIAS/noticia6.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.06.png',
    0,
    '2025-04-01'
),

(
    7,
    'O que a indústria não quer que você saiba sobre “light”, “diet” e “zero”',
    '../NOTÍCIAS/noticia7.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.07.png',
    0,
    '2025-05-03'
),

(
    8,
    'Dormir bem fortalece o sistema imunológico',
    '../NOTÍCIAS/noticia8.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.08.png',
    0,
    '2025-07-21'
),

(
    9,
    'Metabolismo lento não é genética, é consequência de hábitos',
    '../NOTÍCIAS/noticia9.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.09.png',
    0,
    '2025-08-30'
),

(
    10,
    'Chocolate melhora o humor?',
    '../NOTÍCIAS/noticia10.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.10.png',
    0,
    '2025-10-10'
),

(
    11,
    'Ultraprocessados podem viciar o cérebro como drogas leves',
    '../NOTÍCIAS/noticia11.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.11.png',
    0,
    '2025-11-01'
),

(
    12,
    'Comer proteína no café da manhã reduz vontade de doces e controla a fome o dia inteiro',
    '../NOTÍCIAS/noticia12.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.12.png',
    0,
    '2025-11-03'
),

(
    13,
    'Ovo é aliado da alimentação saudável',
    '../NOTÍCIAS/noticia13.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.13.png',
    0,
    '2026-02-12'
),

(
    14,
    'Suco detox funciona ou é só marketing?',
    '../NOTÍCIAS/noticia14.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.14.png',
    0,
    '2025-06-22'
),

(
    15,
    'Novas bebidas saudáveis que estão substituindo refrigerantes',
    '../NOTÍCIAS/noticia15.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.15.png',
    0,
    '2025-01-27'
),

(
    16,
    'O impacto do açúcar no cérebro segundo pesquisas recentes',
    '../NOTÍCIAS/noticia16.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.16.png',
    0,
    '2025-03-30'
),

(
    17,
    'Como montar um prato saudável gastando pouco',
    '../NOTÍCIAS/noticia17.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.17.png',
    0,
    '2025-09-18'
),

(
    18,
    'Glúten faz mal para todo mundo?',
    '../NOTÍCIAS/noticia18.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.18.png',
    0,
    '2025-02-20'
),

(
    19,
    'Alimentos congelados perdem nutrientes?',
    '../NOTÍCIAS/noticia19.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.19.png',
    0,
    '2025-04-01'
),

(
    20,
    'Air fryer é mais saudável que fritura comum?',
    '../NOTÍCIAS/noticia20.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.20.png',
    0,
    '2025-06-22'
),

(
    21,
    'Alimentos enlatados são ruins para a saúde?',
    '../NOTÍCIAS/noticia21.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.21.png',
    0,
    '2025-01-27'
),

(
    22,
    'Macarrão instantâneo faz mal?',
    '../NOTÍCIAS/noticia22.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.22.png',
    0,
    '2025-03-30'
),

(
    23,
    'Açúcar mascavo é mais saudável que o branco?',
    '../NOTÍCIAS/noticia23.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.23.png',
    0,
    '2025-09-18'
),

(
    24,
    'Energéticos fazem mal à saúde?',
    '../NOTÍCIAS/noticia24.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.24.png',
    0,
    '2025-02-20'
),

(
    25,
    'Comer distraído aumenta o consumo de comida',
    '../NOTÍCIAS/noticia25.html',
    '../ASSETS/IMAGENS/CAPA DAS NOTÍCIAS/capa.not.25.png',
    0,
    '2025-05-09'
),


-- ==========================================
-- NOTÍCIAS DOS BANNERS
-- ==========================================

(
    26,
    'Chocolate melhora o humor?',
    'not.chocolate.html',
    '../ASSETS/IMAGENS/BANNER PÁGINA PRINCIPAL/banner.chocolate.png',
    0,
    '2025-10-10'
),

(
    27,
    'Pouca água dá cansaço?',
    'not.agua.html',
    '../ASSETS/IMAGENS/BANNER PÁGINA PRINCIPAL/banner.agua.png',
    0,
    '2025-06-22'
),

(
    28,
    'Ovo faz bem ou mal?',
    'not.ovo.html',
    '../ASSETS/IMAGENS/BANNER PÁGINA PRINCIPAL/banner.ovo.png',
    0,
    '2026-02-12'
),

(
    29,
    'Banana dá energia?',
    'not.banana.html',
    '../ASSETS/IMAGENS/BANNER PÁGINA PRINCIPAL/banner.banana.png',
    0,
    '2025-09-18'
);


-- ==========================================
-- TABELA DE COMENTÁRIOS
-- ==========================================

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    noticia_id INT NOT NULL,
    usuario_id INT NULL,
    nome VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    data_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- CONSULTA DAS NOTÍCIAS
-- ==========================================

SELECT
    id,
    titulo,
    link,
    imagem,
    visualizacoes,
    data_publicacao
FROM noticias
ORDER BY data_publicacao DESC;

