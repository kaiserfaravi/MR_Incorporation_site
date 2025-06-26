  
        // 🔥 এখানে আপনার Instagram Access Token বসান 🔥
        const INSTAGRAM_ACCESS_TOKEN = 'IGAAIAz1KJSdVBZAE90bE9fbHVTSHZA4cWpsRmpGTVR2NXV1TWduaWI0UXpSMG05U3pWalA3NF9UT3RaLXg1UURoRUtBem8xb1VZASjVwVFhXa1ZAWcFlTMDJKSDl4ZA3Q3VlBGbFgydlczRTEtSGdxMmxhY3h3';
        
        // Auto refresh interval (মিনিটে)
        const REFRESH_INTERVAL = 30;
        
        // Global variables
        let posts = [];
        let refreshTimer;

        // Instagram API থেকে posts load করার function
        async function loadInstagramPosts() {
            if (!INSTAGRAM_ACCESS_TOKEN || INSTAGRAM_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
                showError('⚠️ Instagram Access Token দিন! Code এর উপরে INSTAGRAM_ACCESS_TOKEN এর জায়গায় আপনার token বসান।');
                return;
            }

            try {
                showStatus('🔄 Instagram posts লোড হচ্ছে...');
                
                const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&limit=50&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error.message);
                }

                posts = data.data || [];
                displayPosts(posts);
                updateStats();
                clearStatus();
                
                console.log(`✅ ${posts.length} টি Instagram post successfully loaded!`);
                
            } catch (error) {
                console.error('Error loading Instagram posts:', error);
                showError(`❌ Error: ${error.message}`);
            }
        }

        // Posts display করার function
        function displayPosts(posts) {
            const gallery = document.getElementById('gallery');
            
            if (posts.length === 0) {
                gallery.innerHTML = '<div class="no-posts">😔 কোন Instagram post পাওয়া যায়নি!</div>';
                return;
            }

            gallery.innerHTML = '';

            posts.forEach((post, index) => {
                const postCard = document.createElement('div');
                postCard.className = 'post-card';
                
                const mediaUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
                const caption = post.caption || 'কোন caption নেই';
                const date = new Date(post.timestamp).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const time = new Date(post.timestamp).toLocaleTimeString('bn-BD', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                postCard.innerHTML = `
                    <img src="${mediaUrl}" alt="Instagram Post" class="post-image" loading="lazy">
                    <div class="post-content">
                        <div class="post-caption">${caption}</div>
                        <div class="post-meta">
                            <div class="post-date">
                                📅 ${date} • 🕒 ${time}
                            </div>
                            <div class="post-type">
                                ${post.media_type === 'VIDEO' ? '🎥 ভিডিও' : '📸 ছবি'}
                            </div>
                        </div>
                    </div>
                `;
                
                postCard.onclick = () => openModal(post);
                gallery.appendChild(postCard);
            });
        }

        // Stats update করার function
        function updateStats() {
            document.getElementById('totalPosts').textContent = posts.length;
            document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString('bn-BD', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Status দেখানোর function
        function showStatus(message) {
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = `
                <div style="text-align: center; color: white; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 20px 0; backdrop-filter: blur(10px);">
                    ${message}
                </div>
            `;
        }

        // Error দেখানোর function
        function showError(message) {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = `<div class="error">${message}</div>`;
        }

        // Status clear করার function
        function clearStatus() {
            document.getElementById('status').innerHTML = '';
        }

        // Modal খোলার function
        function openModal(post) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            const modalMeta = document.getElementById('modalMeta');
            
            const mediaUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
            const caption = post.caption || 'কোন caption নেই';
            const date = new Date(post.timestamp).toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            modal.style.display = 'block';
            modalImg.src = mediaUrl;
            modalCaption.textContent = caption;
            modalMeta.innerHTML = `
                📅 ${date} • ${post.media_type === 'VIDEO' ? '🎥 ভিডিও' : '📸 ছবি'}
                <br><a href="${post.permalink}" target="_blank" style="color: #667eea; text-decoration: none;">🔗 Instagram এ দেখুন</a>
            `;
        }

        // Modal বন্ধ করার function
        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        // Manual refresh function
        function refreshGallery() {
            loadInstagramPosts();
        }

        // Auto refresh setup
        function startAutoRefresh() {
            if (refreshTimer) {
                clearInterval(refreshTimer);
            }
            
            refreshTimer = setInterval(() => {
                console.log('🔄 Auto refreshing Instagram posts...');
                loadInstagramPosts();
            }, REFRESH_INTERVAL * 60 * 1000);
            
            console.log(`🔄 Auto refresh enabled (every ${REFRESH_INTERVAL} minutes)`);
        }

        // Page load হলে initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Posts load করুন
            loadInstagramPosts();
            
            // Auto refresh চালু করুন
            startAutoRefresh();
            
            // Modal এর জন্য event listeners
            document.getElementById('imageModal').onclick = function(event) {
                if (event.target === this) {
                    closeModal();
                }
            };
            
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    closeModal();
                }
            });
        });
   