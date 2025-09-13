// Simple Stripe payment for GitHub Pages (no server needed)
const stripe = Stripe('pk_live_51S6Aw7Ro2eJpq4ccX3SggRk6jjb74x1JPbcQmZR4AsnopzjXN6An3hDMhUYj9c8cmTv2mcVrH8jp2UKvZmSKywu500mq9tDxPq');

// Artwork data with Stripe Price IDs (you'll need to create these in Stripe Dashboard)
const artworkPrices = {
    'Boundaries I': 'price_1ABC123', // Replace with actual Stripe Price ID
    'Boundaries II': 'price_1ABC124',
    'Boundaries III': 'price_1ABC125',
    'Boundaries IV': 'price_1ABC126',
    'Boundaries V': 'price_1ABC127',
    'Boundaries VI': 'price_1ABC128',
    'Boundaries VII': 'price_1ABC129',
    'Boundaries VIII': 'price_1ABC130',
    'Boundaries IX': 'price_1ABC131'
};

async function handleSimplePurchase(artworkName) {
    try {
        const priceId = artworkPrices[artworkName];
        
        if (!priceId) {
            // Fallback: redirect to contact page for custom pricing
            window.location.href = '/#contact';
            return;
        }

        // Create checkout session using Stripe's hosted checkout
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            successUrl: 'https://franzfriedel.art/success.html',
            cancelUrl: 'https://franzfriedel.art/cancel.html',
            customerEmail: '', // Optional: pre-fill email
            metadata: {
                artwork: artworkName,
                artist: 'Franz Friedel'
            }
        });

        if (error) {
            console.error('Error:', error);
            alert('Payment failed: ' + error.message);
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed: ' + error.message);
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
            
            console.log('Purchasing:', artworkName);
            handleSimplePurchase(artworkName);
        });
    });
});
