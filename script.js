// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#000000';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = '#000000';
        navbar.style.boxShadow = 'none';
    }
});

// Collections Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const artworkItems = document.querySelectorAll('.artwork-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        artworkItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-content, .collections-grid, .contact-content, .artwork-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Formspree Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading status
            formStatus.className = 'form-status loading';
            formStatus.textContent = 'Sending message...';
            
            // Submit to Formspree
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    contactForm.reset();
                    
                    // Hide status after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    // Error
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or email me directly at franz-friedel@gmx.de';
                }
            })
            .catch(error => {
                // Network error
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or email me directly at franz-friedel@gmx.de';
                console.error('Formspree Error:', error);
            });
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
    }
`;
document.head.appendChild(notificationStyle);

// Purchase button functionality is now handled by stripe-links.js
// This prevents conflicts with Stripe Payment Links

// Purchase Modal
function showPurchaseModal(title, price) {
    // Remove existing modal
    const existingModal = document.querySelector('.purchase-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Purchase "${title}"</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Price:</strong> ${price}</p>
                    <p>To purchase this artwork, please contact me directly through the contact form or email.</p>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="window.location.href='#contact'">Contact Me</button>
                        <button class="btn btn-secondary modal-close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Add modal content styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-overlay {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: scaleIn 0.3s ease;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }
        .purchase-modal .modal-body {
            padding: 20px;
        }
        .modal-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// View Details functionality
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const artworkItem = button.closest('.artwork-item');
        const artworkTitle = artworkItem.querySelector('h3').textContent;
        const artworkMedium = artworkItem.querySelector('.artwork-medium').textContent;
        const artworkSize = artworkItem.querySelector('.artwork-size').textContent;
        const artworkPrice = artworkItem.querySelector('.artwork-price').textContent;
        // Get image source - try multiple selectors
        let artworkImage = '';
        const imgElement = artworkItem.querySelector('img');
        if (imgElement) {
            artworkImage = imgElement.src;
        } else {
            // Fallback: construct image path from title
            const title = artworkTitle.toLowerCase().replace(/\s+/g, '-');
            artworkImage = `images/${title}.jpg`;
        }
        
        // Debug: log the image path
        console.log('Image path:', artworkImage);
        
        // Use original images for modal display (they're already loaded in the grid)
        if (artworkTitle.includes('Fragments I')) {
            artworkImage = 'images/fragments-1.jpg';
        } else if (artworkTitle.includes('Fragments II')) {
            artworkImage = 'images/fragments-2.jpg';
        } else if (artworkTitle.includes('Fragments III')) {
            artworkImage = 'images/fragments-3.jpg';
        } else if (artworkTitle.includes('Fragments IV')) {
            artworkImage = 'images/fragments-4.jpg';
        } else if (artworkTitle.includes('Fragments V')) {
            artworkImage = 'images/fragments-5.jpg';
        } else if (artworkTitle.includes('Fragments VI')) {
            artworkImage = 'images/fragments-6-compressed.jpg';
        } else {
            artworkImage = 'images/fragments-1.jpg'; // fallback
        }
        
        console.log('Final image path:', artworkImage);
        
        showArtworkDetails(artworkTitle, artworkMedium, artworkSize, artworkPrice, artworkImage);
    });
});

// Get artwork description based on title
function getArtworkDescription(title) {
    const descriptions = {
        'Fragments I': 'Intersecting lines reach for completion but remain untethered, suggesting a rhythm of connection and loss. The composition captures a moment between cohesion and collapse, where form breathes through absence.',
        'Fragments II': 'Raw-edged rectangles converge and diverge, hinting at structural tension; its crisp pigment and taut alignment anchor the collection\'s opening statement.',
        'Fragments III': 'A quiet tension runs through the open geometry; lines reach for connection but stop short, leaving silence in between. The work captures a fleeting equilibrium between order and incompletion, where space itself becomes part of the composition.',
        'Fragments IV': 'Lines drift apart with calm detachment, each color retaining its individuality while hinting at a once-shared structure. The composition evokes a quiet aftermath; a stillness that follows separation.',
        'Fragments V': 'Intersecting strokes form a loose architecture that feels both deliberate and undone. The composition balances tension and openness, suggesting the moment structure begins to dissolve into motion.',
        'Fragments VI': 'The composition drifts between order and emptiness, its open corners leaving room for air and uncertainty. Each stroke reaches outward, as if searching for connection after the grid has come undone.'
    };
    
    return descriptions[title] || 'This is a unique piece that showcases the artist\'s distinctive style and creative vision. Each artwork is carefully crafted to evoke emotion and inspire contemplation.';
}

// Artwork Details Modal
function showArtworkDetails(title, medium, size, price, imageUrl) {
    console.log('showArtworkDetails called with:', { title, medium, size, price, imageUrl });
    
    // Remove existing modal
    const existingModal = document.querySelector('.details-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'details-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content details-modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                        <div class="modal-body">
                            <div class="artwork-details-image">
                                <img src="${imageUrl}" alt="${title}" class="modal-artwork-image">
                            </div>
                    <div class="artwork-details-info">
                        <div class="artwork-details-section">
                            <h4>Materials:</h4>
                            <p>Acrylic on Canvas</p>
                        </div>
                        <div class="artwork-details-section">
                            <h4>Rarity:</h4>
                            <p>Unique work</p>
                        </div>
                        <div class="artwork-details-section">
                            <h4>Dimensions:</h4>
                            <p>${size}</p>
                        </div>
                        <div class="artwork-details-section">
                            <h4>Location:</h4>
                            <p>Stockholm, Sweden</p>
                        </div>
                        <div class="artwork-details-section">
                            <h4>Description:</h4>
                            <p class="artwork-description">${getArtworkDescription(title)}</p>
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-primary purchase-btn">Purchase</button>
                            <button class="btn btn-secondary modal-close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Add modal content styles
    const modalContentStyle = document.createElement('style');
    modalContentStyle.textContent = `
        .details-modal-content {
            background: #000000 !important;
            border-radius: 15px;
            padding: 30px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        .details-modal-content .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #333;
            padding-bottom: 15px;
        }
        .modal-header h3 {
            margin: 0;
            color: #ffffff;
            font-size: 24px;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #ffffff;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-close:hover {
            color: #cccccc;
        }
        .details-modal .modal-body {
            color: #ffffff;
            display: flex;
            gap: 30px;
            align-items: flex-start;
        }
        .artwork-details-section {
            margin-bottom: 20px;
        }
        .artwork-details-section h4 {
            margin: 0 0 5px 0;
            font-size: 14px;
            font-weight: 600;
            color: #cccccc;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .artwork-details-section p {
            margin: 0;
            font-size: 16px;
            color: #ffffff;
            line-height: 1.5;
        }
        .artwork-description {
            font-style: italic;
            color: #cccccc;
        }
        @media (max-width: 768px) {
            .details-modal .modal-body {
                flex-direction: column;
                gap: 20px;
            }
        }
    `;
    document.head.appendChild(modalContentStyle);
    
    // Add to page
    document.body.appendChild(modal);
    
    // Simple: just make sure the image shows
    const img = modal.querySelector('.modal-artwork-image');
    if (img) {
        console.log('Setting image src to:', imageUrl);
        img.src = imageUrl;
        img.alt = title;
        
        // Force reload
        img.onload = function() {
            console.log('Image loaded successfully!');
        };
        img.onerror = function() {
            console.log('Image failed to load:', imageUrl);
        };
    } else {
        console.log('Image element not found!');
    }
    
    // Force apply styles directly to the modal content
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.background = '#000000';
        modalContent.style.color = '#ffffff';
        modalContent.style.maxWidth = '800px';
    }
    
    // Force apply styles to all text elements
    const textElements = modal.querySelectorAll('h3, h4, p, .modal-close');
    textElements.forEach(el => {
        if (el.classList.contains('modal-close')) {
            el.style.color = '#ffffff';
        } else {
            el.style.color = '#ffffff';
        }
    });
    
    // Force apply styles to artwork details sections
    const detailSections = modal.querySelectorAll('.artwork-details-section h4');
    detailSections.forEach(el => {
        el.style.color = '#cccccc';
    });
    
    const detailTexts = modal.querySelectorAll('.artwork-details-section p');
    detailTexts.forEach(el => {
        el.style.color = '#ffffff';
    });
    
    // Close modal functionality
    modal.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Handle purchase button in details modal
    modal.querySelector('.purchase-btn').addEventListener('click', () => {
        showPurchaseModal(title, price);
        modal.remove();
    });
}

// Add artwork details modal styles
const detailsModalStyle = document.createElement('style');
detailsModalStyle.textContent = `
        .artwork-details-image {
            flex: 1;
            height: 500px;
            background: #f0f0f0;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin-right: 20px;
        }
        .modal-artwork-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    .artwork-details-info p {
        margin-bottom: 10px;
    }
    .artwork-description {
        font-style: italic;
        color: #666;
        margin: 20px 0;
    }
`;
document.head.appendChild(detailsModalStyle);

// Lazy loading for images (when you add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #667eea;
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-3px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#000000';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = '#000000';
        navbar.style.boxShadow = 'none';
    }
    
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

const modal = document.getElementById("artworkModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalMedium = document.getElementById("modalMedium");
const modalSize = document.getElementById("modalSize");
const modalPrice = document.getElementById("modalPrice");

document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();

    const artwork = btn.closest(".artwork-item");
    modalImg.src = artwork.querySelector("img").src;
    modalTitle.textContent = artwork.querySelector("h3").textContent;
    modalMedium.textContent = artwork.querySelector(".artwork-medium").textContent;
    modalSize.textContent = artwork.querySelector(".artwork-size").textContent;
    modalPrice.textContent = artwork.querySelector(".artwork-price").textContent;

    modal.classList.add("active");
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("active");
});
