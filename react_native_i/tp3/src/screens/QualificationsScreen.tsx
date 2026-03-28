import { useTheme } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { Certification, CERTIFICATIONS, Skill, SKILLS } from "../data/profile";

function SkillItem({ item }: { item: Skill }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.item, { borderColor: colors.border }]}>
      <ThemedText style={styles.itemName}>{item.name}</ThemedText>
      <ThemedText style={styles.itemDetail}>{item.level}</ThemedText>
    </View>
  );
}

function CertificationItem({ item }: { item: Certification }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.item, { borderColor: colors.border }]}>
      <ThemedText style={styles.itemName}>{item.name}</ThemedText>
      <ThemedText style={styles.itemDetail}>
        {item.issuer} — {item.year}
      </ThemedText>
    </View>
  );
}

export function QualificationsScreen() {
  const { colors } = useTheme();

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <>
          <ThemedText style={styles.sectionTitle}>Habilidades</ThemedText>
          {SKILLS.map((skill) => (
            <SkillItem key={skill.id} item={skill} />
          ))}

          <ThemedText style={[styles.sectionTitle, { marginTop: 16 }]}>
            Certificacoes
          </ThemedText>
          {CERTIFICATIONS.map((cert) => (
            <CertificationItem key={cert.id} item={cert} />
          ))}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "bold" },
  item: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    gap: 2,
  },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemDetail: { fontSize: 13, opacity: 0.6 },
});
