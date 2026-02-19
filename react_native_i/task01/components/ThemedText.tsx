import { useTheme } from "@react-navigation/native";
import { Text, TextProps } from "react-native";

export function ThemedText({ style, ...props }: TextProps) {
  const { colors } = useTheme();

  return <Text style={[{ color: colors.text }, style]} {...props} />;
}
