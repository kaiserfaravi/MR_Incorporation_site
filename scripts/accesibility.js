

// Global variables
let screenReaderMode = false;
let highContrastMode = false;
let textSizeMultiplier = 1;
let keyboardShortcutsEnabled = true;

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccessibility);
} else {
    initializeAccessibility();
}

function initializeAccessibility() {
    // console.log('🔧 Accessibility features initializing...');
    
    // 1. Create Skip Link
    createSkipLink();
    
    // 2. Setup ARIA Labels
    setupARIALabels();
    
    // 3. Setup Keyboard Navigation - FIXED
    setupKeyboardNavigation();
    
    // 4. Screen Reader Support
    setupScreenReaderSupport();
    
    // 5. High Contrast Mode (No Button)
    setupHighContrastMode();
    
    // 6. Text Size Controls (Keyboard Only)
    setupTextSizeControls();
    
    // 7. Enhanced Image Accessibility
    enhanceImageAccessibility();
    
    // 8. Modal Accessibility
    enhanceModalAccessibility();
    
    // 9. Button Enhancement
    enhanceButtons();
    
    // 11. Make hover cards focusable
    enhanceHoverCards();
    
    // 12. Setup observers for dynamic content
    setupObservers();
    
    // console.log('✅ All accessibility features loaded successfully!');
    logKeyboardShortcuts();
}

// 1. Skip Link
function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = "#about-container";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "skip-link";
    skipLink.style.cssText = `
        position: fixed !important;
        top: -50px;
        left: 10px;
        background: #000 !important;
        color: #fff !important;
        padding: 10px 15px;
        z-index: 99999;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        border-radius: 0 0 5px 5px;
        transition: top 0.3s ease;
        border: 2px solid #fff;
    `;
    
    skipLink.addEventListener('focus', () => skipLink.style.top = "0px");
    skipLink.addEventListener('blur', () => skipLink.style.top = "-50px");
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// 2. ARIA Labels
function setupARIALabels() {
    const sections = [
        { selector: 'main', role: 'main', label: 'Main Content' },
        { id: 'menu-container', label: 'Menu Section' },
        { id: 'about-container', label: 'About MR Incorporation Section' },
        { id: 'organogramContainer', label: 'Company Organizational Structure' },
        { id: 'map-container', label: 'Global Office Locations Map' },
        { id: 'gallarysection', label: 'Photo Gallery Showcase' },
        { id: 'contact', label: 'Contact Information and Details' }
    ];

    sections.forEach(section => {
        const element = section.id ? document.getElementById(section.id) : document.querySelector(section.selector);
        if (element) {
            if (section.role) element.setAttribute('role', section.role);
            element.setAttribute('aria-label', section.label);
        }
    });
}

