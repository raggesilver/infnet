package utils;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.jshell.spi.ExecutionControl;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

// Assim como o professor fez em aula, decidi criar um wrapper para facilitar
// o uso do HttpURLConnection para fazer pedidos HTTP. HttpRequestBuilder é uma
// extensão do wrapper que eu havia criado para o TP 3.

public class HttpRequestBuilder {
  private static final ObjectMapper objectMapper = new ObjectMapper();

  private final URI baseUri;
  private HttpMethod method;
  private final Map<String, String> headers = new HashMap<>();
  private final Map<String, String> queryParams = new HashMap<>();
  private String body;

  private HttpRequestBuilder(String url) throws Exception {
    this.baseUri = new URI(url); // Validates immediately
  }

  public static HttpRequestBuilder url(String url) throws Exception {
    return new HttpRequestBuilder(url);
  }

  public HttpRequestBuilder query(String key, String value) {
    queryParams.put(key, value);
    return this;
  }

  public HttpRequestBuilder query(Map<String, String> params) {
    queryParams.putAll(params);
    return this;
  }

  public HttpRequestBuilder header(String key, String value) {
    headers.put(key, value);
    return this;
  }

  public HttpRequestBuilder headers(Map<String, String> headers) {
    this.headers.putAll(headers);
    return this;
  }

  public HttpRequestBuilder get() {
    this.method = HttpMethod.GET;
    return this;
  }

  public HttpRequestBuilder post() {
    this.method = HttpMethod.POST;
    return this;
  }

  public HttpRequestBuilder put() {
    this.method = HttpMethod.PUT;
    return this;
  }

  public HttpRequestBuilder delete() {
    this.method = HttpMethod.DELETE;
    return this;
  }

  public HttpRequestBuilder patch() {
    this.method = HttpMethod.PATCH;
    return this;
  }

  public HttpRequestBuilder options() {
    this.method = HttpMethod.OPTIONS;
    return this;
  }

  public HttpRequestBuilder head() {
    this.method = HttpMethod.HEAD;
    return this;
  }

  public HttpResult send() throws Exception {
    if (method == null) {
      method = HttpMethod.GET;
    }
    return executeRequest();
  }

  public HttpResult sendJson(Object obj) throws Exception {
    if (method == null) {
      method = HttpMethod.POST;
    }
    headers.put("Content-Type", "application/json; charset=utf-8");
    this.body = objectMapper.writeValueAsString(obj);
    return executeRequest();
  }

  public HttpResult sendText(String text) throws Exception {
    throw new ExecutionControl.NotImplementedException("sendText not implemented yet");
  }

  public HttpResult sendForm(Map<String, String> formData) throws Exception {
    throw new ExecutionControl.NotImplementedException("sendForm not implemented yet");
  }

  private HttpResult executeRequest() throws Exception {
    URI finalUri = buildFinalUri();
    HttpURLConnection connection = (HttpURLConnection) finalUri.toURL().openConnection();

    // Set method
    connection.setRequestMethod(method.name());

    // Set headers
    for (Map.Entry<String, String> header : headers.entrySet()) {
      connection.setRequestProperty(header.getKey(), header.getValue());
    }

    // Set default Accept header if not specified
    if (!headers.containsKey("Accept")) {
      connection.setRequestProperty("Accept", "application/json");
    }

    // Set body if present
    if (body != null) {
      connection.setDoOutput(true);
      try (var os = connection.getOutputStream()) {
        byte[] input = body.getBytes(StandardCharsets.UTF_8);
        os.write(input, 0, input.length);
      }
    }

    connection.connect();

    // Create request and response objects
    HttpRequest request = new HttpRequest(method, finalUri.toString(), headers, body);
    HttpResponse response = new HttpResponse(connection);
    HttpResult result = new HttpResult(request, response);

    connection.disconnect();

    return result;
  }

  private URI buildFinalUri() throws Exception {
    if (queryParams.isEmpty()) {
      return baseUri;
    }

    StringJoiner queryBuilder = new StringJoiner("&");
    for (Map.Entry<String, String> param : queryParams.entrySet()) {
      String encodedKey = URLEncoder.encode(param.getKey(), StandardCharsets.UTF_8);
      String encodedValue = URLEncoder.encode(param.getValue(), StandardCharsets.UTF_8);
      queryBuilder.add(encodedKey + "=" + encodedValue);
    }

    String query = queryBuilder.toString();
    String existingQuery = baseUri.getQuery();

    if (existingQuery != null && !existingQuery.isEmpty()) {
      query = existingQuery + "&" + query;
    }

    return new URI(
      baseUri.getScheme(),
      baseUri.getUserInfo(),
      baseUri.getHost(),
      baseUri.getPort(),
      baseUri.getPath(),
      query,
      baseUri.getFragment()
    );
  }

