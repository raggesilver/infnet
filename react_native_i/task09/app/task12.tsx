import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function Task12Screen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.count}>{count}</ThemedText>
      <Button title="Incrementar" onPress={() => setCount(count + 1)} />
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
});
