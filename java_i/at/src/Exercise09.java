public class Exercise09 implements IExercise {
  @Override
  public String getName() {
    return "Conta Bancária com Encapsulamento";
  }

  @Override
  public void run() {
    System.out.println("=== Sistema Bancário ===\n");

    // Create a bank account
    BankAccount account = new BankAccount("Maria Santos");

    System.out.printf("Conta criada para: %s%n", account.getAccountHolder());
    account.displayBalance();

    System.out.println("\n=== Realizando Operações ===");

    // Test deposits
    System.out.println("\n--- Depósitos ---");
    account.deposit(1500.00);
    account.deposit(250.75);
    account.deposit(-50.00); // Invalid deposit

    // Test withdrawals
    System.out.println("\n--- Saques ---");
    account.withdraw(300.00);
    account.withdraw(2000.00); // Insufficient funds
    account.withdraw(100.50);
    account.withdraw(-25.00); // Invalid withdrawal

    // Final balance
    System.out.println("\n=== Saldo Final ===");
    account.displayBalance();

    // Create another account to demonstrate independence
    System.out.println("\n=== Segunda Conta ===");
    BankAccount account2 = new BankAccount("João Silva");
    account2.deposit(500.00);
    System.out.printf("Conta de %s: ", account2.getAccountHolder());
    account2.displayBalance();
  }
}

class BankAccount {
  private String accountHolder;
  private double balance;

  public BankAccount(String accountHolder) {
    this.accountHolder = accountHolder;
    this.balance = 0.0;
  }

  public void deposit(double amount) {
    if (amount > 0) {
      balance += amount;
      System.out.printf("✅ Depósito de %s realizado com sucesso!%n", Utils.formatMoney(amount));
      displayBalance();
    } else {
      System.out.println("❌ Valor de depósito deve ser positivo.");
    }
  }

  public void withdraw(double amount) {
    if (amount <= 0) {
      System.out.println("❌ Valor de saque deve ser positivo.");
      return;
    }

    if (amount > balance) {
      System.out.printf("❌ Saldo insuficiente. Saldo atual: %s%n", Utils.formatMoney(balance));
      return;
    }

    balance -= amount;
    System.out.printf("✅ Saque de %s realizado com sucesso!%n", Utils.formatMoney(amount));
    displayBalance();
  }

  public void displayBalance() {
    System.out.printf("Saldo atual: %s%n", Utils.formatMoney(balance));
  }

  public String getAccountHolder() {
    return accountHolder;
  }

  double getBalance() {
    return balance;
  }
}
