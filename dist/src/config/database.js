import dbConnection from "./dbConnection.js";
export const initializeDatabase = async () => {
    const conexao = await dbConnection();
    conexao.on("error", (erro) => {
        console.error("Erro de conexão com o banco de dados:", erro);
    });
    conexao.once("open", () => {
        console.log("Conexão com o banco de dados estabelecida com sucesso");
    });
};
