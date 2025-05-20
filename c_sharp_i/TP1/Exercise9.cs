namespace TP1;

public class Exercise9 : IExercise
{
  public int Number => 9;
  public string Name => "Calculadora de Salário Líquido";

  public void Run(string[] args)
  {
    var salarioBruto = Utils.ReadFloat("Digite o salário bruto (R$): ",
      "Valor inválido", s =>
        (s > 0, "O salário deve ser maior que zero"));

    var descontoINSS = CalcularINSS(salarioBruto);
    var baseCalculo = salarioBruto - descontoINSS;
    var descontoIR = CalcularIR(baseCalculo);
    var salarioLiquido = salarioBruto - descontoINSS - descontoIR;

    Console.WriteLine("\nResumo de Salário:");
    Console.WriteLine($"Salário Bruto: R$ {salarioBruto:F2}");
    Console.WriteLine($"Desconto INSS: R$ {descontoINSS:F2}");
    Console.WriteLine($"Desconto IR: R$ {descontoIR:F2}");
    Console.WriteLine($"Salário Líquido: R$ {salarioLiquido:F2}");
  }

  // https://www.contabeis.com.br/noticias/68807/tabela-do-inss-2025-e-divulgada-confira-teto-do-ano/
  private static float CalcularINSS(float salarioBruto)
  {
    return salarioBruto switch
    {
      <= 1518.00f => salarioBruto * 0.075f,
      <= 2793.88f => 113.85f + (salarioBruto - 1518.00f) * 0.09f,
      <= 4191.35f => 113.85f + 114.83f + (salarioBruto - 2793.88f) * 0.12f,
      <= 8157.40f => 113.85f + 114.83f + 167.70f +
                     (salarioBruto - 4191.35f) * 0.14f,
      _ => 945.64f // Teto máximo de contribuição
    };
  }

  // https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/copy_of_2024
  private static float CalcularIR(float baseCalculo)
  {
    return baseCalculo switch
    {
      <= 2259.20f => 0,
      <= 2826.65f => baseCalculo * 0.075f - 169.44f,
      <= 3751.05f => baseCalculo * 0.15f - 381.44f,
      <= 4664.68f => baseCalculo * 0.225f - 662.77f,
      _ => baseCalculo * 0.275f - 896.00f
    };
  }
}
