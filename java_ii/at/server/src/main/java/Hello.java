import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.javalin.http.Context;
import jakarta.validation.constraints.NotBlank;
import utils.Route;
import utils.Router;

import java.time.Instant;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
class MessageDto {
  @NotBlank(message = "message é obrigatório e não pode estar vazia")
  public String message;
}

// Favor ler comentários na implementação da classe Router (src/main/java/utils/Router.java)
public class Hello extends Router {
  @Route(path = "hello")
  static public void hello(Context ctx) {
    ctx.result("Hello World!");
  }

  @Route(path = "status")
  static public void status(Context ctx) {
    Map<String, Object> response = Map.of(
      "status", "ok",
      "timestamp", Instant.now().toString());

    ctx.json(response);
  }

  @Route(path = "echo", verb = "POST")
  static public void echo(Context ctx) {
    var data = parseAndValidate(ctx.body(), MessageDto.class);

    ctx.json(data);
  }

  @Route(path = "saudacao/{nome}")
  static public void greeting(Context ctx) {
    var name = ctx.pathParam("nome");

    ctx.json(Map.of("mensagem", "Olá, %s!".formatted(name)));
  }
}
