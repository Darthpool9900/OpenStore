const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../finish.db'
});

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name_product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fornecedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true // Adicione esta linha
});

sequelize.sync()
    .then(() => {
        console.log('Tabela sincronizada com sucesso');
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabela:', err);
    });

export default Product;
