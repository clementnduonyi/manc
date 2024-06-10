
async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  
  // Append user input to chat box
  const chatBox = document.getElementById("chat-box");
  const userMessage = document.createElement("div");
  userMessage.style.background="#f0e6db";
  userMessage.style.marginBottom="2rem"
  userMessage.style.padding="1rem"
  userMessage.style.borderRadius="10px"
  userMessage.innerHTML = `<b>You:</b> ${userInput}`;
  chatBox.appendChild(userMessage);

  const response = await fetch('/api/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userInput }),
  });

  const result = await response.json();

  
  // Append model response to chat box
  const modelMessage = document.createElement("div");
  modelMessage.style.background="#E7D6C5"
  modelMessage.style.padding="1rem"
  modelMessage.style.borderRadius="10px"
  modelMessage.innerHTML = `<b>MANC:</b> ${result.response}`;
 
  chatBox.appendChild(modelMessage);

  // Clear input field
  document.getElementById("user-input").value = "";
}
