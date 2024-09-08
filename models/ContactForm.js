module.exports = (sequelize, DataTypes) => {
    const ContactForm = sequelize.define("ContactForm", {
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
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      createdAt:'TimeStamp',
      updatedAt:false,
    });
    return ContactForm;
  };
  