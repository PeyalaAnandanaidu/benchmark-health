from pymongo import MongoClient
import os
from dotenv import load_dotenv

# load .env variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# connect MongoDB
client = MongoClient(MONGO_URI)

db = client[DB_NAME]

models_collection = db["models"]
results_collection = db["results"]