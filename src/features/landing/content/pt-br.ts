import type { LandingContent } from './types';

export const ptBr: LandingContent = {
  lang: { href: '/en/', label: 'EN', title: 'English version' },
  nav: { project: 'O projeto', problem: 'O problema', flow: 'Fluxo', features: 'Funcionalidades', differentials: 'Recursos', access: 'Acesso', tech: 'Tecnologia', docs: 'Documentação', profile: 'Sobre o autor' },
  hero: {
    eyebrow: 'v1.0 · Projeto de portfólio',
    title: 'Controle de equipamentos',
    lead: 'O eduAssets registra quem retirou o quê, mantém o estoque atualizado, acompanha manutenções e quebras e exporta relatórios em CSV, Excel e PDF.',
    primary: 'Acessar o sistema',
    secondary: 'Ver código no GitHub',
    note: 'Abre em Guest Mode: somente leitura, sem cadastro.'
  },
  problem: {
    eyebrow: 'O problema',
    title: 'Saber o que está disponível, com quem está e o que quebrou',
    lead: 'Notebooks, tablets, fones e carregadores são retirados e devolvidos com frequência. Sem um registro único, o estoque real e o estado de cada equipamento ficam incertos. O eduAssets foi desenhado para fluxos rápidos e repetitivos, sem rastrear cada unidade individualmente.',
    questionsTitle: 'O painel responde, sem precisar abrir planilhas:',
    photo: { alt: 'Carrinho com notebooks guardados em compartimentos numerados', caption: 'O cenário que o sistema registra: equipamentos numerados, emprestados e devolvidos todos os dias.' },
    questions: [
      { icon: 'inventory_2', text: 'Quantos equipamentos existem e quantos estão disponíveis?' },
      { icon: 'swap_horiz', text: 'O que está emprestado, e para quem?' },
      { icon: 'build', text: 'O que está em manutenção?' },
      { icon: 'heart_broken', text: 'O que está quebrado?' },
      { icon: 'history', text: 'O que foi emprestado e devolvido recentemente?' },
    ],
  },
  flow: {
    eyebrow: 'Fluxo de empréstimos',
    title: 'Do empréstimo à devolução em quatro passos',
    lead: 'Cada passo atualiza o estoque na hora, para que o saldo disponível seja sempre o real.',
    steps: [
      { icon: 'edit_note', title: 'Registrar', text: 'Informe solicitante, responsável, data e hora e os itens com suas quantidades.' },
      { icon: 'block', title: 'Validar o estoque', text: 'Se não houver saldo disponível suficiente, o registro é bloqueado.' },
      { icon: 'assignment_return', title: 'Devolver', text: 'Na lista de abertos, confirme a devolução com data e hora. Os itens voltam ao estoque.' },
      { icon: 'history', title: 'Consultar o histórico', text: 'Todo empréstimo fica registrado com status Aberto ou Devolvido.' },
    ],
  },
  features: {
    eyebrow: 'Funcionalidades',
    title: 'Cada painel tem uma função',
    rows: [
      {
        icon: 'swap_horiz',
        title: 'Empréstimos e devoluções',
        text: 'Registre empréstimos com vários itens e processe devoluções a partir da lista de empréstimos em aberto.',
        points: [
          'Itens podem ser editados antes da devolução',
          'Baixa de estoque atômica, segura contra concorrência',
          'Observação opcional em cada empréstimo',
        ],
        shot: { key: 'emprestimos', label: 'Captura do painel de devoluções', alt: 'Tela Devoluções do eduAssets, com empréstimos em aberto, equipamentos pendentes e painel para confirmar uma devolução.', caption: 'Devoluções: empréstimos em aberto e detalhes do registro selecionado.', hint: 'Lista de abertos e painel de detalhes' },
      },
      {
        icon: 'dashboard',
        title: 'Dashboard de estoque e histórico',
        text: 'Total, disponíveis, emprestados, em manutenção e quebrados em cards de resumo. O estoque é listado por categoria e o histórico traz todos os empréstimos.',
        points: [
          'Busca por categoria, solicitante, responsável ou número',
          'Resumo detalhado por categoria',
          'Exportação do estoque e do histórico',
        ],
        shot: { key: 'dashboard', label: 'Captura do dashboard de estoque', alt: 'Tela Dashboard do eduAssets na aba Estoque, com indicadores de equipamentos e tabela por categoria com quantidades totais, disponíveis e quebradas.', caption: 'Dashboard de estoque: indicadores gerais e disponibilidade dos equipamentos por categoria.', hint: 'Cards de resumo e aba Estoque' },
      },
      {
        icon: 'report',
        title: 'Controle de ocorrências',
        text: 'Registre observações, manutenções e equipamentos quebrados. Ao resolver um registro, descreva a solução aplicada e o item volta ao estoque.',
        points: [
          'Observação não altera o estoque',
          'Manutenção e quebra retiram o item do estoque disponível',
          'Histórico de registros resolvidos, com as medidas tomadas',
        ],
        shot: { key: 'controle', label: 'Captura do painel de controle', alt: 'Tela Controle do eduAssets, com indicadores de observações, manutenções e equipamentos quebrados e uma lista de ocorrências.', caption: 'Controle: indicadores e registros de observação, manutenção e quebra.', hint: 'Registros em aberto e resolvidos' },
      },
    ],
    effects: {
      title: 'Para onde vai cada item',
      lead: 'O estoque muda a cada ação, sem edição manual.',
      items: [
        { icon: 'arrow_outward', tone: 'primary', action: 'Empréstimo', effect: 'Disponível → Emprestado' },
        { icon: 'assignment_return', tone: 'success', action: 'Devolução', effect: 'Emprestado → Disponível' },
        { icon: 'build', tone: 'warning', action: 'Manutenção', effect: 'Disponível → Em manutenção' },
        { icon: 'heart_broken', tone: 'error', action: 'Quebra', effect: 'Disponível → Quebrado' },
        { icon: 'task_alt', tone: 'success', action: 'Resolver registro', effect: 'Manutenção ou quebra → Disponível' },
      ],
    },
  },
  differentials: {
    eyebrow: 'Também incluído',
    title: 'Recursos do projeto',
    lead: 'Além dos painéis, o que o sistema oferece no uso diário.',
    items: [
      { icon: 'visibility', title: 'Guest Mode', text: 'Qualquer pessoa explora o sistema em modo leitura, sem cadastro.' },
      { icon: 'lock', title: 'Permissões no backend', text: 'A restrição por nível não depende só da interface: toda rota de escrita valida o token.' },
      { icon: 'inventory_2', title: 'Estoque consistente', text: 'Baixa atômica por transação e bloqueio do registro quando falta saldo.' },
      { icon: 'contactless', title: 'RFID opcional', text: 'Login por cartão com Raspberry Pi ou Arduino Nano. O login por senha continua disponível.' },
      { icon: 'download', title: 'Exportação', text: 'Histórico de empréstimos e inventário em CSV, Excel ou PDF.' },
      { icon: 'translate', title: 'Português e inglês', text: 'Interface nos dois idiomas, com modo claro, escuro ou do sistema.' },
    ],
  },
  access: {
    eyebrow: 'Acesso e segurança',
    title: 'Três níveis de acesso',
    lead: 'A restrição existe na interface e é aplicada também no backend.',
    levels: [
      { icon: 'visibility', name: 'Convidado', can: 'Entra sem login. Visualiza Dashboard, histórico e estoque. Não cria, edita nem exclui.' },
      { icon: 'edit', name: 'Editor', can: 'Registra empréstimos, processa devoluções e cria ou edita registros de Controle.' },
      { icon: 'admin_panel_settings', name: 'Administrador', can: 'Acesso total: Cadastros, exclusão de registros, troca de senha e cartões RFID.' },
    ],
    securityTitle: 'Proteções',
    security: [
      'Autenticação por JWT e senhas com hash bcrypt',
      'Cabeçalhos de segurança (helmet) e limite de tentativas de login',
      'Validação de toda requisição de escrita com Zod',
      'Sessão de administrador expira após 30 minutos de inatividade',
    ],
  },
  rfid: {
    eyebrow: 'Hardware opcional',
    title: 'Login por cartão RFID',
    lead: 'O usuário encosta o cartão no leitor e entra sem digitar senha.',
    video: { key: 'rfid-login', label: 'Demonstração do leitor RFID', alt: 'Vídeo sem áudio mostrando uma mão aproximar uma etiqueta e um cartão RFID de um sensor conectado por fios a um microcomputador.', caption: 'Teste do leitor RFID: etiquetas são aproximadas do sensor conectado ao microcomputador.', hint: 'Etiqueta e cartão aproximados do sensor RFID' },
    photos: [
    { alt: 'Placa leitora RFID conectada por fios a um Raspberry Pi sobre uma bancada.', caption: 'Hardware RFID: leitor, conexões e microcomputador.' },
    { alt: 'Bancada de informática com o sistema eduAssets aberto em um monitor e o leitor RFID conectado sobre a mesa.', caption: 'Bancada de testes com o eduAssets e o conjunto de leitura RFID.' },
  ],
    steps: [
      { icon: 'badge', title: 'Cadastro do cartão', text: 'O administrador gera um token em Cadastros → Usuários e grava no cartão. O servidor guarda só o hash.' },
      { icon: 'sensors', title: 'Leitura', text: 'Um serviço em Python, em um Raspberry Pi ou Arduino Nano, lê o cartão e envia o token ao backend.' },
      { icon: 'login', title: 'Login', text: 'O backend valida o token e avisa as abas abertas por WebSocket. A sessão inicia sozinha.' },
    ],
    note: 'O leitor emite sons distintos para cartão detectado, sucesso e erro. O RFID nunca é obrigatório.',
  },
  project: {
    eyebrow: 'Projeto de portfólio',
    title: 'Do desafio operacional à implementação full-stack',
    lead: 'Sistema web full-stack para controle de estoque, empréstimos, devoluções e ocorrências de equipamentos escolares.',
    author: { icon: 'person', title: 'Projeto de portfólio desenvolvido por Thiago da Silva', text: 'Uma implementação completa que reúne interface, API, banco de dados, infraestrutura, testes e documentação em um único projeto demonstrável.' },
    challenge: { icon: 'description', title: 'O desafio', text: 'Escolas frequentemente controlam notebooks, tablets e acessórios por planilhas dispersas, dificultando saber o que está disponível, emprestado, em manutenção ou quebrado.' },
    solution: { icon: 'task_alt', title: 'A solução', text: 'O eduAssets centraliza estoque, empréstimos, devoluções, ocorrências, permissões e exportação de relatórios em uma aplicação web.' },
    scopeTitle: 'O que foi desenvolvido',
    scope: [
      { icon: 'code', title: 'Frontend', text: 'TypeScript, Vite e arquitetura feature-first.' },
      { icon: 'dns', title: 'API REST', text: 'Node.js, Express 5, Prisma e Zod.' },
      { icon: 'database', title: 'Persistência', text: 'PostgreSQL gerenciado no Neon.' },
      { icon: 'lock', title: 'Autenticação', text: 'JWT e controle de sessão.' },
      { icon: 'admin_panel_settings', title: 'Permissões', text: 'Níveis de acesso para diferentes responsabilidades.' },
      { icon: 'description', title: 'Relatórios', text: 'Exportação em CSV, Excel e PDF.' },
      { icon: 'contactless', title: 'RFID opcional', text: 'Integração com Raspberry Pi ou Arduino Nano.' },
      { icon: 'fact_check', title: 'Qualidade', text: 'Testes unitários e de integração.' },
      { icon: 'cloud_done', title: 'Entrega', text: 'CI/CD, deploy da aplicação e API, e documentação operacional.' }
    ],
    decisionsTitle: 'Decisões de arquitetura',
    decisions: [
      { icon: 'database', title: 'Por que o banco fica na Neon?', text: 'A VM Oracle possui apenas 1 GB de RAM. Manter o PostgreSQL gerenciado reduz consumo de memória, simplifica backups e separa a disponibilidade do banco da máquina da API.' },
      { icon: 'cloud', title: 'Por que o frontend é separado da API?', text: 'O frontend estático pode ser servido globalmente pelo Cloudflare Pages, enquanto a API permanece em uma VM com controle operacional independente.' },
      { icon: 'visibility', title: 'Por que existe Guest Mode?', text: 'Para permitir avaliação e interação imediata do sistema sem criar contas ou expor credenciais administrativas.' },
      { icon: 'contactless', title: 'Por que RFID é opcional?', text: 'O sistema continua útil com login convencional e pode receber hardware quando for hospedado localmente ou quando a operação justificar o investimento.' }
    ]
  },
  tech: {
    eyebrow: 'Tecnologia',
    title: 'Stack',
    rows: [
      { icon: 'web', area: 'Frontend', items: 'TypeScript, Vite, arquitetura feature-first, CSS com variáveis' },
      { icon: 'dns', area: 'Backend', items: 'Node.js, Express 5, Prisma, Zod' },
      { icon: 'database', area: 'Banco de dados', items: 'PostgreSQL gerenciado no Neon' },
      { icon: 'memory', area: 'Hardware opcional', items: 'Python, Raspberry Pi ou Arduino Nano, leitor RFID' },
      { icon: 'cloud', area: 'Hospedagem', items: 'Cloudflare Pages para o frontend, Oracle Cloud VM com Docker e Nginx para a API' },
    ],
  },
  docs: {
    eyebrow: 'Documentação',
    title: 'Guias do projeto',
    lead: 'Consulte os materiais de uso, arquitetura, API, desenvolvimento, implantação, hospedagem e operação.',
    items: [
      { icon: 'description', title: 'Apresentação do projeto', file: 'LEIAME.md' },
      { icon: 'menu_book', title: 'Manual do usuário', file: 'MANUAL_USUARIO.md' },
      { icon: 'architecture', title: 'Arquitetura', file: 'ARQUITETURA.md' },
      { icon: 'database', title: 'Modelo de dados', file: 'MODELO_DE_DADOS.md' },
      { icon: 'description', title: 'Referência da API', file: 'REFERENCIA_API.md' },
      { icon: 'code', title: 'Guia de desenvolvimento', file: 'DESENVOLVIMENTO.md' },
      { icon: 'cloud', title: 'Guia de implantação', file: 'GUIA_IMPLANTACAO.md' },
      { icon: 'menu_book', title: 'Hospedagem e operação', file: 'Hospedagem.md' },
      { icon: 'history', title: 'Operação e recuperação', file: 'OPERACAO_E_RECUPERACAO.md' },
      { icon: 'history', title: 'Changelog', file: 'CHANGELOG.md' },
      { icon: 'route', title: 'Roadmap', file: 'ROADMAP.md' },
    ],
  },
  cta: {
    title: 'Explore o sistema',
    text: 'Abra o eduAssets em Guest Mode e navegue pelos painéis, sem cadastro.',
    primary: 'Acessar o sistema',
    secondary: 'Ver código no GitHub',
  },
  profile: {
    eyebrow: 'Perfil pessoal',
    title: 'Sobre o autor',
    lead: 'Desenvolvedor, técnico em informática e estudante de Engenharia da Computação.',
    name: 'Thiago da Silva',
    role: 'Desenvolvedor · Técnico em informática · Estudante de Engenharia da Computação',
    location: 'São Paulo, Brasil',
    links: [
      { icon: 'code', label: 'GitHub pessoal', href: 'https://github.com/dasilva-thiago', external: true },
      { icon: 'work', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dasilva-thiago/', external: true },
      { icon: 'mail', label: 'thiagosilva785@gmail.com', href: 'mailto:thiagosilva785@gmail.com' }
    ]
  },
  footer: { status: 'Versão 1.0', contact: 'thiagosilva785@gmail.com' },
};
