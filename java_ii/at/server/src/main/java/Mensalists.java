import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.javalin.http.Context;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import models.Mensalist;
import services.MensalistService;
import utils.BasePath;
import utils.Route;
import utils.Router;

@JsonIgnoreProperties(ignoreUnknown = true)
class MensalistDto {
  @NotBlank(message = "name é obrigatório e não pode estar vazio")
  public String name;

  @NotNull(message = "salary é obrigatório")
  @PositiveOrZero(message = "salary não pode ser negativo")
  public Double salary;
}

@BasePath("/mensalists")
public class Mensalists extends Router {
  private static final MensalistService mensalistService = MensalistService.getInstance();

  @Route
  public static void index(Context ctx) {
    var mensalists = mensalistService.getAllMensalists();

    ctx.json(mensalists);
  }

  @Route(verb = "POST")
  public static void create(Context ctx) {
    var data = parseAndValidate(ctx.body(), MensalistDto.class);

    var mensalist = new Mensalist(data.name, data.salary);
    mensalistService.addMensalist(mensalist);

    ctx.status(201).json(mensalist);
  }

  @Route(path = "{id}")
  public static void getOne(Context ctx) {
    var id = ctx.pathParam("id");
    var mensalist = mensalistService.getMensalist(id);

    if (mensalist == null) {
      ctx.status(404).result("Mensalist not found");
    } else {
      ctx.json(mensalist);
    }
  }
}
