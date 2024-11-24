import express from "express"; // Importa o módulo Express para criar o servidor web
import multer from "multer"; // Importa o módulo Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";// Importa funções controladoras do arquivo postController.js
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com o armazenamento configurado
const upload = multer({ storage: storage});

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições para entender dados enviados no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (implementação na função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementação na função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem"))
  // e chama a função uploadImagem para processar a imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para uso em outros arquivos do projeto
export default routes;
