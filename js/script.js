// 1. Danh sách dữ liệu bài báo (Data)
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
searchInput.addEventListener('input', function() {
    const keyword = this.value.trim().toLowerCase();
    
    // Xóa kết quả cũ trước khi lọc cái mới
    resultBox.innerHTML = '';

    if (keyword === '') {
        resultBox.style.display = 'none';
        return;
    }

    // Lọc các bài báo chứa từ khóa
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

// Đóng danh sách khi nhấn chuột ra ngoài
document.addEventListener('click', (e) => {
    if (!document.querySelector('.search-container').contains(e.target)) {
        resultBox.style.display = 'none';
    }
});