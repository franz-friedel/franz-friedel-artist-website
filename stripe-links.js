// Ultra-simple Stripe payment using Payment Links
// No server needed, works perfectly with GitHub Pages

// Stripe Payment Links - Your actual payment links from Stripe Dashboard
const paymentLinks = {
    // Boundaries Collection
    'Boundaries I': 'https://buy.stripe.com/28EbJ3bnoaP96vMdBeaVa00',
    'Boundaries II': 'https://buy.stripe.com/4gMcN7gHI8H11bsgNqaVa01',
    'Boundaries III': 'https://buy.stripe.com/14AaEZfDEbTd5rI8gUaVa02',
    'Boundaries IV': 'https://buy.stripe.com/dRm14p4Z04qLdYeap2aVa03',
    'Boundaries V': 'https://buy.stripe.com/14A5kF6348H1g6mcxaaVa04',
    'Boundaries VI': 'https://buy.stripe.com/dRm28t1MOe1l5rIdBeaVa05',
    'Boundaries VII': 'https://buy.stripe.com/28E3cxbnog9t5rI1SwaVa06',
    'Boundaries VIII': 'https://buy.stripe.com/fZucN72QS7CX3jA2WAaVa07',
    'Boundaries IX': 'https://buy.stripe.com/9B6cN7crse1ldYegNqaVa08',
    
    // Fractures Collection - Real Stripe Payment Links
    'Fragments I': 'https://buy.stripe.com/6oU9AVcrsf5p4nE0OsaVa09',
    'Fragments II': 'https://buy.stripe.com/9B64gBbno5uP7zQ1SwaVa0a',
    'Fragments III': 'https://buy.stripe.com/3cI00lbno0avbQ6ap2aVa0b',
    'Fragments IV': 'https://buy.stripe.com/6oUdRbajk1ez7zQ54IaVa0c',
    'Fragments V': 'https://buy.stripe.com/28E4gB1MO7CXg6meFiaVa0d',
    'Fragments VI': 'https://buy.stripe.com/9B600lbnocXh3jA68MaVa0e'
};

// Make function globally accessible
window.handlePaymentLink = function(artworkName) {
    console.log('handlePaymentLink called with:', artworkName);
    const paymentLink = paymentLinks[artworkName];
    console.log('Payment link found:', paymentLink);
    
    if (paymentLink) {
        console.log('Opening Stripe link:', paymentLink);
        // Redirect to Stripe Payment Link
        window.open(paymentLink, '_blank');
    } else {
        console.log('No payment link found, redirecting to contact');
        // Fallback: redirect to contact page
        window.location.href = '/#contact';
    }
}

// Add click handlers - more robust approach
function attachPurchaseHandlers() {
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        // Remove any existing listeners to prevent duplicates
        button.removeEventListener('click', handlePurchaseClick);
        button.addEventListener('click', handlePurchaseClick);
    });
}

function handlePurchaseClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const artworkContainer = event.target.closest('.artwork-item, .artwork-details');
    if (!artworkContainer) return;
    
    const artworkName = artworkContainer.querySelector('h1, h3, h2');
    if (!artworkName) return;
    
    const name = artworkName.textContent.trim();
    console.log('Purchase clicked for:', name);
    handlePaymentLink(name);
}

// Attach handlers when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachPurchaseHandlers);
} else {
    attachPurchaseHandlers();
}

// Also attach after a short delay to catch dynamically loaded content
setTimeout(attachPurchaseHandlers, 1000);

// Test function to verify everything is working
window.testPaymentLinks = function() {
    console.log('Testing payment links:');
    console.log('Fragments I:', paymentLinks['Fragments I']);
    console.log('Fragments II:', paymentLinks['Fragments II']);
    console.log('handlePaymentLink function:', typeof window.handlePaymentLink);
}
