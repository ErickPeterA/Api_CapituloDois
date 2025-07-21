CREATE DATABASE capitulo_dois;
USE capitulo_dois;
CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE livros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    quantidade INT NOT NULL,
    precoCheio DECIMAL(10,2) NOT NULL,
    precoAtual DECIMAL(10,2) NOT NULL,
    categoria_id INT NOT NULL,
    foto TEXT,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE vendas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    livro_id INT NOT NULL,
    comprador_id INT NOT NULL,
    preco_venda DECIMAL(9,2),
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (comprador_id) REFERENCES usuario(id)
);

CREATE TABLE avaliacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    livro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    comentario VARCHAR(255),
    -- nota DECIMAL(2,1),
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

