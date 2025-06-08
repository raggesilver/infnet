package market;

public class Product {
  // Todos esses campos são de extrema importância ao desenvolver um sistema de
  // supermercado.

  // O nome do produto serve para identificar o produto enquanto o cliente
  // navega pelos menus e para qualquer tipo de I/O onde precisamos listar
  // coisas relacionadas à um produto.
  public String name;
  // O preço do produto, útil para calcular o total da compra.
  public double price;
  // Acompanhar a quantidade desse produto no estoque da loja. Nos permite
  // impedir que uma venda seja realizada com mais produtos do que a quantidade
  // disponível em estoque.
  public int quantityInStock;

  public Product(String name, double price, int quantityInStock) {
    this.name = name;
    this.price = price;
    this.quantityInStock = quantityInStock;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public void setQuantityInStock(int quantityInStock) {
    this.quantityInStock = quantityInStock;
  }

  public void displayInfo() {
    System.out.printf("%s - R$ %.2f - %d em estoque\n", name, price, quantityInStock);
  }
}
