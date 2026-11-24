public class ValidadorCodigo {
  static String normalizarCodigo(String code) {
    return code.trim().toUpperCase();
  }

  static boolean codigoValido(String code) {
    if (code.length() != 7) return false;
    for (var i = 0; i < 3; i++) {
      var c = code.charAt(i);
      if (!Character.isLetter(c) || c < 'A' || c > 'Z') return false;
    }
    for (var i = 3; i < 7; i++) {
      if (!Character.isDigit(code.charAt(i))) return false;
    }
    return true;
  }

  public static void main(String[] args) {
    String[] samples = {"ABC1234", "  abc1234  ", "AB12345", "ÁBC1234"};
    for (var sample : samples) {
      var normalized = normalizarCodigo(sample);
      System.out.println("\"" + sample + "\" -> \"" + normalized + "\" -> "
        + (codigoValido(normalized) ? "válido" : "inválido"));
    }
  }
}
