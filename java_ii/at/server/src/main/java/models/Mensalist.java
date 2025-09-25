package models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Mensalist {
  @JsonProperty("id")
  private String id;

  @JsonProperty("name")
  private String name;

  @JsonProperty("salary")
  private Double salary;

  public Mensalist() {
  }

  // Constructor with parameters
  public Mensalist(String name, Double salary) {
    this.id = UUID.randomUUID().toString();
    this.name = name;
    this.salary = salary;
  }

  // Getters and setters
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Double getSalary() {
    return salary;
  }

  public void setSalary(Double salary) {
    this.salary = salary;
  }
}
