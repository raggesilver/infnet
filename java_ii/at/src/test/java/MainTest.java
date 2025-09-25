import io.javalin.Javalin;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import utils.HttpRequestBuilder;

import java.util.ArrayList;
import java.util.Map;

public class MainTest {
  private static Javalin app;
  private static final int TEST_PORT = 7120; // Different port for tests

  @BeforeAll
  static void setUp() {
    // Silence logs from Javalin — they look ugly in test output
    System.setProperty("org.slf4j.simpleLogger.log.io.javalin", "warn");
    System.setProperty("org.slf4j.simpleLogger.log.org.eclipse.jetty", "warn");
    // Silence logs from our router too
    System.setProperty("org.slf4j.simpleLogger.log.utils.Router", "warn");

    // Start the application on a test port
    app = Main.getApp();
    app.start(TEST_PORT);
  }

  @AfterAll
  static void tearDown() {
    if (app != null) {
      app.stop();
    }
  }

  @Test
  void testGetEndpoint() throws Exception {
    var result = HttpRequestBuilder.url("http://localhost:7120/hello")
      .get()
      .send();

    System.out.println(result.response);

    assert result.response.statusCode == 200;
    assert result.response.body != null;
    assert result.response.body.equals("Hello World!");
  }

  @Test
  void createMensalist() throws Exception {
    var data = Map.of("name", "John", "salary", 1000.0);
    var result = HttpRequestBuilder.url("http://localhost:7120/mensalists")
      .post()
      .sendJson(data);

    System.out.println(result.response);

    assert result.response.statusCode == 201;
    assert result.response.headers.containsKey("Content-Type");
    assert result.response.headers.get("Content-Type").startsWith("application/json");

    var responseData = result.response.json();
    assert responseData.get("name").equals("John");
    assert responseData.get("salary").equals(1000.0);
  }

  @Test
  void getMensalist() throws Exception {
    // Os testes no JUnit rodam em paralelo. Não é simples salvar o resultado
    // do mensalista criado no teste 'createMensalist' e reutilizá-lo aqui. A
    // melhor forma de testar isso é criar testes independentes — nesse caso,
    // criar um mensalista novo e pegar o seu ID aqui mesmo.
    var newMensalistResult = HttpRequestBuilder.url("http://localhost:7120/mensalists")
      .post()
      .sendJson(Map.of("name", "John", "salary", 1000.0));
    var newMensalistId = newMensalistResult.response.json().get("id");

    var result = HttpRequestBuilder.url("http://localhost:7120/mensalists/" + newMensalistId)
      .get()
      .send();

    System.out.println(result.response);

    assert result.response.statusCode == 200;
    assert result.response.body != null;
    assert result.response.json().get("id").equals(newMensalistId);
  }

  @Test
  void getMensalists() throws Exception {
    // Criar vários mensalistas para o teste.
    var list = new ArrayList<Map<?, ?>>();
    list.add(Map.of("name", "John", "salary", 1000.0));
    list.add(Map.of("name", "Anna", "salary", 2000.0));

    for (var data : list) {
      var result = HttpRequestBuilder.url("http://localhost:7120/mensalists")
        .post()
        .sendJson(data);

      assert result.response.statusCode == 201;
    }


    // Listar todos os mensalistas.
    var result = HttpRequestBuilder.url("http://localhost:7120/mensalists")
      .get()
      .send();

    System.out.println(result.response);

    assert result.response.statusCode == 200;
    assert result.response.body != null;

    var responseData = result.response.jsonListOfMaps();

    System.out.println(responseData);

    assert responseData.size() == 2;
  }
}
