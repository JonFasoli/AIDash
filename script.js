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
    // Show bank selection modal
    const bankModal = document.getElementById('bankModal');
    bankModal.classList.add('show');
}

function selectBank(bank) {
    // Hide bank modal
    const bankModal = document.getElementById('bankModal');
    bankModal.classList.remove('show');
    
    // Show analysis modal
    const analysisModal = document.getElementById('analysisModal');
    analysisModal.classList.add('show');
    
    // Update analysis text periodically
    const analysisText = document.querySelector('.analysis-text');
    const messages = [
        "Analyzing transactions...",
        "Identifying tax deductions...",
        "Calculating potential savings...",
        "Finalizing analysis..."
    ];
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            analysisText.textContent = message;
        }, index * 1000);
    });
    
    // After 4 seconds, close modal, update savings, and scroll to top
    setTimeout(() => {
        analysisModal.classList.remove('show');
        // Get current savings value and add 6,420
        const savingsElement = document.getElementById('savingsNumber');
        const currentSavings = parseInt(savingsElement.textContent.replace(/,/g, ''));
        savingsElement.style.fontSize = '22.5px'; // Increase font size by 25%
        animateSavingsCounter(currentSavings, currentSavings + 6420, 2000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset font size after animation
        setTimeout(() => {
            savingsElement.style.fontSize = '18px';
        }, 2000);
    }, 4000);
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
    const navGroups = document.querySelectorAll('.nav-group');
    
    navGroups.forEach(group => {
        const header = group.querySelector('.nav-header');
        header.addEventListener('click', () => {
            // Close other open groups
            navGroups.forEach(otherGroup => {
                if (otherGroup !== group && otherGroup.classList.contains('expanded')) {
                    otherGroup.classList.remove('expanded');
                }
            });
            
            // Toggle current group
            group.classList.toggle('expanded');
        });
    });
    
    // Add both counter animations
    animateSalesCounter(104345, 108492, 2000); // 2 seconds duration
    animateSavingsCounter(10420, 10542, 2000); // Updated values for savings
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
    const prompt = "Display a list of 10 usernames, the channel that they left a review, the first sentence of their review, a sentiment score of the review, and a button next to each row to 'Generate reply'";
    
    addMessage("Here are your recent customer reviews:", true);
    
    setTimeout(() => {
        const response = `
            <table class="pricing-table reviews-table">
                <tr>
                    <th>Customer</th>
                    <th>Channel</th>
                    <th>Review Preview</th>
                    <th>Sentiment</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>JohnD2024</td>
                    <td>Google</td>
                    <td>Great service and fast shipping!</td>
                    <td><span class="sentiment positive">0.92</span></td>
                    <td><button class="action-btn" onclick="generateReply(1)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>SarahM</td>
                    <td>Facebook</td>
                    <td>Product was damaged upon arrival.</td>
                    <td><span class="sentiment negative">0.21</span></td>
                    <td><button class="action-btn" onclick="generateReply(2)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>TechBuyer85</td>
                    <td>TrustPilot</td>
                    <td>Exactly what I needed for my setup.</td>
                    <td><span class="sentiment positive">0.88</span></td>
                    <td><button class="action-btn" onclick="generateReply(3)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>EmmaW</td>
                    <td>Google</td>
                    <td>The customer service team was very helpful.</td>
                    <td><span class="sentiment positive">0.95</span></td>
                    <td><button class="action-btn" onclick="generateReply(4)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>PowerUser</td>
                    <td>Yelp</td>
                    <td>Shipping took longer than expected.</td>
                    <td><span class="sentiment negative">0.35</span></td>
                    <td><button class="action-btn" onclick="generateReply(5)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>Alex_R</td>
                    <td>Google</td>
                    <td>Perfect replacement for my old charger.</td>
                    <td><span class="sentiment positive">0.89</span></td>
                    <td><button class="action-btn" onclick="generateReply(6)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>CamperPro</td>
                    <td>Facebook</td>
                    <td>Works great for my RV setup!</td>
                    <td><span class="sentiment positive">0.91</span></td>
                    <td><button class="action-btn" onclick="generateReply(7)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>Lisa2024</td>
                    <td>TrustPilot</td>
                    <td>Instructions could be clearer.</td>
                    <td><span class="sentiment neutral">0.45</span></td>
                    <td><button class="action-btn" onclick="generateReply(8)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>OutdoorGuy</td>
                    <td>Yelp</td>
                    <td>Perfect for camping trips!</td>
                    <td><span class="sentiment positive">0.94</span></td>
                    <td><button class="action-btn" onclick="generateReply(9)">Generate reply</button></td>
                </tr>
                <tr>
                    <td>TechieGirl</td>
                    <td>Google</td>
                    <td>Battery life exceeds expectations.</td>
                    <td><span class="sentiment positive">0.97</span></td>
                    <td><button class="action-btn" onclick="generateReply(10)">Generate reply</button></td>
                </tr>
            </table>
        `;
        addMessage(response);
    }, 1000);
}

