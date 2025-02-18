# Projeto de Bloco: Fundamentos de Dados — TP 3

## Ao corretor

Altere `DATABASE_URL` em `.env` para a URL do Postgres local. Lembre-se de incluir
usuário e senha, se necessário, a porta e o banco de dados.

O programa espera um banco de dados **VAZIO**. Faço o uso do Alembic para
gerenciar as migraçōes do banco de dados.

## Execução

Para executar o programa, siga os passos abaixo:

```bash
# 1. Abra um terminal na raiz do projeto
# 2. Crie um ambiente virtual
python3 -m venv .venv
# 3. Ative o ambiente virtual
# (Linux e macOs)
source .venv/bin/activate
# ou no Windows
.venv\Scripts\activate
# 4. Instale as dependências
pip install -r requirements.txt
# 5. Execute o programa
python main.py
```
