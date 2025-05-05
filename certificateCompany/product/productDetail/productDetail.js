(function () {
    // Dữ liệu giả định
    const product = {
        name: "Sản phẩm A",
        description: "<p>Đây là mô tả chi tiết về sản phẩm A. Sản phẩm này có chất lượng cao và được sản xuất theo tiêu chuẩn SPCCCN.</p>",
        images: [
            "https://xacthucso.s3.ap-southeast-1.amazonaws.com/be5ce2aa-2262-11f0-9602-f2202b293748",
            "https://xacthucso.s3.ap-southeast-1.amazonaws.com/35de6f36-1c0a-11f0-9602-f2202b293748",
            "https://xacthucso.s3.ap-southeast-1.amazonaws.com/35de6f34-1c0a-11f0-9602-f2202b293748"
        ],
        status: "active",
        createdBy: "Nguyễn Văn A",
        createdDate: "2025-05-01"
    };

    // Hiển thị dữ liệu
    function displayProductDetails() {
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productDescription').innerHTML = product.description;
        document.getElementById('productStatus').textContent = product.status === 'active' ? 'Hoạt động' : 'Không hoạt động';
        document.getElementById('createdBy').textContent = product.createdBy;
        document.getElementById('createdDate').textContent = product.createdDate;

        renderImages();
    }

    // Hiển thị ảnh
    function renderImages() {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = '';

        product.images.forEach((imageUrl, index) => {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
            imageItem.innerHTML = `
                <input type="checkbox" class="image-checkbox" data-index="${index}">
                <img src="${imageUrl}" alt="Product Image ${index + 1}">
            `;
            imagePreview.appendChild(imageItem);

            // Thêm sự kiện preview
            imageItem.querySelector('img').addEventListener('click', () => {
                console.log('Image clicked:', imageUrl); // Debug
                showImagePreview(imageUrl);
            });

            // Thêm sự kiện chọn ảnh
            imageItem.querySelector('.image-checkbox').addEventListener('change', updateDownloadSelectedButton);
        });
    }

    // Hiển thị modal preview
    function showImagePreview(imageUrl) {
        console.log('Showing preview for:', imageUrl); // Debug
        const modal = document.createElement('div');
        modal.classList.add('modal', 'active'); // Đảm bảo modal hiển thị
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">×</span>
                <img src="${imageUrl}" alt="Preview Image">
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Cập nhật trạng thái nút "Tải về ảnh đã chọn"
    function updateDownloadSelectedButton() {
        const selectedCheckboxes = document.querySelectorAll('.image-checkbox:checked');
        const downloadSelectedBtn = document.querySelector('.download-selected');
        downloadSelectedBtn.disabled = selectedCheckboxes.length === 0;
    }

    // Xử lý tải về ảnh
    function handleDownload() {
        const downloadAllBtn = document.querySelector('.download-all');
        const downloadSelectedBtn = document.querySelector('.download-selected');

        downloadAllBtn.addEventListener('click', async () => {
            for (let index = 0; index < product.images.length; index++) {
                const imageUrl = product.images[index];
                try {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `product_image_${index + 1}.png`; // Thêm đuôi .png
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    // Thêm delay để tránh xung đột tải về
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    console.error('Lỗi khi tải ảnh:', imageUrl, error);
                }
            }
            alert('Tất cả ảnh đã được tải về!');
        });

        downloadSelectedBtn.addEventListener('click', async () => {
            const selectedCheckboxes = document.querySelectorAll('.image-checkbox:checked');
            for (let checkbox of selectedCheckboxes) {
                const index = parseInt(checkbox.getAttribute('data-index'));
                const imageUrl = product.images[index];
                try {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `selected_product_image_${index + 1}.png`; // Thêm đuôi .png
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    // Thêm delay để tránh xung đột tải về
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    console.error('Lỗi khi tải ảnh:', imageUrl, error);
                }
            }
            alert('Ảnh đã chọn đã được tải về!');
        });
    }

    // Xử lý nút Quay lại
    function handleBackButton() {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.loadPage('products');
            });
        }
    }

    // Xử lý nút Sửa
    function handleEditButton() {
        const editButton = document.querySelector('.edit-button');
        if (editButton) {
            editButton.addEventListener('click', () => {
                window.loadPage('editProduct');
            });
        }
    }

    // Khởi động các chức năng
    displayProductDetails();
    handleDownload();
    handleBackButton();
    handleEditButton();
})();