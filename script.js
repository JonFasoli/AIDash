// Get DOM elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Initialize chat history
let chatHistory = [];

// Function to add a message to the chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // Check if message contains HTML
    if (message.includes('<')) {
        messageDiv.innerHTML = message;
    } else {
        messageDiv.textContent = message;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to chat history
    chatHistory.push({
        role: isUser ? 'user' : 'assistant',
        content: message
    });
}

// Function to handle sending messages
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    
    // Clear input
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = `I received your message: "${message}". This is a simulated response.`;
        addMessage(botResponse);
    }, 1000);
}

// Handle Enter key in input
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function for tax questions
function askTax() {
    scrollToBottom();
    const prompt = "Generate the three most important questions to calculate someone's home office deduction";
    
    addMessage("Here are the key questions for calculating your home office deduction:", true);
    
    // Simulate bot response
    setTimeout(() => {
        const response = `
            1. What is the total square footage of your home, and what is the square footage of the space used exclusively for business?
            
            2. Do you use this space exclusively and regularly for business purposes, or is it a shared/multi-purpose space?
            
            3. What are your total home expenses, including mortgage/rent, utilities, insurance, and maintenance costs for the tax year?
        `;
        addMessage(response);
    }, 1000);
}

// Function to show pricing analysis
function showPricingAnalysis() {
    scrollToBottom();
    const prompt = "Show a table with 5 colums and 5 rows. the first colum is labeled Similar products. add 'Goal Zero Portable Charger' in the first cell. the remaining cells in this column should generate similar products to the first.";
    
    addMessage("Here's your pricing analysis for similar products:", true);
    
    // Simulate bot response
    setTimeout(() => {
        const response = `
            <table class="pricing-table">
                <tr>
                    <th>Similar Products</th>
                    <th>Current Price</th>
                    <th>Competitor Price</th>
                    <th>Price Difference</th>
                    <th>Potential Revenue</th>
                </tr>
                <tr>
                    <td>Goal Zero Portable Charger</td>
                    <td>$199.99</td>
                    <td>$249.99</td>
                    <td>-$50.00</td>
                    <td>$5,000</td>
                </tr>
                <tr>
                    <td>Jackery Power Station</td>
                    <td>$189.99</td>
                    <td>$229.99</td>
                    <td>-$40.00</td>
                    <td>$4,000</td>
                </tr>
                <tr>
                    <td>Anker PowerCore Solar</td>
                    <td>$159.99</td>
                    <td>$179.99</td>
                    <td>-$20.00</td>
                    <td>$2,000</td>
                </tr>
                <tr>
                    <td>EcoFlow River Pro</td>
                    <td>$249.99</td>
                    <td>$299.99</td>
                    <td>-$50.00</td>
                    <td>$2,500</td>
                </tr>
                <tr>
                    <td>Bluetti Portable Power</td>
                    <td>$179.99</td>
                    <td>$199.99</td>
                    <td>-$20.00</td>
                    <td>$1,000</td>
                </tr>
            </table>
            <div class="recommendation-box">
                <strong>Recommended Action:</strong> Based on competitor pricing and market analysis, we suggest updating the Goal Zero Portable Charger price to $229.99. This 15% increase could generate an additional $14,000 in annual revenue while remaining competitive.
                <button class="update-price-btn" onclick="updatePrices()">
                    Update pricing across stores
                </button>
            </div>
        `;
        addMessage(response);
    }, 1000);
}

// Add this function to handle the button click
function updatePrices() {
    addMessage("Initiating price updates across all connected stores...", true);
    setTimeout(() => {
        addMessage("✅ Prices have been queued for update. Changes will be reflected within 24 hours.");
    }, 1000);
}

