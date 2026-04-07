export type CepResult = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export async function fetchAddress(cep: string): Promise<CepResult | null> {
  const cleaned = cep.replace(/\D/g, "");
  if (cleaned.length !== 8) return null;

  const response = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
  const data = await response.json();

  if (data.erro) return null;
  return data as CepResult;
}
