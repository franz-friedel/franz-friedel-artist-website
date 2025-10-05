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
    
    // Fractures Collection - TODO: Replace with your actual Stripe Payment Links
    'Fractures I': 'https://buy.stripe.com/placeholder-fractures-1',
    'Fractures II': 'https://buy.stripe.com/placeholder-fractures-2',
    'Fractures III': 'https://buy.stripe.com/placeholder-fractures-3',
    'Fractures IV': 'https://buy.stripe.com/placeholder-fractures-4',
    'Fractures V': 'https://buy.stripe.com/placeholder-fractures-5',
    'Fractures VI': 'https://buy.stripe.com/placeholder-fractures-6'
};

function handlePaymentLink(artworkName) {
    const paymentLink = paymentLinks[artworkName];
    
    if (paymentLink && !paymentLink.includes('placeholder')) {
        // Redirect to Stripe Payment Link
        window.open(paymentLink, '_blank');
    } else if (paymentLink && paymentLink.includes('placeholder')) {
        // Show message for Fractures artworks that need payment links
        alert('Payment link for ' + artworkName + ' is being set up. Please contact me directly to purchase this artwork.');
        window.location.href = '/#contact';
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
