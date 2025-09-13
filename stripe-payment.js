// Stripe Payment Handler
// Replace 'pk_test_...' with your actual Stripe publishable key

const stripe = Stripe('pk_live_51S6Aw7Ro2eJpq4ccX3SggRk6jjb74x1JPbcQmZR4AsnopzjXN6An3hDMhUYj9c8cmTv2mcVrH8jp2UKvZmSKywu500mq9tDxPq');

// Function to handle purchase
async function handlePurchase(artworkName, price, description) {
    try {
        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;
        
        // Get artwork image URL
        const imageElement = document.querySelector('.artwork-main-image, .artwork-image img');
        const imageUrl = imageElement ? imageElement.src : '';
        
        // Create checkout session
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                artworkName: artworkName,
                price: parseFloat(price),
                description: description,
                imageUrl: imageUrl
            })
        });
        
        const session = await response.json();
        
        if (session.error) {
            throw new Error(session.error);
        }
        
        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed: ' + error.message);
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Add click handlers to all purchase buttons
document.addEventListener('DOMContentLoaded', function() {
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get artwork details from the button's parent container
            const artworkContainer = button.closest('.artwork-item, .artwork-details');
            const artworkName = artworkContainer.querySelector('h1, h3').textContent;
            const priceElement = artworkContainer.querySelector('.price, .artwork-price');
            const price = priceElement ? priceElement.textContent.replace('$', '') : '500';
            const descriptionElement = artworkContainer.querySelector('.artwork-description');
            const description = descriptionElement ? descriptionElement.textContent : 'Contemporary artwork by Franz Friedel';
            
            handlePurchase(artworkName, price, description);
        });
    });
});
