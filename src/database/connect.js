const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    `${process.env.DB_CONNECTION}`,
    (error) => {
      if (error) {
        return console.log(
          "Ocorreu um erro ao se conectar com o banco de dados: ",
          error
        );
      }

      return console.log("Conexão ao banco de dados realizada com sucesso!");
    }
  );
};

module.exports = connectToDatabase;

