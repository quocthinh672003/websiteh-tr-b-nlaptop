// Khởi tạo mảng users từ localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Hàm kiểm tra email đã tồn tại
function isEmailExists(email) {
    // Đọc lại dữ liệu users từ localStorage
    const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
    return currentUsers.some(user => user.email === email);
}

// Hàm kiểm tra số điện thoại hợp lệ
function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Hàm kiểm tra mật khẩu hợp lệ (ít nhất 6 ký tự)
function isValidPassword(password) {
    return password.length >= 6;
}

// Xử lý đăng ký
if (document.querySelector('form[action="register"]')) {
    const registerForm = document.querySelector('form[action="register"]');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('email').value.trim();

        // Kiểm tra các trường bắt buộc
        if (!name || !address || !phone || !password || !dob || !email) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Kiểm tra định dạng email
        if (!isValidEmail(email)) {
            alert('Email không hợp lệ!');
            return;
        }

        // Kiểm tra định dạng số điện thoại
        if (!isValidPhone(phone)) {
            alert('Số điện thoại không hợp lệ! Vui lòng nhập 10 số.');
            return;
        }

        // Kiểm tra độ dài mật khẩu
        if (!isValidPassword(password)) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        // Kiểm tra email đã tồn tại
        if (isEmailExists(email)) {
            alert('Email đã được sử dụng! Vui lòng chọn email khác.');
            return;
        }

        // Tạo đối tượng người dùng mới
        const newUser = {
            name,
            address,
            phone,
            password,
            dob,
            email
        };

        // Đọc lại dữ liệu users hiện tại từ localStorage
        const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        // Thêm người dùng mới vào mảng
        currentUsers.push(newUser);
        // Lưu lại vào localStorage
        localStorage.setItem('users', JSON.stringify(currentUsers));

        alert('Đăng ký thành công!');
        window.location.href = 'DangNhap.html';
    });
}

// Xử lý đăng nhập
const loginForm = document.querySelector('main.content form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Kiểm tra các trường bắt buộc
        if (!username || !password) {
            alert('Vui lòng điền đầy đủ thông tin đăng nhập!');
            return;
        }

        // Đọc lại dữ liệu users từ localStorage
        const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        // Tìm kiếm người dùng
        const user = currentUsers.find(u => u.email === username);

        if (!user) {
            alert('Tài khoản không tồn tại!');
            return;
        }

        if (user.password !== password) {
            alert('Mật khẩu không chính xác!');
            return;
        }

        alert('Đăng nhập thành công!');
        // Lưu trạng thái đăng nhập
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        // Chuyển hướng đến trang chủ (có thể thay đổi theo yêu cầu)
        window.location.href = 'TrangChu.html';
    });
}
const resetPasswordForm = document.getElementById('resetPasswordForm');
if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Kiểm tra email tồn tại
        const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = currentUsers.find(u => u.email === email);

        if (!user) {
            alert('Email không tồn tại trong hệ thống!');
            return;
        }

        // Kiểm tra mật khẩu mới
        if (!isValidPassword(newPassword)) {
            alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }

        // Kiểm tra xác nhận mật khẩu
        if (newPassword !== confirmPassword) {
            alert('Xác nhận mật khẩu không khớp!');
            return;
        }

        // Cập nhật mật khẩu
        const userIndex = currentUsers.findIndex(u => u.email === email);
        currentUsers[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(currentUsers));

        alert('Đổi mật khẩu thành công!');
        window.location.href = 'DangNhap.html';
    });
}

// Cập nhật link trong form đăng nhập (nếu chưa có)
if (document.querySelector('.form-links')) {
    const forgotPasswordLink = document.querySelector('.form-links a[href="#"]');
    if (forgotPasswordLink) {
        forgotPasswordLink.href = 'QuenMatKhau.html';
    }
}