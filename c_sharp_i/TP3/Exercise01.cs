namespace TP3;

internal class Book(string title, string author, int releaseYear)
{
  private bool _favorite;
  public string Title { get; } = title;
  public string Author { get; } = author;
  public int ReleaseYear { get; } = releaseYear;

  public void MarkAsFavorite()
  {
    _favorite = true;
  }

  public override string ToString()
  {
    var favoriteText = _favorite ? " ⭐️" : "";
    return $"Livro <{Title} — {ReleaseYear}, {Author}{favoriteText}>";
  }
}

public class Exercise01 : IExercise
{
  // Parte teórica:
  //
  // Classe:
  // Uma classe é um modelo ou blueprint que define a estrutura e comportamento
  // de um tipo, contendo a especificação de atributos e métodos que seus
  // objetos terão.
  //
  // Objeto:
  // Um objeto é uma instância concreta de uma classe, com estado e
  // comportamento próprios, representando uma entidade específica em memória
  // durante a execução do programa.
  //
  // Campos (ou Atributos):
  // Campos ou atributos são variáveis declaradas em uma classe que
  // armazenam dados e definem as características ou estado de cada objeto.
  //
  // Métodos:
  // Métodos são funções definidas numa classe que implementam
  // comportamentos, operações ou ações que os objetos dessa classe podem
  // realizar.


  public string Name => "Conceitos de Classe, Objeto, Campos e Métodos (C#)";

  public void Run(string[] args)
  {
    Console.WriteLine(
      "\nA parte teórica desse exercício está comentada no código. Veja o arquivo Exercise01.cs.\n");

    var percyJackson = new Book("Percy Jackson e o Ladrão de Raios",
      "Rick Riordan", 2005);
    var harryPotter = new Book("Harry Potter e a Pedra Filosofal",
      "J. K. Rowling", 1997);

    percyJackson.MarkAsFavorite();

    Console.WriteLine(percyJackson);
    Console.WriteLine(harryPotter);
  }
}
