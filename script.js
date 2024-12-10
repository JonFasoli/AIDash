function askMath() {
    const prompt = "Generate 5 random names and contact information. Present as contact cards, horizontally spaced in chat window";
    
    // Don't show the prompt message anymore
    // Simulate LLM response (replace this with actual API call)
    setTimeout(() => {
        const response = `
            <div class="contact-cards">
                <div class="contact-card">
                    <h3>John Smith</h3>
                    <button class="contact-btn email-btn" onclick="window.location.href='mailto:john.smith@email.com'">
                        📧 Email
                    </button>
                    <button class="contact-btn phone-btn" onclick="window.location.href='tel:5551234567'">
                        📱 Call
                    </button>
                </div>
                <div class="contact-card">
                    <h3>Sarah Johnson</h3>
                    <button class="contact-btn email-btn" onclick="window.location.href='mailto:sarah.j@email.com'">
                        📧 Email
                    </button>
                    <button class="contact-btn phone-btn" onclick="window.location.href='tel:5552345678'">
                        📱 Call
                    </button>
                </div>
                <div class="contact-card">
                    <h3>Michael Chen</h3>
                    <button class="contact-btn email-btn" onclick="window.location.href='mailto:m.chen@email.com'">
                        📧 Email
                    </button>
                    <button class="contact-btn phone-btn" onclick="window.location.href='tel:5553456789'">
                        📱 Call
                    </button>
                </div>
                <div class="contact-card">
                    <h3>Emma Davis</h3>
                    <button class="contact-btn email-btn" onclick="window.location.href='mailto:emma.d@email.com'">
                        📧 Email
                    </button>
                    <button class="contact-btn phone-btn" onclick="window.location.href='tel:5554567890'">
                        📱 Call
                    </button>
                </div>
                <div class="contact-card">
                    <h3>Luis Rodriguez</h3>
                    <button class="contact-btn email-btn" onclick="window.location.href='mailto:l.rodriguez@email.com'">
                        📧 Email
                    </button>
                    <button class="contact-btn phone-btn" onclick="window.location.href='tel:5555678901'">
                        📱 Call
                    </button>
                </div>
            </div>
        `;
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
} 