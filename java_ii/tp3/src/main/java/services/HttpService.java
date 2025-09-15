package services;

import jdk.jshell.spi.ExecutionControl;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class HttpService {
  private HttpServiceResponse makeRequest(String url, String method, String body, Map<String, String> properties) throws Exception {
    var connection = getConnectionForUrl(url);
    connection.setRequestMethod(method);

    if (properties != null) {
      for (var entry : properties.entrySet()) {
        connection.setRequestProperty(entry.getKey(), entry.getValue());
      }
    } else {
      connection.setRequestProperty("Accept", "application/json");
    }

    if (body != null) {
      connection.setDoOutput(true);
      connection.setRequestProperty("Content-Type", "application/json; utf-8");
      try (var os = connection.getOutputStream()) {
        byte[] input = body.getBytes(StandardCharsets.UTF_8);
        os.write(input, 0, input.length);
      }
    }

    connection.connect();

    var response = new HttpServiceResponse(connection);

    connection.disconnect();

    return response;
  }

  public HttpServiceResponse get(String url) throws Exception {
    return this.makeRequest(url, "GET", null, null);
  }

  public HttpServiceResponse post(String url, String body) throws Exception {
    return this.makeRequest(url, "POST", body, null);
  }

  public HttpServiceResponse post(String url, Object body) throws Exception {
    if (body == null) {
      return this.makeRequest(url, "POST", null, null);
    }
    throw new ExecutionControl.NotImplementedException("Can't serialize object to JSON yet");
  }

  public HttpServiceResponse put(String url, String body) throws Exception {
    return this.makeRequest(url, "PUT", body, null);
  }

  public HttpServiceResponse delete(String url) throws Exception {
    return this.makeRequest(url, "DELETE", null, null);
  }

  public HttpServiceResponse options(String url) throws Exception {
    return this.makeRequest(url, "OPTIONS", null, new HashMap<>());
  }

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

    try (var reader = new BufferedReader(new InputStreamReader(inputStream))) {
      StringBuilder response = new StringBuilder();
      String line;

      while ((line = reader.readLine()) != null) {
        response.append(line);
      }
      return response.toString();
    }
  }

  private static HttpURLConnection getConnectionForUrl(String url) throws Exception {
    var uri = new URI(url);
    return (HttpURLConnection) uri.toURL().openConnection();
  }

  public static class HttpServiceResponse {
    public int statusCode;
    public String body;
    public HttpURLConnection connection;

    public HttpServiceResponse(@NotNull HttpURLConnection connection) throws Exception {
      this.connection = connection;
      this.statusCode = connection.getResponseCode();
      this.body = HttpService.readResponse(connection);
    }

    public boolean isError() {
      return this.statusCode >= 400;
    }

    @Override
    public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append(connection.getRequestMethod()).append(" ").append(connection.getURL()).append("\n");
      sb.append("Status: ").append(statusCode);
      if (isError()) {
        sb.append(" (ERRO)");
      }
      sb.append("\n");
      if (body != null) {
        sb.append(body);
      }
      return sb.toString();
    }
  }
}
