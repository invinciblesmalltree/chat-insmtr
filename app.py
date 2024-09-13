import os
from flask import Flask, render_template, request, jsonify
from openai import AzureOpenAI
from dotenv import load_dotenv
import uuid

# 加载环境变量
load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

# 使用字典来存储用户的聊天记录
user_sessions = {}

# 初始化AzureOpenAI客户端
client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    user_id = request.json['user_id']

    if user_id not in user_sessions:
        user_sessions[user_id] = [{"role": "system", "content": "You are a helpful assistant."}]

    user_sessions[user_id].append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model=os.getenv("AZURE_OPENAI_API_MODEL"),
        messages=user_sessions[user_id]
    )

    assistant_message = response.choices[0].message.content
    user_sessions[user_id].append({"role": "assistant", "content": assistant_message})

    return jsonify({'message': assistant_message})


@app.route('/clear_session', methods=['POST'])
def clear_session():
    user_id = request.json.get('user_id')
    if user_id in user_sessions:
        del user_sessions[user_id]
    return '', 204


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
