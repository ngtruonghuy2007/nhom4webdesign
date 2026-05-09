// 1. Danh sách dữ liệu bài báo
const articles = [
    "Bóng đá Việt Nam hôm nay có gì mới?",
    "Lịch thi đấu bóng đá Ngoại hạng Anh cuối tuần",
    "Tin tức thời sự 24h",
    "Kết quả trận bóng đá tối qua",
    "Bóng đá nữ Việt Nam vươn tầm thế giới"
];

// 2. Lấy các thành phần từ HTML
const searchInput = document.getElementById('search-bar');
const resultBox = document.getElementById('result-box');

// 3. Hàm xử lý khi gõ phím
if (searchInput && resultBox) {
    searchInput.addEventListener('input', function() {
        const keyword = this.value.trim().toLowerCase();
        
        // Xóa kết quả cũ
        resultBox.innerHTML = '';

        if (keyword === '') {
            resultBox.style.display = 'none';
            return;
        }

        // Lọc bài báo chứa từ khóa
        const filtered = articles.filter(item => 
            item.toLowerCase().includes(keyword)
        );

        if (filtered.length > 0) {
            // Có kết quả -> Hiện danh sách
            filtered.forEach(title => {
                const li = document.createElement('li');
                li.className = 'result-item';
                li.textContent = title;
                
                // Khi bấm vào một bài báo thì điền tên nó lên thanh search
                li.onclick = () => {
                    searchInput.value = title;
                    resultBox.style.display = 'none';
                };
                
                resultBox.appendChild(li);
            });
            resultBox.style.display = 'block';
        } else {
            // Không tìm thấy gì
            resultBox.innerHTML = '<li class="no-result">Không tìm thấy bài báo tương ứng</li>';
            resultBox.style.display = 'block';
        }
    });
}

// 4. Đóng danh sách khi nhấn chuột ra ngoài
document.addEventListener('click', (e) => {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(e.target)) {
        resultBox.style.display = 'none';
    }
});
// đóng mở menu 
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn-toggle');
    const menu = document.getElementById('nav-list');

    if (btn && menu) {
        btn.onclick = function() {
            // Mở/Đóng menu bằng cách thêm class active
            menu.classList.toggle('active');
            // Tạo hình dấu X cho nút bấm
            btn.classList.toggle('open');
        };

        // Đóng menu khi người dùng click ra ngoài vùng menu
        document.onclick = function(e) {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                btn.classList.remove('open');
            }
        };
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Gọi file footer.html từ thư mục gốc
    fetch('../footer.html') 
        .then(response => {
            if (!response.ok) throw new Error('Không tìm thấy file footer');
            return response.text();
        })
        .then(data => {
            // Chèn nội dung vào cái div có id là footer-placeholder
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Lỗi:', error));
});
const registerForm = document.querySelector('.registration-form');

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        alert('Đăng ký thành công!');
        
        // Cập nhật tên file mới tại đây
        window.location.href = 'trangchu.html'; 
    });
}