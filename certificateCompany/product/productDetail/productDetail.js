(function () {
    // Load QRCode.js
    const qrScript = document.createElement('script');
    qrScript.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
    document.head.appendChild(qrScript);

    // Dữ liệu giả định
    const product = {
        id: "https://v5.xts.vn/p/WHRCSV-00000001", // Link cho mã QR
        name: "Sản phẩm 123",
        price: "100,000 VNĐ",
        description: "<p>Đây là mô tả chi tiết về sản phẩm 123. Sản phẩm này có chất lượng cao và được sản xuất theo tiêu chuẩn SPCCCN.</p>",
        category: {
            chapter: "Chương",
            group: "Nhóm",
            subgroup: "Phân nhóm"
        },
        autoTasks: [
            { name: "Thời điểm chuyển kích hoạt", unit: "Giờ (h)", value: "3" },
            { name: "Chuyển bán tự động", unit: "Giờ (h)", value: "3" }
        ],
        basicAttrs: [
            { name: "Hạn sử dụng", unit: "Ngày", value: "3", type: "Thiết lập", required: "Bắt buộc" },
            { name: "Khối lượng", unit: "Kg", value: "100", type: "Thiết lập", required: "Bắt buộc" }
        ],
        images: [
            "https://xacthucso.s3.ap-southeast-1.amazonaws.com/be5ce2aa-2262-11f0-9602-f2202b293748",
            "https://xacthucso.s3.ap-southeast-1.amazonaws.com/35de6f36-1c0a-11f0-9602-f2202b293748",
            "https://xacthucso.s3.ap-southeast-1.amazonaws.com/35de6f34-1c0a-11f0-9602-f2202b293748"
        ],
        status: "Đang hoạt động",
        createdBy: "Phương Xác Thục 56",
        createdDate: "19/04/2025 10:39:44",
        intro: "Bài viết giới thiệu sản phẩm...",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        log: "Bài viết nhật ký sản phẩm..."
    };

    // Hiển thị dữ liệu
    function displayProductDetails() {
        // Phần sidebar
        document.getElementById('sidebarImagePreview').innerHTML = product.images.map(img => `<img src="${img}" alt="Product Image">`).join('');
        document.getElementById('sidebarStatus').textContent = product.status;
        document.getElementById('sidebarCreatedBy').textContent = product.createdBy;
        document.getElementById('sidebarCreatedDate').textContent = product.createdDate;

        // Phần tab
        displayProfileTab();
        displayIntroTab();
        displayLogTab();

        // Xử lý tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
            });
        });
    }

    // Hiển thị tab Hồ sơ
    function displayProfileTab() {
        const profileTab = document.getElementById('profile-tab');
        profileTab.innerHTML = `
            <p><strong>Tên sản phẩm:</strong> ${product.name}</p>
            <p><strong>Giá bán:</strong> ${product.price}</p>
            <p><strong>Mô tả:</strong> <div class="description-content">${product.description}</div></p>
            <p><strong>Mã truyền thông:</strong></p>
            <div id="qrCode"></div>
            <div class="group-box">
                <h3>Loại hàng hóa</h3>
                <ul class="category-list">
                    <li><strong>Chương:</strong> ${product.category.chapter}</li>
                    <li><strong>Nhóm:</strong> ${product.category.group}</li>
                    <li><strong>Phân nhóm:</strong> ${product.category.subgroup}</li>
                </ul>
            </div>
            <div class="group-box">
                <h3>Nghiệp vụ tự động</h3>
                <table class="table">
                    <tr><th>Tên thuộc tính</th><th>Đơn vị tính</th><th>Giá trị</th></tr>
                    ${product.autoTasks.map(attr => `<tr><td>${attr.name}</td><td>${attr.unit}</td><td>${attr.value}</td></tr>`).join('')}
                </table>
            </div>
            <div class="group-box">
                <h3>Thuộc tính cơ bản</h3>
                <table class="table">
                    <tr><th>Tên thuộc tính</th><th>Đơn vị tính</th><th>Giá trị</th><th>Loại thuộc tính</th><th>Bắt buộc</th></tr>
                    ${product.basicAttrs.map(attr => `<tr><td>${attr.name}</td><td>${attr.unit}</td><td>${attr.value}</td><td>${attr.type}</td><td>${attr.required}</td></tr>`).join('')}
                </table>
            </div>
        `;

        // Đảm bảo mã QR được tạo sau khi thư viện tải xong
        qrScript.onload = () => {
            setTimeout(() => {
                const qrCodeDiv = document.getElementById('qrCode');
                if (qrCodeDiv) {
                    new QRCode(qrCodeDiv, {
                        text: product.id,
                        width: 100,
                        height: 100,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });

                    // Thêm sự kiện download QR code
                    const qrCanvas = qrCodeDiv.querySelector('canvas');
                    if (qrCanvas) {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = qrCanvas.toDataURL('image/png');
                        downloadLink.download = 'qrcode.png';
                        downloadLink.textContent = 'Tải về mã QR';
                        downloadLink.style.display = 'block';
                        downloadLink.style.fontSize = '14px';
                        downloadLink.style.color = '#4a90e2';
                        downloadLink.style.marginTop = '8px';
                        qrCodeDiv.appendChild(downloadLink);
                    }
                }
            }, 100); // Delay nhỏ để đảm bảo DOM sẵn sàng
        };
    }

    // Hiển thị tab Giới thiệu
    function displayIntroTab() {
        const introTab = document.getElementById('intro-tab');
        introTab.innerHTML = `
            <div class="group-box">
                <h3>Bài viết giới thiệu</h3>
                <div class="article-content">${product.intro}</div>
            </div>
            <p><strong>Video:</strong> <iframe src="${product.video}" frameborder="0" allowfullscreen></iframe></p>
        `;
    }

    // Hiển thị tab Nhật ký
    function displayLogTab() {
        const logTab = document.getElementById('log-tab');
        logTab.innerHTML = `
            <div class="group-box">
                <h3>Bài viết nhật ký</h3>
                <div class="article-content">${product.log}</div>
            </div>
        `;
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
    handleBackButton();
    handleEditButton();
})();