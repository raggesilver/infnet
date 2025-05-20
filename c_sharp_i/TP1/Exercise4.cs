namespace TP1;

public class Exercise4 : IExercise
{
  public int Number => 4;
  public string Name => "Formulário de Cadastro Simples";

  public void Run(string[] args)
  {
    Console.WriteLine("=== Formulário de Cadastro ===\n");
    // Collect user information using the utility methods
    var nome =
      Utils.ReadNonEmptyString("Digite seu nome: ",
        "O nome não pode ser vazio");
    var idade = Utils.ReadInt("Digite sua idade: ", "Idade inválida", i =>
      (i is > 0 and < 120, "A idade deve estar entre 1 e 119 anos"));

    var telefone = Utils.ReadNonEmptyString("Digite seu telefone: ",
      "O telefone não pode ser vazio");

    var email = Utils.ReadNonEmptyString("Digite seu e-mail: ",
      "O e-mail não pode ser vazio");

    // Display the collected information in a formatted way
    Console.WriteLine("\n=== Dados Cadastrados ===");
    Console.WriteLine($"Nome: {nome}");
    Console.WriteLine($"Idade: {idade} anos");
    Console.WriteLine($"Telefone: {telefone}");
    Console.WriteLine($"E-mail: {email}");

    // Confirmation message
    Console.WriteLine("\nCadastro realizado com sucesso!");
  }
}
