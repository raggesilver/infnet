namespace Estacionamento.Models;

public class Veiculo
{
  private readonly string _placa;
  private readonly DateTime _horarioEntrada;
  private readonly string _tipo;
  private decimal _valorPago;

  public Veiculo(string placa, DateTime horarioEntrada, string tipo)
  {
    _placa = placa;
    _horarioEntrada = horarioEntrada;
    _tipo = tipo;
  }

  public Veiculo(string placa, string tipo) : this(placa, DateTime.Now, tipo)
  {
  }

  public string Placa => _placa;
  public DateTime HorarioEntrada => _horarioEntrada;
  public string Tipo => _tipo;

  public decimal ValorPago
  {
    get => _valorPago;
    set
    {
      if (value >= 0)
      {
        _valorPago = value;
      }
    }
  }
}
