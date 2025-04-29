document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
                error.style.display = 'none';
            });

            let isValid = true;

            // Validate username (phone or email)
            const username = document.getElementById('username').value.trim();
            const phoneRegex = /^\d{10}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!username) {
                const error = document.getElementById('usernameError');
                error.textContent = 'Vui lòng nhập số điện thoại hoặc email';
                error.style.display = 'block';
                isValid = false;
            } else if (!phoneRegex.test(username) && !emailRegex.test(username)) {
                const error = document.getElementById('usernameError');
                error.textContent = 'Số điện thoại phải có 10 chữ số hoặc email phải hợp lệ';
                error.style.display = 'block';
                isValid = false;
            }

            // Validate password
            const password = document.getElementById('password').value;
            if (!password) {
                const error = document.getElementById('passwordError');
                error.textContent = 'Vui lòng nhập mật khẩu';
                error.style.display = 'block';
                isValid = false;
            } else if (password.length < 6) {
                const error = document.getElementById('passwordError');
                error.textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
                error.style.display = 'block';
                isValid = false;
            }

            // Validate confirm password
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (!confirmPassword) {
                const error = document.getElementById('confirmPasswordError');
                error.textContent = 'Vui lòng xác nhận mật khẩu';
                error.style.display = 'block';
                isValid = false;
            } else if (confirmPassword !== password) {
                const error = document.getElementById('confirmPasswordError');
                error.textContent = 'Mật khẩu xác nhận không khớp';
                error.style.display = 'block';
                isValid = false;
            }

            // If valid, redirect to index.html
            if (isValid) {
                console.log('Username:', username);
                console.log('Password:', password);
                window.location.href = '../index.html';
            }
        });
    }

    // Back button redirect (already handled by the link in HTML)
});