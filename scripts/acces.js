// // Enhanced Accessibility Script for MR Incorporation
// // Supports visually impaired, hearing impaired, and physically disabled users

// document.addEventListener('DOMContentLoaded', function() {
//     console.log('🔧 Accessibility features loading...');
    
//     // 1. Skip to main content link (Fixed)
//     const skipLink = document.createElement('a');
//     skipLink.href = "#about-container";
//     skipLink.textContent = "Skip to main content";
//     skipLink.className = "skip-link";
//     skipLink.style.cssText = `
//         position: fixed;
//         top: -50px;
//         left: 10px;
//         background: #000;
//         color: #fff;
//         padding: 10px 15px;
//         z-index: 99999;
//         text-decoration: none;
//         font-size: 16px;
//         font-weight: bold;
//         border-radius: 0 0 5px 5px;
//         transition: top 0.3s ease;
//         border: 2px solid #fff;
//     `;
    
//     // Show skip link on focus
//     skipLink.addEventListener('focus', () => {
//         skipLink.style.top = "0px";
//     });
//     skipLink.addEventListener('blur', () => {
//         skipLink.style.top = "-50px";
//     });
    
//     document.body.insertBefore(skipLink, document.body.firstChild);

//     // 2. ARIA Labels and Roles (Enhanced)
//     const sections = [
//         { selector: 'main', role: 'main', label: 'Main Content' },
//         { id: 'about-container', label: 'About MR Incorporation Section' },
//         { id: 'organogramContainer', label: 'Company Organizational Structure' },
//         { id: 'map-container', label: 'Global Office Locations Map' },
//         { id: 'gallarysection', label: 'Photo Gallery Showcase' },
//         { id: 'contact', label: 'Contact Information and Details' }
//     ];

//     sections.forEach(section => {
//         const element = section.id ? document.getElementById(section.id) : document.querySelector(section.selector);
//         if (element) {
//             if (section.role) element.setAttribute('role', section.role);
//             element.setAttribute('aria-label', section.label);
//         }
//     });

//     // 3. Enhanced Keyboard Navigation (Fixed)
//     let keyboardShortcutsEnabled = true;
    
//     document.addEventListener('keydown', function(e) {
//         if (!keyboardShortcutsEnabled) return;
        
//         // Alt + Number shortcuts
//         if (e.altKey && !e.ctrlKey && !e.shiftKey) {
//             let targetId = null;
            
//             switch(e.key) {
//                 case '1':
//                     targetId = 'about-container';
//                     break;
//                 case '2':
//                     targetId = 'organogramContainer';
//                     break;
//                 case '3':
//                     targetId = 'map-container';
//                     break;
//                 case '4':
//                     targetId = 'gallarysection';
//                     break;
//                 case '5':
//                     targetId = 'contact';
//                     break;
//                 case 'h':
//                     // Go to top/home
//                     window.scrollTo({ top: 0, behavior: 'smooth' });
//                     e.preventDefault();
//                     return;
//                 case 's':
//                     // Toggle screen reader announcements
//                     toggleScreenReaderMode();
//                     e.preventDefault();
//                     return;
//             }
            
//             if (targetId) {
//                 e.preventDefault();
//                 const target = document.getElementById(targetId);
//                 if (target) {
//                     target.scrollIntoView({ 
//                         behavior: 'smooth', 
//                         block: 'start' 
//                     });
                    
//                     // Focus the section for screen readers
//                     target.setAttribute('tabindex', '-1');
//                     target.focus();
                    
//                     // Screen reader announcement
//                     announceToScreenReader(`Navigated to ${target.getAttribute('aria-label') || targetId}`);
//                 }
//             }
//         }
        
//         // Escape key to close modals
//         if (e.key === 'Escape') {
//             closeAllModals();
//         }
//     });

//     // 4. Screen Reader Support
//     let screenReaderMode = false;
    
