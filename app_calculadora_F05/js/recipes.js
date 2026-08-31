// BANCO DE DADOS DE RECEITAS E INSUMOS
const RECEITAS = {
    "caixa_6l": {
        nome: "Caixa Térmica 6 Litros",
        pecasPorCiclo: 1,
        unidadeMedida: "caixas",
        tipoEmbalagem: "Pallets",
        qtdPorEmbalagem: 10, // não lembro
        insumos: { 
            "Tampa": 1, 
            "Alça": 1, 
            "Manual": 1, 
            "CP": 1, 
            "Etiqueta": 1, 
            "Isopor - Fundo|Lateral": 3, 
            "Isopor - Cabeceiras": 2 
        }
    },
    "caixa_12l": {
        nome: "Caixa Térmica 12 Litros",
        pecasPorCiclo: 1,
        unidadeMedida: "caixas",
        tipoEmbalagem: "Pallets",
        qtdPorEmbalagem: 61,
        insumos: { 
            "Tampa": 1, 
            "Alça": 1, 
            "Manual": 1, 
            "CP": 1, 
            "Etiqueta": 1, 
            "Isopor - Fundo": 1, 
            "Isopor - Laterais": 2, 
            "Isopor - Cabeceiras": 2 
        }
    },
    "caixa_18l": {
        nome: "Caixa Térmica 18 Litros",
        pecasPorCiclo: 1,
        unidadeMedida: "caixas",
        tipoEmbalagem: "Pallets",
        qtdPorEmbalagem: 21, // Não Lembro
        insumos: { 
            "Tampa": 1, 
            "Alça": 1, 
            "Manual": 1, 
            "CP": 1, 
            "Etiqueta": 1, 
            "Isopor - Fundo": 1, 
            "Isopor - Laterais": 2, 
            "Isopor - Cabeceiras": 2 
        }
    },
    "caixa_26l": {
        nome: "Caixa Térmica 26 Litros",
        pecasPorCiclo: 1,
        unidadeMedida: "caixas",
        tipoEmbalagem: "Pallets",
        qtdPorEmbalagem: 21, // Não Lembro
        insumos: { 
            "Tampa": 1, 
            "Alça": 1, 
            "Manual": 1, 
            "CP": 1, 
            "Etiqueta": 1, 
            "Isopor - Fundo": 1, 
            "Isopor - Laterais": 2, 
            "Isopor - Cabeceiras": 2 
        }
    },
    "caixa_34l": {
        nome: "Caixa Térmica 34 Litros",
        pecasPorCiclo: 1,
        unidadeMedida: "caixas",
        tipoEmbalagem: "Pallets",
        qtdPorEmbalagem: 21, // Eu acho
        insumos: { 
            "Tampa": 1, 
            "Alça": 1, 
            "Manual": 1, 
            "CP": 1, 
            "Etiqueta": 1, 
            "Isopor - Fundo": 1, 
            "Isopor - Laterais": 2, 
            "Isopor - Cabeceiras": 2 
        }
    },
    "caixa_42l": {
        nome: "Caixa Térmica 42 Litros",
        pecasPorCiclo: 1,
        unidadeMedida: "caixas",
        tipoEmbalagem: "Pallets",
        qtdPorEmbalagem: 12, // Ajuste a quantidade por Pallet, não lembro
        insumos: { 
            "Tampa": 1,
            "Isopor": 1,
            "Suporte Superior": 1,
            "Suporte Inferior": 1,
            "Rebite 4,8 x 31mm": 6,
            "Rebite 4,8 x 17,5mm": 4,
            "Rebite 4,8 x 10mm": 2,
            "Alça Nylon": 1, 
            "Alça Retrátil": 1,
            "Roda": 1,
            "Eixo Alumínio": 1,
            "Disco de Fixação Acoplado": 2,
            "Arruela Plástica": 2,
            "Manual": 1, 
            "CP": 1, 
            "Etiqueta": 1
        }
    },
    "gt_use_1l": {
        nome: "Garrafa Térmica (GT) Use 1L",
        pecasPorCiclo: 2,
        unidadeMedida: "garrafas",
        tipoEmbalagem: "Pallets",
        qtdPorEmbalagem: 288,
        insumos: { 
            "Ampola": 1, 
            "Fundo": 1, 
            "Parafuso": 1, 
            "Copo": 1, 
            "Vedante": 1, 
            "Etiqueta": 1, 
            "CP": 1/6 
        }
    },
    "cadeira_bistro": {
        nome: "Cadeira Bistro",
        pecasPorCiclo: 1,
        unidadeMedida: "cadeiras",
        tipoEmbalagem: "Gaiolas",
        qtdPorEmbalagem: 216,
        insumos: { 
            "Etiqueta INMETRO": 1, 
            "Etiqueta INFORMAÇÕES": 1,
            "Saco": 1/24 
        }
    },
    "poltrona": {
        nome: "Poltrona",
        pecasPorCiclo: 1,
        unidadeMedida: "poltronas",
        tipoEmbalagem: "Gaiolas",
        qtdPorEmbalagem: 144,
        insumos: { 
            "Etiqueta INMETRO": 1, 
            "Etiqueta INFORMAÇÕES": 1,
            "Saco": 1/24 
        }
    },
    "mesa_bela_vista": {
        nome: "Mesa Plástica",
        pecasPorCiclo: 1,
        unidadeMedida: "mesas",
        tipoEmbalagem: "Gaiolas",
        qtdPorEmbalagem: 54,
        insumos: { 
            "Etiqueta": 1, 
            "Saco": 1/6, 
            "Tampa": 1, 
            "Chapa": 1/6 
        }
    }
};