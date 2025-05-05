(function () {
    // Load Quill.js
    const quillScript = document.createElement('script');
    quillScript.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.min.js';
    quillScript.onload = initializeEditor;
    document.head.appendChild(quillScript);

    // Load Quill CSS
    const quillStyles = document.createElement('link');
    quillStyles.rel = 'stylesheet';
    quillStyles.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css';
    document.head.appendChild(quillStyles);

    let quillEditor;
    let selectedFiles = [];
    const MAX_IMAGES = 10;

    // Khởi tạo Quill Editor
    function initializeEditor() {
        quillEditor = new Quill('#productDescription', {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    ['link', 'image'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['clean']
                ]
            },
            placeholder: 'Nhập mô tả sản phẩm...'
        });
    }

    // Xử lý upload ảnh
    function handleImageUpload() {
        const imageInput = document.getElementById('productImages');
        const imagePreview = document.getElementById('imagePreview');
        const fileCount = document.getElementById('fileCount');
        const imageError = document.getElementById('productImagesError');

        imageInput.addEventListener('change', (e) => {
            const newFiles = Array.from(e.target.files);
            const totalFiles = selectedFiles.length + newFiles.length;

            if (totalFiles > MAX_IMAGES) {
                imageError.textContent = `Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh.`;
                imageError.style.display = 'block';
                return;
            }

            selectedFiles = [...selectedFiles, ...newFiles];
            imageError.style.display = 'none';
            fileCount.textContent = `${selectedFiles.length} ảnh đã chọn`;

            // Hiển thị ảnh
            renderImages();
        });
    }

    // Hiển thị ảnh trong preview
    function renderImages() {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = '';

        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');
                imageItem.innerHTML = `
                    <input type="radio" name="mainImage" value="${index}" ${index === 0 ? 'checked' : ''}>
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-image" data-index="${index}">×</button>
                `;
                imagePreview.appendChild(imageItem);

                // Xử lý xóa ảnh
                imageItem.querySelector('.remove-image').addEventListener('click', () => {
                    selectedFiles.splice(index, 1);
                    document.getElementById('fileCount').textContent = `${selectedFiles.length} ảnh đã chọn`;
                    renderImages();
                });
            };
            reader.readAsDataURL(file);
        });
    }

    // Xử lý submit form
    function handleFormSubmit() {
        const form = document.getElementById('addProductForm');
        const productName = document.getElementById('productName');
        const productNameError = document.getElementById('productNameError');
        const productDescriptionError = document.getElementById('productDescriptionError');
        const resultMessage = document.getElementById('resultMessage');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validate tên sản phẩm
            if (!productName.value.trim()) {
                productNameError.style.display = 'block';
                isValid = false;
            } else {
                productNameError.style.display = 'none';
            }

            // Validate mô tả
            const descriptionContent = quillEditor.root.innerHTML;
            if (descriptionContent === '<p><br></p>' || !descriptionContent.trim()) {
                productDescriptionError.style.display = 'block';
                isValid = false;
            } else {
                productDescriptionError.style.display = 'none';
            }

            if (isValid) {
                const formData = {
                    name: productName.value.trim(),
                    description: descriptionContent,
                    images: selectedFiles,
                    mainImageIndex: document.querySelector('input[name="mainImage"]:checked')?.value || 0
                };

                // Giả lập gửi dữ liệu (thay bằng API call nếu cần)
                console.log('Dữ liệu gửi đi:', formData);
                resultMessage.textContent = 'Sản phẩm đã được thêm thành công!';
                resultMessage.style.color = '#2ecc71';

                // Reset form
                form.reset();
                quillEditor.root.innerHTML = '';
                selectedFiles = [];
                document.getElementById('fileCount').textContent = '0 ảnh đã chọn';
                document.getElementById('imagePreview').innerHTML = '';
            }
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

    // Khởi động các chức năng
    handleImageUpload();
    handleFormSubmit();
    handleBackButton();
})();