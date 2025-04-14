import datetime

from database import Base
from sqlalchemy import JSON, Column, DateTime, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base


class Metadata(Base):
    __tablename__ = "metadata"

    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False)
    status_code = Column(Integer, nullable=False)
    access_date = Column(DateTime, default=datetime.datetime.now)
    meta_data = Column(JSON, nullable=True)

    def __repr__(self):
        return f"<Metadata(url='{self.url}', status_code={self.status_code})>"


class Error(Base):
    __tablename__ = "error"

    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False)
    error = Column(Text, nullable=False)
    error_date = Column(DateTime, default=datetime.datetime.now)

    def __repr__(self):
        return f"<Error(url='{self.url}', error='{self.error[:30]}...')>"


class WebScraping(Base):
    __tablename__ = "web_scraping"

    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False)
    access_date = Column(DateTime, default=datetime.datetime.now)
    content = Column(Text, nullable=False)

    def __repr__(self):
        return f"<WebScraping(url='{self.url}', content='{self.content[:30]}...')>"
