require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Stripe checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { artworkName, price, description, imageUrl } = req.body;
    
    // Validate and clean data with strict validation
    const cleanArtworkName = (artworkName && typeof artworkName === 'string') ? artworkName.trim() : 'Artwork';
    const cleanDescription = (description && typeof description === 'string') ? description.trim() : 'Contemporary artwork by Franz Friedel';
    const cleanPrice = (price && !isNaN(price)) ? parseInt(price) : 50000; // Default to $500 in cents
    const cleanImageUrl = (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http')) ? imageUrl : 'https://www.franzfriedel.art/images/boundaries-1.jpg';
    
    // Ensure price is within valid range (Stripe requires 50 cents minimum)
    const validPrice = Math.max(50, Math.min(99999999, cleanPrice));
    
    console.log('Server received data:', {
      artworkName: cleanArtworkName,
      price: validPrice,
      description: cleanDescription,
      imageUrl: cleanImageUrl
    });
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: cleanArtworkName,
            description: cleanDescription,
            images: [cleanImageUrl],
          },
          unit_amount: validPrice,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel.html`,
      metadata: {
        artwork: cleanArtworkName,
        artist: 'Franz Friedel'
      }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html'));
});

// Cancel page
app.get('/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'cancel.html'));
});

// Serve main site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Make sure to set your STRIPE_SECRET_KEY in .env file');
});
