const main = document.getElementById('chamada');

function carregarHTML(url){
    fetch(url)
    .then(res => res.text())
    .then(html => {
        main.innerHTML = html //onde vou exibir meu html que chamo
        getProdutosVendedor();//quando eu quizer mostrar de imediado a renderização  preciso chamar aqui
    })
}

linkVendedores.addEventListener('click', function (e) {
   e.preventDefault();
   carregarGetProdutos();
})

function carregarGetProdutos(){
    carregarHTML('./web/getProdutos.html');
    getProdutosVendedor();

}
//GET PARA LISTAR OS PRODUTOS DO BANCO 
function   getProdutosVendedor(){
    
    const chamadaDinamica = document.getElementById('chamada_dinamica');
    if (!chamadaDinamica) {
        console.error('Elemento chamada_dinamica não encontrado.');
        return;
    }
    chamadaDinamica.innerHTML = '';


    fetch('http://localhost:3000/produto', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log('produtos', data);
        //criar card conforme exister o produtos listador
        data.forEach( produto => {
            const cards = cardProduto(produto);
            chamadaDinamica.appendChild(cards) //vai pra dentro da coluna do meu index
        });
    })
    .catch(error => {
        console.error('Erro ao listar produtos:', error);
    });
}

//CRIAR O CARD DE FORM ADINAMICA AO LISTAR PRODUTOS DO BANCO 
function cardProduto(produto) {
    const cards = document.createElement('div');
    cards.classList.add('cards');

    const nomeProduto = document.createElement('p');
    nomeProduto.classList.add('nomeProduto');
    nomeProduto.innerHTML = produto.nome;

    const precoProduto = document.createElement('p');
    precoProduto.classList.add('precoProduto');
    precoProduto.innerHTML = produto.preco;

    const categoria = document.createElement('p');
    categoria.classList.add('categoria');
    categoria.innerHTML = produto.categoria;

    const btnAdicionar = document.createElement('a');
    btnAdicionar.href ='';
    btnAdicionar.textContent = 'Adicionar ao Carrinho';
    btnAdicionar.onclick = function (e) {
        e.preventDefault();
        const produtoId = produto._id;
        carregarPostProdutos(produtoId._id);
    };

    cards.appendChild(nomeProduto);
    cards.appendChild(precoProduto);
    cards.appendChild(categoria);
    cards.appendChild(btnAdicionar);

    return cards;
}


linkCarrinho.addEventListener('click', function(e) {
    e.preventDefault();
    carregarPostProdutos()
})

function  carregarPostProdutos(id){
    fetch('http://localholst:3000/produto' + id)
    .then(res => res.json())
    .then(produto => {
        const carrinho = {
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria
        };
        fetch('http://localhost:3000/carrinho', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carrinho),
        })
        .then(() => {
            console.log('Produto adicionado ao carrinho:', carrinho);
            // Adicionar lógica para redirecionar para a página do carrinho ou atualizar dinamicamente a visualização do carrinho
        })
        .catch(error => {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        });
    })
    .catch(error => {
        console.error('Erro ao obter detalhes do produto:', error);
    });
}


//ADICIONAR O CARRINHO COM CLICK - post







//EXCLUIR DO CARRINHO COM CLICK