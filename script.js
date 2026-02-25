// Page transition overlay
const pageTransition = document.getElementById('pageTransition');

// Ensure transition overlay is hidden when page loads (including back navigation)
document.addEventListener('DOMContentLoaded', function() {
    pageTransition.classList.remove('active');
});

// Handle back/forward cache (bfcache) - when page is restored from cache
window.addEventListener('pageshow', function(event) {
    // If the page is loaded from cache (like when using back button)
    if (event.persisted) {
        pageTransition.classList.remove('active');
    }
    // Reset any button animations/classes that might be stuck
    document.querySelectorAll('.game-button').forEach(btn => {
        btn.classList.remove('clicked', 'slide-out', 'zoom-out', 'explode');
        btn.style.transform = '';
        btn.style.opacity = '';
        btn.style.transition = '';
    });
});

// Handle game button clicks with cool transitions
function handleGameClick(event, element) {
    event.preventDefault(); // Prevent immediate navigation
    
    const href = element.getAttribute('href');
    const transition = element.getAttribute('data-transition') || 'fade';
    
    // Add transition class based on type
    switch(transition) {
        case 'slide':
            element.classList.add('slide-out');
            break;
        case 'zoom':
            element.classList.add('zoom-out');
            break;
        case 'ripple-fade':
            element.classList.add('clicked');
            break;
        case 'explode':
            element.classList.add('explode');
            break;
        default:
            element.classList.add('clicked');
    }
    
    // Activate page transition overlay after button animation starts
    setTimeout(() => {
        pageTransition.classList.add('active');
    }, 200);
    
    // Navigate to the game page
    setTimeout(() => {
        window.location.href = href;
    }, 500);
}

// Handle back button click
function handleBackClick(event) {
    event.preventDefault();
    
    // Fade out page
    pageTransition.classList.add('active');
    
    // Go back after transition
    setTimeout(() => {
        window.history.back();
    }, 500);
}

// Handle request button click
function handleRequestClick(event) {
    event.preventDefault();
    
    // Simple animation
    const btn = event.currentTarget;
    btn.style.transform = 'scale(0.9)';
    btn.style.opacity = '0.5';
    
    setTimeout(() => {
        btn.style.transform = '';
        btn.style.opacity = '';
        alert('Request feature coming soon! 🚀');
    }, 200);
}

// Search bar filtering
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    const gameButtons = document.querySelectorAll('.game-button');
    
    if (searchBar) {
        searchBar.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            gameButtons.forEach(button => {
                const gameName = button.querySelector('p').textContent.toLowerCase();
                if (gameName.includes(searchTerm)) {
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1)';
                    button.style.filter = 'blur(0)';
                } else {
                    button.style.opacity = '0.3';
                    button.style.transform = 'scale(0.8)';
                    button.style.filter = 'blur(2px)';
                }
            });
        });
    }
});

// Function to hash the input and check it
async function checkSecretAccess(input) {
    // Encrypts the input using SHA-256
    const msgBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // The hashed version of "opensesame"
    const correctHash = "7f732486479f643e93318999a0a0304523c92697ca605417da5c9b4e70e9a3b6";

    if (hashHex === correctHash) {
        // Redirect to your site (Replace the URL below)
        window.location.href = "https://eli2good4u.github.io/prom/";
    } else {
        console.log("Nothing to see here."); 
    }
}

// Listen for Shift + H
document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'H') {
        const password = prompt("Access Restricted:");
        if (password) {
            checkSecretAccess(password);
        }
    }
});
