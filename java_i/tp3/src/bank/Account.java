package bank;

public class Account {
  // Representa o nome do dono da conta
  public String holder;
  // Identifica a conta
  public int number;
  // Identifica a agência bancária
  public int agency;
  // Indica o valor atualmente disponível na conta
  public double balance;
  // Registra quando a conta foi aberta
  public String openedOn;

  public void withdraw(double amount) {
    this.balance -= amount;
  }

  public void deposit(double amount) {
    this.balance += amount;
  }

  public double calculateInterest() {
    return this.balance * 0.1;
  }
}
