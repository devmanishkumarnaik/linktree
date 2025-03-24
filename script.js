document.addEventListener('DOMContentLoaded', function() {
    // Avatar click effect
    const avatarContainer = document.querySelector('.avatar-container');
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    
    if (avatarContainer) {
        avatarContainer.addEventListener('click', function() {
            // Toggle between front and back images
            this.classList.toggle('flipped');
            
            // Activate ring popup effect
            this.classList.add('active');
            
            // Reset effects after animation completes
            setTimeout(() => {
                this.classList.remove('active');
            }, 800);
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.link-btn');
    
    buttons.forEach(button => {
        // Mouse enter effect
        button.addEventListener('mouseenter', function() {
            const border = this.querySelector('.btn-border');
            if (border) {
                border.style.animation = 'borderFlow 2s linear infinite';
            }
        });
        
        // Mouse leave effect
        button.addEventListener('mouseleave', function() {
            const border = this.querySelector('.btn-border');
            if (border) {
                border.style.animation = 'none';
            }
        });
        
        // Click ripple effect (without preventing default)
        button.addEventListener('click', function(e) {
            // Only create ripple if the link is valid (not "#" or empty)
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 2000);
            }
            // If href is invalid, prevent default (stay on page)
            else {
                e.preventDefault();
                console.log("No valid link provided");
            }
        });
    });

    // Dynamic glow intensity based on mouse position
    if (avatarWrapper) {
        document.addEventListener('mousemove', function(e) {
            const ring = avatarWrapper.querySelector('.ring-popup');
            if (!ring) return;
            
            const rect = avatarWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            const distance = Math.sqrt(x*x + y*y);
            
            const intensity = 1 - Math.min(distance/100, 0.8);
            
            if (!avatarContainer || !avatarContainer.classList.contains('active')) {
                ring.style.opacity = intensity * 0.987;
            }
        });
    }
});