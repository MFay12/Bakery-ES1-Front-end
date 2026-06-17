//Função auxiliar para limpar a tela
function ocultarTodasAsTelas(): void {
  const telas = document.querySelectorAll('.tela'); //Pega todas as class telas (ex: Tela-Home)
  
  telas.forEach(tela => {   // Para cada tela deixe invisível
      (tela as HTMLElement).style.display = 'none';
  });
}

//Funções específicas para cada botão do menu
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



// ==========================================
// MÓDULO DE ESTOQUE E RECEITAS 
// ==========================================

let custoTotalReceita: number = 0;

function adicionarIngredienteReceita(): void {
    // Pega os elementos do HTML
    const selectIngrediente = document.getElementById('select-ingrediente') as HTMLSelectElement;
    const inputQtd = document.getElementById('input-qtd-ingrediente') as HTMLInputElement;
    const listaIngredientes = document.getElementById('lista-ingredientes-receita');
    const inputCusto = document.getElementById('input-custo-receita') as HTMLInputElement;

    const nomeIngrediente = selectIngrediente.options[selectIngrediente.selectedIndex].text;
    const quantidade = parseFloat(inputQtd.value);

    // Verifica se o usuário digitou uma quantidade válida
    if (nomeIngrediente !== "Selecione..." && !isNaN(quantidade) && listaIngredientes) { 
        
        // Coloca o ingrediente na lista visual
        listaIngredientes.innerHTML += `
            <li style="border-bottom: 1px dashed #ccc; padding-bottom: 5px; margin-bottom: 5px;">
                - ${quantidade} Kg de ${nomeIngrediente}
            </li>
        `;

        // Faz uma simulação de custo (Ex:Tudo custa R$ 5,00 o Quilo)
        const custoDesteIngrediente = quantidade * 5.00; 
        custoTotalReceita += custoDesteIngrediente;

        // Atualiza o campo cinza travado com o valor matemático. Verifica se o HTML foi carregado
        if (inputCusto) {
            inputCusto.value = `Custo Calculado: R$ ${custoTotalReceita.toFixed(2)}`;
        }

        // Limpa a caixinha de número para o próximo ingrediente
        inputQtd.value = '';
    }
}

function cadastrarReceita(): void {
    alert("Nova receita salva com sucesso no sistema!");
}

// ==========================================
// MÓDULO DE GESTÃO E PROJEÇÃO 
// ==========================================

function calcularProjecao(): void {
  const inputQtd = document.getElementById('input-projecao-qtd') as HTMLInputElement; //Pega o valor digitado
  const resultadoDiv = document.getElementById('resultado-projecao'); //Pega a div de resultado
  
  // Pega o número que o Gestor digitou e transforma em integer
  const qtdPaes = parseInt(inputQtd.value);

  if (!isNaN(qtdPaes) && qtdPaes > 0 && resultadoDiv) {
      
      // Simulando que 1 pão francês gasta 0.05Kg (50 gramas) de farinha
      const farinhaNecessaria = qtdPaes * 0.05; 
      
      // Pegando o valor fictício ter no estoque na tela anterior
      const farinhaEmEstoque = 50; 
      //Constante com valor booleano da comparação
      const vaiFaltar = farinhaNecessaria > farinhaEmEstoque;
      
      // Mostra a caixinha de resultado que estava oculta
      resultadoDiv.style.display = 'block';
      
      if (vaiFaltar) {
          const quantidadeFaltante = farinhaNecessaria - farinhaEmEstoque;
          resultadoDiv.innerHTML = `
              <h4 style="color: #e74c3c; margin-bottom: 10px;"> Atenção: Estoque Insuficiente</h4>
              <p style="font-size: 0.9rem; color: #333;">Para fazer ${qtdPaes} pães, você precisa de <strong>${farinhaNecessaria}Kg</strong> de farinha.</p>
              <p style="font-size: 0.9rem; color: #333;">Estoque atual: <strong>${farinhaEmEstoque}Kg</strong>.</p>
              <p style="font-size: 0.9rem; color: #e74c3c; margin-top: 5px;"><strong>Faltam ${quantidadeFaltante.toFixed(2)}Kg para a fornada!</strong></p>
          `;
      } else {
          resultadoDiv.innerHTML = `
              <h4 style="color: #2ecc71; margin-bottom: 10px;"> Estoque Suficiente</h4>
              <p style="font-size: 0.9rem; color: #333;">Para fazer ${qtdPaes} pães, você gasta <strong>${farinhaNecessaria}Kg</strong> de farinha.</p>
              <p style="font-size: 0.9rem; color: #333;">Estoque atual: <strong>${farinhaEmEstoque}Kg</strong>.</p>
              <p style="font-size: 0.9rem; color: #2ecc71; margin-top: 5px;"><strong>Pode iniciar a produção tranquilamente.</strong></p>
          `;
      }
  } else {
      alert("Por favor, digite uma quantidade válida de pães.");
  }
}

