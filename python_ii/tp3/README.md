# Python II — TP 2

## Ambiente e Instalação

Para executar os programas, garanta que os módulos necessários estão instalados.
Para evitar conflitos, use um ambiente virtual.

```sh
# raiz do projeto
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

> Caso não queira usar um ambiente virtual, dê uma olhada no arquivo
> `requirements.txt` para ver quais pacotes são necessários.

## Execução

Cada exercício tem seu próprio diretório. Já que esses exercícios requerem a
leitura e escrita de arquivos, é necessário que você execute os programas dentro
de seu próprio diretório.

```sh
cd ex01 && python main.py
cd ../ex02 && python main.py
cd ../ex03 && python main.py
```