// Function to get action plan
function getActionPlan(metricType) {
    let prompt = '';
    let userMessage = '';
    
    switch(metricType) {
        case 'cart':
            prompt = "Generate a 1-3 step action plan to improve a cart abandonment rate of 68% that has increased 12% since last month.";
            userMessage = "Here's an action plan to improve your cart abandonment rate:";
            break;
        case 'aov':
            prompt = "Generate a 1-3 step action plan to improve an average order value of $42.50 that has decreased 8% since last month.";
            userMessage = "Here's an action plan to improve your average order value:";
            break;
        case 'cac':
            prompt = "Generate a 1-3 step action plan to improve a customer acquisition cost of $28.90 that has increased 15% since last month.";
            userMessage = "Here's an action plan to reduce your customer acquisition cost:";
            break;
        case 'ltv':
            prompt = "Generate a 1-3 step action plan to further improve a customer lifetime value of $156 that has already increased 5% since last month.";
            userMessage = "Here's an action plan to further improve your customer lifetime value:";
            break;
    }
    
    addMessage(userMessage, true);
    
    // Simulate bot response
    setTimeout(() => {
        let response = '';
        switch(metricType) {
            case 'cart':
                response = `
                    1. Implement an exit-intent popup offering a 10% discount code for first-time purchases to capture abandoning visitors.
                    
                    2. Add trust badges and security certificates prominently during checkout to address potential security concerns.
                    
                    3. Enable guest checkout to reduce friction, while offering account creation incentives post-purchase.
                `;
                break;
            case 'aov':
                response = `
                    1. Introduce product bundles with a 15% discount when buying complementary items together.
                    
                    2. Add a free shipping threshold at $60 to encourage larger purchases.
                    
                    3. Implement a smart product recommendation engine showing relevant up-sell items during checkout.
                `;
                break;
            case 'cac':
                response = `
                    1. Audit your current ad campaigns and pause underperforming ads with CAC above $35.
                    
                    2. Increase investment in email marketing and referral programs which show lower acquisition costs.
                    
                    3. Optimize landing pages for top spending campaigns to improve conversion rates.
                `;
                break;
            case 'ltv':
                response = `
                    1. Launch a loyalty program offering points for purchases and referrals.
                    
                    2. Create a VIP tier for customers spending over $200 with exclusive benefits and early access to sales.
                    
                    3. Set up automated email workflows for post-purchase engagement and repeat purchases.
                `;
                break;
        }
        addMessage(response);
    }, 1000);
}

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    // Cart Abandonment Chart
    new Chart(document.getElementById('cartChart'), {
        type: 'line',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [{
                data: [58, 61, 65, 62, 64, 68],
                borderColor: 'var(--qb-secondary)',
                tension: 0.4,
                fill: false
            }]
        },
        options: commonOptions
    });

    // AOV Chart
    new Chart(document.getElementById('aovChart'), {
        type: 'line',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [{
                data: [48, 46, 45, 44, 43.5, 42.5],
                borderColor: 'var(--qb-secondary)',
                tension: 0.4,
                fill: false
            }]
        },
        options: commonOptions
    });

    // CAC Chart
    new Chart(document.getElementById('cacChart'), {
        type: 'line',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [{
                data: [22, 23, 24, 25, 26.5, 28.9],
                borderColor: 'var(--qb-secondary)',
                tension: 0.4,
                fill: false
            }]
        },
        options: commonOptions
    });

    // LTV Chart
    new Chart(document.getElementById('ltvChart'), {
        type: 'line',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [{
                data: [142, 145, 148, 150, 153, 156],
                borderColor: 'var(--qb-secondary)',
                tension: 0.4,
                fill: false
            }]
        },
        options: commonOptions
    });
}

// Update the onclick handler in your HTML to use askTax instead of the YouTube link
// <div class="tile" onclick="askTax()">

function showChannelPerformance() {
    scrollToBottom();
    const prompt = "Generate a table of ecommerce channels and the performance metrics for each. highlight 2 of the rows with underperforming metrics.";
    
    addMessage("Here's your channel performance analysis:", true);
    
    // Simulate bot response
    setTimeout(() => {
        const response = `
            <table class="pricing-table">
                <tr>
                    <th>Channel</th>
                    <th>Revenue</th>
                    <th>Conversion Rate</th>
                    <th>CAC</th>
                    <th>ROAS</th>
                </tr>
                <tr>
                    <td>Google Shopping</td>
                    <td>$45,230</td>
                    <td>2.8%</td>
                    <td>$22</td>
                    <td>3.2x</td>
                </tr>
                <tr class="underperforming">
                    <td>Facebook Ads</td>
                    <td>$12,450</td>
                    <td>0.9%</td>
                    <td>$45</td>
                    <td>1.1x</td>
                </tr>
                <tr>
                    <td>Email Marketing</td>
                    <td>$28,900</td>
                    <td>3.5%</td>
                    <td>$8</td>
                    <td>4.8x</td>
                </tr>
                <tr class="underperforming">
                    <td>TikTok Ads</td>
                    <td>$8,750</td>
                    <td>0.7%</td>
                    <td>$52</td>
                    <td>0.9x</td>
                </tr>
                <tr>
                    <td>Instagram Shop</td>
                    <td>$31,200</td>
                    <td>2.4%</td>
                    <td>$25</td>
                    <td>2.8x</td>
                </tr>
            </table>
            <div class="recommendation-box">
                <strong>Analysis:</strong> Facebook Ads and TikTok Ads are significantly underperforming with high customer acquisition costs and low ROAS. Consider reallocating budget to better performing channels like Email Marketing and Google Shopping.
                <button class="action-btn" onclick="optimizeChannels()">
                    Optimize channel budget
                </button>
            </div>
        `;
        addMessage(response);
    }, 1000);
}

