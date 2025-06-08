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

  // Getters e setters são úteis para expor campos privados (getter) e permitir
  // que campos privados sejam alterados (setters). Por si só, getters e setters
  // em campos públicos são boilerplate inúteis; a vantagem em utilizá-los
  // começa em campos privados quando introduzimos lógica extra em um setter
  // (de validação, por exemplo) ou combinamos múltiplos campos no retorno (por
  // exemplo, para combinar primeiro e último nome em um getter "nomeCompleto").

  public void setName(String name) {
    this.name = name;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public void setQuantityInStock(int quantityInStock) {
    this.quantityInStock = quantityInStock;
  }

  public String getName() {
    return this.name;
  }

  public double getPrice() {
    return this.price;
  }

  public int getQuantityInStock() {
    return this.quantityInStock;
  }

  public void displayInfo() {
    System.out.printf("%s - R$ %.2f - %d em estoque\n", name, price, quantityInStock);
  }
}
