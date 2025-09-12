// Stripe Payment Handler
// Replace 'pk_test_...' with your actual Stripe publishable key

const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE'); // Replace with your key

// Function to handle purchase
async function handlePurchase(artworkName, price, description) {
    try {
        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;
        
        // Get artwork image URL
        const imageUrl = document.querySelector('.artwork-image img').src;
        
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
        button.addEventListener('click', function() {
            // Get artwork details from the page
            const artworkName = document.querySelector('.artwork-title').textContent;
            const price = document.querySelector('.price').textContent.replace('$', '');
            const description = document.querySelector('.artwork-description').textContent;
            
            handlePurchase(artworkName, price, description);
        });
    });
});
