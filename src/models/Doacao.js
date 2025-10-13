import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Doacao = sequelize.define('Doacao', {
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
        email: { 
            type: DataTypes.STRING,
            allowNull: true
        },
        valor: { 
            type: DataTypes.FLOAT,
            allowNull: false 
        },
        linkPix: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        mensagem: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        qrcode: { // Adicionado para manter consistência com a rota de doações
            type: DataTypes.STRING,
            allowNull: true 
        }
    }, {
        tableName: 'doacoes',
        timestamps: true
    });

    return Doacao;
};