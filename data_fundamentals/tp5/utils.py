import datetime
import json
import re

import requests
from bs4 import BeautifulSoup
from models import Error, Metadata, WebScraping


def get_soup(url, headers=None):
    """
    Takes a URL and returns a BeautifulSoup object of the page's HTML.

    Args:
        url (str): The URL to scrape
        headers (dict, optional): Headers to send with the request

    Returns:
        tuple: (BeautifulSoup object, Response object, None) or (None, None, Exception) if error occurs
    """
    if headers is None:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        }

    try:
        response = requests.get(url, headers=headers)
        # Raise an exception for bad status codes
        response.raise_for_status()

        # Create a BeautifulSoup object from the response content
        soup = BeautifulSoup(response.content, "html.parser")
        return soup, response, None
    except Exception as e:
        return None, None, e


def save_metadata(session, url, response):
    """Save metadata from a successful request to the database"""
    meta_data = {
        "content_type": response.headers.get("Content-Type"),
        "content_length": response.headers.get("Content-Length"),
    }

    metadata = Metadata(
        url=url,
        status_code=response.status_code,
        access_date=datetime.datetime.now(),
        meta_data=meta_data,
    )

    session.add(metadata)
    session.commit()


def save_error(session, url, error):
    """Save error information to the database"""
    error_entry = Error(url=url, error=str(error), error_date=datetime.datetime.now())

    session.add(error_entry)
    session.commit()


def save_content(session, url, content):
    """Save scraped content to the database"""
    web_scraping = WebScraping(
        url=url, access_date=datetime.datetime.now(), content=content
    )

    session.add(web_scraping)
    session.commit()
