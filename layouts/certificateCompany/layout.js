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
            pagePath = `../../certificateCompany/${page}.html`;
            cssPath = `../../certificateCompany/${page}.css`;
            scriptPath = `../../certificateCompany/${page}.js`;
        } else if (page === 'products') {
            pagePath = `../../certificateCompany/product/productList/products.html`;
            cssPath = `../../certificateCompany/product/productList/products.css`;
            scriptPath = `../../certificateCompany/product/productList/products.js`;
        } else if (page === 'addProduct') {
            pagePath = `../../certificateCompany/product/productAdd/addProduct.html`;
            cssPath = `../../certificateCompany/product/productAdd/addProduct.css`;
            scriptPath = `../../certificateCompany/product/productAdd/addProduct.js`;
        } else if (page === 'editProduct') {
            pagePath = `../../certificateCompany/product/productUpdate/editProduct.html`;
            cssPath = `../../certificateCompany/product/productUpdate/editProduct.css`;
            scriptPath = `../../certificateCompany/product/productUpdate/editProduct.js`;
        } else if (page === 'deleteProduct') {
            pagePath = `../../certificateCompany/product/deleteProduct/deleteProduct.html`;
            cssPath = `../../certificateCompany/product/deleteProduct/deleteProduct.css`;
            scriptPath = `../../certificateCompany/product/deleteProduct/deleteProduct.js`;
        } else if (page === 'productDetail') {
            pagePath = `../../certificateCompany/product/productDetail/productDetail.html`;
            cssPath = `../../certificateCompany/product/productDetail/productDetail.css`;
            scriptPath = `../../certificateCompany/product/productDetail/productDetail.js`;
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
                script.onload = () => {
                    console.log(`Script ${scriptPath} loaded successfully`);
                };
                script.onerror = () => {
                    console.error(`Failed to load script ${scriptPath}`);
                };
                document.body.appendChild(script);
            })
            .catch(error => {
                contentArea.innerHTML = '<p>Đã có lỗi xảy ra. Vui lòng thử lại sau.</p>';
                console.error(error);
            });
    }

    // Expose loadPage function globally to be called from other scripts
    window.loadPage = loadPage;
});