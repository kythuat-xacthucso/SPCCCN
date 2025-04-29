document.addEventListener('DOMContentLoaded', function() {
    // Simulate getting data from the server
    const data = {
        companyName: "Công ty A",
        taxCode: "1234567890",
        address: "123 Đường Chính, Thành phố",
        phoneNumber: "0912345678",
        email: "company@example.com",
        representative: "Nguyễn Văn A",
        position: "Giám đốc",
        status: "Từ chối", // Can be "Đang chờ", "Đã duyệt", or "Từ chối"
        note: "Vui lòng kiểm tra lại thông tin mã số thuế",
        reason: "Thông tin mã số thuế không chính xác.",
    };

    // Populate the fields with data
    document.getElementById('companyName').textContent = data.companyName;
    document.getElementById('taxCode').textContent = data.taxCode;
    document.getElementById('address').textContent = data.address;
    document.getElementById('phoneNumber').textContent = data.phoneNumber;
    document.getElementById('email').textContent = data.email;
    document.getElementById('representative').textContent = data.representative;
    document.getElementById('position').textContent = data.position;
    document.getElementById('status').textContent = data.status;
    document.getElementById('note').textContent = data.note;

    // Handle status changes
    const reasonGroup = document.getElementById('reasonGroup');
    const newProfileBtn = document.getElementById('newProfileBtn');

    if (data.status === "Từ chối") {
        reasonGroup.style.display = 'block';
        document.getElementById('reason').textContent = data.reason;
        newProfileBtn.style.display = 'block';
    } else {
        reasonGroup.style.display = 'none';
        if (data.status === "Đang chờ" || data.status === "Đã duyệt") {
            newProfileBtn.style.display = 'none';
        }
    }

    // Handle "Tạo hồ sơ mới" button
    document.getElementById('newProfileBtn').addEventListener('click', function() {
        window.location.href = '../registrationCompany/register.html'; // Redirect to register page
    });

    // Handle "Tải lại" button
    document.getElementById('reloadBtn').addEventListener('click', function() {
        window.location.reload(); // Reload the page
    });
});