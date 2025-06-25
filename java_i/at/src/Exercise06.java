public class Exercise06 implements IExercise {
  @Override
  public String getName() {
    return "Cadastro de Veículos";
  }

  @Override
  public void run() {
    System.out.println("=== Sistema de Gerenciamento de Veículos ===\n");

    // Create two vehicles with fictional data
    Vehicle vehicle1 = new Vehicle("ABC-1234", "Honda Civic Type-R", 2023, 45000.0);
    Vehicle vehicle2 = new Vehicle("XYZ-9876", "Toyota Yaris Sedan XL", 2019, 32500.0);

    System.out.println("Veículos cadastrados:");
    System.out.println("\n--- Veículo 1 ---");
    vehicle1.displayDetails();

    System.out.println("\n--- Veículo 2 ---");
    vehicle2.displayDetails();

    // Register trips
    System.out.println("\n=== Registrando Viagens ===");
    System.out.println("Registrando viagem de 150 km no Honda Civic...");
    vehicle1.registerTrip(150.0);

    System.out.println("Registrando viagem de 85 km no Toyota Yaris...");
    vehicle2.registerTrip(85.0);

    System.out.println("\nVeículos após as viagens:");
    System.out.println("\n--- Veículo 1 ---");
    vehicle1.displayDetails();

    System.out.println("\n--- Veículo 2 ---");
    vehicle2.displayDetails();
  }
}

class Vehicle {
  private String licensePlate;
  private String model;
  private int manufacturingYear;
  private double mileage;

  public Vehicle(String licensePlate, String model, int manufacturingYear, double mileage) {
    this.licensePlate = licensePlate;
    this.model = model;
    this.manufacturingYear = manufacturingYear;
    this.mileage = mileage;
  }

  public void displayDetails() {
    System.out.printf("Placa: %s%n", licensePlate);
    System.out.printf("Modelo: %s%n", model);
    System.out.printf("Ano de fabricação: %d%n", manufacturingYear);
    System.out.printf("Quilometragem: %s km%n", Utils.formatNumber(mileage));
  }

  public void registerTrip(double km) {
    if (km > 0) {
      this.mileage += km;
      System.out.printf("Viagem de %s km registrada com sucesso!%n", Utils.formatNumber(km));
    } else {
      System.out.println("A quilometragem da viagem deve ser positiva.");
    }
  }
}
