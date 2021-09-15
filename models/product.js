const { DataTypes } = require("sequelize")
const db = require("../db")

const Product = db.define("product", {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    

})

module.exports = Product