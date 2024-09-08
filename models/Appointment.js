module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define("Appointment", {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone:{
        type: DataTypes.STRING,
        allowNull: false
      },
      date_time:{
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      createdAt:'TimeStamp',
      updatedAt:false,
    });
    return Appointment;
  };
  