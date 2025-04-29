document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const usernameInput = document.getElementById('username');
    const otpInput = document.getElementById('otp');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const resetUsernameBtn = document.getElementById('resetUsernameBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const resendOtpBtn = document.getElementById('resendOtpBtn');
    const timerSpan = document.getElementById('timer');
    const usernameGroup = document.getElementById('usernameGroup');
    const otpGroup = document.getElementById('otpGroup');
    const passwordGroup = document.getElementById('passwordGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const successMessage = document.getElementById('successMessage');

    let timer = 60;
    let timerInterval;

    // Function to start timer
    function startTimer() {
        timer = 60;
        timerSpan.textContent = timer;
        resendOtpBtn.disabled = true;
        timerInterval = setInterval(() => {
            timer--;
            timerSpan.textContent = timer;
            if (timer <= 0) {
                clearInterval(timerInterval);
                resendOtpBtn.disabled = false;
            }
        }, 1000);
    }

    // Function to reset error messages
    function resetErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }

    // Step 1: Validate and Send OTP
    sendOtpBtn.addEventListener('click', function() {
        resetErrors();

        const username = usernameInput.value.trim();
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username) {
            const error = document.getElementById('usernameError');
            error.textContent = 'Vui lòng nhập số điện thoại hoặc email';
            error.style.display = 'block';
            return;
        } else if (!phoneRegex.test(username) && !emailRegex.test(username)) {
            const error = document.getElementById('usernameError');
            error.textContent = 'Số điện thoại phải có 10 chữ số hoặc email phải hợp lệ';
            error.style.display = 'block';
            return;
        }

        // Move to Step 2: OTP Entry
        usernameInput.disabled = true;
        usernameGroup.style.opacity = '0.6';
        otpGroup.style.display = 'block';
        sendOtpBtn.style.display = 'none';
        resetUsernameBtn.style.display = 'block';
        confirmBtn.style.display = 'block';
        startTimer();
    });

    // Step 2: Resend OTP
    resendOtpBtn.addEventListener('click', function() {
        alert('Mã OTP đã được gửi lại (mô phỏng).');
        startTimer();
    });

    // Step 2: Reset Username/Email
    resetUsernameBtn.addEventListener('click', function() {
        resetErrors();
        usernameInput.disabled = false;
        usernameInput.value = '';
        usernameGroup.style.opacity = '1';
        otpGroup.style.display = 'none';
        passwordGroup.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        sendOtpBtn.style.display = 'block';
        resetUsernameBtn.style.display = 'none';
        confirmBtn.style.display = 'none';
        clearInterval(timerInterval);
    });

    // Step 2/3: Confirm Button
    confirmBtn.addEventListener('click', function() {
        resetErrors();

        // If in OTP step
        if (otpGroup.style.display === 'block' && passwordGroup.style.display !== 'block') {
            const otp = otpInput.value.trim();
            if (!otp) {
                const error = document.getElementById('otpError');
                error.textContent = 'Vui lòng nhập mã OTP';
                error.style.display = 'block';
                return;
            } else if (!/^\d{6}$/.test(otp)) {
                const error = document.getElementById('otpError');
                error.textContent = 'Mã OTP phải là 6 chữ số';
                error.style.display = 'block';
                return;
            }

            // Move to Step 3: Password Reset
            otpGroup.style.display = 'none';
            passwordGroup.style.display = 'block';
            confirmPasswordGroup.style.display = 'block';
            clearInterval(timerInterval);
        }
        // If in Password Reset step
        else {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (!password) {
                const error = document.getElementById('passwordError');
                error.textContent = 'Vui lòng nhập mật khẩu';
                error.style.display = 'block';
                return;
            } else if (password.length < 6) {
                const error = document.getElementById('passwordError');
                error.textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
                error.style.display = 'block';
                return;
            }

            if (!confirmPassword) {
                const error = document.getElementById('confirmPasswordError');
                error.textContent = 'Vui lòng xác nhận mật khẩu';
                error.style.display = 'block';
                return;
            } else if (confirmPassword !== password) {
                const error = document.getElementById('confirmPasswordError');
                error.textContent = 'Mật khẩu xác nhận không khớp';
                error.style.display = 'block';
                return;
            }

            // Show success message and redirect
            successMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 2000);
        }
    });
});