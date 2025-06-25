import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Exercise10 implements IExercise {
  private static final String FILE_NAME = "compras.txt";

  @Override
  public String getName() {
    return "Registro de Compras em Arquivo";
  }

  @Override
  public void run() {
    System.out.println("=== Sistema de Registro de Compras ===\n");

    List<Purchase> purchases = new ArrayList<>();

    // Collect 3 purchases from user
    for (int i = 1; i <= 3; i++) {
      System.out.printf("--- Compra %d ---%n", i);

      String product = Utils.readNonEmptyString("Produto: ");

      // Validate product doesn't contain comma (CSV separator)
      while (product.contains(",")) {
        System.out.println("❌ Nome do produto não pode conter vírgula (,)");
        product = Utils.readNonEmptyString("Produto: ");
      }

      int quantity = Utils.readInt("Quantidade: ",
        value -> new Utils.ValidationResult(value > 0, "A quantidade deve ser positiva."));

      double unitPrice = Utils.readDouble("Preço unitário: R$ ",
        value -> new Utils.ValidationResult(value > 0, "O preço deve ser positivo."));

      purchases.add(new Purchase(product, quantity, unitPrice));
      System.out.println("✅ Compra registrada!\n");
    }

    // Save to file
    writePurchasesToFile(purchases);

    // Read back and display
    System.out.println("=== Compras Salvas no Arquivo ===");
    List<Purchase> loadedPurchases = readPurchasesFromFile();
    displayPurchases(loadedPurchases);
  }

  private void writePurchasesToFile(List<Purchase> purchases) {
    try (var writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
      for (Purchase purchase : purchases) {
        writer.write(purchase.serialize());
        writer.newLine();
      }
      System.out.printf("✅ %d compras salvas no arquivo '%s'%n%n", purchases.size(), FILE_NAME);
    } catch (IOException e) {
      System.out.printf("❌ Erro ao salvar arquivo: %s%n", e.getMessage());
    }
  }

  private List<Purchase> readPurchasesFromFile() {
    List<Purchase> purchases = new ArrayList<>();

    File file = new File(FILE_NAME);
    if (!file.exists()) {
      System.out.printf("❌ Arquivo '%s' não encontrado%n", FILE_NAME);
      return purchases;
    }

    try (var reader = new BufferedReader(new FileReader(FILE_NAME))) {
      String line;
      int lineNumber = 1;

      while ((line = reader.readLine()) != null) {
        if (line.trim().isEmpty()) {
          lineNumber++;
          continue;
        }

        try {
          purchases.add(Purchase.fromString(line));
        } catch (IllegalArgumentException e) {
          System.out.printf("❌ Erro na linha %d: %s%n", lineNumber, e.getMessage());
        }
        lineNumber++;
      }
    } catch (IOException e) {
      System.out.printf("❌ Erro ao ler arquivo: %s%n", e.getMessage());
    }

    return purchases;
  }

  private void displayPurchases(List<Purchase> purchases) {
    if (purchases.isEmpty()) {
      System.out.println("Nenhuma compra encontrada.");
      return;
    }

    double totalValue = 0.0;

    for (int i = 0; i < purchases.size(); i++) {
      Purchase purchase = purchases.get(i);
      double itemTotal = purchase.getTotalValue();
      totalValue += itemTotal;

      System.out.printf("%d. Produto: %s%n", (i + 1), purchase.getProduct());
      System.out.printf("   Quantidade: %s%n", Utils.formatNumber(purchase.getQuantity()));
      System.out.printf("   Preço unitário: %s%n", Utils.formatMoney(purchase.getUnitPrice()));
      System.out.printf("   Total do item: %s%n%n", Utils.formatMoney(itemTotal));
    }

    System.out.printf("💰 Valor total de todas as compras: %s%n", Utils.formatMoney(totalValue));
  }
}

class Purchase {
  private final String product;
  private final int quantity;
  private final double unitPrice;

  public Purchase(String product, int quantity, double unitPrice) {
    this.product = product;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  public static Purchase fromString(String csvLine) {
    String[] parts = csvLine.split(",", 3);
    if (parts.length != 3) {
      throw new IllegalArgumentException("Formato de linha inválido no arquivo");
    }

    String product = parts[0].trim();
    if (product.isEmpty()) {
      throw new IllegalArgumentException("Nome do produto não pode ser vazio");
    }

    int quantity;
    try {
      quantity = Integer.parseInt(parts[1].trim());
      if (quantity <= 0) {
        throw new IllegalArgumentException("Quantidade deve ser positiva");
      }
    } catch (NumberFormatException e) {
      throw new IllegalArgumentException("Quantidade inválida");
    }

    double unitPrice;
    try {
      unitPrice = Double.parseDouble(parts[2].trim());
      if (unitPrice <= 0) {
        throw new IllegalArgumentException("Preço unitário deve ser positivo");
      }
    } catch (NumberFormatException e) {
      throw new IllegalArgumentException("Preço unitário inválido");
    }

    return new Purchase(product, quantity, unitPrice);
  }

  public String serialize() {
    return String.format("%s,%d,%.2f", product, quantity, unitPrice);
  }

  public double getTotalValue() {
    return quantity * unitPrice;
  }

  public String getProduct() {
    return product;
  }

  public int getQuantity() {
    return quantity;
  }

  public double getUnitPrice() {
    return unitPrice;
  }
}
