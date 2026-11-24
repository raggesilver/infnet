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

  static boolean[] codigoValido(String[] codes) {
    var results = new boolean[codes.length];
    for (var i = 0; i < codes.length; i++) {
      results[i] = codigoValido(normalizarCodigo(codes[i]));
    }
    return results;
  }

  public static void main(String[] args) {
    String[] samples = {"ABC1234", "  abc1234  ", "AB12345", "XYZ12A4", "qwe0001"};
    var results = codigoValido(samples);
    for (var i = 0; i < samples.length; i++) {
      System.out.println("\"" + samples[i] + "\" -> " + (results[i] ? "válido" : "inválido"));
    }
  }
}
