const db = require('../../database/models');
const Op = db.Sequelize.Op;

const categoryApiController = {
    list: (req, res) => {
        db.Categoria
            .findAll()
            .then(categorias => {
                const data = []
                categorias.forEach(category => { 
                    const dataCategory = {
                        Idcategoria: category.id,
                        Nombre: category.Nombre,
                        detail: `/api/categoria/${category.Idcategoria}`
                    }
                    data.push (dataCategory)
                });

                return res.json({
                    total: categorias.length,
                    categoriasData: data
                });
            })
            .catch(error => {
                return res.status(500).json({ error: error.message });
            });
    },
    show: (req, res) => {
        db.Categoria
            .findByPk(req.params.id)
            .then(categoria => {
                return res.json({
                    Categoria: {
                        Idcategoria: categoria.id,
                        Nombre: categoria.Nombre
                    }
                })
            })
    }
};

module.exports = categoryApiController;
