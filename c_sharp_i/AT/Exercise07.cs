namespace AT;

public class BankAccount(string accountHolder, decimal initialBalance = 0)
{
  private decimal _balance = initialBalance;

  public string AccountHolder { get; set; } = accountHolder;

  public void Deposit(decimal amount)
  {
    if (amount <= 0)
    {
      Console.WriteLine("O valor do depósito deve ser positivo!");
      return;
    }

    _balance += amount;
    Console.WriteLine($"Depósito de R$ {amount:F2} realizado com sucesso!");
  }

  public void Withdraw(decimal amount)
  {
    if (amount > _balance)
    {
      Console.WriteLine("Saldo insuficiente para realizar o saque!");
      return;
    }

    _balance -= amount;
    Console.WriteLine($"Saque de R$ {amount:F2} realizado com sucesso!");
  }

  public void DisplayBalance()
  {
    Console.WriteLine($"Saldo atual: R$ {_balance:F2}");
  }
}

public class Exercise07 : IExercise
{
  public string Name => "Banco Digital (Encapsulamento)";

  public void Run(string[] args)
  {
    var account = new BankAccount("João Silva");

    Console.WriteLine($"Titular: {account.AccountHolder}");

    account.Deposit(500.00m);
    account.DisplayBalance();

    Console.WriteLine("\nTentativa de saque: R$ 700,00");
    account.Withdraw(700.00m);

    account.Withdraw(200.00m);
    account.DisplayBalance();

    Console.WriteLine("\nTentativa de depósito negativo:");
    account.Deposit(-50.00m);
  }
}
