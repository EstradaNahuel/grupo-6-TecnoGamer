-- Elimina la base de datos si existe
DROP DATABASE IF EXISTS tecno;

-- Crea la base de datos
CREATE DATABASE tecno;
USE tecno;

-- Crea la tabla Categoria
CREATE TABLE categoria (
    Idcategoria INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

INSERT INTO categoria (Idcategoria, Nombre)
VALUES (1, 'PC Armada'),
       (2, 'Laptop'),
       (3, 'Periféricos'),
       (4, 'Monitores');

-- Crea la tabla Producto
CREATE TABLE producto (
    Id INT PRIMARY KEY,
    Idcategoria INT,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255),
    Marca VARCHAR(50),
    Precio DECIMAL(10,2),
    Color VARCHAR(50),
    Imagen VARCHAR(255),
    FOREIGN KEY (Idcategoria) REFERENCES Categoria(Idcategoria)
);

-- Crea la tabla usuario
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    nombre_de_perfi VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    imagen_de_perfil VARCHAR(255) NOT NULL,  
    perfil ENUM('vendedor', 'comprador') NOT NULL
);

-- Crea la tabla Carrito
CREATE TABLE carrito (
    Id INT PRIMARY KEY,
    idproducto INT,
    idusuario INT,
    Precio DECIMAL(10,2),
    Estado VARCHAR(50),
    FOREIGN KEY (idproducto) REFERENCES Producto(Id),
    FOREIGN KEY (idusuario) REFERENCES usuario(id)
);

-- Crea la tabla usuario_carrito
CREATE TABLE usuario_carrito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    idCarrito INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    FOREIGN KEY (idCarrito) REFERENCES carrito(Id)
);

-- Crea la tabla orden
CREATE TABLE orden (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    total DECIMAL(10,2)
);

INSERT INTO producto (Id, Idcategoria, Nombre, Descripcion, Marca, Precio, Color, Imagen)
VALUES (1, 1, 'PC GAMER BASIC', 'Procesador i3 10gen, memoria raw 8gb, ssd 250gb', 'Marca intel', 200000.99, 'negro', '1696633343497_img_.jpg'),
       (2, 1, 'PC GAMER MEDIA', 'Procesador i5 10gen, memoria raw 16gb, ssd 500gb', 'MArca intel', 300000.99, 'Azul', '1696630810297_img_.jpg'),
       (3, 2, 'Laptop 15.6', 'prosesador intel i5, memoria raw 16gb, ssd 500gb', 'Marca Asus', 290000.99, 'Gris', '1696548852316_img_.jpg');

INSERT INTO usuario (id, nombre, apellido, nombre_de_perfi, email, password, imagen_de_perfil, perfil)
VALUES (1, 'nahel', 'est', 'nahel', 'nahelest@gmail.com', '1234567890', '/imagenes/users/ADM.jpg', 'admin');