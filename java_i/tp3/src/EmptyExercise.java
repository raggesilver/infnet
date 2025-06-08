public class EmptyExercise implements IExercise {
  private final String _name;

  @Override
  public String getName() {
    return this._name;
  }

  EmptyExercise(String name) {
    this._name = name;
  }

  public void run() {
    System.out.println("Esse exercício não é interativo (não tem input ou output).");
  }
}
