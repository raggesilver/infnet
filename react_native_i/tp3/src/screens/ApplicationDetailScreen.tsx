import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useUser } from "../context/UserContext";
import { Application, ApplicationStatus } from "../data/applications";

const ALL_STATUSES: ApplicationStatus[] = [
  "Enviada",
  "Em Analise",
  "Entrevista",
  "Oferta",
  "Rejeitada",
];

export function ApplicationDetailScreen({ route }: { route: any }) {
  const { application } = route.params as { application: Application };
  const { updateApplication } = useUser();
  const { colors } = useTheme();
  const [status, setStatus] = useState(application.status);

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    setStatus(newStatus);
    updateApplication(application.id, { status: newStatus });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <ThemedText style={styles.company}>{application.company}</ThemedText>
      <ThemedText style={styles.role}>{application.role}</ThemedText>

      <ThemedText style={styles.label}>Localizacao</ThemedText>
      <ThemedText>{application.location}</ThemedText>

      <ThemedText style={styles.label}>Data da Candidatura</ThemedText>
      <ThemedText>
        {new Date(application.appliedAt).toLocaleDateString("pt-BR")}
      </ThemedText>

      <ThemedText style={styles.label}>Descricao</ThemedText>
      <ThemedText style={styles.description}>
        {application.description}
      </ThemedText>

      <ThemedText style={styles.label}>Status</ThemedText>
      <View style={styles.statusList}>
        {ALL_STATUSES.map((s) => (
          <Pressable
            key={s}
            style={[
              styles.statusButton,
              {
                borderColor: colors.border,
                backgroundColor:
                  s === status ? colors.primary : colors.background,
              },
            ]}
            onPress={() => handleStatusChange(s)}
          >
            <ThemedText
              style={{
                color: s === status ? "#fff" : colors.text,
                fontSize: 13,
              }}
            >
              {s}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 8 },
  company: { fontSize: 24, fontWeight: "bold" },
  role: { fontSize: 16, opacity: 0.7 },
  label: { fontSize: 14, fontWeight: "600", opacity: 0.6, marginTop: 8 },
  description: { fontSize: 15, lineHeight: 22 },
  statusList: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
});
