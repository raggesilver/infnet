import java.util.*;

public class Exercise11 implements IExercise {
  @Override
  public String getName() {
    return "Simulação de Loteria";
  }

  @Override
  public void run() {
    System.out.println("=== Simulação de Loteria ===");
    System.out.println("Escolha 6 números de 1 a 60 para concorrer ao prêmio!\n");

    // Generate 6 random lottery numbers
    Set<Integer> lotteryNumbers = generateLotteryNumbers();

    // Get user's 6 numbers
    Set<Integer> userNumbers = getUserNumbers();

    // Compare and count matches
    int matches = countMatches(lotteryNumbers, userNumbers);

    // Display results
    displayResults(lotteryNumbers, userNumbers, matches);
  }

  private Set<Integer> generateLotteryNumbers() {
    Random random = new Random();
    Set<Integer> numbers = new HashSet<>();

    while (numbers.size() < 6) {
      numbers.add(random.nextInt(60) + 1); // 1 to 60
    }

    return numbers;
  }

  private Set<Integer> getUserNumbers() {
    Set<Integer> userNumbers = new HashSet<>();

    System.out.println("Digite seus 6 números da sorte:");

    for (int i = 1; i <= 6; i++) {
      int number = Utils.readInt(String.format("Número %d (1-60): ", i),
        value -> {
          if (value < 1 || value > 60) {
            return new Utils.ValidationResult(false, "O número deve estar entre 1 e 60.");
          }
          if (userNumbers.contains(value)) {
            return new Utils.ValidationResult(false, "Número já foi escolhido. Escolha outro número.");
          }
          return new Utils.ValidationResult(true, null);
        });

      userNumbers.add(number);
    }

    return userNumbers;
  }

  private int countMatches(Set<Integer> lotteryNumbers, Set<Integer> userNumbers) {
    Set<Integer> matches = new HashSet<>(userNumbers);
    matches.retainAll(lotteryNumbers);
    return matches.size();
  }

  private void displayResults(Set<Integer> lotteryNumbers, Set<Integer> userNumbers, int matches) {
    System.out.println("\n=== RESULTADO ===");

    // Convert to sorted lists for display
    List<Integer> sortedLottery = new ArrayList<>(lotteryNumbers);
    List<Integer> sortedUser = new ArrayList<>(userNumbers);
    Collections.sort(sortedLottery);
    Collections.sort(sortedUser);

    System.out.println("Números sorteados: " + formatNumbers(sortedLottery));
    System.out.println("Seus números:      " + formatNumbers(sortedUser));
    System.out.printf("Acertos: %d de 6%n", matches);
  }

  private String formatNumbers(List<Integer> numbers) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < numbers.size(); i++) {
      if (i > 0) sb.append(" ");
      sb.append(String.format("%02d", numbers.get(i)));
    }
    return sb.toString();
  }
}
