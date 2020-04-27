module.exports = (sequelize, type) => {
    return sequelize.define('controlNumber', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        controlNumber: {
            type: type.STRING,
            notEmpty: true,
            unique: true
          }
    })
}
