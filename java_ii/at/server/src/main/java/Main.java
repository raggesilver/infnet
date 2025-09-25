import io.javalin.Javalin;

public class Main {
  public static Javalin getApp() {
    var app = Javalin.create();
    // Endpoints foram criados em classes separadas para facilitar a manutenção
    // e legibilidade.
    Hello.registerRoutes(app, Hello.class); // Rúbrica 1
    Mensalists.registerRoutes(app, Mensalists.class); // Rúbrica 4
    return app;
  }

  public static void main(String[] args) {
    var app = getApp();

    Runtime.getRuntime().addShutdownHook(new Thread(app::stop));
    app.start(7119);
  }
}
