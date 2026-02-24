import { url } from "inspector";
import {getTodosPosts, criar, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
import fs from "fs";



export async function listarPosts(req, res) { 
    /* transforma função em asyncrona pro resto do código não atrapalhar (é tipo pedir pra focar nessa parte) */
        const posts = await getTodosPosts() 
        /* cria variavel pra esperar até a função ser concluida pra pegar os dados e transformar em array */
        res.status(200).json(posts); 
        /* json faz com que ele saiba que é json e é só mandar a variavel p ele */
    };

export async function criarPosts(req, res) {
    const novoPost = req.body; // a requisição tem um cabeçalho e a gente vai pro corpo dela, pega o conteudo que quero colocar

    try { // tenta

        const postCriado = await criar(novoPost); // cria o novo post, mas nesse caso, o criar foi definido no "postsModel" que recebe como parametro
// a variavel novoPost ali em cima, que são os dados que passamos no corpo da requisição
        res.status(200).json(postCriado); // insere a postagem no app

    } catch (erro) { // se nao conseguir:
        console.error(erro.message); // mostra no console o erro
        res.status(500).json({"Erro":'Falha na requisição'}); // mostra na pagina o erro
    };
};



export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criar(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}


export async function atualizarNovoPost(req, res) {
    const id = req.params.id; // pega o id
    const urlImg = `http://localhost:300/${id}.png`// pega a imagem pelo id (ja que a imagem tem o mesmo nome que o id na pasta)
    

    try { // tenta
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt,
        }
        
        const postCriado = await atualizarPost(id, post); // cria o novo post, mas nesse caso, o criar foi definido no "postsModel" que recebe como parametro
// a variavel novoPost ali em cima, que são os dados que passamos no corpo da requisição
        res.status(200).json(postCriado); // insere a postagem no app

    } catch (erro) { // se nao conseguir:
        console.error(erro.message); // mostra no console o erro
        res.status(500).json({"Erro":'Falha na requisição'}); // mostra na pagina o erro
    };
};
