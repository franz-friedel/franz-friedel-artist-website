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
        const imageUrl = imageElement ? imageElement.src : 'https://www.franzfriedel.art/images/boundaries-1.jpg';
        
        // Validate and clean data with strict validation
        const cleanArtworkName = (artworkName && typeof artworkName === 'string') ? artworkName.trim() : 'Artwork';
        const cleanDescription = (description && typeof description === 'string') ? description.trim() : 'Contemporary artwork by Franz Friedel';
        const priceValue = parseFloat(price);
        const cleanPrice = (!isNaN(priceValue) && priceValue > 0) ? Math.round(priceValue * 100) : 50000; // Default to $500 in cents
        const cleanImageUrl = (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http')) ? imageUrl : 'https://www.franzfriedel.art/images/boundaries-1.jpg';
        
        console.log('Sending data to Stripe:', {
            artworkName: cleanArtworkName,
            price: cleanPrice,
            description: cleanDescription,
            imageUrl: cleanImageUrl
        });
        
        // Create checkout session
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                artworkName: cleanArtworkName,
                price: cleanPrice,
                description: cleanDescription,
                imageUrl: cleanImageUrl
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
    console.log('DOM loaded, looking for purchase buttons...');
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    console.log('Found purchase buttons:', purchaseButtons.length);
    
    purchaseButtons.forEach((button, index) => {
        console.log(`Setting up button ${index + 1}`);
        button.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Purchase button clicked!');
            
            // Get artwork details from the button's parent container
            const artworkContainer = button.closest('.artwork-item, .artwork-details');
            console.log('Artwork container:', artworkContainer);
            
            if (!artworkContainer) {
                console.error('Could not find artwork container');
                alert('Error: Could not find artwork details');
                return;
            }
            
            const artworkNameElement = artworkContainer.querySelector('h1, h3, h2');
            const artworkName = artworkNameElement ? artworkNameElement.textContent.trim() : 'Artwork';
            
            const priceElement = artworkContainer.querySelector('.price, .artwork-price');
            const price = priceElement ? priceElement.textContent.replace('$', '').trim() : '500';
            
            const descriptionElement = artworkContainer.querySelector('.artwork-description');
            const description = descriptionElement ? descriptionElement.textContent.trim() : 'Contemporary artwork by Franz Friedel';
            
            console.log('Artwork details:', { artworkName, price, description });
            
            handlePurchase(artworkName, price, description);
        });
    });
});
