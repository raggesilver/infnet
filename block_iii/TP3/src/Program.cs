using TP3.Models;
using TP3.Services;

namespace TP3
{
    class Program
    {
        static void Main(string[] args)
        {
            var csvService = new CsvService();
            const string csvFilePath = "produtos.csv";

            try
            {
                Console.WriteLine("=== TP3 - CSV Product Reader ===");
                Console.WriteLine($"Looking for file: {csvFilePath}");

                if (!File.Exists(csvFilePath))
                {
                    Console.WriteLine($"File '{csvFilePath}' not found in current directory.");
                    Console.WriteLine($"Current directory: {Directory.GetCurrentDirectory()}");
                    return;
                }

                var products = csvService.ReadFromFile<Product>(csvFilePath);


                Console.WriteLine($"\nSuccessfully loaded {products.Count} products:");
                Console.WriteLine(new string('-', 80));

                foreach (var product in products)
                {
                    Console.WriteLine($"ID: {product.Id}");
                    Console.WriteLine($"Name: {product.Name}");
                    Console.WriteLine($"Description: {product.Description}");
                    Console.WriteLine($"Price: ${product.Price:F2}");
                    Console.WriteLine($"Stock: {product.StockQuantity}");
                    Console.WriteLine($"Created: {product.CreatedAt:yyyy-MM-dd}");
                    Console.WriteLine(new string('-', 40));
                }

                Console.WriteLine($"\nTotal products loaded: {products.Count}");
            }
            catch (FileNotFoundException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            catch (InvalidDataException ex)
            {
                Console.WriteLine($"CSV Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
            }

            Console.WriteLine("\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}
