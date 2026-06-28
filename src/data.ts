// Data structures and content for PosseQuest study platform
export interface Subject {
  nome: string;
  grupo: string;
  questoes?: number | null;
  peso?: number | null;
  prioridade: "Muito Alta" | "Alta" | "Média" | "Baixa";
  topicos: string[];
}

export interface Contest {
  id: string;
  nome: string;
  orgao: string;
  cargo: string;
  tipo: "Polícia Penal" | "Polícia Militar" | "Polícia Civil" | "Polícia Federal" | "PRF" | "Polícia Legislativa";
  abrangencia: "Estadual" | "Nacional";
  estado: string;
  banca: string;
  ano: number;
  status: string;
  fonte: string;
  vagas?: string;
  salario?: string;
  disciplinas: Subject[];
}

export interface StateInfo {
  uf: string;
  estado: string;
  regiao: string;
  nomeLocal: string;
  bandeira: string;
}

export const ESTADOS_BRASIL: StateInfo[] = [
  { uf: "AC", estado: "Acre", regiao: "Norte", nomeLocal: "do Acre", bandeira: "https://flagcdn.com/w80/br-ac.png" },
  { uf: "AL", estado: "Alagoas", regiao: "Nordeste", nomeLocal: "de Alagoas", bandeira: "https://flagcdn.com/w80/br-al.png" },
  { uf: "AP", estado: "Amapá", regiao: "Norte", nomeLocal: "do Amapá", bandeira: "https://flagcdn.com/w80/br-ap.png" },
  { uf: "AM", estado: "Amazonas", regiao: "Norte", nomeLocal: "do Amazonas", bandeira: "https://flagcdn.com/w80/br-am.png" },
  { uf: "BA", estado: "Bahia", regiao: "Nordeste", nomeLocal: "da Bahia", bandeira: "https://flagcdn.com/w80/br-ba.png" },
  { uf: "CE", estado: "Ceará", regiao: "Nordeste", nomeLocal: "do Ceará", bandeira: "https://flagcdn.com/w80/br-ce.png" },
  { uf: "DF", estado: "Distrito Federal", regiao: "Centro-Oeste", nomeLocal: "do Distrito Federal", bandeira: "https://flagcdn.com/w80/br-df.png" },
  { uf: "ES", estado: "Espírito Santo", regiao: "Sudeste", nomeLocal: "do Espírito Santo", bandeira: "https://flagcdn.com/w80/br-es.png" },
  { uf: "GO", estado: "Goiás", regiao: "Centro-Oeste", nomeLocal: "de Goiás", bandeira: "https://flagcdn.com/w80/br-go.png" },
  { uf: "MA", estado: "Maranhão", regiao: "Nordeste", nomeLocal: "do Maranhão", bandeira: "https://flagcdn.com/w80/br-ma.png" },
  { uf: "MT", estado: "Mato Grosso", regiao: "Centro-Oeste", nomeLocal: "de Mato Grosso", bandeira: "https://flagcdn.com/w80/br-mt.png" },
  { uf: "MS", estado: "Mato Grosso do Sul", regiao: "Centro-Oeste", nomeLocal: "de Mato Grosso do Sul", bandeira: "https://flagcdn.com/w80/br-ms.png" },
  { uf: "MG", estado: "Minas Gerais", regiao: "Sudeste", nomeLocal: "de Minas Gerais", bandeira: "https://flagcdn.com/w80/br-mg.png" },
  { uf: "PA", estado: "Pará", regiao: "Norte", nomeLocal: "do Pará", bandeira: "https://flagcdn.com/w80/br-pa.png" },
  { uf: "PB", estado: "Paraíba", regiao: "Nordeste", nomeLocal: "da Paraíba", bandeira: "https://flagcdn.com/w80/br-pb.png" },
  { uf: "PR", estado: "Paraná", regiao: "Sul", nomeLocal: "do Paraná", bandeira: "https://flagcdn.com/w80/br-pr.png" },
  { uf: "PE", estado: "Pernambuco", regiao: "Nordeste", nomeLocal: "de Pernambuco", bandeira: "https://flagcdn.com/w80/br-pe.png" },
  { uf: "PI", estado: "Piauí", regiao: "Nordeste", nomeLocal: "do Piauí", bandeira: "https://flagcdn.com/w80/br-pi.png" },
  { uf: "RJ", estado: "Rio de Janeiro", regiao: "Sudeste", nomeLocal: "do Rio de Janeiro", bandeira: "https://flagcdn.com/w80/br-rj.png" },
  { uf: "RN", estado: "Rio Grande do Norte", regiao: "Nordeste", nomeLocal: "do Rio Grande do Sul", bandeira: "https://flagcdn.com/w80/br-rn.png" },
  { uf: "RS", estado: "Rio Grande do Sul", regiao: "Sul", nomeLocal: "do Rio Grande do Sul", bandeira: "https://flagcdn.com/w80/br-rs.png" },
  { uf: "RO", estado: "Rondônia", regiao: "Norte", nomeLocal: "de Rondônia", bandeira: "https://flagcdn.com/w80/br-ro.png" },
  { uf: "RR", estado: "Roraima", regiao: "Norte", nomeLocal: "de Roraima", bandeira: "https://flagcdn.com/w80/br-rr.png" },
  { uf: "SC", estado: "Santa Catarina", regiao: "Sul", nomeLocal: "de Santa Catarina", bandeira: "https://flagcdn.com/w80/br-sc.png" },
  { uf: "SP", estado: "São Paulo", regiao: "Sudeste", nomeLocal: "de São Paulo", bandeira: "https://flagcdn.com/w80/br-sp.png" },
  { uf: "SE", estado: "Sergipe", regiao: "Nordeste", nomeLocal: "de Sergipe", bandeira: "https://flagcdn.com/w80/br-se.png" },
  { uf: "TO", estado: "Tocantins", regiao: "Norte", nomeLocal: "do Tocantins", bandeira: "https://flagcdn.com/w80/br-to.png" },
  { uf: "BR", estado: "Nacional (Federal)", regiao: "Nacional", nomeLocal: "do Brasil", bandeira: "https://flagcdn.com/w80/br.png" }
];

