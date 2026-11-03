int totalMinutes = 130;
double hourlyRate = 10.0;
double dailyCap = 50.0;

int hours = totalMinutes / 60;
int remainingMinutes = totalMinutes % 60;
int billableHours = hours + (remainingMinutes > 0 ? 1 : 0);
double amount = billableHours * hourlyRate;

Console.WriteLine($"Permanência: {hours}h {remainingMinutes}min");
Console.WriteLine($"Valor calculado: R$ {amount:F2}");
if (amount > dailyCap)
{
  Console.WriteLine("O valor calculado é maior que o teto diário.");
}
else if (amount < dailyCap)
{
  Console.WriteLine("O valor calculado é menor que o teto diário.");
}
else
{
  Console.WriteLine("O valor calculado é igual ao teto diário.");
}
