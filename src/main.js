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
