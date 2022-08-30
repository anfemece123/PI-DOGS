const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,//crea una id ramdom de 32 caracteres
      allowNull:false,//no puede estar vacio
      primaryKey: true//clave primaria o id
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true,//no es obligatoria
    }
  },{
    timestamps:false
  });
};
