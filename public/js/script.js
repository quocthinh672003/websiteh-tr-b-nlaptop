// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
  
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   try {
//       const response = await fetch('/auth/login', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email, password })
//       });

//       if (response.ok) {
//           const data = await response.json();
//           localStorage.setItem('token', data.access_token);
//           window.location.href = '/profile'; // Chuyển hướng sau khi đăng nhập thành công
//       } else {
//           alert('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
//       }
//   } catch (error) {
//       console.error('Error:', error);
//       alert('Có lỗi xảy ra khi đăng nhập');
//   }
// });

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
  
            // Chuyển hướng chỉ khi token hợp lệ
            window.location.href = '/';
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Đăng nhập thất bại.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi đăng nhập.');
    }
  });
  

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        birthDate: document.getElementById('birthDate').value, // Giả sử định dạng đã đúng
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Đăng ký thành công!');
            window.location.href = '/auth/login';
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Có lỗi xảy ra trong quá trình đăng ký.');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.');
    }
});