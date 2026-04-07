import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { restaurants } from "../data/restaurants";

type Props = {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
};

function buildLeafletHtml(isDark: boolean): string {
  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const markers = restaurants
    .map(
      (r) =>
        `L.marker([${r.latitude}, ${r.longitude}]).addTo(map)` +
        `.bindPopup('<b>${r.name}</b><br>${r.address}<br><i>${r.menuHighlight} - R$ ${r.menuHighlightPrice.toFixed(2)}</i><br><a href="#" onclick="window.ReactNativeWebView.postMessage(&quot;${r.id}&quot;);return false;">Ver detalhes</a>');`,
    )
    .join("\n");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([-22.906, -43.177], 15);
        L.tileLayer('${tileUrl}', { maxZoom: 19 }).addTo(map);
        ${markers}
      </script>
    </body>
    </html>
  `;
}

export function MapScreen({ navigation }: Props) {
  const { colors, dark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WebView
        source={{ html: buildLeafletHtml(dark) }}
        style={styles.map}
        onMessage={(event) => {
          const restaurantId = event.nativeEvent.data;
          navigation.navigate("RestaurantDetail", { restaurantId });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
