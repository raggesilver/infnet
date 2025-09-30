namespace AT.Events;

public class CapacidadeMaximaAlcancada(
  int pacoteTuristicoId,
  int capacidadeMaxima,
  int totalReservas)
  : EventArgs
{
  public int PacoteTuristicoId { get; } = pacoteTuristicoId;
  public int CapacidadeMaxima { get; } = capacidadeMaxima;
  public int TotalReservas { get; } = totalReservas;
}
