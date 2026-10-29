public class InfoAmbiente {
  public static void main(String[] args) {
    System.out.println("Sistema operacional: " + System.getProperty("os.name"));
    System.out.println("Versão do Java: " + System.getProperty("java.version"));
    System.out.println("Diretório de trabalho: " + System.getProperty("user.dir"));
  }
}
