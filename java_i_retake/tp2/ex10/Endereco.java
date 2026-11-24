public class Endereco {
  private final String street;
  private final String city;

  public Endereco(String street, String city) {
    this.street = street;
    this.city = city;
  }

  public String getStreet() {
    return street;
  }

  public String getCity() {
    return city;
  }

  @Override
  public String toString() {
    return street + ", " + city;
  }
}
