(function () {
    // Load Quill.js
    const quillScript = document.createElement('script');
    quillScript.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.min.js';
    quillScript.onload = initializeEditors;
    document.head.appendChild(quillScript);

    // Load Quill CSS
    const quillStyles = document.createElement('link');
    quillStyles.rel = 'stylesheet';
    quillStyles.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css';
    document.head.appendChild(quillStyles);

    let quillDescription, quillIntro, quillLog;
    let selectedFiles = [];
    const MAX_IMAGES = 10;

    // Khởi tạo Quill Editors
    function initializeEditors() {
        quillDescription = new Quill('#productDescription', {
            theme: 'snow',
            modules: {
                toolbar: [['bold', 'italic', 'underline'], ['link', 'image'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['clean']]
            },
            placeholder: 'Nhập mô tả sản phẩm...'
        });
        quillIntro = new Quill('#introContent', {
            theme: 'snow',
            modules: {
                toolbar: [['bold', 'italic', 'underline'], ['link', 'image'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['clean']]
            },
            placeholder: 'Nhập bài viết giới thiệu...'
        });
        quillLog = new Quill('#logContent', {
            theme: 'snow',
            modules: {
                toolbar: [['bold', 'italic', 'underline'], ['link', 'image'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['clean']]
            },
            placeholder: 'Nhập bài viết nhật ký...'
        });

        // Thêm validation cho các trường Giá trị
        const valueInputs = document.querySelectorAll('.auto-task-value, #basicAttrsTable .basic-attr-value');
        valueInputs.forEach(input => {
            input.addEventListener('input', function (e) {
                this.value = this.value.replace(/[^0-9]/g, ''); // Chỉ cho phép số
                if (this.value === '') {
                    this.setCustomValidity('Vui lòng nhập giá trị số.');
                } else {
                    this.setCustomValidity('');
                }
            });
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

                imageItem.querySelector('.remove-image').addEventListener('click', () => {
                    selectedFiles.splice(index, 1);
                    fileCount.textContent = `${selectedFiles.length} ảnh đã chọn`;
                    renderImages();
                });
            };
            reader.readAsDataURL(file);
        });
    }

    // Thêm dòng mới cho Thuộc tính cơ bản
    function addBasicAttrRow() {
        const table = document.getElementById('basicAttrsTable');
        const row = table.insertRow(-1);
        row.innerHTML = `
            <td><input type="text" class="basic-attr-name" placeholder="Nhập tên" required></td>
            <td><input type="text" class="basic-attr-unit" placeholder="Nhập đơn vị" required></td>
            <td><input type="text" class="basic-attr-value" placeholder="Nhập giá trị" required></td>
            <td>
                <select class="basic-attr-type" required>
                    <option value="">Chọn loại</option>
                    <option value="Thiết lập">Thiết lập</option>
                    <option value="Kích hoạt">Kích hoạt</option>
                    <option value="Kinh doanh">Kinh doanh</option>
                </select>
            </td>
            <td><input type="checkbox" class="basic-attr-required"></td>
            <td><button type="button" class="remove-row">Xóa</button></td>
        `;
        row.querySelector('.remove-row').addEventListener('click', () => table.deleteRow(row.rowIndex));

        // Thêm validation cho trường Giá trị mới
        const valueInput = row.querySelector('.basic-attr-value');
        valueInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, ''); // Chỉ cho phép số
            if (this.value === '') {
                this.setCustomValidity('Vui lòng nhập giá trị số.');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Xử lý tab navigation
    function handleTabNavigation() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
            });
        });
    }

    // Xử lý submit form
    function handleFormSubmit() {
        const form = document.getElementById('addProductForm');
        const resultMessage = document.getElementById('resultMessage');
        const errors = {
            productName: document.getElementById('productNameError'),
            productPrice: document.getElementById('productPriceError'),
            productDescription: document.getElementById('productDescriptionError'),
            introContent: document.getElementById('introContentError'),
            logContent: document.getElementById('logContentError'),
            productVideo: document.getElementById('productVideoError'),
            productImages: document.getElementById('productImagesError')
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validate các trường
            if (!document.getElementById('productName').value.trim()) {
                errors.productName.style.display = 'block';
                isValid = false;
            } else errors.productName.style.display = 'none';

            if (!document.getElementById('productPrice').value.trim()) {
                errors.productPrice.style.display = 'block';
                isValid = false;
            } else errors.productPrice.style.display = 'none';

            const descContent = quillDescription.root.innerHTML;
            if (descContent === '<p><br></p>' || !descContent.trim()) {
                errors.productDescription.style.display = 'block';
                isValid = false;
            } else errors.productDescription.style.display = 'none';

            const introContent = quillIntro.root.innerHTML;
            if (introContent === '<p><br></p>' || !introContent.trim()) {
                errors.introContent.style.display = 'block';
                isValid = false;
            } else errors.introContent.style.display = 'none';

            const logContent = quillLog.root.innerHTML;
            if (logContent === '<p><br></p>' || !logContent.trim()) {
                errors.logContent.style.display = 'block';
                isValid = false;
            } else errors.logContent.style.display = 'none';

            if (!document.getElementById('productVideo').value.trim()) {
                errors.productVideo.style.display = 'block';
                isValid = false;
            } else errors.productVideo.style.display = 'none';

            if (selectedFiles.length === 0) {
                errors.productImages.textContent = 'Vui lòng chọn ít nhất 1 ảnh.';
                errors.productImages.style.display = 'block';
                isValid = false;
            } else errors.productImages.style.display = 'none';

            if (isValid) {
                const formData = {
                    name: document.getElementById('productName').value.trim(),
                    price: document.getElementById('productPrice').value.trim(),
                    description: descContent,
                    category: {
                        chapter: document.getElementById('categoryChapter').value,
                        group: document.getElementById('categoryGroup').value,
                        subgroup: document.getElementById('categorySubgroup').value
                    },
                    autoTasks: Array.from(document.querySelectorAll('.auto-task-value')).map((input, index) => ({
                        name: ['Thời điểm chuyển kích hoạt', 'Chuyển bán tự động'][index],
                        unit: 'Giờ (h)',
                        value: input.value.trim()
                    })),
                    basicAttrs: Array.from(document.querySelectorAll('#basicAttrsTable tr:not(:first-child)')).map(row => {
                        if (row.classList.contains('default-row')) {
                            return {
                                name: 'Hạn sử dụng',
                                unit: row.querySelector('.basic-attr-unit').value,
                                value: row.querySelector('.basic-attr-value').value.trim(),
                                type: '',
                                required: ''
                            };
                        }
                        return {
                            name: row.querySelector('.basic-attr-name').value.trim(),
                            unit: row.querySelector('.basic-attr-unit').value.trim(),
                            value: row.querySelector('.basic-attr-value').value.trim(),
                            type: row.querySelector('.basic-attr-type').value,
                            required: row.querySelector('.basic-attr-required').checked ? 'Bắt buộc' : 'Không bắt buộc'
                        };
                    }),
                    intro: introContent,
                    video: document.getElementById('productVideo').value.trim(),
                    log: logContent,
                    images: selectedFiles,
                    mainImageIndex: document.querySelector('input[name="mainImage"]:checked')?.value || 0
                };

                console.log('Dữ liệu gửi đi:', formData);
                resultMessage.textContent = 'Sản phẩm đã được thêm thành công!';
                resultMessage.style.color = '#2ecc71';

                form.reset();
                quillDescription.root.innerHTML = '';
                quillIntro.root.innerHTML = '';
                quillLog.root.innerHTML = '';
                selectedFiles = [];
                document.getElementById('fileCount').textContent = '0 ảnh đã chọn';
                document.getElementById('imagePreview').innerHTML = '';
                document.getElementById('basicAttrsTable').innerHTML = `
                    <tr>
                        <th>Tên thuộc tính</th>
                        <th>Đơn vị tính</th>
                        <th>Giá trị</th>
                        <th>Loại thuộc tính</th>
                        <th>Bắt buộc</th>
                        <th>Hành động</th>
                    </tr>
                    <tr class="default-row">
                        <td>Hạn sử dụng</td>
                        <td>
                            <select class="basic-attr-unit" required>
                                <option value="">Chọn đơn vị</option>
                                <option value="Giờ">Giờ</option>
                                <option value="Ngày">Ngày</option>
                                <option value="Tuần">Tuần</option>
                                <option value="Tháng">Tháng</option>
                                <option value="Năm">Năm</option>
                            </select>
                        </td>
                        <td><input type="text" class="basic-attr-value" placeholder="Nhập giá trị" required></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
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
    handleTabNavigation();
    document.getElementById('addBasicAttrRow').addEventListener('click', addBasicAttrRow);
    handleFormSubmit();
    handleBackButton();
})();