//     function announceToScreenReader(message) {
//         const announcement = document.createElement('div');
//         announcement.setAttribute('aria-live', 'polite');
//         announcement.setAttribute('aria-atomic', 'true');
//         announcement.style.cssText = `
//             position: absolute;
//             left: -10000px;
//             width: 1px;
//             height: 1px;
//             overflow: hidden;
//         `;
//         announcement.textContent = message;
//         document.body.appendChild(announcement);
        
//         setTimeout(() => {
//             document.body.removeChild(announcement);
//         }, 1000);
//     }
    
//     function toggleScreenReaderMode() {
//         screenReaderMode = !screenReaderMode;
//         const message = screenReaderMode ? 
//             'Screen reader mode enabled. Enhanced descriptions active.' : 
//             'Screen reader mode disabled.';
//         announceToScreenReader(message);
//     }

//     // 5. Enhanced Image Accessibility
//     function enhanceImageAccessibility() {
//         const images = document.querySelectorAll('img');
//         images.forEach((img, index) => {
//             if (!img.alt || img.alt.trim() === '') {
//                 // Generate descriptive alt text based on context
//                 const section = img.closest('[id]');
//                 const sectionName = section ? section.id : 'content';
//                 img.alt = `Image ${index + 1} from ${sectionName} section of MR Incorporation`;
//             }
            
//             // Add title for additional context
//             if (!img.title) {
//                 img.title = img.alt;
//             }
            
//             // Make images focusable
//             img.setAttribute('tabindex', '0');
            
//             // Add keyboard support for image interaction
//             img.addEventListener('keydown', function(e) {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault();
//                     img.click();
//                 }
//             });
//         });
//     }

//     // 6. Modal Accessibility Enhancement
//     function enhanceModalAccessibility() {
//         const modal = document.getElementById('imageModal');
//         if (modal) {
//             modal.setAttribute('role', 'dialog');
//             modal.setAttribute('aria-modal', 'true');
//             modal.setAttribute('aria-labelledby', 'modalCaption');
            
//             // Focus trap for modals
//             const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
//             let focusableElements = [];
            
//             function updateFocusableElements() {
//                 focusableElements = Array.from(modal.querySelectorAll(focusableSelectors));
//             }
            
//             function trapFocus(e) {
//                 if (e.key !== 'Tab') return;
                
//                 updateFocusableElements();
//                 const firstEl = focusableElements[0];
//                 const lastEl = focusableElements[focusableElements.length - 1];
                
//                 if (e.shiftKey) {
//                     if (document.activeElement === firstEl) {
//                         e.preventDefault();
//                         lastEl?.focus();
//                     }
//                 } else {
//                     if (document.activeElement === lastEl) {
//                         e.preventDefault();
//                         firstEl?.focus();
//                     }
//                 }
//             }
            
//             modal.addEventListener('keydown', trapFocus);
            
//             // Auto-focus first element when modal opens
//             const observer = new MutationObserver(() => {
//                 if (modal.style.display !== 'none' && modal.classList.contains('active')) {
//                     updateFocusableElements();
//                     focusableElements[0]?.focus();
//                 }
//             });
//             observer.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
//         }
//     }

//     // 7. Button and Interactive Element Enhancement
//     function enhanceButtons() {
//         const buttons = document.querySelectorAll('button, .btn, [onclick]');
//         buttons.forEach(button => {
//             // Ensure buttons have proper labels
//             if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
//                 button.setAttribute('aria-label', 'Interactive button');
//             }
            
//             // Add keyboard support
//             if (button.getAttribute('onclick') && button.tagName !== 'BUTTON') {
//                 button.setAttribute('tabindex', '0');
//                 button.setAttribute('role', 'button');
                
//                 button.addEventListener('keydown', function(e) {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                         e.preventDefault();
//                         button.click();
//                     }
//                 });
//             }
//         });
        
//         // Special handling for refresh button
//         const refreshBtn = document.querySelector('.refresh-btn');
//         if (refreshBtn) {
//             refreshBtn.setAttribute('aria-label', 'Refresh gallery images');
//             refreshBtn.title = 'Press to reload gallery images';
//         }
//     }

