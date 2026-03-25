#python image don't need to install python manually inside the container
FROM python:3.11-slim

# yes Don’t create .pyc files keeps container clean
ENV PYTHONDONTWRITEBYTECODE=1

#yes python runs unbffered mod
ENV PYTHONUNBUFFERED=1

#apt-get update → refresh available package list.
#apt-get install -y gcc libpq-dev → install compiler + PostgreSQL dev libraries
#rm -rf /var/lib/apt/lists/* → cleanup to keep image small.
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

#sets working directry inside the container 
WORKDIR /app


#copy this file to container
COPY  requirements.txt .

#--no-cache-dir = skip cache to reduce image size.
#run this file inside the conatiner directry that is /backend
RUN pip install --no-cache-dir -r requirements.txt

#copy the rest of the application code 
COPY . .



#default command it will run when the conatiner start
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]