function optimizeChannels() {
    addMessage("Initiating channel budget optimization...", true);
    setTimeout(() => {
        addMessage("✅ Budget reallocation plan has been generated. Review and approve the changes in your marketing dashboard.");
    }, 1000);
}

// Helper function for smooth scrolling
function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
}

function askMath() {
    scrollToBottom();
    const prompt = "Generate a network graph visualization showing review sources and their counts...";
    
    addMessage("Here's the breakdown of your 54 new customer reviews by source:", true);
    
    setTimeout(() => {
        const response = `
            <div class="network-graph">
                <svg viewBox="0 0 800 400">
                    <!-- Central node -->
                    <circle cx="400" cy="200" r="40" class="node central-node" />
                    <text x="400" y="205" class="node-text central-text" dominant-baseline="middle">54</text>
                    
                    <!-- Google Reviews -->
                    <a href="https://business.google.com/reviews" target="_blank" class="node-link">
                        <line x1="400" y1="200" x2="250" y2="150" class="connection-line" />
                        <circle cx="250" cy="150" r="35" class="node" />
                        <text x="250" y="150" class="node-text" dominant-baseline="middle">28</text>
                        <text x="250" y="175" class="source-label" dominant-baseline="middle">Google</text>
                    </a>
                    
                    <!-- Facebook -->
                    <a href="https://business.facebook.com/reviews" target="_blank" class="node-link">
                        <line x1="400" y1="200" x2="550" y2="150" class="connection-line" />
                        <circle cx="550" cy="150" r="30" class="node" />
                        <text x="550" y="150" class="node-text" dominant-baseline="middle">12</text>
                        <text x="550" y="175" class="source-label" dominant-baseline="middle">Facebook</text>
                    </a>
                    
                    <!-- Yelp -->
                    <a href="https://biz.yelp.com" target="_blank" class="node-link">
                        <line x1="400" y1="200" x2="250" y2="300" class="connection-line" />
                        <circle cx="250" cy="300" r="25" class="node" />
                        <text x="250" y="300" class="node-text" dominant-baseline="middle">8</text>
                        <text x="250" y="325" class="source-label" dominant-baseline="middle">Yelp</text>
                    </a>
                    
                    <!-- TrustPilot -->
                    <a href="https://business.trustpilot.com" target="_blank" class="node-link">
                        <line x1="400" y1="200" x2="550" y2="300" class="connection-line" />
                        <circle cx="550" cy="300" r="25" class="node" />
                        <text x="550" y="300" class="node-text" dominant-baseline="middle">6</text>
                        <text x="550" y="325" class="source-label" dominant-baseline="middle">TrustPilot</text>
                    </a>
                </svg>
            </div>
            <div class="recommendation-box">
                <strong>Analysis:</strong> Most of your new reviews (52%) are coming from Google Reviews, suggesting strong visibility on the platform. Consider encouraging more reviews on other platforms, especially TrustPilot where you have the lowest representation.
                <button class="action-btn" onclick="manageReviews()">
                    Manage review strategy
                </button>
            </div>
        `;
        addMessage(response);
    }, 1000);
}

function manageReviews() {
    addMessage("Generating review management strategy...", true);
    setTimeout(() => {
        addMessage("✅ Review management dashboard is ready. You can now view detailed analytics and set up automated review response templates.");
    }, 1000);
}