//     // 8. High Contrast Mode Support
//     function addHighContrastToggle() {
//         const contrastToggle = document.createElement('button');
//         contrastToggle.textContent = '🌓';
//         contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
//         contrastToggle.title = 'Toggle high contrast mode (Alt+C)';
//         contrastToggle.style.cssText = `
//             position: fixed;
//             top: 60px;
//             right: 20px;
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             background: #333;
//             color: white;
//             border: 2px solid #fff;
//             cursor: pointer;
//             font-size: 20px;
//             z-index: 9998;
//             transition: all 0.3s ease;
//         `;
        
//         let highContrastMode = false;
        
//         contrastToggle.addEventListener('click', toggleHighContrast);
        
//         // Alt+C shortcut for high contrast
//         document.addEventListener('keydown', function(e) {
//             if (e.altKey && e.key.toLowerCase() === 'c') {
//                 e.preventDefault();
//                 toggleHighContrast();
//             }
//         });
        
//         function toggleHighContrast() {
//             highContrastMode = !highContrastMode;
            
//             if (highContrastMode) {
//                 document.body.classList.add('high-contrast');
//                 addHighContrastStyles();
//                 announceToScreenReader('High contrast mode enabled');
//             } else {
//                 document.body.classList.remove('high-contrast');
//                 removeHighContrastStyles();
//                 announceToScreenReader('High contrast mode disabled');
//             }
//         }
        
//         function addHighContrastStyles() {
//             const style = document.createElement('style');
//             style.id = 'high-contrast-styles';
//             style.textContent = `
//                 .high-contrast * {
//                     background-color: black !important;
//                     color: white !important;
//                     border-color: white !important;
//                 }
//                 .high-contrast a {
//                     color: yellow !important;
//                 }
//                 .high-contrast button {
//                     background-color: white !important;
//                     color: black !important;
//                 }
//                 .high-contrast img {
//                     filter: contrast(150%) brightness(150%);
//                 }
//             `;
//             document.head.appendChild(style);
//         }
        
//         function removeHighContrastStyles() {
//             const style = document.getElementById('high-contrast-styles');
//             if (style) style.remove();
//         }
        
//         document.body.appendChild(contrastToggle);
//     }

//     // 9. Text Size Controls
//     function addTextSizeControls() {
//         const textControls = document.createElement('div');
//         textControls.innerHTML = `
//             <button id="increase-text" aria-label="Increase text size">A+</button>
//             <button id="decrease-text" aria-label="Decrease text size">A-</button>
//             <button id="reset-text" aria-label="Reset text size">A</button>
//         `;
//         textControls.style.cssText = `
//             position: fixed;
//             top: 120px;
//             right: 20px;
//             display: flex;
//             flex-direction: column;
//             gap: 5px;
//             z-index: 9998;
//         `;
        
//         const buttonStyle = `
//             width: 40px;
//             height: 40px;
//             border: 2px solid #333;
//             background: white;
//             cursor: pointer;
//             border-radius: 5px;
//             font-weight: bold;
//         `;
        
//         textControls.querySelectorAll('button').forEach(btn => {
//             btn.style.cssText = buttonStyle;
//         });
        
//         let textSizeMultiplier = 1;
        
//         document.getElementById('increase-text').addEventListener('click', () => {
//             if (textSizeMultiplier < 2) {
//                 textSizeMultiplier += 0.1;
//                 applyTextSize();
//                 announceToScreenReader('Text size increased');
//             }
//         });
        
//         document.getElementById('decrease-text').addEventListener('click', () => {
//             if (textSizeMultiplier > 0.5) {
//                 textSizeMultiplier -= 0.1;
//                 applyTextSize();
//                 announceToScreenReader('Text size decreased');
//             }
//         });
        
//         document.getElementById('reset-text').addEventListener('click', () => {
//             textSizeMultiplier = 1;
//             applyTextSize();
//             announceToScreenReader('Text size reset to normal');
//         });
        
//         function applyTextSize() {
//             document.body.style.fontSize = `${textSizeMultiplier}em`;
//         }
        
