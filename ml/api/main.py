from fastapi import FastAPI

app = FastAPI(title="The Patron Index ML API")


@app.get("/health")
def health():
    return {"status": "ok", "service": "ml-api"}
