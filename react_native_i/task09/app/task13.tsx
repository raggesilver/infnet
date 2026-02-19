import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function Task13Screen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.count}>{count}</ThemedText>
      <View style={styles.row}>
        <Button
          title="Decrementar"
          onPress={() => setCount(Math.max(0, count - 1))}
        />
        <Button
          title="Incrementar"
          onPress={() => setCount(count + 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  count: {
    fontSize: 48,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
});
