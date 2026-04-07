import { useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { fetchAddress } from "../services/cepApi";
import { scheduleOrderNotification } from "../services/notifications";

const PAYMENT_METHODS = [
  "Cartao de Credito",
  "Cartao de Debito",
  "Pix",
  "Dinheiro",
];

type Props = {
  navigation: { navigate: (screen: string) => void; popToTop: () => void };
};

export function CheckoutScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleCepBlur = async () => {
    const result = await fetchAddress(cep);
    if (result) {
      setStreet(result.logradouro);
      setNeighborhood(result.bairro);
      setCity(`${result.localidade} - ${result.uf}`);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!cep.trim()) newErrors.cep = "Preencha o CEP.";
    if (!street.trim()) newErrors.street = "Preencha a rua.";
    if (!number.trim()) newErrors.number = "Preencha o numero.";
    if (!selectedPayment)
      newErrors.payment = "Selecione o metodo de pagamento.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;

    const address = `${street}, ${number} - ${neighborhood}, ${city} - CEP ${cep}`;
    const order = placeOrder(items, totalPrice, address, selectedPayment!);
    clearCart();
    setConfirmed(true);

    scheduleOrderNotification(order.id);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const inputStyle = [
    styles.input,
    {
      borderColor: colors.border,
      color: colors.text,
      backgroundColor: colors.card,
    },
  ];

  if (confirmed) {
    return (
      <View
        style={[
          styles.confirmedContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <LottieView
          source={require("../../assets/success.json")}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
        <ThemedText style={styles.confirmedTitle}>
          Pedido confirmado!
        </ThemedText>
        <ThemedText style={styles.confirmedSubtitle}>
          Acompanhe seus pedidos na aba Pedidos.
        </ThemedText>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.popToTop()}
        >
          <ThemedText style={styles.backButtonText}>
            Voltar ao Inicio
          </ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <Animated.ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background, opacity: fadeAnim },
      ]}
      contentContainerStyle={styles.content}
    >
      <ThemedText style={styles.sectionTitle}>Resumo do Pedido</ThemedText>
      {items.map((item) => (
        <View key={item.product.id} style={styles.summaryRow}>
          <ThemedText>
            {item.quantity}x {item.product.name}
          </ThemedText>
          <ThemedText style={{ color: colors.primary }}>
            R$ {(item.product.price * item.quantity).toFixed(2)}
          </ThemedText>
        </View>
      ))}
      <ThemedText style={styles.totalText}>
        Total: R$ {totalPrice.toFixed(2)}
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Endereco de Entrega</ThemedText>

      <TextInput
        style={inputStyle}
        placeholder="CEP"
        placeholderTextColor={colors.border}
        value={cep}
        onChangeText={setCep}
        onBlur={handleCepBlur}
        keyboardType="numeric"
        maxLength={9}
      />
      {errors.cep && (
        <ThemedText style={[styles.errorText, { color: colors.notification }]}>
          {errors.cep}
        </ThemedText>
      )}

      <TextInput
        style={inputStyle}
        placeholder="Rua"
        placeholderTextColor={colors.border}
        value={street}
        onChangeText={setStreet}
      />
      {errors.street && (
        <ThemedText style={[styles.errorText, { color: colors.notification }]}>
          {errors.street}
        </ThemedText>
      )}

      <TextInput
        style={inputStyle}
        placeholder="Numero"
        placeholderTextColor={colors.border}
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      {errors.number && (
        <ThemedText style={[styles.errorText, { color: colors.notification }]}>
          {errors.number}
        </ThemedText>
      )}

      <TextInput
        style={inputStyle}
        placeholder="Bairro"
        placeholderTextColor={colors.border}
        value={neighborhood}
        onChangeText={setNeighborhood}
      />

      <TextInput
        style={inputStyle}
        placeholder="Cidade"
        placeholderTextColor={colors.border}
        value={city}
        onChangeText={setCity}
      />

      <ThemedText style={styles.sectionTitle}>Metodo de Pagamento</ThemedText>
      {PAYMENT_METHODS.map((method) => (
        <Pressable
          key={method}
          style={[
            styles.paymentOption,
            {
              borderColor:
                selectedPayment === method ? colors.primary : colors.border,
              backgroundColor: colors.card,
            },
          ]}
          onPress={() => setSelectedPayment(method)}
        >
          <ThemedText
            style={
              selectedPayment === method
                ? { fontWeight: "bold", color: colors.primary }
                : undefined
            }
          >
            {method}
          </ThemedText>
        </Pressable>
      ))}
      {errors.payment && (
        <ThemedText style={[styles.errorText, { color: colors.notification }]}>
          {errors.payment}
        </ThemedText>
      )}

      <Pressable
        style={[styles.confirmButton, { backgroundColor: colors.primary }]}
        onPress={handleConfirm}
      >
        <ThemedText style={styles.confirmText}>Confirmar Pedido</ThemedText>
      </Pressable>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 10, paddingBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalText: { fontSize: 17, fontWeight: "bold", textAlign: "right" },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
  },
  errorText: { fontSize: 12, marginTop: -4 },
  paymentOption: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  confirmButton: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  confirmedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  lottie: { width: 150, height: 150 },
  confirmedTitle: { fontSize: 22, fontWeight: "bold" },
  confirmedSubtitle: { fontSize: 15, opacity: 0.6, textAlign: "center" },
  backButton: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    width: "100%",
  },
  backButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
