// --- PHẦN 1: DÁN CHÌA KHÓA CỦA BẠN VÀO ĐÂY ---
// Bạn hãy thay toàn bộ nội dung trong dấu { } bằng cái bảng mã bạn thấy trên Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArSZZ_HDDQGcgHHB0qH22N7ruXa8K8FEA",
  authDomain: "news-vnu.firebaseapp.com",
  projectId: "news-vnu",
  storageBucket: "news-vnu.firebasestorage.app",
  messagingSenderId: "492900694720",
  appId: "1:492900694720:web:8fa7a4faa3cec34b134b25",
  measurementId: "G-FGF2P4QED0"
};

// --- PHẦN 2: CÁC LỆNH KẾT NỐI (Giữ nguyên không sửa) ---
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- PHẦN 3: LỆNH XỬ LÝ NÚT BẤM (Giữ nguyên không sửa) ---
window.onload = function() {
    // Tìm cái nút bấm trong file HTML của bạn
    const btn = document.querySelector('button'); 

    if (btn) {
        btn.onclick = function(e) {
            e.preventDefault(); // Chặn trang web tự tải lại

            // Lấy dữ liệu từ các ô nhập
            const title = document.querySelector('input').value;
            const content = document.querySelector('textarea').value;

            if (title === "" || content === "") {
                alert("Bạn quên chưa nhập nội dung kìa!");
                return;
            }

            // Gửi dữ liệu lên kho "posts"
            db.collection("posts").add({
                tieuDe: title,
                noiDung: content,
                time: new Date().toLocaleString()
            })
            .then(() => {
                alert("Chúc mừng! Bài viết đã được lưu thành công.");
                location.reload(); 
            })
            .catch((error) => {
                console.error("Lỗi: ", error);
            });
        };
    }
};