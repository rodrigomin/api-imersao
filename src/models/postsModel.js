import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); /* conecta ao servidor da nuvem com o token ou senha q criei// await = uma pausa na função
até ele ser concluido */

export async function getTodosPosts() {
    const db = conexao.db('imersao-instabytess'); /* pega a função llaaaaa de cima que conectou no servidor e faz ele entrar no "armario" */
    const colecao = db.collection('posts'); /* dentro desse armário, ele vai pegar os dados com a "etiqueta" posts */
    return colecao.find().toArray(); /* transforma os dados dessa etiqueta em array */
};


export async function criar(novoPost) {
    const db = conexao.db('imersao-instabytess'); // encontra o "armario"
    const colecao = db.collection('posts'); // acha a "gaveta" dos posts
    return colecao.insertOne(novoPost) // insere o novo post na "gaveta"
}

export async function atualizarPost(id, novoPost) {
    console.log(novoPost)
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}