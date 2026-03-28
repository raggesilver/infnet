# Arquitetura do Aplicativo — Bio de Desenvolvedor

## Estrutura de Pastas

```
tp3/
├── App.tsx                          # Componente raiz com providers
├── app.json                         # Configuracao Expo
├── index.ts                         # Entry point
├── src/
│   ├── components/
│   │   └── ThemedText.tsx           # Componente de texto com suporte a tema
│   ├── context/
│   │   ├── ThemeContext.tsx          # Contexto para modo escuro/claro
│   │   └── UserContext.tsx           # Contexto com dados do usuario
│   ├── data/
│   │   ├── applications.ts          # Dados iniciais de candidaturas
│   │   └── profile.ts               # Dados estaticos do perfil
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Stack Navigator + Bottom Tabs
│   └── screens/
│       ├── HomeScreen.tsx            # Tela inicial com resumo do perfil
│       ├── ProfileScreen.tsx         # Perfil completo
│       ├── QualificationsScreen.tsx  # Habilidades e certificacoes
│       ├── ProjectsScreen.tsx        # Lista de projetos (API GitHub)
│       ├── ProjectDetailScreen.tsx   # Detalhes de um projeto
│       ├── ApplicationsScreen.tsx    # Lista de candidaturas
│       ├── ApplicationDetailScreen.tsx # Detalhes de uma candidatura
│       ├── ArticlesScreen.tsx        # Lista de artigos (API Dev.to)
│       ├── ArticleWebViewScreen.tsx  # WebView para leitura de artigo
│       └── SettingsScreen.tsx        # Configuracoes e preferencias
```

## Esquema de Navegacao

```
Stack Navigator (raiz)
│
├── MainTabs (Bottom Tab Navigator)
│   ├── Inicio          → HomeScreen
│   ├── Qualificacoes   → QualificationsScreen
│   ├── Projetos        → ProjectsScreen
│   ├── Candidaturas    → ApplicationsScreen
│   └── Artigos         → ArticlesScreen
│
├── Perfil              → ProfileScreen
├── DetalheProjeto      → ProjectDetailScreen
├── DetalheCandidatura  → ApplicationDetailScreen
├── ArtigoWebView       → ArticleWebViewScreen
└── Configuracoes       → SettingsScreen
```

## Tecnologias

- **Framework**: Expo (React Native)
- **Navegacao**: React Navigation (Stack + Bottom Tabs)
- **Estado Global**: Context API (UserContext, ThemeContext)
- **Armazenamento Local**: AsyncStorage (candidaturas)
- **APIs Externas**: GitHub API (projetos), Dev.to API (artigos)
- **WebView**: react-native-webview (leitura de artigos)
- **Linguagem**: TypeScript

## Fluxo de Dados

- **UserContext**: fornece dados do perfil para todas as telas
- **ThemeContext**: gerencia preferencia de tema (claro/escuro) e persiste via AsyncStorage
- **AsyncStorage**: persiste candidaturas e preferencia de tema
- **APIs**: GitHub e Dev.to sao consumidas nas telas de Projetos e Artigos respectivamente

## Testes

- Navegacao entre todas as telas via tabs e stack
- Consumo de APIs (GitHub e Dev.to) com tratamento de loading/erro
- Persistencia de candidaturas apos fechar e reabrir o app
- Alternancia de tema claro/escuro nas configuracoes
- Edicao de perfil nas configuracoes
- WebView abrindo artigos corretamente
