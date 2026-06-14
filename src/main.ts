// 1. Função auxiliar para limpar a tela
function ocultarTodasAsTelas(): void {
  const telas = document.querySelectorAll('.tela');
  
  telas.forEach(tela => {
      (tela as HTMLElement).style.display = 'none';
  });
}

// 2. Funções específicas para cada botão do menu
function abrirTelaHome(): void {
  ocultarTodasAsTelas();
  const telaHome = document.getElementById('tela-home');
  if (telaHome) {
      telaHome.style.display = 'block';
  }
}

function abrirTelaEstoque(): void {
  ocultarTodasAsTelas();
  const telaEstoque = document.getElementById('tela-estoque');
  if (telaEstoque) {
      telaEstoque.style.display = 'block';
  }
}

function abrirTelaVendas(): void {
  ocultarTodasAsTelas();
  const telaVendas = document.getElementById('tela-vendas');
  if (telaVendas) {
      telaVendas.style.display = 'block';
  }
}

function abrirTelaGestao(): void {
  ocultarTodasAsTelas();
  const telaGestao = document.getElementById('tela-gestao');
  if (telaGestao) {
      telaGestao.style.display = 'block';
  }
}

let valorTotalPedido: number = 0;

function adicionarAoCarrinho(nomeProduto: string, precoProduto: number): void { //não retorna valores
    
  // 1. O TypeScript procura a lista da comanda (a tag <ul>) no HTML
  const listaDaComanda = document.getElementById('lista-carrinho');

  // 2. Se ele achar a lista, ele injeta um novo <li> com os dados do produto
  if (listaDaComanda) {
      listaDaComanda.innerHTML += `
          <li style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
              <span>1x ${nomeProduto}</span>
              <span>R$ ${precoProduto.toFixed(2)}</span>
          </li>
      `;

      valorTotalPedido += precoProduto;
      const botaoFechar = document.getElementById('btn-fechar-venda');
        if (botaoFechar) {
            botaoFechar.innerText = `FECHAR R$ ${valorTotalPedido.toFixed(2)}`;
    }
  }
}