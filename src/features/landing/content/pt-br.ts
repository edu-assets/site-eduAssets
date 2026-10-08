import type { LandingContent } from './types';

export const ptBr: LandingContent = {
  nav: { features: 'Funcionalidades', flow: 'Como funciona', access: 'Acesso e segurança', rfid: 'Cartão RFID', tech: 'Tecnologia', docs: 'Documentação' },
  hero: {
    title: 'Controle de empréstimos e inventário de equipamentos escolares',
    lead: 'O eduAssets registra empréstimos e devoluções, acompanha o estoque e as ocorrências com os equipamentos e exporta relatórios em CSV, Excel e PDF.',
    primary: 'Acessar o sistema',
    secondary: 'Ver código no GitHub',
    note: 'O acesso abre em Guest Mode: somente leitura, sem login.',
    shot: { label: 'Dashboard', hint: 'Cards de resumo e aba Estoque' },
  },
  features: {
    title: 'Funcionalidades',
    rows: [
      {
        id: 'emprestimos',
        title: 'Empréstimos e devoluções',
        text: 'Cada empréstimo registra solicitante, responsável, data e hora, equipamentos e quantidades. A devolução é feita a partir da lista de empréstimos em aberto.',
        points: [
          'Itens do empréstimo podem ser editados antes da devolução',
          'O registro é bloqueado quando não há estoque disponível suficiente',
          'Baixa de estoque atômica, segura contra concorrência',
        ],
        shot: { label: 'Novo empréstimo / Devoluções', hint: 'Formulário de empréstimo e lista de abertos com painel de detalhes' },
      },
      {
        id: 'dashboard',
        title: 'Dashboard de estoque e histórico',
        text: 'Mostra total, disponíveis, emprestados, em manutenção e quebrados. O estoque é listado por categoria e o histórico traz todos os empréstimos com status Aberto ou Devolvido.',
        points: ['Busca por categoria, solicitante, responsável ou número', 'Resumo detalhado por categoria'],
        shot: { label: 'Dashboard', hint: 'Abas Estoque e Histórico' },
      },
      {
        id: 'controle',
        title: 'Controle de ocorrências',
        text: 'Registra observações, manutenções e equipamentos quebrados. Manutenção e quebra retiram o item do estoque disponível; ao resolver o registro, o item volta automaticamente.',
        points: ['Observação não altera o estoque', 'Histórico de registros resolvidos, com as medidas tomadas'],
        shot: { label: 'Controle', hint: 'Lista de registros em aberto e resolvidos' },
      },
    ],
    more: [
      { title: 'Exportação', text: 'Histórico de empréstimos e inventário em CSV, Excel ou PDF.' },
      { title: 'Cadastros', text: 'Equipamentos, categorias, responsáveis e usuários, em área exclusiva do administrador.' },
      { title: 'Modo escuro', text: 'Segue o tema do sistema operacional, com opção manual Claro, Escuro ou Sistema.' },
      { title: 'Português e inglês', text: '[PLACEHOLDER: confirmar idiomas disponíveis na interface do app]' },
    ],
  },
  flow: {
    title: 'Como funciona',
    steps: [
      { title: 'Registrar o empréstimo', text: 'Informe solicitante, responsável e os itens com suas quantidades.' },
      { title: 'Acompanhar no dashboard', text: 'O estoque disponível e o histórico são atualizados a cada registro.' },
      { title: 'Devolver', text: 'Confirme a devolução com data e hora; os itens voltam ao estoque.' },
      { title: 'Registrar ocorrências', text: 'Manutenções e quebras ficam no Controle até serem resolvidas.' },
    ],
  },
  access: {
    title: 'Acesso e segurança',
    lead: 'O sistema tem três níveis de acesso. A restrição existe na interface e é aplicada também no backend.',
    headers: ['Nível', 'O que pode fazer'],
    levels: [
      { name: 'Convidado', can: 'Entra sem login. Visualiza Dashboard, histórico e estoque. Não cria, edita nem exclui.' },
      { name: 'Editor', can: 'Registra empréstimos, processa devoluções e cria ou edita registros de Controle.' },
      { name: 'Administrador', can: 'Acesso total: Cadastros, exclusão de registros, troca de senha e cartões RFID.' },
    ],
    security: [
      'Autenticação por JWT e senhas com hash bcrypt',
      'Cabeçalhos de segurança (helmet) e limitação de tentativas de login',
      'Validação de toda requisição de escrita com Zod',
      'Sessão de administrador expira após 30 minutos de inatividade',
    ],
  },
  rfid: {
    title: 'Login por cartão RFID',
    lead: 'Recurso opcional de hardware: o usuário encosta o cartão no leitor e entra sem digitar senha.',
    steps: [
      { title: 'Cadastro do cartão', text: 'O administrador gera um token em Cadastros → Usuários e grava no cartão. O servidor guarda só o hash do token.' },
      { title: 'Leitura', text: 'Um serviço em Python, em um Raspberry Pi ou Arduino Nano, lê o cartão e envia o token ao backend.' },
      { title: 'Login', text: 'O backend valida o token e avisa todas as abas abertas por WebSocket; a sessão inicia automaticamente.' },
    ],
    note: 'O leitor emite sons distintos para cartão detectado, sucesso e erro. O RFID nunca é obrigatório: o login por senha continua disponível.',
  },
  tech: {
    title: 'Tecnologia',
    rows: [
      { area: 'Frontend', items: 'TypeScript, Vite, arquitetura feature-first, CSS com variáveis' },
      { area: 'Backend', items: 'Node.js, Express 5, Prisma, Zod' },
      { area: 'Banco de dados', items: 'PostgreSQL (Supabase)' },
      { area: 'Hardware opcional', items: 'Python, Raspberry Pi ou Arduino Nano, leitor RFID' },
      { area: 'Hospedagem', items: '[PLACEHOLDER: confirmar texto público sobre hospedagem]' },
    ],
  },
  docs: {
    title: 'Documentação',
    lead: 'A documentação do projeto está no repositório.',
    items: [
      { title: 'README', file: 'README.md' },
      { title: 'Manual do usuário', file: 'MANUAL_USUARIO.md' },
      { title: 'Arquitetura', file: 'ARQUITETURA.md' },
      { title: 'Modelo de dados', file: 'MODELO_DE_DADOS.md' },
      { title: 'Changelog', file: 'CHANGELOG.md' },
      { title: 'Roadmap', file: 'ROADMAP.md' },
    ],
  },
  cta: {
    title: 'Explore o sistema',
    text: 'Abra o eduAssets em Guest Mode e navegue pelos painéis, sem cadastro.',
    primary: 'Acessar o sistema',
    secondary: 'Ver código no GitHub',
  },
  footer: { status: 'Versão beta 0.9.9', contact: '[PLACEHOLDER: contato]', github: 'GitHub' },
};
