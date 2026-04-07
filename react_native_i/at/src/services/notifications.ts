import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function scheduleOrderNotification(orderId: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "InfnetFood",
      body: `Seu pedido #${orderId.slice(-4)} foi recebido e esta em preparo!`,
    },
    trigger: null,
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "InfnetFood",
      body: `Seu pedido #${orderId.slice(-4)} saiu para entrega!`,
    },
    trigger: {
      seconds: 10,
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    },
  });
}
