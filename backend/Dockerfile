# 1. Use official lightweight Python image
FROM python:3.11-slim

# 2. Set working directory
WORKDIR /app

# 3. Copy requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of your backend code
COPY backend/ .

# 5. Start server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
