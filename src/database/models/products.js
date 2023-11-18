module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        Id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Idcategoria: {
            type: dataTypes.INT,
            allowNull: false
        },
        Nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Descripcion: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        Marca: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        Precio: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: true
        },
        Color: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        Imagen: {
            type: dataTypes.STRING(255),
            allowNull: true
        }
    };
    let config = {
        timestamps: false,
        tableName: 'productos',
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config); 

    Product.associate = function(models){
        Product.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "Idcategoria"
        });
    }
 
    return Product;
};
