import io.javalin.Javalin;

public class Main {
  public static void main(String[] args) {
    var app = Javalin.create();

    Hello.registerRoutes(app, Hello.class);

    Runtime.getRuntime().addShutdownHook(new Thread(app::stop));
    app.start(7119);
  }
}
