(function () {
    // Dữ liệu giả
    const products = [
        { id: 1, name: "Sản phẩm A", status: "active", createdDate: "2025-05-01" },
        { id: 2, name: "Sản phẩm B", status: "inactive", createdDate: "2025-05-02" },
        { id: 3, name: "Sản phẩm C", status: "active", createdDate: "2025-05-03" },
    ];

    // Hàm hiển thị danh sách sản phẩm
    function displayProducts() {
        const productsList = document.getElementById('productsList');
        if (productsList) {
            products.forEach((product, index) => {
                const row = document.createElement('div');
                row.classList.add('table-row');
                row.innerHTML = `
                    <div class="table-cell" data-label="STT">${index + 1}</div>
                    <div class="table-cell" data-label="Tên sản phẩm">${product.name}</div>
                    <div class="table-cell" data-label="Trạng thái">
                        <span class="status ${product.status}">${product.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</span>
                    </div>
                    <div class="table-cell" data-label="Ngày tạo">${product.createdDate}</div>
                    <div class="table-cell actions" data-label="Actions">
                        <button class="action-btn view" data-id="${product.id}">Xem</button>
                        <button class="action-btn edit" data-id="${product.id}">Sửa</button>
                        <button class="action-btn delete" data-id="${product.id}">Xóa</button>
                    </div>
                `;
                productsList.appendChild(row);
            });

            // Xử lý actions
            productsList.addEventListener('click', (e) => {
                const target = e.target;
                const productId = target.getAttribute('data-id');

                if (!productId || !productsList) return;

                if (target.classList.contains('view')) {
                    window.loadPage('productDetail');
                } else if (target.classList.contains('edit')) {
                    window.loadPage('editProduct');
                } else if (target.classList.contains('delete')) {
                    window.loadPage('deleteProduct');
                }
            });

            // Xử lý action "Thêm sản phẩm"
            const addProductBtn = document.createElement('button');
            addProductBtn.textContent = 'Thêm sản phẩm';
            addProductBtn.classList.add('action-btn', 'add');
            addProductBtn.style.marginBottom = '16px';
            addProductBtn.style.background = '#2ecc71';
            addProductBtn.style.color = 'white';
            addProductBtn.style.padding = '10px 20px';
            addProductBtn.style.border = 'none';
            addProductBtn.style.borderRadius = '8px';
            addProductBtn.style.cursor = 'pointer';
            addProductBtn.addEventListener('click', () => {
                window.loadPage('addProduct');
            });
            const productsContainer = document.querySelector('.products-container');
            if (productsContainer) {
                productsContainer.prepend(addProductBtn);
            } else {
                console.error('Không tìm thấy phần tử .products-container');
            }
        } else {
            console.error('Không tìm thấy phần tử #productsList, thử lại sau 100ms');
            setTimeout(displayProducts, 100); // Thử lại sau 100ms
        }
    }

    // Chạy ngay lập tức
    displayProducts();
})();