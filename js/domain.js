/**
 * Lógica pura do negócio (Clean Architecture)
 * Responsável por calcular a produção e as margens dos materiais sem manipular a interface.
 */
function calcularProduçãoEInsumos(itemId, cicloInput, horasTurno, fatorMargem) {
    if (!cicloInput || cicloInput <= 0 || !horasTurno || horasTurno <= 0) {
        throw new Error("Por favor, preencha o ciclo e as horas com valores válidos.");
    }

    const produto = RECEITAS[itemId];
    if (!produto) {
        throw new Error("Erro: Receita não encontrada!");
    }

    const ciclosPorHora = Math.ceil(3600 / Math.floor(cicloInput));
    const totalProduzido = Math.floor(ciclosPorHora * horasTurno * produto.pecasPorCiclo);
    const materiaisComMargem = {};

    for (const [material, fator] of Object.entries(produto.insumos)) {
        materiaisComMargem[material] = Math.ceil(totalProduzido * fator * fatorMargem);
    }

    // Cálculo da quantidade de Pallets ou Gaiolas
    const totalEmbalagens = produto.qtdPorEmbalagem 
        ? (totalProduzido / produto.qtdPorEmbalagem).toFixed(2) 
        : null;

    return {
        id: itemId,
        nome: produto.nome,
        unidadeMedida: produto.unidadeMedida,
        totalProduzido: totalProduzido,
        fatorMargem: fatorMargem,
        tipoEmbalagem: produto.tipoEmbalagem,
        totalEmbalagens: totalEmbalagens,
        materiais: materiaisComMargem
    };
}