from fastapi import FastAPI
from routers import  upload_router, productivity_router,quiz_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="ChatInsight AI")
# Allow CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(upload_router.router, tags=["Upload Data"])
app.include_router(productivity_router.router, tags=[" AI Productivity Analysis"])
app.include_router(quiz_router.router, prefix="/ai")