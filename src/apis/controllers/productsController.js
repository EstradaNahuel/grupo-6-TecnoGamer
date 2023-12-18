const db = require('../../database/models');
const Op = db.Sequelize.Op;

const productApiController = {
    list: (req, res) => {
        db.Product
            .findAll()
            .then(products => {
                const count = products.length; 
                const countByCategory = {};
                const data = []
                products.forEach(product => {; 
                    const dataProduct = {
                        Id: product.id,
                        Idcategoria: product.Idcategoria,
                        Nombre: product.nombre,
                        Descripcion: product.description,
                        Marca: product.Marca,
                        Imagen: product.Imagen,
                        Precio: product.Precio,
                        Color: product.Color,
                        detail: `localhost:3020/api/products/${product.Id}`
                    }
                    data.push (dataProduct)
                });

                return res.json({
                    total: count,
                    products: data
                });
            })
            .catch(error => {
                return res.status(500).json({ error: error.message });
            });
    },
    show: (req, res) => {
        db.Product
            .findByPk(req.params.id)
            .then(producto => {
                return res.json({
                    Producto: {
                        Id: producto.id,
                        Idcategoria: producto.Idcategoria,
                        Nombre: producto.nombre,
                        Descripcion: producto.description,
                        Marca: producto.Marca,
                        Precio: producto.Precio,
                        Color: producto.Color,
                        Imagen: "/imagenes" + producto.Imagen,
                }})
            })
    }
};

module.exports = productApiController;
