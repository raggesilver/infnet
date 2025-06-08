import bank.Account;

import java.util.Date;

public class Exercise09 implements IExercise {
  @Override
  public String getName() {
    return "Vamos testar nossa classe";
  }

  @Override
  public void run() {
    var account = new Account();
    account.holder = "Paulo";
    account.agency = 1;
    account.number = 123456;
    account.balance = 253.8;
    account.openedOn = new Date().toString();

    account.displayInfo();

    System.out.println("Sacando dinheiro...");
    account.withdraw(100);
    account.displayInfo();

    System.out.println("Depositando dinheiro...");
    account.deposit(1240);
    account.displayInfo();

    System.out.println("Calculando rendimento...");
    System.out.printf("Rendimento de R$ %.2f\n", account.calculateInterest());
  }
}
