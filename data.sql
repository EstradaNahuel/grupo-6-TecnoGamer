DROP DATABASE IF EXISTS dato;
CREATE DATABASE dato;
USE dato;

CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombreCategoria VARCHAR(100) NOT NULL
);

CREATE TABLE carrito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idProducto 
    idUsuario
    precios
    estado
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    perfil ENUM('vendedor', 'comprador') NOT NULL,
    idCarrito INT,
    FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito)
);

CREATE TABLE producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    color VARCHAR(50),
    idCategoria INT,
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);


CREATE TABLE orden (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT,
    idUsuario
    total 
);
