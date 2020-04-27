module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: type.STRING,
          isEmail: true,
          notEmpty: true,
          unique: true
        },
        password: {
          type: type.STRING,
          notEmpty: true,
          unique: false
        }
    })
}
