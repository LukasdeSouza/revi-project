#  Batalha de Monstros

Uma aplicação React moderna para criar monstros e simular batalhas épicas entre eles!

##  Funcionalidades

- **Cadastro de Monstros**: Crie monstros personalizados com nome, ataque, defesa, velocidade, HP e imagem
- **Sistema de Batalha**: Algoritmo inteligente que simula batalhas turno a turno
- **Interface Moderna**: UI/UX elegante com animações e feedback visual
- **Resultados Detalhados**: Visualize cada round da batalha com estatísticas completas

## Algoritmo de Batalha

O sistema de batalha segue as seguintes regras:

1. **Iniciativa**: O monstro com maior velocidade ataca primeiro. Em caso de empate, o monstro com maior ataque tem prioridade
2. **Cálculo de Dano**: `dano = ataque - defesa` (mínimo de 1 ponto de dano)
3. **Batalha por Rounds**: Os monstros alternam ataques até que um seja derrotado
4. **Vencedor**: Quem reduzir o HP do oponente a zero primeiro

## Tecnologias Utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna
- **Lucide React** - Ícones
- **Vite** - Build tool e dev server

##  Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd rive-project

# Instale as dependências
pnpm install

# Execute o servidor de desenvolvimento
pnpm dev
```

##  Como Usar

1. **Criar Monstros**: Clique em "Criar Monstro" e preencha as informações
2. **Selecionar Combatentes**: Clique em dois monstros para selecioná-los
3. **Iniciar Batalha**: Clique em "Iniciar Batalha!" para ver o resultado
4. **Visualizar Resultado**: Acompanhe cada round da batalha no modal de resultado

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── MonsterForm.tsx  # Formulário de criação
│   ├── MonsterCard.tsx  # Card de exibição do monstro
│   └── BattleResult.tsx # Modal de resultado da batalha
├── hooks/              # Hooks personalizados
│   └── useMonsters.ts  # Gerenciamento de estado dos monstros
├── types/              # Definições TypeScript
│   └── monster.ts      # Interfaces dos monstros e batalhas
├── utils/              # Utilitários
│   └── battleLogic.ts  # Lógica de cálculo da batalha
└── App.tsx             # Componente principal
```

##  Design System

A aplicação utiliza um design system consistente com:

- **Cores**: Gradientes escuros com acentos coloridos
- **Componentes**: Cards com backdrop blur e bordas translúcidas
- **Animações**: Transições suaves e feedback visual
- **Responsividade**: Layout adaptável para diferentes telas

##  Scripts Disponíveis

```bash
pnpm dev      # Servidor de desenvolvimento
pnpm build    # Build de produção
pnpm preview  # Preview do build
pnpm lint     # Verificação de código
```

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (4 colunas de monstros)
- Tablet (3 colunas de monstros)
- Mobile (1-2 colunas de monstros)

## 🎯 Melhorias Futuras

- [ ] Persistência de dados (localStorage/backend)
- [ ] Sons e efeitos visuais na batalha
- [ ] Sistema de evolução de monstros
- [ ] Histórico de batalhas
- [ ] Modo multiplayer

---

Desenvolvido com ❤️ para o teste técnico
