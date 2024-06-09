FROM python:slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8181
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV AZURE_OPENAI_KEY=""
ENV AZURE_OPENAI_ENDPOINT=""
CMD ["flask", "run"]