  public enum HttpMethod {
    GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
  }

  public static class HttpRequest {
    public final HttpMethod method;
    public final String url;
    public final Map<String, String> headers;
    public final String body;

    public HttpRequest(HttpMethod method, String url, Map<String, String> headers, String body) {
      this.method = method;
      this.url = url;
      this.headers = new HashMap<>(headers);
      this.body = body;
    }

    @Override
    public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append(method.name()).append(" ").append(url).append("\n");
      if (!headers.isEmpty()) {
        sb.append("Headers: ").append(headers).append("\n");
      }
      if (body != null) {
        sb.append("Body: ").append(body);
      }
      return sb.toString();
    }
  }

  public static class HttpResponse {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public final int statusCode;
    public final String body;
    public final Map<String, String> headers;

    public HttpResponse(@NotNull HttpURLConnection connection) throws Exception {
      this.statusCode = connection.getResponseCode();
      this.body = readResponse(connection);
      this.headers = extractHeaders(connection);
    }

    public boolean isError() {
      return statusCode >= 400;
    }

    // For single objects
    public <T> T json(Class<T> clazz) throws Exception {
      if (body == null || body.trim().isEmpty()) {
        return null;
      }
      return objectMapper.readValue(body, clazz);
    }

    // For lists of objects
    public <T> List<T> jsonList(Class<T> clazz) throws Exception {
      if (body == null || body.trim().isEmpty()) {
        return null;
      }
      JavaType listType = objectMapper.getTypeFactory()
        .constructCollectionType(List.class, clazz);
      return objectMapper.readValue(body, listType);
    }

    // For generic JSON parsing (returns Map<String, Object>)
    @SuppressWarnings("unchecked")
    public Map<String, Object> json() throws Exception {
      if (body == null || body.trim().isEmpty()) {
        return null;
      }
      return objectMapper.readValue(body, Map.class);
    }

    // For generic JSON array parsing (returns List<Object> - can handle any array type)
    public List<Object> jsonList() throws Exception {
      if (body == null || body.trim().isEmpty()) {
        return null;
      }
      JavaType listType = objectMapper.getTypeFactory()
        .constructCollectionType(List.class, Object.class);
      return objectMapper.readValue(body, listType);
    }

    // For specifically parsing arrays of objects into maps
    public List<Map<String, Object>> jsonListOfMaps() throws Exception {
      if (body == null || body.trim().isEmpty()) {
        return null;
      }
      JavaType listType = objectMapper.getTypeFactory()
        .constructCollectionType(List.class, Map.class);
      return objectMapper.readValue(body, listType);
    }

    // Rest of the class remains the same...
    private static @Nullable String readResponse(@NotNull HttpURLConnection connection) throws Exception {
      // Ignore an empty body
      if (connection.getResponseCode() == 204) {
        return null;
      }

      var responseContentType = connection.getHeaderField("Content-Type");
      if (responseContentType != null &&
        !responseContentType.startsWith("application/json") &&
        !responseContentType.startsWith("text/plain")) {
        throw new Exception("Invalid content type: " + responseContentType);
      }

      var inputStream = connection.getResponseCode() >= 400
        ? connection.getErrorStream()
        : connection.getInputStream();

      if (inputStream == null) {
        return null;
      }

      try (var reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
        StringBuilder response = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
          response.append(line);
        }
        return response.toString();
      }
    }

    private static Map<String, String> extractHeaders(HttpURLConnection connection) {
      Map<String, String> headers = new HashMap<>();
      for (Map.Entry<String, java.util.List<String>> entry : connection.getHeaderFields().entrySet()) {
        if (entry.getKey() != null && !entry.getValue().isEmpty()) {
          headers.put(entry.getKey(), String.join(", ", entry.getValue()));
        }
      }
      return headers;
    }

    @Override
    public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("Status: ").append(statusCode);
      if (isError()) {
        sb.append(" (ERROR)");
      }
      sb.append("\n");
      if (!headers.isEmpty()) {
        sb.append("Headers: ").append(headers).append("\n");
      }
      if (body != null) {
        sb.append("Body: ").append(body);
      }
      return sb.toString();
    }
  }

  public static class HttpResult {
    public final HttpRequest request;
    public final HttpResponse response;

    public HttpResult(HttpRequest request, HttpResponse response) {
      this.request = request;
      this.response = response;
    }

    @Override
    public String toString() {
      return "Request:\n" + request + "\n\nResponse:\n" + response;
    }
  }
}
