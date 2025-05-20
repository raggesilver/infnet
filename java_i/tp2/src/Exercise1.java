public class Exercise1 implements IExercise {
  @Override
  public String getName() {
    return "Cadastro de Usuário Completo";
  }

  @Override
  public void run() {
    var fullName = Utils.readNonEmptyString("Digite seu nome completo: ");
    var age = Utils.readInt("Digite sua idade: ", (num) -> new Utils.ValidationResult(num > 0, "Idade inválida"));

    var dadsName = Utils.readNonEmptyString("Digite o nome completo do pai: ");
    var momsName = Utils.readNonEmptyString("Digite o nome completo da mãe: ");

    System.out.println("Nome: " + fullName + "\nIdade: " + age + "\nNome do pai: " + dadsName + "\nNome da mãe: " + momsName);
  }
}
