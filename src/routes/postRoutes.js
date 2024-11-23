import express from "express";
import multer from "multer";
import cors from "cors";
import { criarPosts, listarPosts, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";

const corsOption = {
  origin: "http://localhost:8000",
  optionsSuccesStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });


const routes = (app) => {

    app.use(express.json()); 

    app.use(cors(corsOption))
    /* FAZ COM QUE O EXPRESS LEIA ARQUIVOS JSON (retorne os textos como json) */
    app.get('/posts', listarPosts ); /* postController, nesse arquivo, tem todas as funções pra direcionar no web */
    
    app.post('/posts', criarPosts ); // rota para criar um post novo (verbo http esse é post o outro é get q é pra pegar dados)

    app.post('/upload', upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
}


export default routes;

