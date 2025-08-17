using System.Globalization;
using CsvHelper;

namespace TP3.Services
{
  public class CsvService
  {
    private List<T> ReadCsvFromReader<T>(StringReader reader)
    {
      try
      {
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        return csv.GetRecords<T>().ToList();
      }
      catch (CsvHelperException ex)
      {
        throw new InvalidDataException($"Error parsing CSV: {ex.Message}", ex);
      }
    }

    public List<T> ReadFromFile<T>(string filePath)
    {
      try
      {
        var content = File.ReadAllText(filePath);
        using var reader = new StringReader(content);
        return ReadCsvFromReader<T>(reader);
      }
      catch (FileNotFoundException)
      {
        throw new FileNotFoundException($"CSV file not found: {filePath}");
      }
      catch (Exception ex) when (!(ex is InvalidDataException))
      {
        throw new Exception($"Unexpected error reading CSV file: {ex.Message}", ex);
      }
    }

    public List<T> ReadFromString<T>(string csvContent)
    {
      try
      {
        using var reader = new StringReader(csvContent);
        return ReadCsvFromReader<T>(reader);
      }
      catch (Exception ex) when (!(ex is InvalidDataException))
      {
        throw new Exception($"Unexpected error reading CSV string: {ex.Message}", ex);
      }
    }

    public void WriteCsv<T>(List<T> data, string filePath)
    {
      try
      {
        using var writer = new StringWriter();
        using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);

        csv.WriteRecords(data);
        File.WriteAllText(filePath, writer.ToString());
      }
      catch (Exception ex)
      {
        throw new Exception($"Error writing CSV: {ex.Message}", ex);
      }
    }
  }
}
