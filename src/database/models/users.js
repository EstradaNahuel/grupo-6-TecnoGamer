module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        nombre_de_perfil: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,    
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        imagen_de_perfil: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        perfil: {
            type: dataTypes.ENUM('vendedor','administrador', 'comprador'),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'usuario',
        deletedAt: false
    }
    const Usuario = sequelize.define(alias, cols, config); 

    return Usuario;
};
