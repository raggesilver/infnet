public class Exercise01 implements IExercise {
  @Override
  public String getName() {
    return "Instalando e configurando o ambiente Java";
  }

  @Override
  public void run() {
    System.out.println("Olá, meu nome é Paulo e estou aprendendo Java!");

    // Versão do Java:
    //   openjdk 24.0.1 2025-04-15
    //   OpenJDK Runtime Environment (build 24.0.1+9-30)
    //   OpenJDK 64-Bit Server VM (build 24.0.1+9-30, mixed mode, sharing)
  }
}
