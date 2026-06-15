"use strict";
// 1. Função auxiliar para limpar a tela
function ocultarTodasAsTelas() {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => {
        tela.style.display = 'none';
    });
}
// 2. Funções específicas para cada botão do menu
function abrirTelaHome() {
    ocultarTodasAsTelas();
    const telaHome = document.getElementById('tela-home');
    if (telaHome) {
        telaHome.style.display = 'block';
    }
}
function abrirTelaEstoque() {
    ocultarTodasAsTelas();
    const telaEstoque = document.getElementById('tela-estoque');
    if (telaEstoque) {
        telaEstoque.style.display = 'block';
    }
}
function abrirTelaVendas() {
    ocultarTodasAsTelas();
    const telaVendas = document.getElementById('tela-vendas');
    if (telaVendas) {
        telaVendas.style.display = 'block';
    }
}
function abrirTelaGestao() {
    ocultarTodasAsTelas();
    const telaGestao = document.getElementById('tela-gestao');
    if (telaGestao) {
        telaGestao.style.display = 'block';
    }
}
let valorTotalPedido = 0;
function adicionarAoCarrinho(nomeProduto, precoProduto) {
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
// ==========================================
// MÓDULO DE ESTOQUE E RECEITAS (Dia 14/06)
// ==========================================
let custoTotalReceita = 0;
function adicionarIngredienteReceita() {
    // 1. Pega os elementos do HTML
    const selectIngrediente = document.getElementById('select-ingrediente');
    const inputQtd = document.getElementById('input-qtd-ingrediente');
    const listaIngredientes = document.getElementById('lista-ingredientes-receita');
    const inputCusto = document.getElementById('input-custo-receita');
    const nomeIngrediente = selectIngrediente.options[selectIngrediente.selectedIndex].text;
    const quantidade = parseFloat(inputQtd.value);
    // 2. Verifica se o usuário digitou uma quantidade válida
    if (nomeIngrediente !== "Selecione..." && !isNaN(quantidade) && listaIngredientes) {
        // Coloca o ingrediente na listinha visual
        listaIngredientes.innerHTML += `
            <li style="border-bottom: 1px dashed #ccc; padding-bottom: 5px; margin-bottom: 5px;">
                - ${quantidade} Kg de ${nomeIngrediente}
            </li>
        `;
        // Faz uma simulação de custo (Ex: Vamos fingir que tudo custa R$ 5,00 o Quilo)
        const custoDesteIngrediente = quantidade * 5.00;
        custoTotalReceita += custoDesteIngrediente;
        // Atualiza o campo cinza travado com o valor matemático
        if (inputCusto) {
            inputCusto.value = `Custo Calculado: R$ ${custoTotalReceita.toFixed(2)}`;
        }
        // Limpa a caixinha de número para o próximo ingrediente
        inputQtd.value = '';
    }
}
function cadastrarReceita() {
    alert("Nova receita salva com sucesso no sistema!");
}
