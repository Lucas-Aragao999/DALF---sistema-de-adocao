import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('Animal', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        nome: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        especie: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        porte: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        castrado: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        vacinado: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        adotado: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false
        },
        descricao: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        foto: { 
            type: DataTypes.BLOB('long'),
            allowNull: true
        }
    }, {
        tableName: 'animais',
        timestamps: true,
    });
};