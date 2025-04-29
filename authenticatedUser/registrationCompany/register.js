document.addEventListener('DOMContentLoaded', () => {
    // Đảm bảo form tồn tại trước khi gán sự kiện
    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) {
        console.error('Form not found');
        return;
    }

    // Submit form validation
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset all error messages and hide them
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        let isValid = true;

        // Validate entityName
        const entityName = document.getElementById('entityName');
        if (!entityName.value.trim()) {
            const error = document.getElementById('entityNameError');
            error.textContent = 'Vui lòng nhập tên chủ thể';
            error.style.display = 'block';
            isValid = false;
        }

        // Validate entityType
        const entityType = document.querySelector('input[name="entityType"]:checked');
        if (!entityType) {
            const error = document.getElementById('entityTypeError');
            error.textContent = 'Vui lòng chọn loại hình';
            error.style.display = 'block';
            isValid = false;
        }

        // Validate taxID
        const taxID = document.getElementById('taxID');
        if (!taxID.value.trim()) {
            const error = document.getElementById('taxIDError');
            error.textContent = 'Vui lòng nhập mã số thuế';
            error.style.display = 'block';
            isValid = false;
        } else if (!/^\d{10,13}$/.test(taxID.value)) {
            const error = document.getElementById('taxIDError');
            error.textContent = 'Mã số thuế phải là số và từ 10 đến 13 chữ số';
            error.style.display = 'block';
            isValid = false;
        }

        // Validate representativeName
        const representativeName = document.getElementById('representativeName');
        if (!representativeName.value.trim()) {
            const error = document.getElementById('representativeNameError');
            error.textContent = 'Vui lòng nhập tên người đại diện';
            error.style.display = 'block';
            isValid = false;
        }

        // Validate representativePhone
        const representativePhone = document.getElementById('representativePhone');
        if (!representativePhone.value.trim()) {
            const error = document.getElementById('representativePhoneError');
            error.textContent = 'Vui lòng nhập số điện thoại người đại diện';
            error.style.display = 'block';
            isValid = false;
        } else if (!/^\d{10}$/.test(representativePhone.value)) {
            const error = document.getElementById('representativePhoneError');
            error.textContent = 'Số điện thoại phải là 10 chữ số';
            error.style.display = 'block';
            isValid = false;
        }

        // Validate managerName
        const managerName = document.getElementById('managerName');
        if (!managerName.value.trim()) {
            const error = document.getElementById('managerNameError');
            error.textContent = 'Vui lòng nhập tên người quản lý';
            error.style.display = 'block';
            isValid = false;
        }

        // Validate managerZalo
        const managerZalo = document.getElementById('managerZalo');
        if (!managerZalo.value.trim()) {
            const error = document.getElementById('managerZaloError');
            error.textContent = 'Vui lòng nhập số điện thoại Zalo quản lý';
            error.style.display = 'block';
            isValid = false;
        } else if (!/^\d{10}$/.test(managerZalo.value)) {
            const error = document.getElementById('managerZaloError');
            error.textContent = 'Số điện thoại Zalo phải là 10 chữ số';
            error.style.display = 'block';
            isValid = false;
        }

        // Validate businessLicense
        const businessLicense = document.getElementById('businessLicense');
        if (!businessLicense.files.length) {
            const error = document.getElementById('businessLicenseError');
            error.textContent = 'Vui lòng chọn tệp giấy phép kinh doanh';
            error.style.display = 'block';
            isValid = false;
        }

        // If all validations pass, show success message and reset form
        if (isValid) {
            alert('Hồ sơ đã được gửi thành công!');
            document.getElementById("registrationForm").reset();
            document.getElementById('fileName').textContent = 'Chưa chọn tệp'; // Reset file name display
        }
    });

    // Update file name display when a file is selected
    const businessLicenseInput = document.getElementById('businessLicense');
    if (businessLicenseInput) {
        businessLicenseInput.addEventListener('change', function(event) {
            const fileNameElement = document.getElementById('fileName');
            const file = event.target.files[0];
            if (file) {
                fileNameElement.textContent = file.name;
            } else {
                fileNameElement.textContent = 'Chưa chọn tệp';
            }
        });
    }
});