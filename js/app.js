let acumuladoPorProduto = {};
let calculoAtual = null;

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    // Checagem de Senha
    const telaLogin = document.getElementById('telaLogin');
    if (typeof REQUER_SENHA !== 'undefined' && REQUER_SENHA) {
        const jaAutenticado = sessionStorage.getItem('autenticado') === 'true';
        if (!jaAutenticado) {
            telaLogin.style.display = 'flex';
        }
    }

    // Atalho Enter para login
    const inputSenha = document.getElementById('senhaAcesso');
    if (inputSenha) {
        inputSenha.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') validarSenha();
        });
    }
});

// AUTENTICAÇÃO
function validarSenha() {
    const senhaDigitada = document.getElementById('senhaAcesso').value;
    const msgErro = document.getElementById('msgErro');

    if (typeof SENHA_CORRETA !== 'undefined' && senhaDigitada === SENHA_CORRETA) {
        document.getElementById('telaLogin').style.display = 'none';
        msgErro.style.display = 'none';
        sessionStorage.setItem('autenticado', 'true');
    } else {
        msgErro.style.display = 'block';
        document.getElementById('senhaAcesso').value = '';
    }
}

// CÁLCULO DE ITEM
function calcular() {
    const itemSelecionado = document.getElementById('item').value;
    const cicloInput = parseFloat(document.getElementById('ciclo').value);
    const horasTurno = parseFloat(document.getElementById('horas').value);
    const fatorMargem = parseFloat(document.getElementById('margem').value);

    try {
        calculoAtual = calcularProduçãoEInsumos(itemSelecionado, cicloInput, horasTurno, fatorMargem);

        const porcentagemTexto = Math.round((calculoAtual.fatorMargem - 1) * 100);
        const textoMargem = porcentagemTexto > 0 ? ` (com ${porcentagemTexto}% de margem)` : '';

        // Formata a exibição das embalagens (ex: " - 7.63 Pallets")
        const textoEmbalagem = calculoAtual.totalEmbalagens 
            ? ` - ${calculoAtual.totalEmbalagens} ${calculoAtual.tipoEmbalagem}` 
            : '';

        document.getElementById('totalCaixas').innerText = 
            `Produção Estimada: ${calculoAtual.totalProduzido.toLocaleString('pt-BR')} ${calculoAtual.unidadeMedida}${textoMargem}${textoEmbalagem}`;

        const listaUI = document.getElementById('listaMateriais');
        listaUI.innerHTML = '';

        for (const [material, qtd] of Object.entries(calculoAtual.materiais)) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${material}</span> <span class="qty">${qtd.toLocaleString('pt-BR')} und.</span>`;
            listaUI.appendChild(li);
        }

        document.getElementById('resultado').style.display = 'block';

    } catch (erro) {
        alert(erro.message);
    }
}

// GERENCIAMENTO DO ACUMULADO
function adicionarAoAcumulado() {
    if (!calculoAtual) return;
    acumuladoPorProduto[calculoAtual.id] = {
        nome: calculoAtual.nome,
        materiais: Object.assign({}, calculoAtual.materiais)
    };
    atualizarTelaAcumulado();
}

function atualizarTelaAcumulado() {
    const container = document.getElementById('containerGruposAcumulados');
    container.innerHTML = '';

    for (const [prodId, prodDados] of Object.entries(acumuladoPorProduto)) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'product-group';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'product-title';

        const divEsquerda = document.createElement('div');
        divEsquerda.style.display = 'flex';
        divEsquerda.style.alignItems = 'center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox-item';

        const titleText = document.createElement('span');
        titleText.innerText = prodDados.nome;

        checkbox.onchange = function() {
            groupDiv.style.opacity = this.checked ? '0.5' : '1';
            ul.style.textDecoration = this.checked ? 'line-through' : 'none';
        };

        divEsquerda.appendChild(checkbox);
        divEsquerda.appendChild(titleText);

        const btnDelete = document.createElement('button');
        btnDelete.innerText = '✕';
        btnDelete.style.cssText = 'background:none; border:none; color:#e53e3e; font-weight:bold; cursor:pointer; font-size:0.9rem; padding:0 5px;';
        btnDelete.title = 'Remover este produto';
        btnDelete.onclick = () => removerProduto(prodId);

        titleDiv.appendChild(divEsquerda);
        titleDiv.appendChild(btnDelete);
        groupDiv.appendChild(titleDiv);

        const ul = document.createElement('ul');
        ul.className = 'material-list';

        for (const [material, qtd] of Object.entries(prodDados.materiais)) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${material}</span> <span class="qty">${qtd.toLocaleString('pt-BR')} und.</span>`;
            ul.appendChild(li);
        }

        groupDiv.appendChild(ul);
        container.appendChild(groupDiv);
    }

    document.getElementById('boxAcumulado').style.display = Object.keys(acumuladoPorProduto).length > 0 ? 'block' : 'none';
}

