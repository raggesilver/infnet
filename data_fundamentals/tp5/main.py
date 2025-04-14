import re

from database import close_sessions, get_session, init_db
from utils import get_soup, save_content, save_error, save_metadata


def scrape_bbc():
    """Scrape BBC Brazil website for article titles"""
    url = "https://www.bbc.com/portuguese"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    session = get_session()

    try:
        soup, response, error = get_soup(url, headers)

        if error:
            save_error(session, url, error)
            print(f"Erro inesperado durante o scraping do BBC: {error}")
            return

        # Save metadata
        save_metadata(session, url, response)

        # Get all article titles from h3 tags
        articles = soup.find_all("h3")
        titles = [article.get_text(strip=True) for article in articles]

        # Join all titles into one text block for storage
        content = "\n".join(titles)

        # Save content
        save_content(session, url, content)
        print(f"Scrape bem sucedido de {len(titles)} artigos do BBC Brasil")

    except Exception as e:
        save_error(session, url, e)
        print(f"Erro inesperado durante o scraping do BBC: {e}")


def scrape_ibge():
    """Scrape IBGE data tables index"""
    url = "https://ftp.ibge.gov.br/Acesso_a_internet_e_posse_celular/2015/Tabelas_de_Resultados/indice_de_tabelas.txt"

    session = get_session()

    try:
        soup, response, error = get_soup(url)

        if error:
            save_error(session, url, error)
            print(f"Error scraping IBGE: {error}")
            return

        # Save metadata
        save_metadata(session, url, response)

        # Get text content
        text_content = soup.get_text()

        # Use regex to extract table titles
        pattern = r"Tabela \d+\.\d+\.\d+\.\d+ - (.+)"
        matches = re.findall(pattern, text_content)

        # Join all matches into one text block for storage
        content = "\n".join(matches)

        # Save content
        save_content(session, url, content)
        print(f"Scrape bem sucedido de {len(matches)} itens do IBGE")

    except Exception as e:
        save_error(session, url, e)
        print(f"Erro inesperado durante o scraping do IBGE: {e}")


def generate_report():
    # Count errors by URL
    from models import Error, WebScraping
    from sqlalchemy import func

    """Generate a simple report of scraping results"""
    session = get_session()

    # Count scraping entries by URL
    scraping_data = session.query(WebScraping).all()
    urls = {entry.url: 0 for entry in scraping_data}

    for entry in scraping_data:
        content_lines = entry.content.split("\n")
        urls[entry.url] = len(content_lines)

    error_counts = (
        session.query(Error.url, func.count(Error.id).label("error_count"))
        .group_by(Error.url)
        .all()
    )

    error_dict = {url: count for url, count in error_counts}

    # Print report
    print("\n===== RELATORIO DE WEB SCRAPING =====")
    print("Itens importados por URL:")

    for url, count in urls.items():
        print(f"  {url}: {count} itens")

    print("\nErros por URL:")
    for url in urls.keys():
        print(f"  {url}: {error_dict.get(url, 0)} erros")

    print("==========================")


def main():
    # Initialize database
    init_db()

    try:
        # Run scraping functions
        scrape_bbc()
        scrape_ibge()

        # Generate report
        generate_report()

    finally:
        # Close session
        close_sessions()


if __name__ == "__main__":
    main()
