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
    'Fractures I': 'https://buy.stripe.com/6oU9AVcrsf5p4nE0OsaVa09',
    'Fractures II': 'https://buy.stripe.com/9B64gBbno5uP7zQ1SwaVa0a',
    'Fractures III': 'https://buy.stripe.com/3cI00lbno0avbQ6ap2aVa0b',
    'Fractures IV': 'https://buy.stripe.com/6oUdRbajk1ez7zQ54IaVa0c',
    'Fractures V': 'https://buy.stripe.com/28E4gB1MO7CXg6meFiaVa0d',
    'Fractures VI': 'https://buy.stripe.com/9B600lbnocXh3jA68MaVa0e'
};

function handlePaymentLink(artworkName) {
    const paymentLink = paymentLinks[artworkName];
    
    if (paymentLink) {
        // Redirect to Stripe Payment Link
        window.open(paymentLink, '_blank');
    } else {
        // Fallback: redirect to contact page
        window.location.href = '/#contact';
    }
}

// Add click handlers
document.addEventListener('DOMContentLoaded', function() {
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            const artworkContainer = button.closest('.artwork-item, .artwork-details');
            const artworkName = artworkContainer.querySelector('h1, h3, h2').textContent.trim();
            
            console.log('Opening payment link for:', artworkName);
            handlePaymentLink(artworkName);
        });
    });
});
