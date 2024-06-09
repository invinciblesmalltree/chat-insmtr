function generateUserId() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
}

function getUserId() {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('user_id', userId);
    }
    return userId;
}

const userId = getUserId();

function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') return;

    const messagesDiv = document.getElementById('messages');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = userInput;
    messagesDiv.appendChild(userMessageDiv);

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: userInput, user_id: userId}),
    })
        .then(response => response.json())
        .then(data => {
            const assistantMessageDiv = document.createElement('div');
            assistantMessageDiv.className = 'message assistant-message';
            assistantMessageDiv.innerHTML = marked.parse(data.message);
            const codeBlocks = assistantMessageDiv.querySelectorAll('pre code');

            codeBlocks.forEach((block) => {
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-button';
                copyButton.textContent = '复制';
                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(block.innerText);
                });

                const codeBlockWrapper = document.createElement('div');
                codeBlockWrapper.className = 'code-block';
                block.parentNode.insertBefore(codeBlockWrapper, block);
                codeBlockWrapper.appendChild(block);
                codeBlockWrapper.appendChild(copyButton);
            });

            messagesDiv.appendChild(assistantMessageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });

    document.getElementById('userInput').value = '';
}

document.getElementById('userInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

document.getElementById('userInput').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

window.addEventListener('beforeunload', function () {
    fetch('/clear_session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userId})
    });
});
