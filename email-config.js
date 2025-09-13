// EmailJS Configuration
// You'll need to get these values from https://www.emailjs.com/

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading status
            formStatus.className = 'form-status loading';
            formStatus.textContent = 'Sending message...';
            
            // Get form data
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                to_email: 'franz-friedel@gmx.de'
            };
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(function(response) {
                    // Success
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    
                    // Clear form
                    contactForm.reset();
                    
                    // Hide status after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                })
                .catch(function(error) {
                    // Error
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or email me directly at franz-friedel@gmx.de';
                    
                    console.error('EmailJS Error:', error);
                });
        });
    }
});
