import express from "express";
import routes from "./src/routes/postRoutes.js";


const app = express(); /* inicia o express, que é usado p criar o servidor */
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => { /* listen, define a porta e testa pra ver se o servidor abriu */
    console.log('servidor escutando...');
});


