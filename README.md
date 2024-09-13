# chat-insmtr

基于 Azure OpenAI API 和 gpt-35-turbo 模型的一个简易聊天网站。

# 用法

```bash
git clone https://github.com/invinciblesmalltree/chat-insmtr.git
cd chat-insmtr
docker build -t chat-insmtr .
docker run -id --name chat-insmtr \
       -e AZURE_OPENAI_KEY=你的API密钥 \
       -e AZURE_OPENAI_API_VERSION=你希望使用的API版本 \
       -e AZURE_OPENAI_ENDPOINT=https://你的资源名称.openai.azure.com/ \
       -e AZURE_OPENAI_API_MODEL=你部署的模型名称 \
       -p 8181:5000 chat-insmtr
```

然后访问 `http://localhost:8181` 即可。

# 说明

本项目是一个玩具项目，只供学习交流使用，不保证项目的稳定性和数据安全性。  
使用本项目时请自觉遵守当地相关法律法规，如在使用本项目过程中产生的一切法律后果应均由使用者本人承担。  
原则上，作者不会对本项目进行维护，如果确实想要修改我代码的话，可以自行 fork 本项目。