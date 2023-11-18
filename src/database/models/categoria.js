module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        Idcategoria: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        Nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'categoria',
        deletedAt: false
    }
    const Categoria = sequelize.define(alias, cols, config); 

    return Categoria;
};

