// - Classe é um modelo que define a estrutura e comportamento de objetos de um
// mesmo tipo. Ela especifica quais atributos os objetos terão e quais operações
// poderão executar.
// - Objeto é uma instância específica de uma classe, com valores próprios para
// seus atributos. Cada objeto é uma entidade independente criada a partir do
// modelo definido pela classe.
// - Campos (atributos) são variáveis que armazenam as características ou
// propriedades de um objeto. Eles representam o estado interno do objeto e
// podem ter valores diferentes para cada instância.
// - Métodos são funções que definem as ações ou comportamentos que um objeto
// pode executar. Eles podem acessar e modificar os campos do objeto,
// implementando sua funcionalidade.

class BankAccount {
  // Campos: estado interno de cada objeto conta bancária
  private final String holder;
  private double balance;

  public BankAccount(String holder, double initialBalance) {
    this.holder = holder;
    this.balance = initialBalance;
  }

  // Comportamento que modifica o estado do objeto
  public void deposit(double amount) {
    if (amount > 0) {
      balance += amount;
      System.out.println("Depósito de R$ " + amount + " realizado com sucesso!");
    }
  }

  // Comportamento que acessa o estado do objeto
  public void checkBalance() {
    System.out.println("Titular: " + holder);
    System.out.println("Saldo atual: R$ " + balance);
  }

  public double getBalance() {
    return balance;
  }
}

public class Exercise01 implements IExercise {
  @Override
  public String getName() {
    return "Conceitos de Classe, Objeto, Campos e Métodos";
  }

  @Override
  public void run() {

    var ana = new BankAccount("Ana", 5000);
    var paulo = new BankAccount("Paulo", 5000);

    ana.checkBalance();
    ana.deposit(125);
    ana.checkBalance();

    paulo.checkBalance();

    System.out.println("\nA parte teórica desse exercício está comentada no código em src/Exercise01.java.");
  }
}
