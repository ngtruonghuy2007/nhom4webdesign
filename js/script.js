/* ==========================================================================
   TÍNH NĂNG MÔ PHỎNG BÌNH LUẬN (HỆ NĂM NHẤT)
   ========================================================================== */

// Chờ HTML load xong xuôi mới chạy JS để tránh lỗi null
document.addEventListener('DOMContentLoaded', function() {
    
    // Lấy các thẻ HTML từ trang article-detail.html
    const commentForm = document.querySelector('.comment-form');
    const commentList = document.querySelector('.comments-list');
    const commentInput = document.querySelector('#comment-text');

    // Chỉ chạy logic nếu trang hiện tại có chứa form bình luận
    if (commentForm && commentList && commentInput) {
        
        commentForm.addEventListener('submit', function(event) {
            // 1. Ngăn chặn hành vi F5 (reload) mặc định của trình duyệt khi bấm submit
            event.preventDefault(); 

            // 2. Lấy nội dung người dùng vừa gõ và xóa khoảng trắng thừa
            const userText = commentInput.value.trim();

            // 3. Nếu nội dung không bị rỗng thì tiến hành tạo bình luận
            if (userText !== '') {
                
                // Tạo một thẻ div mới chứa class 'comment-item'
                const newComment = document.createElement('div');
                newComment.classList.add('comment-item');
                
                // Lấy thêm ngày giờ hiện tại cho giao diện thêm "trưởng thành"
                const now = new Date();
                const timeString = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');

                // Chèn cấu trúc HTML con vào bên trong thẻ div vừa tạo
                // (Lưu ý: nhớ đổi tên file ảnh avatar mặc định cho khớp với thư mục của bạn)
                newComment.innerHTML = `
                    <img src="../images/avatar-default.jpg" alt="Ảnh đại diện người dùng ẩn danh" class="avatar">
                    <div class="comment-body">
                        <h4>Sinh viên VNU-IS</h4>
                        <p style="font-size: 0.8em; color: #888; margin-bottom: 5px;">${timeString}</p>
                        <p>${userText}</p>
                    </div>
                `;

                // 4. Đưa bình luận mới lên ĐẦU danh sách (dùng prepend thay vì append để user thấy ngay)
                commentList.prepend(newComment);

                // 5. Xóa trắng ô nhập liệu để user gõ bình luận tiếp theo
                commentInput.value = '';
            }
        });
    }
});