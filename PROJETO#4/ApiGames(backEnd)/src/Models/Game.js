const Sequelize = require("sequelize");
const connection = require("./../Database/database");

const Game = connection.define("tblGames", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },

    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Game.sync({force: false});

module.exports = Game;