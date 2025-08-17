using TP3.Models;
using TP3.Services;

namespace Tests
{
    public class CsvServiceTests
    {
        private readonly CsvService _csvService = new();

        [Fact]
        public void ReadFromString_ValidCsv_ReturnsProducts()
        {
            // Arrange
            var validCsv = @"id,name,description,price,stock_quantity,created_at,updated_at
1,Test Product,Test Description,99.99,10,2024-01-01,2024-01-02
2,Another Product,Another Description,199.99,5,2024-02-01,2024-02-02";

            // Act
            var products = _csvService.ReadFromString<Product>(validCsv);

            // Assert
            Assert.Equal(2, products.Count);
            Assert.Equal("Test Product", products[0].Name);
            Assert.Equal(99.99m, products[0].Price);
        }

        [Fact]
        public void ReadFromString_EmptyCsv_ReturnsEmptyList()
        {
            // Arrange
            var emptyCsv = @"id,name,description,price,stock_quantity,created_at,updated_at";

            // Act
            var products = _csvService.ReadFromString<Product>(emptyCsv);

            // Assert
            Assert.Empty(products);
        }

        [Fact]
        public void ReadFromString_InvalidCsv_ThrowsInvalidDataException()
        {
            // Arrange
            var invalidCsv = @"id,name,description,price,stock_quantity,created_at,updated_at
1,Test Product,Test Description,invalid_price,10,2024-01-01,2024-01-02";

            // Act & Assert
            Assert.Throws<InvalidDataException>(() =>
                _csvService.ReadFromString<Product>(invalidCsv));
        }
    }
}