// ==========================================
// MÓDULO DO CAIXA 
// ==========================================

// "molde" (Interface) para o TypeScript saber o que é um item
interface ItemCarrinho {
  nome: string;
  preco: number;
  quantidade: number;
}

// "memória" do carrinho
let itensNoCarrinho: ItemCarrinho[] = [];
let valorTotalPedido: number = 0;

function adicionarAoCarrinho(nomeProduto: string, precoProduto: number): void {
  
  /* Procura na memória se o pão já foi adicionado antes
  1. O '.find()' é um método que assim que ele acha o item, ele para a busca.
  2. 'item =>' (Arrow Function): Funciona como um laço de repetição invisível. O sistema 
    pega cada produto do carrinho, um de cada vez, e temporariamente o chama de 'item'. */
  const itemExistente = itensNoCarrinho.find(item => item.nome === nomeProduto);

  if (itemExistente) {
      // Se achou, aplica quantidade + 1
      itemExistente.quantidade++;
  } else {
      // Se não achou, coloca na memória pela primeira vez com quantidade 1
      itensNoCarrinho.push({
          nome: nomeProduto,
          preco: precoProduto,
          quantidade: 1
      });
  }

  // Atualiza o dinheiro total
  valorTotalPedido += precoProduto;

  // Chama a função que redesenha a tela
  atualizarTelaDoCarrinho();
}

//Função que pega a memória e joga no HTML
function atualizarTelaDoCarrinho(): void {
  const listaDaComanda = document.getElementById('lista-carrinho'); //Pega a div do "lista-carrinho"
  const botaoFechar = document.getElementById('btn-fechar-venda'); //Pega a div do botão de venda

  if (listaDaComanda) { //Verifica se o HTML carregou
      listaDaComanda.innerHTML = ''; //Deixa ela invisível primeiro

      itensNoCarrinho.forEach(item => {
          const subtotalDoItem = item.quantidade * item.preco;
          
          //Cria o HTML do resultado
          listaDaComanda.innerHTML += `
              <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
                  <span>${item.quantidade}x ${item.nome}</span>
                  <div style="display: flex; gap: 10px; align-items: center;">
                      <span>R$ ${subtotalDoItem.toFixed(2)}</span>
                      <button onclick="removerDoCarrinho('${item.nome}')" style="background: #e74c3c; color: white; border: none; padding: 5px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Remover</button>
                  </div>
              </li>
          `;
      });
  }

  if (botaoFechar) {
      // Se o carrinho estiver vazio, volta o texto ao normal
      if (itensNoCarrinho.length === 0) {
          botaoFechar.innerText = "FECHAR VENDA";
      } else {
          botaoFechar.innerText = `FECHAR R$ ${valorTotalPedido.toFixed(2)}`;
      }
  }
}


function removerDoCarrinho(nomeProduto: string): void {
  // Acha a posição do pão na  memória
  const index = itensNoCarrinho.findIndex(item => item.nome === nomeProduto); //Acha a ref da lista

  if (index !== -1) { //Se a ref for -1 significa que não há itens
      const item = itensNoCarrinho[index];
      
      // Desconta o dinheiro
      valorTotalPedido -= item.preco;
      if (valorTotalPedido < 0) valorTotalPedido = 0; // Previne números negativos

      // Se tiver mais de 1, só diminui a quantidade. Se for o último, deleta da lista.
      if (item.quantidade > 1) {
          item.quantidade--;
      } else {
          itensNoCarrinho.splice(index, 1);
      }

      // Redesenha a tela
      atualizarTelaDoCarrinho();
  }
}

//Função de Reset do Sistema
function finalizarVenda(): void {
  // Impede o caixa de fechar uma venda sem nada
  if (itensNoCarrinho.length === 0) {
      alert("O carrinho está vazio!");
      return;
  }

  alert(`Venda finalizada com sucesso!\nTotal pago: R$ ${valorTotalPedido.toFixed(2)}`);
  
  // Zera a memória e o dinheiro
  itensNoCarrinho = [];
  valorTotalPedido = 0;
  
  // Limpa a tela
  atualizarTelaDoCarrinho();
}