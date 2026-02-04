const db = require('./database');

// Dados do currículo - AGENTE ADMINISTRATIVO
const curriculoAgenteAdm = {
    cargo: "agente",
    materias: [
        {
            nome: "Língua Portuguesa",
            questoes: 10,
            peso: 3,
            topicos: [
                "Compreensão e interpretação de textos de diferentes gêneros.",
                "Características e funções dos gêneros textuais e seus contextos de uso.",
                "Variação linguística: estilística, sociocultural, geográfica, histórica.",
                "Mecanismos de coesão e coerência textual.",
                "Produção de sentido: polissemia, ironia, comparação, ambiguidade, inferência e pressuposto.",
                "Tipos e estruturas textuais: narração, descrição, argumentação, exposição e injunção.",
                "Classes de palavras e processos de formação de palavras.",
                "Estrutura e organização da oração e do período: relações de coordenação e subordinação.",
                "Concordância e regência verbal e nominal.",
                "Emprego de tempos e modos verbais.",
                "Pontuação e acentuação gráfica."
            ]
        },
        {
            nome: "Raciocínio Lógico-Matemático",
            questoes: 5,
            peso: 1,
            topicos: [
                "Lógica e raciocínio lógico.",
                "Lógica de argumentação.",
                "Proposição lógica.",
                "Proposições simples e compostas.",
                "Operadores lógicos.",
                "Tabela verdade.",
                "Tautologia, contradição e contingência.",
                "Equivalências e negações.",
                "Conjuntos, subconjuntos e operações básicas de conjunto.",
                "Noções de Estatística: tabelas, gráficos e medidas de tendência central (média, moda e mediana).",
                "Grandezas proporcionais, razão e proporção.",
                "Regra de três.",
                "Porcentagem.",
                "Juros simples e compostos."
            ]
        },
        {
            nome: "Realidade de Goiás e Goiânia",
            questoes: 5,
            peso: 1,
            topicos: [
                "Conflitos sociais, desigualdade, pobreza, fome e direitos humanos.",
                "Emergências de saúde pública, surtos e epidemias.",
                "Questões atuais do meio ambiente, desastres ambientais, mudanças climáticas e políticas ambientais.",
                "Arte, cultura e patrimônio na região Centro-Oeste brasileira.",
                "Formação histórico-territorial de Goiás.",
                "Política, economia e sociedade em Goiás: da Colônia à República.",
                "Modernização da agricultura e urbanização do território de Goiás.",
                "Aspectos físicos do território goiano: vegetação, hidrografia, clima e relevo.",
                "Natureza, cultura e turismo em Goiás.",
                "Aspectos histórico-geográficos de Goiânia."
            ]
        },
        {
            nome: "Conhecimentos Específicos",
            questoes: 30,
            peso: 2,
            topicos: [
                "Ética no Setor Público.",
                "Improbidade Administrativa (Lei nº 8.429/1992: Capítulos II e V, com alterações da Lei nº 14.230/2021).",
                "Acesso à Informação (Lei nº 12.527/2011).",
                "Acesso a Informações (Decreto nº 7.724/2012).",
                "Introdução às Normas do Direito Brasileiro (Decreto nº 9.830/2019).",
                "Constituição Federal de 1988: Capítulo VII – Da Administração Pública, seções I e II.",
                "Estrutura Administrativa da Câmara Municipal de Goiânia (Lei Municipal nº 11.351/2025).",
                "Estatuto dos Servidores Públicos da Câmara Municipal de Goiânia (Lei Complementar nº 354/2022).",
                "Regimento Interno da Câmara Municipal de Goiânia (Resolução nº 26/1991 e atualizações).",
                "Lei Orgânica do Município de Goiânia.",
                "Conceitos básicos de administração e suas funções: planejamento, organização, direção e controle.",
                "Estrutura e funcionamento da administração pública municipal.",
                "Noções de organização, sistemas e métodos (OSM) e gestão por processos.",
                "Administração de materiais: tipos, recebimento, armazenagem, estoque e inventário.",
                "Processo de compras e contratações públicas: noções gerais da Lei nº 14.133/2021.",
                "Planejamento e orçamento públicos: noções básicas de finanças e gestão orçamentária municipal.",
                "Gestão documental: protocolo, tramitação e arquivamento.",
                "Redação e tipos de documentos administrativos (ofícios, memorandos, atas).",
                "Atendimento ao público e comunicação institucional.",
                "Comunicação nas organizações: formal, informal e fluxos de informação.",
                "Noções de gestão pública: governança, transparência e accountability."
            ]
        }
    ]
};

