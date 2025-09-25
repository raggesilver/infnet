import io.javalin.Javalin;

public class Main {
  public static Javalin getApp() {
    var app = Javalin.create();
    Hello.registerRoutes(app, Hello.class);
    Mensalists.registerRoutes(app, Mensalists.class);
    return app;
  }

  public static void main(String[] args) {
    var app = getApp();

    Runtime.getRuntime().addShutdownHook(new Thread(app::stop));
    app.start(7119);
  }
}
