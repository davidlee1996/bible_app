# 1. Use official lightweight Python image
FROM python:3.11-slim

# 2. Set working directory
WORKDIR /app

# 3. Install system dependencies (optional if you use SQLite only)
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

# 4. Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your backend code
COPY . .

# 6. Expose port
EXPOSE 8000

# 7. Run FastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
