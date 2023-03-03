const sequence = {
    _id: 1,
    get id() {return this._id++}
}

const produtos = {}

//Adicionar
function salvarProduto(produto){
    if(!produto.id) produto.id = sequence.id //Se o id do produto não estiver setado, ele vai receber o id livre da sequencia
    produtos[produto.id] = produto //Caso o produto já estiver setado ele substitui pela versão mais nova, caso contrário ele adiciona o novo elemento dentro de produtos
    return produto
}

//Retornar produto especifico
function getProduto(id){
    return produtos[id] || {}
}

//Retornar todos os produtos
function getProdutos(){
    return Object.values(produtos)
}

//Excluir
function excluirProduto(id){
    const produto = produtos[id] //Guardar o produto excluido em um constante local
    delete produtos[id] //Apagar o produto escolhido
    return produto //Retornar o produto que havia sido excluido (pra exibir na tela o que foi excluido, etc)
}


module.exports = {salvarProduto, getProduto, getProdutos, excluirProduto}