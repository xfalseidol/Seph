// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const storyCards = document.querySelectorAll('.story-card');
const galleryItems = document.querySelectorAll('.gallery-item');
const mysteryItems = document.querySelectorAll('.mystery-item');
const form = document.getElementById('mysteriesForm');
const floatingGhost = document.querySelector('.floating-ghost');

// Navigation functionality
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Trigger animations for newly visible content
                if (targetId === 'story') {
                    revealStoryCards();
                } else if (targetId === 'gallery') {
                    revealGalleryItems();
                } else if (targetId === 'mysteries') {
                    revealMysteryItems();
                }
            }
        });
    });
}

// Story card reveal animations
function revealStoryCards() {
    storyCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `cardReveal 0.8s ease-out forwards`;
            card.style.animationDelay = `${index * 0.2}s`;
        }, 100);
    });
}

// Gallery items reveal
function revealGalleryItems() {
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `cardReveal 0.6s ease-out forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
        }, 100);
    });
}

// Mystery items reveal
function revealMysteryItems() {
    mysteryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `cardReveal 0.7s ease-out forwards`;
            item.style.animationDelay = `${index * 0.15}s`;
        }, 100);
    });
}

// Interactive story card functionality
function initStoryCards() {
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.closest('.story-card');
            const expandedContent = getExpandedContent(index);
            
            if (card.classList.contains('expanded')) {
                // Collapse
                const expandedDiv = card.querySelector('.expanded-content');
                expandedDiv.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    card.removeChild(expandedDiv);
                    card.classList.remove('expanded');
                    button.textContent = 'Read More';
                }, 300);
            } else {
                // Expand
                const expandedDiv = document.createElement('div');
                expandedDiv.className = 'expanded-content';
                expandedDiv.innerHTML = expandedContent;
                expandedDiv.style.animation = 'fadeIn 0.5s ease-out';
                card.appendChild(expandedDiv);
                card.classList.add('expanded');
                button.textContent = 'Read Less';
            }
        });
    });
}

// Get expanded content for story cards
function getExpandedContent(index) {
    const contents = [
        `<div class="expanded-text">
            <p>Sarah's excitement turned to unease within the first week. The realtor had failed to mention several key details about 1247 Maple Street. The previous owners had left suddenly, abandoning most of their belongings. The basement door had three different locks, all installed from the outside.</p>
            <p>But it was the children's drawings she found hidden in the attic that made her blood run cold. Stick figures with no faces, standing in front of houses that looked exactly like hers. And at the bottom of each drawing, written in a child's handwriting: "They're watching."</p>
        </div>`,
        `<div class="expanded-text">
            <p>The footsteps came every night at exactly 2:17 AM. Sarah had timed them. They would start in the attic, move across to the far corner, then stop directly above her bed. She'd checked the attic multiple times – it was empty except for dust and those disturbing drawings.</p>
            <p>The neighbors began visiting more frequently, always with the same wide smile and empty eyes. They asked the same questions: "How are you settling in?" "Notice anything... unusual?" Their visits always ended with the same warning: "Make sure to keep your doors locked at night."</p>
        </div>`,
        `<div class="expanded-text">
            <p>The truth came from Mrs. Henderson, the elderly woman at the end of the street. On her deathbed, she confessed everything. The neighborhood association wasn't what it seemed. They had made a pact decades ago, feeding something ancient that lived beneath the perfect lawns and manicured gardens.</p>
            <p>"It keeps us safe," she whispered, "keeps us prosperous. But it needs... sustenance. Fresh families. We choose them carefully, help them settle in, make them feel welcome. Then, when the time is right..." Her words trailed off, but Sarah understood. She was the chosen one. The next meal.</p>
        </div>`
    ];
    
    return contents[index] || '';
}

// Gallery item interactions
function initGallery() {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showImageModal(index);
        });
        
        // Add hover sound effect (visual feedback)
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Show image modal (simulated)
function showImageModal(index) {
    const descriptions = [
        "The house at 1247 Maple Street looks perfect from the outside, but darkness lurks within its walls...",
        "Every night, the streetlights flicker at exactly 3:33 AM, and shadows move where no one should be...",
        "Residents report seeing a figure in their peripheral vision, always watching, never there when they turn to look...",
        "The windows of empty houses sometimes show lights and movement, though no one has lived there for years..."
    ];
    
    const galleryItem = galleryItems[index];
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-image">${galleryItem.querySelector('.image-placeholder').textContent}</div>
            <h3>${galleryItem.querySelector('p').textContent}</h3>
            <p>${descriptions[index]}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%);
        padding: 3rem;
        border-radius: 15px;
        text-align: center;
        border: 2px solid #68bb59;
        max-width: 500px;
        position: relative;
        animation: scaleIn 0.3s ease-out;
    `;
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        font-size: 2rem;
        color: #68bb59;
        cursor: pointer;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Form handling
function initForm() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const experience = {
            name: formData.get('name'),
            location: formData.get('location'),
            experience: formData.get('experience')
        };
        
        // Simulate form submission
        showFormSubmissionFeedback(experience);
        form.reset();
    });
}

