const porta = 2709 //A porta é a forma de selecionar qual processo vai atender aquela requisição / Porta padrão é a 80

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bancoDeDados = require('./dataBase')

app.use(bodyParser.urlencoded({extended: true})) //Se os dados estiverem sendo enviados no padrão urlencoded, ele vai transformar as infos em um objeto para poderem ser acessadas de uma forma mais tranquila

//Exibir
app.get('/produtos', (req, res, next) => { //get = forma de requisição 
    res.send(bancoDeDados.getProdutos()) //Envia todos os produtos cadastrados (res.send = enviar resposta)
})

app.get('/produtos/:id', (req, res, next) => { //Tem que receber o id também (isso que o /:id indica)
    res.send(bancoDeDados.getProduto(req.params.id)) //Exibir um produto especifico localizado por ID (req.params = parametros passados na url (eles vem do request))
})

//Adicionar
app.post('/produtos', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome, //Pegar o nome a partir do corpo da composição
        preco: req.body.preco //Pegar o preco a partir do corpo da composição
    })
    res.send(produto) //retorna um JSON
})

//Alterar
app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id, 
        nome: req.body.nome, //Alterar o nome a partir do corpo da composição
        preco: req.body.preco //Alterar o preco a partir do corpo da composição
    })
    res.send(produto) //retorna um JSON
})

//Excluir
app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.excluirProduto(req.params.id)
    res.send(produto) //retorna um JSON
})

app.listen(porta, () => { //Porta que vai executar o app
    console.log(`Servidor esta executando na porta ${porta}`)
})

/*Sobre o Postman:
- Post: Posso inserir as coisas
- Get: Exibir as coisas (Para conseguir ver uma coisa especifica, colocar: /(identificador selecionado), EX: http://localhost:2709/produtos/2)
- Put: Permite alterar as infos (Colocar o identificador do item que deseja alterar e mudar no mesmo local que add)*/