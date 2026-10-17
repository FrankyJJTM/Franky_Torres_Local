import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DB_HOST = os.getenv("DB_HOST", "mysql-agrofrutos-mysql-db-2.a.aivencloud.com")
    DB_PORT = int(os.getenv("DB_PORT", 19732))
    DB_USER = os.getenv("DB_USER", "avnadmin")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "AVNS_UGY51LKYgW-TTKrAf4R")
    DB_NAME = os.getenv("DB_NAME", "agrofrutos_db_2")