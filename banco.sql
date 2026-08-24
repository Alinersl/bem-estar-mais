CREATE DATABASE bem_estar_definitivo;
USE bem_estar_definitivo;

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255)NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ); 
    
CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    visualizacoes INT NOT NULL DEFAULT 0
);

INSERT INTO noticias (titulo, link) VALUES
('Notícia 1', '../NOTÍCIAS/noticia1.html'),
('Notícia 2', '../NOTÍCIAS/noticia2.html'),
('Notícia 3', '../NOTÍCIAS/noticia3.html'),
('Notícia 4', '../NOTÍCIAS/noticia4.html'),
('Notícia 5', '../NOTÍCIAS/noticia5.html'),
('Notícia 6', '../NOTÍCIAS/noticia6.html'),
('Notícia 7', '../NOTÍCIAS/noticia7.html'),
('Notícia 8', '../NOTÍCIAS/noticia8.html'),
('Notícia 9', '../NOTÍCIAS/noticia9.html'),
('Notícia 10', '../NOTÍCIAS/noticia10.html'),
('Notícia 11', '../NOTÍCIAS/noticia11.html'),
('Notícia 12', '../NOTÍCIAS/noticia12.html'),
('Notícia 13', '../NOTÍCIAS/noticia13.html'),
('Notícia 14', '../NOTÍCIAS/noticia14.html'),
('Notícia 15', '../NOTÍCIAS/noticia15.html'),
('Notícia 16', '../NOTÍCIAS/noticia16.html'),
('Notícia 17', '../NOTÍCIAS/noticia17.html'),
('Notícia 18', '../NOTÍCIAS/noticia18.html'),
('Notícia 19', '../NOTÍCIAS/noticia19.html'),
('Notícia 20', '../NOTÍCIAS/noticia20.html'),
('Notícia 21', '../NOTÍCIAS/noticia21.html'),
('Notícia 22', '../NOTÍCIAS/noticia22.html'),
('Notícia 23', '../NOTÍCIAS/noticia23.html'),
('Notícia 24', '../NOTÍCIAS/noticia24.html'),
('Notícia 25', '../NOTÍCIAS/noticia25.html');

ALTER TABLE noticias
ADD COLUMN imagem VARCHAR(255) AFTER link;

UPDATE noticias SET
titulo = 'Beber muita água durante a refeição pode prejudicar a digestão',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.01.png'
WHERE id = 1;

UPDATE noticias SET
titulo = 'Comer devagar reduz 20% das calorias',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.02.png'
WHERE id = 2;

UPDATE noticias SET
titulo = 'Fibras alimentam as bactérias boas do intestino',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.03.png'
WHERE id = 3;

UPDATE noticias SET
titulo = 'Comer frutas coloridas fortalece a imunidade',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.04.png'
WHERE id = 4;

UPDATE noticias SET
titulo = 'Açúcar em excesso enfraquece o sistema imunológico',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.05.png'
WHERE id = 5;

UPDATE noticias SET
titulo = 'Nem toda gordura engorda, algumas ajudam a emagrecer e proteger o coração',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.06.png'
WHERE id = 6;

UPDATE noticias SET
titulo = 'O que a indústria não quer que você saiba sobre “light”, “diet” e “zero”',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.07.png'
WHERE id = 7;

UPDATE noticias SET
titulo = 'Dormir bem fortalece o sistema imunológico',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.08.png'
WHERE id = 8;

UPDATE noticias SET
titulo = 'Metabolismo lento não é genética, é consequência de hábitos',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.09.png'
WHERE id = 9;

UPDATE noticias SET
titulo = 'Chocolate melhora o humor?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.10.png'
WHERE id = 10;

UPDATE noticias SET
titulo = 'Ultraprocessados podem viciar o cérebro como drogas leves',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.11.png'
WHERE id = 11;

UPDATE noticias SET
titulo = 'Comer proteína no café da manhã reduz vontade de doces e controla a fome o dia inteiro',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.12.png'
WHERE id = 12;

UPDATE noticias SET
titulo = 'Ovo é aliado da alimentação saudável',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.13.png'
WHERE id = 13;

UPDATE noticias SET
titulo = 'Suco detox funciona ou é só marketing?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.14.png'
WHERE id = 14;

UPDATE noticias SET
titulo = 'Novas bebidas saudáveis que estão substituindo refrigerantes',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.15.png'
WHERE id = 15;

UPDATE noticias SET
titulo = 'O impacto do açúcar no cérebro segundo pesquisas recentes',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.16.png'
WHERE id = 16;

UPDATE noticias SET
titulo = 'Como montar um prato saudável gastando pouco',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.17.png'
WHERE id = 17;

UPDATE noticias SET
titulo = 'Glúten faz mal para todo mundo?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.18.png'
WHERE id = 18;

UPDATE noticias SET
titulo = 'Alimentos congelados perdem nutrientes?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.19.png'
WHERE id = 19;

UPDATE noticias SET
titulo = 'Air fryer é mais saudável que fritura comum?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.20.png'
WHERE id = 20;

UPDATE noticias SET
titulo = 'Alimentos enlatados são ruins para a saúde?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.21.png'
WHERE id = 21;

UPDATE noticias SET
titulo = 'Macarrão instantâneo faz mal?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.22.png'
WHERE id = 22;

UPDATE noticias SET
titulo = 'Açúcar mascavo é mais saudável que o branco?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.23.png'
WHERE id = 23;

UPDATE noticias SET
titulo = 'Energéticos fazem mal à saúde?',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.24.png'
WHERE id = 24;

UPDATE noticias SET
titulo = 'Comer distraído aumenta o consumo de comida',
imagem = '../IMAGENS/CAPA DAS NOTÍCIAS/capa.not.25.png'
WHERE id = 25;

ALTER TABLE noticias
ADD COLUMN data_publicacao DATE;

UPDATE noticias
SET data_publicacao = CASE id

    WHEN 1 THEN '2025-06-22'
    WHEN 2 THEN '2025-01-27'
    WHEN 3 THEN '2025-03-30'
    WHEN 4 THEN '2025-09-18'
    WHEN 5 THEN '2025-02-20'
    WHEN 6 THEN '2025-04-01'

    WHEN 7 THEN '2025-05-03'
    WHEN 8 THEN '2025-07-21'
    WHEN 9 THEN '2025-08-30'
    WHEN 10 THEN '2025-10-10'
    WHEN 11 THEN '2025-11-01'
    WHEN 12 THEN '2025-11-03'
    WHEN 13 THEN '2026-02-12'

    WHEN 14 THEN '2025-06-22'
    WHEN 15 THEN '2025-01-27'
    WHEN 16 THEN '2025-03-30'
    WHEN 17 THEN '2025-09-18'
    WHEN 18 THEN '2025-02-20'
    WHEN 19 THEN '2025-04-01'

    WHEN 20 THEN '2025-06-22'
    WHEN 21 THEN '2025-01-27'
    WHEN 22 THEN '2025-03-30'
    WHEN 23 THEN '2025-09-18'
    WHEN 24 THEN '2025-02-20'
    WHEN 25 THEN '2025-05-09'

END
WHERE id BETWEEN 1 AND 25;

SELECT id, titulo, data_publicacao
FROM noticias
ORDER BY data_publicacao DESC;
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    noticia_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    data_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE usuarios
ADD COLUMN foto_perfil VARCHAR(255) DEFAULT NULL;