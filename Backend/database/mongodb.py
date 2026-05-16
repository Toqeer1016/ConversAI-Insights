from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
MONGO_URL =os.getenv("Mongo_DB_URL")

load_dotenv()
MONGO_URL = os.getenv("Mongo_DB_URL")

client = AsyncIOMotorClient(MONGO_URL)

db = client["chatgpt_learning_analyzer"]

conversations_collection = db["conversations"]
metrics_collection = db["metrics"]
productivity_collection = db["productivity_analysis"]
quiz_collection = db["quiz"]
quiz_submission_collection = db["quiz_submissions"]
quiz_evaluation_collection = db["quiz_evaluations"]