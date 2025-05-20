import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;

public class Exercise4 implements IExercise {
  @Override
  public String getName() {
    return "Calculadora de Idade em Dias";
  }

  @Override
  public void run() {
    System.out.println("===== Calculadora de Idade em Dias =====");

    LocalDate birthDate = Utils.readDate("Digite sua data de nascimento (dd/mm/aaaa): ");
    LocalDate currentDate = LocalDate.now();

    if (birthDate.isAfter(currentDate)) {
      System.out.println("Data de nascimento inválida: data no futuro.");
      return;
    }

    long days = ChronoUnit.DAYS.between(birthDate, currentDate);

    System.out.println("\nVocê tem " + days + " dias de idade.");

    Period period = Period.between(birthDate, currentDate);
    System.out.println("(Equivalente a " + period.getYears() + " anos, "
      + period.getMonths() + " meses e " + period.getDays() + " dias)");
  }
}
