module.exports = (sequelize, type) => {
    return sequelize.define('meta', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userID: {
            type: type.INTEGER,
            notEmpty: true,
            unique: false
          },
        meta: {
          type: type.STRING,
          notEmpty: true,
          unique: false
        },
        value: {
          type: type.STRING,
          notEmpty: true,
          unique: false
        }
    })
}
