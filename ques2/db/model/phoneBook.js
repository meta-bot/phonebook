module.exports = (sequelize, DataTypes) =>
    sequelize.define('phoneBook', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        number: DataTypes.STRING
    },
    {
        freezeTableName: true,
        tableName: 'phone_book',
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    });