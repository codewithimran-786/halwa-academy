// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙';
        document.documentElement.style.setProperty('--primary-color', '#3b82f6');
        document.documentElement.style.setProperty('--text-color', '#f8fafc');
        document.documentElement.style.setProperty('--bg-color', '#0f172a');
        document.documentElement.style.setProperty('--nav-bg', '#1e293b');
        document.documentElement.style.setProperty('--border-color', '#334155');
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️';
        document.documentElement.style.setProperty('--primary-color', '#3b82f6');
        document.documentElement.style.setProperty('--text-color', '#1e293b');
        document.documentElement.style.setProperty('--bg-color', '#f8fafc');
        document.documentElement.style.setProperty('--nav-bg', '#ffffff');
        document.documentElement.style.setProperty('--border-color', '#e2e8f0');
    }
});

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
    document.documentElement.style.setProperty('--primary-color', '#3b82f6');
    document.documentElement.style.setProperty('--text-color', '#f8fafc');
    document.documentElement.style.setProperty('--bg-color', '#0f172a');
    document.documentElement.style.setProperty('--nav-bg', '#1e293b');
    document.documentElement.style.setProperty('--border-color', '#334155');
} else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '☀️';
    document.documentElement.style.setProperty('--primary-color', '#3b82f6');
    document.documentElement.style.setProperty('--text-color', '#1e293b');
    document.documentElement.style.setProperty('--bg-color', '#f8fafc');
    document.documentElement.style.setProperty('--nav-bg', '#ffffff');
    document.documentElement.style.setProperty('--border-color', '#e2e8f0');
}


// Function to load pages dynamically
function loadPage(pageId) {
    const contentArea = document.querySelector('.main-content');
    const pageMap = {
        page1: 'page/page1.html',
        page2: 'page/page2.html',
        page3: 'page/page3.html'
    };
    if (pageMap[pageId]) {
        fetch(pageMap[pageId])
            .then(response => {
                if (!response.ok) throw new Error('Page not found');
                return response.text();
            })
            .then(html => {
                contentArea.innerHTML = html;
                localStorage.setItem('currentPage', pageId);

                // Update active menu item
                document.querySelectorAll('.sidebar a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('onclick')?.includes(pageId)) {
                        link.classList.add('active');
                    }
                });
            })
            .catch(() => {
                contentArea.innerHTML = `
                    <h1>Page Not Found</h1>
                    <div class="intro-box">
                        <p>The requested page could not be loaded.</p>
                    </div>
                `;
            });
    } else {
        contentArea.innerHTML = `
            <h1>Page Not Found</h1>
            <div class="intro-box">
                <p>The requested page could not be loaded.</p>
            </div>
        `;
    }
}

// Load saved page or default to page1
document.addEventListener('DOMContentLoaded', function () {
    const savedPage = localStorage.getItem('currentPage') || 'page1';
    loadPage(savedPage);
});