export const CONCURSOS_INICIAIS: Contest[] = [
  {
    id: "policia_penal_sc",
    nome: "Polícia Penal SC",
    orgao: "Secretaria de Estado da Administração Prisional e Socioeducativa de SC",
    cargo: "Policial Penal",
    tipo: "Polícia Penal",
    abrangencia: "Estadual",
    estado: "SC",
    banca: "AOCP",
    ano: 2026,
    status: "Confirmado / Aguardando Edital",
    fonte: "SAP SC",
    vagas: "600 previstas",
    salario: "R$ 6.000,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Leitura e interpretação de textos", "Ortografia oficial", "Morfologia", "Análise sintática", "Pontuação", "Concordância nominal e verbal", "Regência", "Crase"]
      },
      {
        nome: "Raciocínio Lógico-Matemático",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Estruturas lógicas", "Lógica de argumentação", "Diagramas lógicos", "Equações e sistemas de 1º e 2º graus", "Razão e proporção", "Porcentagem", "Análise combinatória e probabilidade"]
      },
      {
        nome: "Noções de Informática",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Sistemas operacionais Windows e Linux", "Pacote Microsoft Office e LibreOffice", "Navegadores de Internet", "Conceitos de segurança da informação e antivírus"]
      },
      {
        nome: "Direito Constitucional",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Dos princípios fundamentais", "Dos direitos e deveres individuais e coletivos", "Dos direitos sociais", "Da nacionalidade", "Da segurança pública (Art. 144)"]
      },
      {
        nome: "Direito Administrativo",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Princípios da administração pública", "Poderes administrativos", "Atos administrativos", "Agentes públicos e responsabilidade", "Serviços públicos", "Licitações e contratos"]
      },
      {
        nome: "Direito Penal",
        grupo: "Noções de Direito",
        questoes: 15,
        peso: 2.0,
        prioridade: "Muito Alta",
        topicos: ["Aplicação da lei penal", "Teoria do crime (fato típico, ilícito e culpável)", "Crimes contra a pessoa", "Crimes contra o patrimônio", "Crimes contra a administração pública"]
      },
      {
        nome: "Direito Processual Penal",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Inquérito policial", "Da ação penal", "Da prisão em flagrante", "Da prisão preventiva e temporária", "Do processo e julgamento"]
      },
      {
        nome: "Lei de Execução Penal (LEP)",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.5,
        prioridade: "Muito Alta",
        topicos: ["Do objeto e da aplicação da LEP", "Do condenado e do internado", "Dos deveres e direitos do preso", "Da disciplina e do isolamento", "Dos órgãos da execução penal", "Dos estabelecimentos penais"]
      },
      {
        nome: "Direitos Humanos",
        grupo: "Conhecimentos Específicos",
        questoes: 5,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Declaração Universal dos Direitos Humanos (DUDH)", "Pacto de San José da Costa Rica", "Regras mínimas da ONU para tratamento de reclusos (Regras de Mandela)"]
      },
      {
        nome: "Legislação Extravagante",
        grupo: "Conhecimentos Específicos",
        questoes: 5,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Lei de Tortura (Lei 9.455/97)", "Lei de Drogas (Lei 11.343/06)", "Abuso de Autoridade (Lei 13.869/19)", "Crimes Hediondos (Lei 8.072/90)", "Estatuto do Desarmamento (Lei 10.826/03)"]
      }
    ]
  },
  {
    id: "pmpr_soldado",
    nome: "PMPR - Soldado",
    orgao: "Polícia Militar do Estado do Paraná",
    cargo: "Soldado PM",
    tipo: "Polícia Militar",
    abrangencia: "Estadual",
    estado: "PR",
    banca: "IBFC",
    ano: 2025,
    status: "Edital Publicado",
    fonte: "PMPR Oficial",
    vagas: "2.000 imediatas",
    salario: "R$ 4.800,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Compreensão de textos", "Coesão e coerência", "Classes de palavras", "Regência e concordância", "Sintaxe da oração e do período", "Pontuação", "Ortografia oficial"]
      },
      {
        nome: "Raciocínio Matemático",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Conjuntos numéricos", "Problemas de equações e sistemas", "Porcentagem e juros simples", "Probabilidade básica", "Lógica proposicional", "Equivalências e negações"]
      },
      {
        nome: "Informática",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Baixa",
        topicos: ["Sistemas operacionais Windows 10 e 11", "Edição de textos e planilhas", "Pesquisa na Internet", "Serviços em nuvem", "Segurança digital de dados"]
      },
      {
        nome: "História do Paraná",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Período colonial e caminhos do gado", "O ciclo do mate e emancipação do Paraná", "Revolução Federalista e Guerra do Contestado", "Desenvolvimento cafeeiro e migrações no norte/oeste"]
      },
      {
        nome: "Geografia do Paraná",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Relevo do Paraná (Três planaltos)", "Aspectos climáticos e hidrografia regional", "Estrutura demográfica e urbanização", "Principais atividades agroindustriais e polos urbanos"]
      },
      {
        nome: "Direito Constitucional",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Dos Direitos e Garantias Fundamentais", "Dos direitos individuais e coletivos", "Dos direitos sociais", "Da Organização dos Poderes", "Da Defesa do Estado e das Instituições (Segurança Pública)"]
      },
      {
        nome: "Direito Administrativo",
        grupo: "Noções de Direito",
        questoes: 5,
        peso: 2.0,
        prioridade: "Média",
        topicos: ["Conceito, fontes e princípios", "Organização administrativa estadual", "Atos administrativos: requisitos e atributos", "Poderes da Administração", "Agentes públicos e processo disciplinar"]
      },
      {
        nome: "Direitos Humanos",
        grupo: "Noções de Direito",
        questoes: 5,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Conceito e evolução dos Direitos Humanos", "DUDH de 1948", "Constituição Federal de 1988 e tratados internacionais", "Uso da força e garantias de custódia"]
      },
      {
        nome: "Legislação Institucional da PMPR",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 2.5,
        prioridade: "Muito Alta",
        topicos: ["Constituição do Paraná - Disposições sobre Militares", "Estatuto dos Militares do Estado do Paraná (Lei 1.943/54)", "Regulamento Disciplinar do Exército e PMPR", "Lei de Organização Básica da PMPR"]
      }
    ]
  },
  {
    id: "apm_bahia",
    nome: "APM Bahia (Cadete PM)",
    orgao: "Academia de Polícia Militar da Bahia / PMBA",
    cargo: "Cadete PM / Aluno Oficial",
    tipo: "Polícia Militar",
    abrangencia: "Estadual",
    estado: "BA",
    banca: "UNEB",
    ano: 2025,
    status: "Edital Previsto / Autorizado",
    fonte: "Polícia Militar da Bahia",
    vagas: "100 previstas",
    salario: "R$ 3.200,00 (Remuneração Aluno)",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Interpretação e compreensão de texto", "Tipologia textual", "Ortografia e acentuação", "Morfossetorial de classes de palavras", "Sintaxe do período e oração", "Concordância e regência", "Emprego da crase"]
      },
      {
        nome: "Língua Inglesa",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Baixa",
        topicos: ["Vocabulário instrumental de inglês", "Compreensão de textos modernos", "Estrutura gramatical básica", "Termos técnicos de segurança pública"]
      },
      {
        nome: "Matemática e Raciocínio Lógico",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Equações e inequações", "Funções, matrizes e determinantes", "Probabilidade e combinatória", "Geometria plana e espacial", "Argumentação lógica e verdades/mentiras"]
      },
      {
        nome: "História e Geografia",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Brasil colônia, império e república", "História e emancipação da Bahia", "Geografia física e econômica do Brasil", "População, recursos naturais e meio ambiente na Bahia"]
      },
      {
        nome: "Noções de Informática",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Baixa",
        topicos: ["Internet, navegadores e motores de busca", "Suítes de produtividade", "Armazenamento em nuvem", "Ameaças digitais e backup"]
      },
      {
        nome: "Direito Constitucional",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Princípios fundamentais", "Direitos e garantias fundamentais", "Organização do Estado e repartição de competências", "Poder Executivo", "Da segurança pública (artigo 144)"]
      },
      {
        nome: "Direito Administrativo",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Princípios constitucionais da administração", "Poderes da administração pública", "Atos administrativos: extinção e convalidação", "Responsabilidade civil do Estado", "Bens públicos e servidores públicos"]
      },
      {
        nome: "Direito Penal Militar",
        grupo: "Noções de Direito",
        questoes: 15,
        peso: 2.5,
        prioridade: "Muito Alta",
        topicos: ["Da aplicação da lei penal militar", "Do crime militar em tempo de paz", "Da imputabilidade penal militar", "Dos crimes contra a autoridade ou disciplina militar (Insubordinação, motim, revolta)", "Deserção e abandono de posto"]
      },
      {
        nome: "Direito Processual Penal Militar",
        grupo: "Noções de Direito",
        questoes: 10,
        peso: 2.0,
        prioridade: "Muito Alta",
        topicos: ["Da polícia judiciária militar", "Inquérito Policial Militar (IPM)", "Da prisão em flagrante militar", "Da prisão preventiva militar", "Do processo ordinário militar"]
      },
      {
        nome: "Direitos Humanos",
        grupo: "Noções de Direito",
        questoes: 5,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["DUDH de 1948", "Estatuto de Roma e Tribunal Penal Internacional", "Pacto de San José da Costa Rica", "Direito Internacional Humanitário"]
      },
      {
        nome: "Legislação Institucional",
        grupo: "Noções de Direito",
        questoes: 5,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Estatuto dos Policiais Militares da Bahia (Lei 7.990/01)", "Lei de Organização Básica da PMBA", "Constituição do Estado da Bahia - Seção dos Militares"]
      }
    ]
  },
  {
    id: "pc_bahia",
    nome: "Polícia Civil da Bahia",
    orgao: "Polícia Civil do Estado da Bahia (PCBA)",
    cargo: "Investigador de Polícia",
    tipo: "Polícia Civil",
    abrangencia: "Estadual",
    estado: "BA",
    banca: "IBFC",
    ano: 2026,
    status: "Previsto / Autorizado",
    fonte: "Secretaria de Segurança Pública BA",
    vagas: "700 previstas",
    salario: "R$ 5.200,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Interpretação e coesão textual", "Pontuação", "Sintaxe", "Morfologia", "Análise de concordância verbal e nominal", "Uso da crase"]
      },
      {
        nome: "Raciocínio Lógico",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Proposições simples e compostas", "Tabelas-verdade", "Negações e equivalências", "Lógica de primeira ordem", "Problemas aritméticos e geométricos"]
      },
      {
        nome: "Informática",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Conceito de redes de computadores", "Sistemas operacionais Linux e Windows", "Segurança da informação: vírus, phishing, ransomware", "Criptografia e assinatura digital", "Ferramentas de nuvem"]
      },
      {
        nome: "Direito Constitucional",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Direitos e deveres individuais e coletivos", "Garantias constitucionais", "Da Defesa do Estado e das Instituições (Segurança Pública)", "Organização político-administrativa do Estado"]
      },
      {
        nome: "Direito Administrativo",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Princípios expressos e implícitos da administração", "Poder de polícia e discricionário", "Atos administrativos: validade e eficácia", "Contratos públicos e licitações", "Responsabilidade civil do Estado"]
      },
      {
        nome: "Direito Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Muito Alta",
        topicos: ["Infração penal: culpabilidade, dolo e culpa", "Tentativa e consumação", "Concurso de pessoas", "Crimes contra a pessoa (homicídio, lesão)", "Crimes contra o patrimônio (furto, roubo, estelionato)", "Crimes contra a administração pública"]
      },
      {
        nome: "Direito Processual Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Muito Alta",
        topicos: ["Inquérito Policial (características e valor)", "Ação penal pública e privada", "Prisões em flagrante, preventiva e temporária", "Teoria geral das provas", "Cadeia de custódia"]
      },
      {
        nome: "Legislação Penal Extravagante",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Estatuto do Desarmamento (Lei 10.826/03)", "Lei de Drogas (Lei 11.343/06)", "Abuso de Autoridade (Lei 13.869/19)", "Crimes Ambientais (Lei 9.605/98)", "Organizações Criminosas (Lei 12.850/13)", "Lei Maria da Penha (Lei 11.340/06)"]
      },
      {
        nome: "Promoção da Igualdade Racial e de Gênero",
        grupo: "Conhecimentos Específicos",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Constituição da Bahia - Igualdade racial", "Estatuto da Igualdade Racial (Lei Federal 12.288/10)", "Racismo institucional", "Convenção Americana de Direitos Humanos"]
      },
      {
        nome: "Medicina Legal",
        grupo: "Conhecimentos Específicos",
        questoes: 5,
        peso: 1.5,
        prioridade: "Média",
        topicos: ["Documentos médico-legais", "Traumatologia forense", "Tanatologia forense: fenômenos cadavéricos e asfixiologia", "Sexologia forense e toxicologia"]
      }
    ]
  },
  {
    id: "pf_agente",
    nome: "PF - Agente",
    orgao: "Polícia Federal (PF)",
    cargo: "Agente de Polícia Federal",
    tipo: "Polícia Federal",
    abrangencia: "Nacional",
    estado: "BR",
    banca: "Cebraspe",
    ano: 2026,
    status: "Edital Anunciado / Preparação de Comissão",
    fonte: "Direção Geral PF",
    vagas: "1.500 previstas para diversas áreas",
    salario: "R$ 14.500,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Bloco I",
        questoes: 24,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Interpretação de textos de gêneros variados", "Coesão e coerência", "Morfossintaxe", "Reescrita de períodos e frases", "Uso da crase", "Regência nominal e verbal"]
      },
      {
        nome: "Noções de Informática",
        grupo: "Bloco I",
        questoes: 36,
        peso: 1.0,
        prioridade: "Muito Alta",
        topicos: ["Redes de computadores e internet", "Segurança da informação", "Conceito de bancos de dados relacioanais e NoSQL", "Linguagens SQL, Python e R", "Teoria da informação e data science", "Fundamentos de Cloud e APIs"]
      },
      {
        nome: "Contabilidade Geral",
        grupo: "Bloco I",
        questoes: 24,
        peso: 1.0,
        prioridade: "Muito Alta",
        topicos: ["Conceito, objeto e campo de aplicação", "Patrimônio: ativos, passivos e patrimônio líquido", "Balanço patrimonial", "Escrituração contábil e razonetes", "DRE", "Provisões e contingências"]
      },
      {
        nome: "Raciocínio Lógico",
        grupo: "Bloco I",
        questoes: 16,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Estruturas lógicas de argumentação", "Diagramas lógicos e conjuntos", "Álgebra de proposições e conectivos", "Tautologia, contradição e contingência", "Negações e equivalências de sentenças"]
      },
      {
        nome: "Estatística",
        grupo: "Bloco I",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Estatística descritiva: média, mediana, variância e desvio padrão", "Teoria de probabilidade", "Distribuição normal e binomial", "Noções de amostragem e inferência estatística"]
      },
      {
        nome: "Direito Constitucional",
        grupo: "Bloco I",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Direitos e deveres fundamentais", "Artigo 5º da CF/88", "Segurança pública (Art. 144)", "Organização do Estado"]
      },
      {
        nome: "Direito Administrativo",
        grupo: "Bloco I",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Organização administrativa brasileira", "Atos administrativos: validade, anulação", "Poderes da administração", "Agentes públicos federais", "Responsabilidade civil do Estado"]
      },
      {
        nome: "Direito Penal",
        grupo: "Bloco I",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Lei penal no tempo e espaço", "Teoria do crime: tipicidade, antijuridicidade, culpabilidade", "Crimes contra o patrimônio", "Crimes contra a administração pública", "Crimes contra a fé pública"]
      },
      {
        nome: "Direito Processual Penal",
        grupo: "Bloco I",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Inquérito policial (arquivamento, valor probatório)", "Prisão em flagrante", "Prisão preventiva", "Teoria das provas no processo penal"]
      },
      {
        nome: "Legislação Extravagante",
        grupo: "Bloco I",
        questoes: 5,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Lei 11.343/06 (Drogas)", "Lei 10.826/03 (Estatuto do Desarmamento)", "Lei 13.869/19 (Abuso de Autoridade)", "Lei 8.072/90 (Crimes Hediondos)", "Lei de Lavagem de Dinheiro (Lei 9.613/98)"]
      }
    ]
  },
  {
    id: "prf",
    nome: "PRF - Policial Rodoviário Federal",
    orgao: "Polícia Rodoviária Federal (PRF)",
    cargo: "Policial Rodoviário Federal",
    tipo: "PRF",
    abrangencia: "Nacional",
    estado: "BR",
    banca: "Cebraspe",
    ano: 2026,
    status: "Confirmado / Comissão Solicitando Vagas",
    fonte: "Ministério da Justiça e Segurança Pública",
    vagas: "1.200 solicitadas",
    salario: "R$ 12.200,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Bloco I",
        questoes: 20,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Interpretação de textos de gêneros variados", "Coesão e coerência", "Morfossintaxe", "Reescrita de períodos e frases", "Uso da crase", "Regência nominal e verbal"]
      },
      {
        nome: "Legislação de Trânsito",
        grupo: "Bloco II",
        questoes: 30,
        peso: 1.0,
        prioridade: "Muito Alta",
        topicos: ["Código de Trânsito Brasileiro (CTB)", "Resoluções do CONTRAN (Principais e atualizadas)", "Infrações, penalidades e medidas administrativas de trânsito", "Sinalização e normas de circulação e conduta"]
      },
      {
        nome: "Raciocínio Lógico-Matemático",
        grupo: "Bloco I",
        questoes: 10,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Estruturas lógicas de argumentação", "Diagramas lógicos e conjuntos", "Álgebra de proposições e conectivos", "Tautologia, contradição e contingência", "Negações e equivalências de sentenças"]
      },
      {
        nome: "Noções de Direito Constitucional",
        grupo: "Bloco I",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Direitos e deveres fundamentais", "Artigo 5º da CF/88", "Segurança pública (Art. 144)", "Organização do Estado"]
      },
      {
        nome: "Noções de Direito Administrativo",
        grupo: "Bloco I",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Organização administrativa brasileira", "Atos administrativos: validade, anulação", "Poderes da administração", "Agentes públicos federais", "Responsabilidade civil do Estado"]
      },
      {
        nome: "Direito Penal e Processual Penal",
        grupo: "Bloco I",
        questoes: 12,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Infração penal: dolo, culpa, excludentes de ilicitude", "Crimes contra o patrimônio, pessoa e administração", "Inquérito policial", "Prisões em flagrante e preventivas", "Cadeia de custódia"]
      },
      {
        nome: "Legislação Extravagante",
        grupo: "Bloco I",
        questoes: 10,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Lei 11.343/06 (Drogas)", "Lei 10.826/03 (Estatuto do Desarmamento)", "Lei 13.869/19 (Abuso de Autoridade)", "Lei 8.072/90 (Crimes Hediondos)", "Lei de Lavagem de Dinheiro (Lei 9.613/98)"]
      },
      {
        nome: "Noções de Informática",
        grupo: "Bloco I",
        questoes: 8,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Redes de computadores e internet", "Segurança da informação: vírus, backup", "Conceito de bancos de dados relacioanais e NoSQL"]
      },
      {
        nome: "Noções de Física",
        grupo: "Bloco I",
        questoes: 5,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Cinemática unidimensional (velocidade, aceleração, frenagem)", "Leis de Newton aplicadas a acidentes", "Energia mecânica e colisões", "Atrito e plano inclinado"]
      },
      {
        nome: "Direitos Humanos e Cidadania",
        grupo: "Bloco I",
        questoes: 5,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["DUDH de 1948", "Constituição Federal de 1988 e tratados de Direitos Humanos", "Proteção a grupos vulneráveis", "Uso progressivo da força"]
      }
    ]
  },
  {
    id: "policia_penal_pr",
    nome: "Polícia Penal PR",
    orgao: "Departamento de Polícia Penal do Estado do Paraná (DEPPEN PR)",
    cargo: "Policial Penal",
    tipo: "Polícia Penal",
    abrangencia: "Estadual",
    estado: "PR",
    banca: "Instituto AOCP",
    ano: 2024,
    status: "Homologado / Convocação em Andamento",
    fonte: "DEPPEN PR",
    vagas: "450 imediatas",
    salario: "R$ 5.800,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Compreensão e interpretação de texto", "Semântica", "Regência verbal e nominal", "Crases", "Morfossintaxe", "Figuras de linguagem"]
      },
      {
        nome: "Raciocínio Lógico-Matemático",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Proposições lógicas", "Tautologia e contradição", "Lógica de conjuntos", "Porcentagem", "Equações matemáticas", "Análise de sequências"]
      },
      {
        nome: "Noções de Informática",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Baixa",
        topicos: ["Windows 10 e 11", "Word e Excel", "Navegação segura", "Antivírus", "Redes sociais e segurança"]
      },
      {
        nome: "Direito Constitucional",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Dos Direitos e Garantias Fundamentais", "Dos direitos individuais e coletivos", "Do direito à segurança pública", "Das Forças de Segurança Pública na Constituição"]
      },
      {
        nome: "Direito Administrativo",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Atos administrativos: validade e atributos", "Poderes administrativos", "Processo administrativo disciplinar", "Responsabilidade civil do Estado"]
      },
      {
        nome: "Direito Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Muito Alta",
        topicos: ["Fato típico, antijurídico e culpável", "Tentativa e consumação", "Exclusão de ilicitude", "Crimes contra o patrimônio", "Crimes contra a administração pública"]
      },
      {
        nome: "Direito Processual Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Inquérito policial", "Prisão em flagrante", "Prisão preventiva", "Prisão temporária", "Teoria das provas"]
      },
      {
        nome: "Direito Penitenciário e LEP",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.5,
        prioridade: "Muito Alta",
        topicos: ["Do objeto e aplicação da Lei 7.210/84 (LEP)", "Dos deveres e direitos do preso", "Da disciplina prisional e sindicâncias", "Dos estabelecimentos penais do Paraná", "Regulamento interno das penitenciárias paranaenses (RGEPP)"]
      },
      {
        nome: "Criminologia e Direitos Humanos",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Escolas da criminologia", "Fatores condicionantes do crime", "Vitimologia", "DUDH de 1948", "Pacto de San José da Costa Rica", "Regras de Mandela"]
      }
    ]
  },
  {
    id: "senado_policial_legislativo",
    nome: "Senado - Policial Legislativo",
    orgao: "Senado Federal",
    cargo: "Policial Legislativo",
    tipo: "Polícia Legislativa",
    abrangencia: "Nacional",
    estado: "BR",
    banca: "FGV",
    ano: 2022,
    status: "Homologado / Cadastro Reserva em Convocação",
    fonte: "Senado Federal / FGV",
    vagas: "25 + Cadastro Reserva",
    salario: "R$ 19.400,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 20,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Leitura e interpretação de textos FGV", "Sintaxe e morfologia aplicadas", "Coesão e argumentação", "Reescrita de frases com equivalência de sentido", "Vícios de linguagem"]
      },
      {
        nome: "Língua Inglesa",
        grupo: "Conhecimentos Gerais",
        questoes: 5,
        peso: 1.0,
        prioridade: "Baixa",
        topicos: ["Vocabulário instrumental de inglês", "Compreensão de textos modernos", "Gramática aplicada à interpretação de sentenças"]
      },
      {
        nome: "Raciocínio Lógico-Matemático",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Argumentação e deduções lógicas", "Estruturas de conjunto e diagramas", "Álgebra combinatória", "Probabilidades", "Princípio da casa dos pombos"]
      },
      {
        nome: "Direito Constitucional",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Direitos e deveres fundamentais", "Atribuições do Senado Federal", "Do Poder Legislativo: organização, competências, processo legislativo", "Artigo 144 (Da Segurança Pública)"]
      },
      {
        nome: "Direito Administrativo",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Princípios administrativos", "Poderes da administração", "Atos administrativos: invalidação, revogação", "Contratos públicos federais (Lei 14.133/21)", "Estatuto do Servidor Federal (Lei 8.112/90)"]
      },
      {
        nome: "Direito Penal e Processual Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Lei penal no tempo e espaço", "Culpabilidade e excludentes de ilicitude", "Crimes contra o patrimônio e fé pública", "Inquérito policial", "Prisões em flagrante, preventivas e temporárias"]
      },
      {
        nome: "Regimento Interno do Senado",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.5,
        prioridade: "Muito Alta",
        topicos: ["Do Funcionamento do Senado", "Dos Senadores e comissões parlamentares", "Do Processo Legislativo no Senado", "Da Polícia do Senado (Regulamento de Segurança e Organização Policial)"]
      },
      {
        nome: "Segurança Institucional",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.5,
        prioridade: "Muito Alta",
        topicos: ["Planejamento de segurança orgânica", "Prevenção e combate a incêndio", "Noções de atendimento pré-hospitalar (APH)", "Táticas defensivas e de condução de VIPs", "Uso progressivo da força"]
      }
    ]
  },
  {
    id: "pcdf_agente",
    nome: "PCDF - Agente",
    orgao: "Polícia Civil do Distrito Federal (PCDF)",
    cargo: "Agente de Polícia",
    tipo: "Polícia Civil",
    abrangencia: "Estadual",
    estado: "DF",
    banca: "Cebraspe",
    ano: 2025,
    status: "Autorizado / Aguardando Edital",
    fonte: "DODF",
    vagas: "150 previstas",
    salario: "R$ 11.085,72",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Básicos",
        questoes: 20,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Compreensão e interpretação de textos", "Ortografia", "Morfologia", "Sintaxe", "Reescrita de frases"]
      },
      {
        nome: "Noções de Direito Constitucional",
        grupo: "Conhecimentos Básicos",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Direitos e Deveres Individuais e Coletivos", "Segurança Pública (Art. 144)", "Organização do Estado"]
      },
      {
        nome: "Noções de Direito Administrativo",
        grupo: "Conhecimentos Básicos",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Atos administrativos", "Poderes da Administração", "Responsabilidade civil do Estado"]
      },
      {
        nome: "Direito Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Teoria do Crime", "Crimes contra a pessoa", "Crimes contra o patrimônio", "Crimes contra a administração pública"]
      },
      {
        nome: "Direito Processual Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Inquérito Policial", "Prisão em Flagrante", "Prisão Preventiva", "Provas"]
      },
      {
        nome: "Legislação Penal Extravagante",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 1.5,
        prioridade: "Média",
        topicos: ["Lei de Drogas", "Estatuto do Desarmamento", "Abuso de Autoridade", "Crimes Hediondos"]
      }
    ]
  },
  {
    id: "pmdf_soldado",
    nome: "PMDF - Soldado",
    orgao: "Polícia Militar do Distrito Federal (PMDF)",
    cargo: "Soldado PM",
    tipo: "Polícia Militar",
    abrangencia: "Estadual",
    estado: "DF",
    banca: "Instituto AOCP",
    ano: 2025,
    status: "Em Andamento",
    fonte: "PMDF",
    vagas: "700 imediatas",
    salario: "R$ 6.081,28",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Interpretação de textos", "Coerência e coesão", "Morfossintaxe", "Sintaxe da oração e do período"]
      },
      {
        nome: "Raciocínio Lógico-Matemático",
        grupo: "Conhecimentos Gerais",
        questoes: 10,
        peso: 1.0,
        prioridade: "Média",
        topicos: ["Lógica proposicional", "Conjuntos", "Probabilidade", "Análise combinatória"]
      },
      {
        nome: "Noções de Direito Constitucional",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Direitos e garantias fundamentais", "Defesa do Estado e das instituições", "Artigo 144 CF"]
      },
      {
        nome: "Noções de Direito Administrativo",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Atos e poderes administrativos", "Agentes públicos", "Licitações e contratos"]
      },
      {
        nome: "Noções de Direito Penal",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 2.0,
        prioridade: "Alta",
        topicos: ["Lei penal no tempo e no espaço", "Fato típico", "Ilicitude e culpabilidade"]
      },
      {
        nome: "Legislação Extravagante e Direitos Humanos",
        grupo: "Conhecimentos Específicos",
        questoes: 10,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Lei Maria da Penha", "Estatuto do Idoso", "DUDH de 1948"]
      }
    ]
  },
  {
    id: "cbmdf_soldado",
    nome: "CBMDF - Soldado",
    orgao: "Corpo de Bombeiros Militar do Distrito Federal (CBMDF)",
    cargo: "Soldado BM",
    tipo: "Polícia Militar",
    abrangencia: "Estadual",
    estado: "DF",
    banca: "A definir",
    ano: 2026,
    status: "Anunciado / Autorização Solicitada",
    fonte: "CBMDF",
    vagas: "350 previstas",
    salario: "R$ 6.081,28",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Interpretação de textos", "Ortografia", "Sintaxe", "Morfologia"]
      },
      {
        nome: "Química e Física Aplicadas",
        grupo: "Conhecimentos Específicos",
        questoes: 12,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Termodinâmica e calor", "Mecânica e cinemática", "Química do fogo", "Combustão e agentes extintores"]
      },
      {
        nome: "Primeiros Socorros e Emergências",
        grupo: "Conhecimentos Específicos",
        questoes: 12,
        peso: 2.0,
        prioridade: "Muito Alta",
        topicos: ["Suporte básico de vida", "Atendimento pré-hospitalar", "Fraturas e queimaduras", "Ressuscitação cardiopulmonar"]
      }
    ]
  },
  {
    id: "policia_penal_df",
    nome: "Polícia Penal DF",
    orgao: "Subsecretaria do Sistema Penitenciário do DF (SESIPE)",
    cargo: "Policial Penal",
    tipo: "Polícia Penal",
    abrangencia: "Estadual",
    estado: "DF",
    banca: "Instituto AOCP",
    ano: 2025,
    status: "Previsto para 2025/2026",
    fonte: "Seape DF",
    vagas: "400 previstas",
    salario: "R$ 7.500,00",
    disciplinas: [
      {
        nome: "Língua Portuguesa",
        grupo: "Conhecimentos Gerais",
        questoes: 15,
        peso: 1.0,
        prioridade: "Alta",
        topicos: ["Análise e compreensão textual", "Ortografia oficial", "Pontuação", "Sintaxe"]
      },
      {
        nome: "Lei de Execução Penal (LEP)",
        grupo: "Conhecimentos Específicos",
        questoes: 20,
        peso: 2.5,
        prioridade: "Muito Alta",
        topicos: ["Lei Federal nº 7.210/1984", "Direitos e deveres do preso", "Regime disciplinar", "Faltas e punições"]
      },
      {
        nome: "Direito Constitucional e Direitos Humanos",
        grupo: "Conhecimentos Específicos",
        questoes: 15,
        peso: 1.5,
        prioridade: "Alta",
        topicos: ["Direitos individuais e coletivos", "Segurança pública", "Convenção Americana sobre Direitos Humanos"]
      }
    ]
  }
];