// Show form submission feedback
function showFormSubmissionFeedback(data) {
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.innerHTML = `
        <div class="feedback-content">
            <h3>Thank you, ${data.name}!</h3>
            <p>Your supernatural experience from ${data.location} has been recorded.</p>
            <p>Our investigators will review your submission and may contact you for additional details.</p>
            <p class="warning">⚠️ Please ensure all doors and windows are locked tonight. ⚠️</p>
        </div>
    `;
    
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%);
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid #68bb59;
        z-index: 2000;
        animation: scaleIn 0.5s ease-out;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    `;
    
    const warning = feedback.querySelector('.warning');
    warning.style.cssText = `
        color: #ff6b6b;
        font-weight: bold;
        margin-top: 1rem;
        animation: pulse 2s ease-in-out infinite;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 5000);
}

// Floating ghost interactions
function initFloatingGhost() {
    floatingGhost.addEventListener('click', () => {
        triggerGhostInteraction();
    });
    
    // Random ghost appearances
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 10 seconds
            triggerRandomGhostEvent();
        }
    }, 10000);
}

// Ghost interaction
function triggerGhostInteraction() {
    const messages = [
        "👻 The ghost whispers: 'You shouldn't have come here...'",
        "👻 A cold presence surrounds you...",
        "👻 The spirit points toward the shadows...",
        "👻 'They know you're here now,' echoes in your mind...",
        "👻 The ghost fades away, leaving only cold air..."
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    showGhostMessage(message);
}

// Random ghost events
function triggerRandomGhostEvent() {
    const events = [
        () => flashScreen(),
        () => createFloatingText("Did you hear that?"),
        () => shakePage(),
        () => dimLights()
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent();
}

// Show ghost message
function showGhostMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: #68bb59;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 2000;
        animation: ghostMessageFloat 4s ease-out forwards;
        text-align: center;
        border: 1px solid #68bb59;
        box-shadow: 0 0 20px rgba(104, 187, 89, 0.5);
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

// Special effects
function flashScreen() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        animation: flashEffect 0.5s ease-out;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
    }, 500);
}

function createFloatingText(text) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.cssText = `
        position: fixed;
        top: ${Math.random() * 50 + 25}%;
        left: ${Math.random() * 50 + 25}%;
        color: #68bb59;
        font-size: 1.5rem;
        z-index: 1500;
        pointer-events: none;
        animation: floatText 3s ease-out forwards;
        text-shadow: 0 0 10px #68bb59;
    `;
    
    document.body.appendChild(floatingText);
    
    setTimeout(() => {
        floatingText.remove();
    }, 3000);
}

function shakePage() {
    document.body.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

function dimLights() {
    const dimOverlay = document.createElement('div');
    dimOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        pointer-events: none;
        animation: dimLightEffect 3s ease-in-out;
    `;
    
    document.body.appendChild(dimOverlay);
    
    setTimeout(() => {
        dimOverlay.remove();
    }, 3000);
}

// Add CSS animations dynamically
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes ghostMessageFloat {
            0% { transform: translateX(-50%) translateY(0); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateX(-50%) translateY(-50px); opacity: 0; }
        }
        
        @keyframes flashEffect {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.8; }
        }
        
        @keyframes floatText {
            0% { transform: translateY(0); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(-100px); opacity: 0; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes dimLightEffect {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addDynamicAnimations();
    initNavigation();
    initStoryCards();
    initGallery();
    initForm();
    initFloatingGhost();
    
    // Reveal initial content
    revealStoryCards();
    
    // Add some ambiance
    setTimeout(() => {
        createFloatingText("Welcome to the neighborhood...");
    }, 3000);
});

// Add scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for background elements
    const bgElements = document.querySelector('.background-elements');
    if (bgElements) {
        bgElements.style.transform = `translateY(${rate}px)`;
    }
});

// Keyboard shortcuts for easter eggs
document.addEventListener('keydown', (e) => {
    // Press 'G' for ghost interaction
    if (e.key.toLowerCase() === 'g') {
        triggerGhostInteraction();
    }
    
    // Press 'F' for flash effect
    if (e.key.toLowerCase() === 'f') {
        flashScreen();
    }
    
    // Press 'S' for shake effect
    if (e.key.toLowerCase() === 's') {
        shakePage();
    }
});

console.log("👻 Welcome to The Ghost in the Suburb! Press 'G' for ghost interactions, 'F' for flash effects, 'S' to shake the page!");