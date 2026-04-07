# AT — Paulo Queiroz

## Requisitos

- Node.js 18+
- npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go (iOS/Android)

## Instalação

```bash
cd at
npm install
```

## Execução

```bash
npm start
```

Para usar tunnel (necessário em algumas redes):

```bash
npx expo start --tunnel
```

Escaneie o QR code com o Expo Go para abrir o app no dispositivo.

## Estrutura

- `src/screens/` — telas do aplicativo
- `src/context/` — contextos (autenticação, carrinho, pedidos, tema)
- `src/data/` — dados mockados (categorias, produtos, restaurantes)
- `src/navigation/` — navegação (stack + tabs)
- `src/services/` — integração com APIs externas (ViaCEP, notificações)
- `src/components/` — componentes reutilizáveis

## Tecnologias

- React Native + Expo SDK 54
- TypeScript
- React Navigation v6
- AsyncStorage
- Leaflet (via WebView)
- Lottie React Native
- Expo Notifications
