document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');
    const menuLinks = document.querySelectorAll('.menu a[data-page]');
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');

    // Load default page (index)
    loadPage('index');

    // Menu navigation
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page) {
                loadPage(page);
                // Update active menu item
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                // Close sidebar on mobile
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Function to load page content
    function loadPage(page) {
        let pagePath, cssPath, scriptPath;

        // Adjust paths based on page
        if (page === 'index') {
            pagePath = `../../authenticatedUser/${page}.html`;
            cssPath = `../../authenticatedUser/${page}.css`;
            scriptPath = `../../authenticatedUser/${page}.js`;
        } else if (page === 'register') {
            pagePath = `../../authenticatedUser/registrationCompany/${page}.html`;
            cssPath = `../../authenticatedUser/registrationCompany/${page}.css`;
            scriptPath = `../../authenticatedUser/registrationCompany/${page}.js`;
        } else if (page === 'detail') {
            pagePath = `../../authenticatedUser/detailRegistrationCompany/${page}.html`;
            cssPath = `../../authenticatedUser/detailRegistrationCompany/${page}.css`;
            scriptPath = `../../authenticatedUser/detailRegistrationCompany/${page}.js`;
        } else {
            contentArea.innerHTML = '<p>Trang không tồn tại.</p>';
            return;
        }

        // Fetch page content
        fetch(pagePath)
            .then(response => {
                if (!response.ok) throw new Error(`Không tìm thấy trang: ${pagePath}`);
                return response.text();
            })
            .then(data => {
                // Load HTML content
                contentArea.innerHTML = data;

                // Remove any existing page-specific CSS and JS to avoid conflicts
                const existingCss = document.querySelector('link[data-page-css]');
                if (existingCss) existingCss.remove();
                const existingScript = document.querySelector('script[data-page-js]');
                if (existingScript) existingScript.remove();

                // Add CSS
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = cssPath;
                cssLink.setAttribute('data-page-css', page);
                document.head.appendChild(cssLink);

                // Add JS
                const script = document.createElement('script');
                script.src = scriptPath;
                script.setAttribute('data-page-js', page);
                document.body.appendChild(script);
            })
            .catch(error => {
                contentArea.innerHTML = '<p>Đã có lỗi xảy ra. Vui lòng thử lại sau.</p>';
                console.error(error);
            });
    }
});