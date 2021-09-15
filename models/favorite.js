const { DataTypes } = require("sequelize")
const db = require("../db")

const Favorite = db.define("favorite", {
  
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Favorite