// 3. Keyboard Navigation - COMPLETELY FIXED
function setupKeyboardNavigation() {
    // console.log('🔧 Setting up keyboard navigation...');
    
    document.addEventListener('keydown', function(e) {
        if (!keyboardShortcutsEnabled) return;
        
        // Only handle Alt key combinations
        if (e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
            console.log('Alt key pressed with:', e.key);
            
            let handled = false;
            let targetId = null;
            let targetElement = null;
            
            switch(e.key) {
                case '1':
                    targetId = 'menu-container';
                    handled = true;
                    break;
                case '2':
                    targetId = 'about-container';
                    handled = true;
                    break;
                case '3':
                    targetId = 'organogramContainer';
                    handled = true;
                    break;
                case '4':
                    targetId = 'map-container';
                    handled = true;
                    break;
                case '5':
                    targetId = 'gallarysection';
                    handled = true;
                    break;
                case '6':
                    targetId = 'contact';
                    handled = true;
                    break;
                case 'h':
                case 'H':
                    // Go to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    announceToScreenReader('Scrolled to top of page');
                    handled = true;
                    break;
                case 's':
                case 'S':
                    toggleScreenReaderMode();
                    handled = true;
                    break;
                case 'c':
                case 'C':
                    toggleHighContrast();
                    handled = true;
                    break;
                case '=':
                case '+':
                    increaseTextSize();
                    handled = true;
                    break;
                case '-':
                case '_':
                    decreaseTextSize();
                    handled = true;
                    break;
                case '0':
                    resetTextSize();
                    handled = true;
                    break;
                case '?':
                case '/':
                    showHelpInConsole();
                    handled = true;
                    break;
            }
            
            // Navigate to section
            if (targetId) {
                targetElement = document.getElementById(targetId);
                console.log('Looking for element:', targetId, 'Found:', !!targetElement);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Scroll to element
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                    
                    // Focus the element
                    if (!targetElement.hasAttribute('tabindex')) {
                        targetElement.setAttribute('tabindex', '-1');
                    }
                    
                    setTimeout(() => {
                        targetElement.focus();
                        const sectionName = targetElement.getAttribute('aria-label') || targetId;
                        announceToScreenReader(`Navigated to ${sectionName}`);
                        console.log('✅ Navigated to:', sectionName);
                    }, 500);
                    
                    handled = true;
                } else {
                    console.log('❌ Element not found:', targetId);
                    announceToScreenReader(`Section ${targetId} not found`);
                }
            }
            
            if (handled) {
                e.preventDefault();
            }
        }
        
        // Escape key to close modals
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // console.log('✅ Keyboard navigation setup complete');
}

// 4. Screen Reader Support
function setupScreenReaderSupport() {
    // Make announceToScreenReader available globally
    window.announceToScreenReader = announceToScreenReader;
}

function announceToScreenReader(message) {
    console.log('📢 Screen Reader:', message);
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
        position: absolute !important;
        left: -10000px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
    `;
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (announcement.parentNode) {
            document.body.removeChild(announcement);
        }
    }, 2000);
}

function toggleScreenReaderMode() {
    screenReaderMode = !screenReaderMode;
    console.log('🔄 Screen Reader Mode:', screenReaderMode ? 'ON' : 'OFF');
    
    if (screenReaderMode) {
        enableDetailedDescriptions();
        announceToScreenReader('Screen reader enhanced mode enabled. Detailed descriptions activated for all elements.');
    } else {
        disableDetailedDescriptions();
        announceToScreenReader('Screen reader enhanced mode disabled. Normal descriptions restored.');
    }
}

function enableDetailedDescriptions() {
    // Enhanced image descriptions
    document.querySelectorAll('img').forEach((img, index) => {
        if (!img.hasAttribute('data-original-alt')) {
            const originalAlt = img.alt || `Image ${index + 1}`;
            img.setAttribute('data-original-alt', originalAlt);
            const context = getElementContext(img);
            img.alt = `${originalAlt} - Image ${index + 1}, located in ${context} section`;
        }
    });
    
    // Enhanced button descriptions
    document.querySelectorAll('button, .btn, [role="button"]').forEach(btn => {
        if (!btn.hasAttribute('data-original-label')) {
            const originalLabel = btn.getAttribute('aria-label') || btn.textContent || 'Button';
            btn.setAttribute('data-original-label', originalLabel);
            btn.setAttribute('aria-label', `${originalLabel} - Interactive button, press Enter or Space to activate`);
        }
    });
    
    // Enhanced link descriptions
    document.querySelectorAll('a[href]').forEach(link => {
        if (!link.hasAttribute('data-original-title')) {
            const originalTitle = link.title || '';
            link.setAttribute('data-original-title', originalTitle);
            const linkText = link.textContent.trim() || 'Link';
            link.title = `${linkText} - Navigation link, press Enter to follow`;
        }
    });
}

function disableDetailedDescriptions() {
    // Restore original descriptions
    document.querySelectorAll('[data-original-alt]').forEach(img => {
        img.alt = img.getAttribute('data-original-alt');
        img.removeAttribute('data-original-alt');
    });
    
    document.querySelectorAll('[data-original-label]').forEach(btn => {
        const originalLabel = btn.getAttribute('data-original-label');
        if (originalLabel) {
            btn.setAttribute('aria-label', originalLabel);
        }
        btn.removeAttribute('data-original-label');
    });
    
    document.querySelectorAll('[data-original-title]').forEach(link => {
        link.title = link.getAttribute('data-original-title');
        link.removeAttribute('data-original-title');
    });
}

function getElementContext(element) {
    const closestSection = element.closest('[id]');
    if (closestSection) {
        return closestSection.id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
    }
    return 'main content';
}

// 5. High Contrast Mode (No Button, Only Alt+C)
function setupHighContrastMode() {
    // Function is called from keyboard navigation
}

function toggleHighContrast() {
    highContrastMode = !highContrastMode;
    console.log('🔄 High Contrast Mode:', highContrastMode ? 'ON' : 'OFF');
    
    if (highContrastMode) {
        document.body.classList.add('high-contrast');
        addHighContrastStyles();
        announceToScreenReader('High contrast mode enabled');
    } else {
        document.body.classList.remove('high-contrast');
        removeHighContrastStyles();
        announceToScreenReader('High contrast mode disabled');
    }
}

function addHighContrastStyles() {
    if (document.getElementById('high-contrast-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'high-contrast-styles';
    style.textContent = `
        .high-contrast * {
            background-color: black !important;
            color: white !important;
            border-color: white !important;
        }
        .high-contrast a {
            color: yellow !important;
            text-decoration: underline !important;
        }
        .high-contrast button {
            background-color: white !important;
            color: black !important;
            border: 2px solid white !important;
        }
        .high-contrast img {
            filter: contrast(150%) brightness(150%) !important;
        }
        .high-contrast input, .high-contrast textarea, .high-contrast select {
            background-color: white !important;
            color: black !important;
            border: 2px solid white !important;
        }
    `;
    document.head.appendChild(style);
}

function removeHighContrastStyles() {
    const style = document.getElementById('high-contrast-styles');
    if (style) style.remove();
}

// 6. Text Size Controls (Keyboard Only - No Buttons)
function setupTextSizeControls() {
    // Text size control through keyboard only
    // Alt + = or Alt + + to increase
    // Alt + - to decrease  
    // Alt + 0 to reset
    // console.log('🔧 Text size keyboard controls enabled');
}

function increaseTextSize() {
    if (textSizeMultiplier < 2) {
        textSizeMultiplier += 0.1;
        applyTextSize();
        announceToScreenReader(`Text size increased to ${Math.round(textSizeMultiplier * 100)}%`);
    }
}

function decreaseTextSize() {
    if (textSizeMultiplier > 0.5) {
        textSizeMultiplier -= 0.1;
        applyTextSize();
        announceToScreenReader(`Text size decreased to ${Math.round(textSizeMultiplier * 100)}%`);
    }
}

function resetTextSize() {
    textSizeMultiplier = 1;
    applyTextSize();
    announceToScreenReader('Text size reset to normal');
}

function applyTextSize() {
    document.body.style.fontSize = `${textSizeMultiplier}em`;
}

// 7. Image Accessibility
function enhanceImageAccessibility() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        if (!img.alt || img.alt.trim() === '') {
            const section = img.closest('[id]');
            const sectionName = section ? section.id : 'content';
            img.alt = `Image ${index + 1} from ${sectionName} section of MR Incorporation`;
        }
        
        if (!img.title) {
            img.title = img.alt;
        }
        
        // Make images focusable
        img.setAttribute('tabindex', '0');
        
        // Keyboard support
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                img.click();
            }
        });
    });
}

// 8. Modal Accessibility
function enhanceModalAccessibility() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modalCaption');
        
        // Focus management will be handled by existing modal code
    }
}

// 9. Button Enhancement
function enhanceButtons() {
    const buttons = document.querySelectorAll('button, .btn, [onclick], [role="button"]');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Interactive button');
        }
        
        if (button.hasAttribute('onclick') && button.tagName !== 'BUTTON') {
            button.setAttribute('tabindex', '0');
            button.setAttribute('role', 'button');
            
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        }
    });
    
    // Special handling for refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.setAttribute('aria-label', 'Refresh gallery images');
        refreshBtn.title = 'Press to reload gallery images';
    }
}

// 10. Help Function (Console Only - No Button)
function showHelpInConsole() {
    const helpContent = `
🔑 MR INCORPORATION ACCESSIBILITY SHORTCUTS:

NAVIGATION:
Alt + 1 → Menu Section
Alt + 2 → About Section
Alt + 3 → Organogram  
Alt + 4 → Global Map
Alt + 5 → Photo Gallery
Alt + 6 → Contact Info
Alt + H → Go to Top

ACCESSIBILITY:
Alt + S → Toggle Screen Reader Mode
Alt + C → Toggle High Contrast Mode

TEXT SIZE:
Alt + = or Alt + + → Increase Text Size
Alt + - → Decrease Text Size  
Alt + 0 → Reset Text Size

HELP:
Alt + ? → Show This Help in Console

OTHER:
Escape → Close Modals
Tab → Navigate Forward
Shift+Tab → Navigate Backward
Enter/Space → Activate Elements

All features work completely keyboard-only!
No visual buttons required.
    `;
    
    console.log(helpContent);
    announceToScreenReader('Accessibility help displayed in console. Press F12 to view.');
}

// 11. Hover Cards
function enhanceHoverCards() {
    document.querySelectorAll('.hover-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
}

// 12. Observers for Dynamic Content
function setupObservers() {
    const galleryObserver = new MutationObserver(() => {
        enhanceImageAccessibility();
    });
    
    const gallery = document.getElementById('gallery') || document.getElementById('gallarysection');
    if (gallery) {
        galleryObserver.observe(gallery, { childList: true, subtree: true });
    }
}

// Utility Functions
function closeAllModals() {
    const modals = document.querySelectorAll('.modal, [role="dialog"]');
    modals.forEach(modal => {
        if (modal.style.display !== 'none' && modal.offsetParent !== null) {
            const closeBtn = modal.querySelector('.close, [aria-label*="close"], [onclick*="close"]');
            if (closeBtn) {
                closeBtn.click();
            } else {
                modal.style.display = 'none';
            }
        }
    });
}

function logKeyboardShortcuts() {
//     console.log(`
// ✅ MR INCORPORATION ACCESSIBILITY FEATURES LOADED!
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 🔑 KEYBOARD SHORTCUTS (No Visual Buttons):

// 📍 NAVIGATION:
// Alt + 1 → Menu Section
// Alt + 2 → About Section
// Alt + 3 → Organogram
// Alt + 4 → Global Map  
// Alt + 5 → Photo Gallery
// Alt + 6 → Contact Info
// Alt + H → Go to Top

// ♿ ACCESSIBILITY:
// Alt + S → Screen Reader Enhanced Mode
// Alt + C → High Contrast Mode

// 🔤 TEXT SIZE:
// Alt + = or Alt + + → Increase Text
// Alt + - → Decrease Text
// Alt + 0 → Reset Text Size

// ❓ HELP:
// Alt + ? → Show Help in Console

// ⌨️ GENERAL:
// Escape → Close Modals
// Tab → Navigate Forward  
// Shift+Tab → Navigate Backward
// Enter/Space → Activate Elements

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 TEST NOW: Try Alt + 1 to go to About section
//              Try Alt + 4 to go to Gallery section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ✨ All features are completely invisible and keyboard-only!
// 🚫 No buttons cluttering your screen design.
// ♿ Full accessibility support maintained.
//     `);
}