//         document.body.appendChild(textControls);
//     }

//     // 10. Utility Functions
//     function closeAllModals() {
//         const modals = document.querySelectorAll('.modal, [role="dialog"]');
//         modals.forEach(modal => {
//             if (modal.style.display !== 'none') {
//                 const closeBtn = modal.querySelector('.close, [aria-label*="close"]');
//                 if (closeBtn) closeBtn.click();
//                 else modal.style.display = 'none';
//             }
//         });
//     }

//     // 11. Help Panel
//     function createHelpPanel() {
//         const helpBtn = document.createElement('button');
//         helpBtn.textContent = '?';
//         helpBtn.setAttribute('aria-label', 'Show accessibility help');
//         helpBtn.title = 'Show accessibility shortcuts (Alt+H)';
//         helpBtn.style.cssText = `
//             position: fixed;
//             bottom: 20px;
//             right: 20px;
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             background: #007bff;
//             color: white;
//             border: none;
//             cursor: pointer;
//             font-size: 20px;
//             font-weight: bold;
//             z-index: 9999;
//         `;
        
//         helpBtn.addEventListener('click', showHelp);
        
//         // Alt+H shortcut for help
//         document.addEventListener('keydown', function(e) {
//             if (e.altKey && e.key.toLowerCase() === 'h') {
//                 e.preventDefault();
//                 showHelp();
//             }
//         });
        
//         function showHelp() {
//             const helpContent = `
// 🔑 Accessibility Shortcuts:
// Alt + 1 → About Section
// Alt + 2 → Organogram
// Alt + 3 → Global Map
// Alt + 4 → Photo Gallery
// Alt + 5 → Contact Info
// Alt + H → Go to Top
// Alt + S → Toggle Screen Reader Mode
// Alt + C → Toggle High Contrast
// Escape → Close Modals
// Tab → Navigate Forward
// Shift+Tab → Navigate Backward
// Enter/Space → Activate Buttons
//             `;
            
//             alert(helpContent);
//             announceToScreenReader('Accessibility help displayed');
//         }
        
//         document.body.appendChild(helpBtn);
//     }

//     // Initialize all features
//     function initializeAccessibility() {
//         try {
//             enhanceImageAccessibility();
//             enhanceModalAccessibility();
//             enhanceButtons();
//             addHighContrastToggle();
//             addTextSizeControls();
//             createHelpPanel();
            
//             // Make hover cards focusable
//             document.querySelectorAll('.hover-card').forEach(card => {
//                 card.setAttribute('tabindex', '0');
//                 card.setAttribute('role', 'button');
//             });
            
//             // Announce successful loading
//             setTimeout(() => {
//                 announceToScreenReader('MR Incorporation website loaded with full accessibility support');
//             }, 1000);
            
//             console.log('✅ Accessibility features loaded successfully!');
//             console.log(`
// 🔑 Keyboard Shortcuts Available:
// Alt + 1 → Jump to About Section
// Alt + 2 → Jump to Organogram  
// Alt + 3 → Jump to Map
// Alt + 4 → Jump to Gallery
// Alt + 5 → Jump to Contact
// Alt + H → Go to Top/Home
// Alt + S → Toggle Screen Reader Mode
// Alt + C → Toggle High Contrast Mode
// Alt + H → Show Help
// Escape → Close Modals
//             `);
            
//         } catch (error) {
//             console.error('❌ Error loading accessibility features:', error);
//         }
//     }
    
//     // Run initialization
//     initializeAccessibility();
    
//     // Re-run image accessibility when gallery updates
//     const galleryObserver = new MutationObserver(() => {
//         enhanceImageAccessibility();
//     });
    
//     const gallery = document.getElementById('gallery') || document.getElementById('gallarysection');
//     if (gallery) {
//         galleryObserver.observe(gallery, { childList: true, subtree: true });
//     }
// });

// // Expose functions globally for debugging
// window.accessibilityFeatures = {
//     announceToScreenReader: function(message) {
//         // This will be available after DOM load
//     },
//     version: '2.0.0'
// };