export const AREA_COLORS = {
  militar: {
    primary: "rgb(239, 68, 68)", // Red-orange militar
    secondary: "rgb(245, 158, 11)"
  },
  civil: {
    primary: "rgb(139, 92, 246)", // Indigo civil
    secondary: "rgb(6, 182, 212)"
  },
  federal: {
    primary: "rgb(59, 130, 246)", // Blue Federal/PRF
    secondary: "rgb(16, 185, 129)"
  },
  legislativa: {
    primary: "rgb(30, 41, 59)", // Dark slate legislative
    secondary: "rgb(234, 179, 8)"
  }
};

export function getAreaColors(tipo: string) {
  if (tipo.includes("Militar")) return AREA_COLORS.militar;
  if (tipo.includes("Civil")) return AREA_COLORS.civil;
  if (tipo.includes("Federal") || tipo.includes("PRF")) return AREA_COLORS.federal;
  return AREA_COLORS.legislativa;
}

export const LEVELS = [
  { xp: 0, label: "LV 1" },
  { xp: 600, label: "LV 2" },
  { xp: 1500, label: "LV 3" },
  { xp: 3000, label: "LV 4" },
  { xp: 5000, label: "LV 5" },
  { xp: 8000, label: "LV 6" },
  { xp: 12000, label: "LV 7" },
  { xp: 18000, label: "LV 8" },
  { xp: 26000, label: "LV 9" },
  { xp: 35000, label: "LV 10" },
  { xp: 50000, label: "LV 15" },
  { xp: 80000, label: "LV 20" },
  { xp: 120000, label: "LV 30" }
];

