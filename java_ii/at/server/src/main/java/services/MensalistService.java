package services;

import models.Mensalist;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MensalistService {
  private static MensalistService instance;

  private final Map<String, Mensalist> mensalists = new HashMap<>();

  public static MensalistService getInstance() {
    if (instance == null) {
      instance = new MensalistService();
    }
    return instance;
  }

  public Mensalist getMensalist(String id) {
    return mensalists.get(id);
  }

  public List<Mensalist> getAllMensalists() {
    return new ArrayList<>(mensalists.values());
  }

  public void addMensalist(Mensalist mensalist) {
    mensalists.put(mensalist.getId(), mensalist);
  }
}
