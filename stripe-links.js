// Ultra-simple Stripe payment using Payment Links
// No server needed, works perfectly with GitHub Pages

// Stripe Payment Links (create these in Stripe Dashboard)
const paymentLinks = {
    'Boundaries I': 'https://buy.stripe.com/your-link-1', // Replace with actual payment links
    'Boundaries II': 'https://buy.stripe.com/your-link-2',
    'Boundaries III': 'https://buy.stripe.com/your-link-3',
    'Boundaries IV': 'https://buy.stripe.com/your-link-4',
    'Boundaries V': 'https://buy.stripe.com/your-link-5',
    'Boundaries VI': 'https://buy.stripe.com/your-link-6',
    'Boundaries VII': 'https://buy.stripe.com/your-link-7',
    'Boundaries VIII': 'https://buy.stripe.com/your-link-8',
    'Boundaries IX': 'https://buy.stripe.com/your-link-9'
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