function generateReply(reviewId) {
    addMessage("Generating personalized response...", true);
    setTimeout(() => {
        const response = `Here's a suggested reply for review #${reviewId}:
        
        Thank you for taking the time to share your experience! We greatly value your feedback and are committed to providing the best possible service. We appreciate your support and hope to serve you again soon.
        
        [Click to copy and customize this response]`;
        addMessage(response);
    }, 1000);
}

function toggleNotifications() {
    const drawer = document.querySelector('.notifications-drawer');
    drawer.classList.toggle('open');
    
    // Optional: Remove notification badge when opened
    if (drawer.classList.contains('open')) {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    }
}

// Optional: Close drawer when clicking outside
document.addEventListener('click', (e) => {
    const drawer = document.querySelector('.notifications-drawer');
    const notifications = document.querySelector('.notifications');
    
    if (!drawer.contains(e.target) && !notifications.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
    }
});

function togglePayOverlay() {
    const overlay = document.querySelector('.pay-overlay');
    overlay.classList.toggle('open');
}

// Add array of potential AI agent actions
const aiActions = [
    {
        number: "$12K",
        text: "Automate customer win-back<br>campaigns for churned users",
        handler: "automateWinBack"
    },
    {
        number: "$8K",
        text: "Auto-adjust product pricing<br>based on competitor data",
        handler: "autoAdjustPricing"
    },
    {
        number: "$15K",
        text: "Set up automated upsell<br>recommendations at checkout",
        handler: "automateUpsells"
    },
    {
        number: "$21K",
        text: "Launch AI-powered abandoned<br>cart recovery system",
        handler: "automateCartRecovery"
    }
];

let usedActions = [];

function handleTileClick(clickedTile, originalHandler) {
    // First remove the clicked tile
    clickedTile.style.opacity = '0';
    
    setTimeout(() => {
        clickedTile.remove();
        
        // Add new AI action tile
        const newAction = getNewAiAction();
        if (newAction) {
            const newTile = createAiTile(newAction);
            const container = document.querySelector('.container');
            container.appendChild(newTile);
            
            // Animate new tile entrance
            setTimeout(() => {
                newTile.style.opacity = '1';
                
                // Now execute the original handler and scroll
                setTimeout(() => {
                    window[originalHandler]();
                    scrollToBottom();
                }, 300);
            }, 50);
        }
    }, 300);
}

function getNewAiAction() {
    const unusedActions = aiActions.filter(action => !usedActions.includes(action));
    if (unusedActions.length === 0) return null;
    
    const randomAction = unusedActions[Math.floor(Math.random() * unusedActions.length)];
    usedActions.push(randomAction);
    return randomAction;
}

function createAiTile(action) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.opacity = '0';
    tile.style.transition = 'opacity 0.3s ease-out';
    tile.onclick = () => handleTileClick(tile, action.handler);
    
    tile.innerHTML = `
        <div class="number">${action.number}</div>
        <span>${action.text}</span>
    `;
    
    return tile;
}

// Add new AI action handlers
function automateWinBack() {
    scrollToBottom();
    const prompt = "Set up automated win-back campaigns targeting churned customers with personalized offers based on their purchase history.";
    addMessage("Setting up automated win-back campaigns...", true);
    // ... rest of handler
}

function autoAdjustPricing() {
    scrollToBottom();
    const prompt = "Configure automated price adjustments based on real-time competitor data and demand patterns.";
    addMessage("Configuring automated pricing system...", true);
    // ... rest of handler
}

function automateUpsells() {
    scrollToBottom();
    const prompt = "Implement AI-powered product recommendations to show personalized upsells during checkout.";
    addMessage("Setting up automated upsell system...", true);
    // ... rest of handler
}

function automateCartRecovery() {
    scrollToBottom();
    const prompt = "Deploy an intelligent cart recovery system that sends personalized reminders and incentives.";
    addMessage("Deploying cart recovery automation...", true);
    // ... rest of handler
}

function animateSalesCounter(start, end, duration) {
    const element = document.getElementById('salesNumber');
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        
        const current = Math.floor(start + (range * easeOutQuad));
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Animation complete, trigger color flash
            element.style.animation = 'numberHighlight 1s ease-out';
            // Remove animation after it completes
            setTimeout(() => {
                element.style.animation = '';
            }, 1000);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function animateSavingsCounter(start, end, duration) {
    const element = document.getElementById('savingsNumber');
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        
        const current = Math.floor(start + (range * easeOutQuad));
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Animation complete, trigger color flash
            element.style.animation = 'numberHighlight 1s ease-out';
            // Remove animation after it completes
            setTimeout(() => {
                element.style.animation = '';
            }, 1000);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function toggleSalesChecklist() {
    const checklist = document.querySelector('.sales-checklist');
    checklist.classList.toggle('open');
}