function removerProduto(prodId) {
    delete acumuladoPorProduto[prodId];
    atualizarTelaAcumulado();
}

async function limparAcumulado() {
    const confirmou = await customConfirm("Tem certeza que deseja zerar todos os totais acumulados do turno?", "Limpar Turno");
    if (!confirmou) return;

    acumuladoPorProduto = {};
    atualizarTelaAcumulado();
}

function copiarParaWhatsApp() {
    const grupos = document.querySelectorAll('.product-group');
    let texto = "📋 RESUMO DE INSUMOS NECESSÁRIOS:\n\n";
    let temItemSelecionado = false;

    grupos.forEach(grupo => {
        const checkbox = grupo.querySelector('.checkbox-item');
        if (checkbox && checkbox.checked) {
            temItemSelecionado = true;
            const nomeProduto = grupo.querySelector('.product-title span').innerText;
            texto += `📦 ${nomeProduto.toUpperCase()}\n`;

            const materiais = grupo.querySelectorAll('.material-list li');
            materiais.forEach(li => {
                const material = li.querySelector('span:not(.qty)').innerText;
                const qtd = li.querySelector('.qty').innerText;
                texto += `• ${material}: ${qtd}\n`;
            });
            texto += "\n";
        }
    });

    if (!temItemSelecionado) {
        alert("Marque ao menos um produto para copiar!");
        return;
    }

    navigator.clipboard.writeText(texto).then(() => alert("Resumo copiado!")).catch(() => {
        let textarea = document.createElement("textarea");
        textarea.value = texto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Resumo copiado!");
    });
}

// MODAIS PERSONALIZADOS (OVERRIDE DO ALERT NATIVO)
window.alert = function(mensagem, titulo = "Aviso") {
    document.getElementById('modalTitulo').innerText = titulo;
    document.getElementById('modalMensagem').innerText = mensagem;
    document.getElementById('btnModalCancelar').style.display = 'none';
    
    const btnConfirmar = document.getElementById('btnModalConfirmar');
    btnConfirmar.innerText = "OK";
    btnConfirmar.style.background = "#3182ce";
    document.getElementById('modalApp').style.display = 'flex';

    btnConfirmar.onclick = () => document.getElementById('modalApp').style.display = 'none';
};

function customConfirm(mensagem, titulo = "Confirmação") {
    return new Promise((resolve) => {
        document.getElementById('modalTitulo').innerText = titulo;
        document.getElementById('modalMensagem').innerText = mensagem;
        
        const btnCancelar = document.getElementById('btnModalCancelar');
        const btnConfirmar = document.getElementById('btnModalConfirmar');
        
        btnCancelar.style.display = 'block';
        btnConfirmar.innerText = "Sim, Limpar";
        btnConfirmar.style.background = "#e53e3e";
        
        document.getElementById('modalApp').style.display = 'flex';

        btnConfirmar.onclick = () => {
            document.getElementById('modalApp').style.display = 'none';
            resolve(true);
        };

        btnCancelar.onclick = () => {
            document.getElementById('modalApp').style.display = 'none';
            resolve(false);
        };
    });
}