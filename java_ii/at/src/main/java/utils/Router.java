package utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.Javalin;
import io.javalin.http.Handler;
import io.javalin.http.HttpResponseException;
import io.javalin.http.InternalServerErrorResponse;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public abstract class Router {
  private static final Logger logger = LoggerFactory.getLogger(Router.class);
  protected static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
  protected static final Validator validator = factory.getValidator();

  static protected void validateOrThrow(Object object) {
    var violations = validator.validate(object);

    if (!violations.isEmpty()) {
      Map<String, String> errors = new HashMap<>();
      for (var violation : violations) {
        errors.put(violation.getPropertyPath().toString(), violation.getMessage());
      }
      ObjectMapper mapper = new ObjectMapper();
      try {
        var jsonError = mapper.writeValueAsString(errors);
        throw new HttpResponseException(400, jsonError, Map.of("Content-Type", "application/json; charset=utf-8"));
      } catch (JsonProcessingException e) {
        logger.error("Failed to serialize validation errors to JSON", e);
        throw new InternalServerErrorResponse("Failed to serialize validation errors to JSON");
      }
    }
  }

  static public void registerRoutes(Javalin app, Class<?> clazz) {
    String basePath = getBasePath(clazz);
    Method[] methods = clazz.getDeclaredMethods();

    for (var method : methods) {
      if (!method.isAnnotationPresent(Route.class)) continue;

      var route = method.getAnnotation(Route.class);
      var methodPath = route.path();
      var verb = route.verb();

      // Combine base path and method path
      String fullPath = combinePaths(basePath, methodPath);

      Handler handler = ctx -> {
        try {
          method.invoke(null, ctx); // Use null for static methods
        } catch (Exception e) {
          if (e.getCause() instanceof HttpResponseException cause) {
            if (cause.getDetails().containsKey("Content-Type")) {
              ctx.contentType(cause.getDetails().get("Content-Type"));
            }
            ctx.status(cause.getStatus()).result(cause.getMessage());
          } else {
            logger.error("Unhandled error in route {} {}", verb, fullPath, e);
            ctx.status(500).result("Internal server error");
          }
        }
      };

      switch (verb.toLowerCase()) {
        case "get":
          app.get(fullPath, handler);
          logger.info("Registered GET route: {}", fullPath);
          break;
        case "post":
          app.post(fullPath, handler);
          logger.info("Registered POST route: {}", fullPath);
          break;
        case "put":
          app.put(fullPath, handler);
          logger.info("Registered PUT route: {}", fullPath);
          break;
        case "patch":
          app.patch(fullPath, handler);
          logger.info("Registered PATCH route: {}", fullPath);
          break;
        case "delete":
          app.delete(fullPath, handler);
          logger.info("Registered DELETE route: {}", fullPath);
          break;
        default:
          logger.warn("Unsupported HTTP verb: {}", verb);
      }
    }
  }

  private static String getBasePath(Class<?> clazz) {
    if (clazz.isAnnotationPresent(BasePath.class)) {
      return clazz.getAnnotation(BasePath.class).value();
    }
    return "";
  }

  private static String combinePaths(String basePath, String methodPath) {
    // Normalize base path
    if (basePath == null || basePath.isEmpty()) {
      basePath = "";
    } else {
      // Ensure base path starts with /
      if (!basePath.startsWith("/")) {
        basePath = "/" + basePath;
      }
      // Ensure base path doesn't end with / (unless it's just "/")
      if (basePath.length() > 1 && basePath.endsWith("/")) {
        basePath = basePath.substring(0, basePath.length() - 1);
      }
    }

    // Normalize method path
    if (methodPath == null || methodPath.isEmpty()) {
      methodPath = "/";
    } else {
      // Ensure method path starts with /
      if (!methodPath.startsWith("/")) {
        methodPath = "/" + methodPath;
      }
    }

    return basePath + methodPath;
  }
}
