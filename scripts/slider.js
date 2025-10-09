
        const INSTAGRAM_ACCESS_TOKEN = `IGAAIAz1KJSdVBZAFFjc0FBU21mUFlGaUpNUjc5SzVYMDkwRUJCNDBtX3lKQzdEYXFnNXdmcnREOUt0OXlUeUcxODZAnZAjQ1T2dQVGtOSDk0Yko0U2JWN3BOcVkySXVxYjI1c3FzdVhweUJzMklncXlENXBB`;
        // 8/8/25-new refresh token
        let posts = [];
        let currentSlide = 0;
        let autoSlideInterval;

        async function loadInstagramPosts() {
            try {
                const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&limit=10&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
                const data = await res.json();

                posts = data.data || [];
                displayPosts(posts);
            } catch (err) {
                alert('There is problem to loading Instagram data');
            }
        }

        function displayPosts(posts) {
            const track = document.getElementById('sliderTrack');
            if (!posts.length) {
                track.innerHTML = '<div class="post-card" style="margin:20px; padding:20px; text-align:center;">😔 There is No Instagram post Or Sever Error.PLease stay cool We working on it. </div>';
                return;
            }

            track.innerHTML = '';
            posts.forEach(post => {
                const slide = document.createElement('div');
                slide.className = 'slider-item';

                const mediaUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
                const caption = post.caption || 'No Caption ';
                const date = new Date(post.timestamp).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
                const time = new Date(post.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

                slide.innerHTML = `
                    <div class="post-card">
                        <img src="${mediaUrl}" alt="Instagram Post" class="post-image">
                        <div class="post-content">
                            <div class="post-caption">${caption}</div>
                            <div class="post-meta">
                                <div>📅 ${date} • 🕒 ${time}</div>
                                <div class="post-type">${post.media_type === 'VIDEO' ? '🎥 Video' : '📸 Image'}</div>
                            </div>
                        </div>
                    </div>
                `;
                slide.onclick = () => openModal(post);
                track.appendChild(slide);
            });

            currentSlide = 0;
            updateSlider();
            startAutoSlide();
        }

        function updateSlider() {
            const track = document.getElementById('sliderTrack');
            const slideWidth = track.children[0]?.offsetWidth || 0;
            track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }

        function nextSlide() {
            const track = document.getElementById('sliderTrack');
            currentSlide = (currentSlide + 1) % track.children.length;
            updateSlider();
        }

        function prevSlide() {
            const track = document.getElementById('sliderTrack');
            currentSlide = (currentSlide - 1 + track.children.length) % track.children.length;
            updateSlider();
        }

        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 2000); // every 2 seconds
        }

        function openModal(post) {
            document.getElementById('imageModal').style.display = 'block';
            document.getElementById('modalImage').src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
            document.getElementById('modalCaption').textContent = post.caption || 'No Caption';
            document.getElementById('modalMeta').innerHTML = `📅 ${new Date(post.timestamp).toLocaleDateString('bn-BD')} • <a href="${post.permalink}" target="_blank" style="color:#667eea;">🔗See In Instagram </a>`;
        }

        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        window.addEventListener('resize', updateSlider);
        window.onload = loadInstagramPosts;
 