
async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const userMessage = document.createElement("div");
  userMessage.style.background="#f0e6db";
  userMessage.style.marginBottom="2rem"
  userMessage.style.padding="1rem"
  userMessage.style.borderRadius="10px"
  userMessage.innerHTML = `<b>You:</b> ${userInput}`;
  chatBox.appendChild(userMessage);

  try {
    const response = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });

    const result = await response.json();

    
    const modelMessage = document.createElement("div");
    modelMessage.style.background="#E7D6C5"
    modelMessage.style.padding="1rem"
    modelMessage.style.borderRadius="10px"
    modelMessage.innerHTML = `<b>Chatbot:</b> ${escapeHTML(result.response)}`;
    chatBox.appendChild(modelMessage);
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = document.createElement("div");
    errorMessage.style.color="yellow"
    errorMessage.innerHTML = `<b>Error:</b> Unable to get response from the server.`;
    chatBox.appendChild(errorMessage);
  } finally {
    document.getElementById("user-input").value = "";
  }
}

// Helper function to escape HTML
function escapeHTML(str) {
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
}

document.getElementById("send-button").addEventListener("click", sendMessage);

document.getElementById("user-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});


