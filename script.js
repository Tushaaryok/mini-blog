const blogs = [
    {
        id: 1,
        category: 'technology',
        title: 'The Future of Artificial Intelligence',
        excerpt: 'Exploring how AI is reshaping our world and what lies ahead in the next decade.',
        content: 'Artificial Intelligence is no longer a concept of the future—it\'s here, transforming industries and daily life. From healthcare to finance, AI is revolutionizing how we work, communicate, and solve complex problems. Machine learning algorithms are becoming more sophisticated, enabling computers to learn from data and make decisions with minimal human intervention. The next decade promises even more exciting developments, including more natural human-AI interaction, enhanced predictive capabilities, and ethical AI frameworks that ensure technology serves humanity\'s best interests.',
        date: 'Oct 1, 2025',
        author: 'Sarah Chen'
    },
    {
        id: 2,
        category: 'design',
        title: 'Minimalism in Modern Web Design',
        excerpt: 'Why less is more when it comes to creating impactful digital experiences.',
        content: 'Minimalist web design focuses on simplicity and functionality. By removing unnecessary elements, designers create clean, intuitive interfaces that enhance user experience. The key principles include ample white space, limited color palettes, clear typography, and purposeful imagery. This approach not only looks elegant but also improves loading times and mobile responsiveness. Minimalism doesn\'t mean boring—it means intentional. Every element serves a purpose, guiding users effortlessly through the content.',
        date: 'Sep 28, 2025',
        author: 'Mike Rodriguez'
    },
    {
        id: 3,
        category: 'lifestyle',
        title: 'Building Better Morning Routines',
        excerpt: 'Simple habits that can transform your productivity and mindset.',
        content: 'A strong morning routine sets the tone for your entire day. Start by waking up at a consistent time, even on weekends. Hydrate immediately—your body needs water after hours of sleep. Consider meditation or journaling to clear your mind and set intentions. Exercise, even if just for 15 minutes, boosts energy and mood. Eat a nutritious breakfast to fuel your body and brain. Finally, limit screen time in the first hour—resist the urge to check emails or social media. Instead, focus on yourself and your goals. These small changes compound over time, leading to significant improvements in productivity and well-being.',
        date: 'Sep 25, 2025',
        author: 'Emma Watson'
    },
    {
        id: 4,
        category: 'travel',
        title: 'Hidden Gems of Southeast Asia',
        excerpt: 'Discover breathtaking destinations off the beaten path.',
        content: 'Southeast Asia offers incredible experiences beyond the typical tourist hotspots. In Vietnam, explore the stunning rice terraces of Sapa and connect with local hill tribes. Thailand\'s Pai offers a laid-back atmosphere with natural hot springs and waterfalls. Indonesia\'s Raja Ampat boasts some of the world\'s best diving and pristine beaches. Laos\' 4000 Islands provide tranquil river life and spectacular sunsets. These destinations offer authentic cultural experiences, stunning natural beauty, and the chance to venture where fewer tourists tread. Pack light, keep an open mind, and embrace the adventure.',
        date: 'Sep 20, 2025',
        author: 'David Kim'
    },
    {
        id: 5,
        category: 'technology',
        title: 'Blockchain Beyond Cryptocurrency',
        excerpt: 'How distributed ledger technology is revolutionizing industries.',
        content: 'While cryptocurrency brought blockchain into the spotlight, the technology\'s potential extends far beyond digital currency. Supply chain management benefits from transparent, immutable records tracking products from origin to consumer. Healthcare systems use blockchain to securely share patient records across institutions while maintaining privacy. Smart contracts automate agreements without intermediaries, reducing costs and increasing efficiency. Voting systems built on blockchain could enhance election security and transparency. As the technology matures, we\'re only beginning to scratch the surface of its transformative potential across sectors.',
        date: 'Sep 15, 2025',
        author: 'Alex Turner'
    },
    {
        id: 6,
        category: 'design',
        title: 'The Psychology of Color in Branding',
        excerpt: 'Understanding how colors influence consumer perception and behavior.',
        content: 'Color choices in branding aren\'t arbitrary—they\'re strategic decisions rooted in psychology. Blue conveys trust and professionalism, which is why it dominates in tech and finance. Red creates urgency and excitement, perfect for calls-to-action. Green suggests growth and sustainability, appealing to eco-conscious consumers. Yellow radiates optimism and friendliness. Understanding these associations helps brands connect emotionally with their audience. However, cultural context matters—colors carry different meanings across cultures. Effective branding requires careful consideration of target audiences and the emotions you want to evoke.',
        date: 'Sep 10, 2025',
        author: 'Lisa Chang'
    }
];

let currentCategory = 'all';
let searchTerm = '';

function renderBlogs() {
    const grid = document.getElementById('blogGrid');
    const filtered = blogs.filter(blog => {
        const matchesCategory = currentCategory === 'all' || blog.category === currentCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filtered.map(blog => `
        <div class="blog-card" onclick="openModal(${blog.id})">
            <div class="blog-image"></div>
            <div class="blog-content">
                <span class="blog-category">${blog.category}</span>
                <h2 class="blog-title">${blog.title}</h2>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-meta">
                    <span>${blog.date} • ${blog.author}</span>
                    <a href="#" class="read-more" onclick="event.stopPropagation(); openModal(${blog.id})">Read More →</a>
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(id) {
    const blog = blogs.find(b => b.id === id);
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <span class="blog-category">${blog.category}</span>
        <h1 style="margin: 20px 0;">${blog.title}</h1>
        <div style="color: #999; margin-bottom: 20px;">${blog.date} • ${blog.author}</div>
        <p style="line-height: 1.8; color: #666;">${blog.content}</p>
    `;
    document.getElementById('modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

document.getElementById('closeBtn').onclick = function() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.onclick = function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.getAttribute('data-category');
        renderBlogs();
    });
});

document.getElementById('searchInput').addEventListener('input', function(e) {
    searchTerm = e.target.value;
    renderBlogs();
});

renderBlogs();