// Dados do currículo - ANALISTA TÉCNICO LEGISLATIVO
const curriculoAnalistaTec = {
    cargo: "analista",
    materias: [
        {
            nome: "Língua Portuguesa",
            questoes: 10,
            peso: 1,
            topicos: [
                "Características e funcionalidades de diferentes gêneros e tipologias textuais.",
                "Interpretação textual de diferentes gêneros e tipologias textuais.",
                "Gramática normativa.",
                "Mecanismos de produção de sentidos: polissemia, ambiguidade, citação, inferência e pressuposto.",
                "Organização do texto e fatores de textualidade (coesão, coerência, etc).",
                "Progressão temática em textos.",
                "Tipologias textuais: descritiva, narrativa, argumentativa, injuntiva, dialogal.",
                "Elementos de sequenciação textual: referenciação, substituição, repetição, conectores.",
                "Tipos de argumento.",
                "Classificação gramatical e Morfologia.",
                "Análise morfossintática e Fenômenos linguísticos.",
                "Concordância verbal e nominal.",
                "Regência verbal e nominal.",
                "Colocação pronominal.",
                "Pontuação e Figuras de linguagem.",
                "Interpretação: documentos legais e normativos.",
                "Acordo Ortográfico de 1990."
            ]
        },
        {
            nome: "Raciocínio Lógico-Matemático",
            questoes: 5,
            peso: 1,
            topicos: [
                "Lógica e raciocínio lógico.",
                "Lógica de argumentação.",
                "Proposição lógica.",
                "Proposições simples e compostas.",
                "Operadores lógicos.",
                "Tabela verdade.",
                "Tautologia, contradição e contingência.",
                "Equivalências e negações.",
                "Conjuntos, subconjuntos e operações básicas de conjunto.",
                "Noções de Estatística: tabelas, gráficos e medidas de tendência central (média, moda e mediana).",
                "Grandezas proporcionais, razão e proporção.",
                "Regra de três.",
                "Porcentagem.",
                "Juros simples e compostos."
            ]
        },
        {
            nome: "Realidade de Goiás e Goiânia",
            questoes: 5,
            peso: 1,
            topicos: [
                "Conflitos sociais, desigualdade, pobreza, fome e direitos humanos.",
                "Emergências de saúde pública, surtos e epidemias.",
                "Questões atuais do meio ambiente, desastres ambientais, mudanças climáticas e políticas ambientais.",
                "Arte, cultura e patrimônio na região Centro-Oeste brasileira.",
                "Formação histórico-territorial de Goiás.",
                "Política, economia e sociedade em Goiás: da Colônia à República.",
                "Modernização da agricultura e urbanização do território de Goiás.",
                "Aspectos físicos do território goiano: vegetação, hidrografia, clima e relevo.",
                "Natureza, cultura e turismo em Goiás.",
                "Aspectos histórico-geográficos de Goiânia."
            ]
        },
        {
            nome: "Conhecimentos Específicos",
            questoes: 40,
            peso: 2,
            topicos: [
                "Constituição Federal de 1988: Capítulo VII – Da Administração Pública, seções I e II.",
                "Ética no Setor Público.",
                "Noções de Direito Administrativo e princípios da Administração Pública.",
                "Lei de Licitações e Contratos Administrativos (Lei nº 14.133/2021).",
                "Improbidade Administrativa (Lei nº 8.429/1992 atualizada pela Lei 14.230/2021).",
                "Plano Plurianual (PPA), LDO e LOA.",
                "Noções básicas sobre controle interno e externo (CF/88 arts. 70 a 74).",
                "Acesso à Informação (Lei nº 12.527/2011).",
                "Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).",
                "Lei Orgânica do Município de Goiânia.",
                "Estatuto dos Servidores Públicos da Câmara Municipal de Goiânia (LC nº 354/2022).",
                "Estrutura administrativa da Câmara Municipal de Goiânia (Lei nº 11.351/2025).",
                "Regimento Interno da Câmara Municipal de Goiânia (Resolução nº 26/1991).",
                "Fundamentos constitucionais do Estado e princípios da Administração Pública.",
                "Estrutura e funcionamento da Administração Pública brasileira (foco municipal).",
                "Administração pública burocrática e gerencial.",
                "Orçamento público: conceito, princípios, ciclo, PPA, LDO e LOA.",
                "Despesas públicas: estágios, créditos adicionais, empenho, liquidação e pagamento.",
                "Controle interno e externo na Administração Pública.",
                "Governança, governabilidade e accountability.",
                "Gestão estratégica e gestão por resultados.",
                "Gestão por processos e melhoria contínua.",
                "Ferramentas de qualidade e inovação na gestão pública.",
                "Redação oficial e comunicação organizacional.",
                "Noções de processo legislativo e ética pública aplicada ao serviço legislativo."
            ]
        }
    ]
};

function popularBanco() {
    console.log('Iniciando população do banco de dados...');

    const curriculos = [curriculoAgenteAdm, curriculoAnalistaTec];

    curriculos.forEach(curriculo => {
        curriculo.materias.forEach((materia, materiaIndex) => {
            db.run(
                `INSERT INTO subjects (cargo, nome, questoes, peso) VALUES (?, ?, ?, ?)`,
                [curriculo.cargo, materia.nome, materia.questoes, materia.peso],
                function(err) {
                    if (err) {
                        console.error('Erro ao inserir matéria:', err);
                        return;
                    }

                    const subjectId = this.lastID;
                    
                    materia.topicos.forEach((topico, topicoIndex) => {
                        db.run(
                            `INSERT INTO topics (subject_id, texto, ordem) VALUES (?, ?, ?)`,
                            [subjectId, topico, topicoIndex],
                            function(err) {
                                if (err) {
                                    console.error('Erro ao inserir tópico:', err);
                                }
                            }
                        );
                    });

                    console.log(`✓ Matéria inserida: ${materia.nome} (${curriculo.cargo})`);
                }
            );
        });
    });

    setTimeout(() => {
        console.log('\n✅ Banco de dados populado com sucesso!');
        db.close();
    }, 2000);
}

// Verificar se já existem dados
db.get('SELECT COUNT(*) as count FROM subjects', [], (err, row) => {
    if (err) {
        console.error(err);
        return;
    }
    
    if (row.count > 0) {
        console.log('⚠️  Banco já contém dados. Deseja limpar e repopular? (Ctrl+C para cancelar)');
        setTimeout(() => {
            db.run('DELETE FROM user_progress');
            db.run('DELETE FROM topics');
            db.run('DELETE FROM subjects');
            setTimeout(() => {
                popularBanco();
            }, 500);
        }, 2000);
    } else {
        popularBanco();
    }
});