export const PATENTES_POLICIAIS = [
  { min: 0, name: "Recruta Aspirante" },
  { min: 600, name: "Aluno de Polícia" },
  { min: 1500, name: "Soldado Operacional / Cadete 1º Ano" },
  { min: 3000, name: "Cabo de Rondas / Cadete 2º Ano" },
  { min: 5000, name: "Sargento / Cadete 3º Ano" },
  { min: 8000, name: "Subtenente Adjunto" },
  { min: 12000, name: "Investigador / Tenente Operacional" },
  { min: 18000, name: "Inspetor Especial / Capitão" },
  { min: 26000, name: "Especialista em Inteligência / Major" },
  { min: 35000, name: "Elite de Elite / Coronel" },
  { min: 50000, name: "Comandante Geral da Preparação" }
];

export const DAILY_MISSIONS = [
  { id: "mission-study-1", title: "Estudar 1 hora líquida", desc: "Registre e conclua pelo menos 60 minutos de estudo líquido.", xp: 80 },
  { id: "mission-questions-20", title: "Resolver 20 questões", desc: "Resolva no mínimo 20 questões do concurso escolhido.", xp: 100 },
  { id: "mission-error-review", title: "Revisar caderno de erros", desc: "Corrija ou marque pelo menos uma pendência no caderno de erros.", xp: 80 },
  { id: "mission-streak", title: "Constância de Elite", desc: "Mantenha sua sequência de estudo ativa registrando hoje.", xp: 50 }
];

export function getMotivationalMessage(todayStats: any, streak: number, pendingErrorsCount: number) {
  if (todayStats.hours >= 2 && todayStats.questions >= 30) {
    return "Excelente trabalho de Elite! Volume de horas consistente e prática de questões em dia. Agora recupere suas energias.";
  }
  if (pendingErrorsCount > 0) {
    return `Seu Caderno de Erros tem ${pendingErrorsCount} pendências. Lembre-se: concurseiros comuns apenas erram, concurseiros aprovados corrigem as falhas!`;
  }
  if (streak >= 5) {
    return `Incrível! Você está em uma sequência de ${streak} dias seguidos de estudo. Siga focado, a posse é construída na constância.`;
  }
  if (todayStats.hours === 0 && todayStats.questions === 0) {
    return "Sua mesa de estudos está pronta. Escolha uma disciplina do edital e inicie um ciclo de 50 minutos.";
  }
  return "Mantenha o ritmo! Cada hora estudada e cada erro corrigido te deixam mais perto da sua vaga no edital.";
}
