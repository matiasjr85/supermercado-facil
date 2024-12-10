import app from "./src/app.js"

const PORT: number = 3000;

app.listen(PORT, (): void => {
    console.log("Servidor rodando na porta 3000");
})