// 1. Cấu hình Firebase (Lấy từ bước đăng ký Web App của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyArSZZ_HDDQGcgHHB0qH22N7ruXa8K8FEA",
  authDomain: "news-vnu.firebaseapp.com",
  projectId: "news-vnu",
  storageBucket: "news-vnu.firebasestorage.app",
  messagingSenderId: "492900694720",
  appId: "1:492900694720:web:8fa7a4faa3cec34b134b25",
  measurementId: "G-FGF2P4QED0"
};

// 2. Khởi tạo
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Xử lý nút Đăng bài
window.onload = function() {
    const btnDangBai = document.querySelector('button'); // Tìm nút "Đăng bài"

    if (btnDangBai) {
        btnDangBai.onclick = function(e) {
            e.preventDefault();

            // Lấy dữ liệu từ 2 ô nhập liệu của bạn
            const tieuDe = document.querySelector('input[placeholder="Tiêu đề"]').value;
            const noiDung = document.querySelector('textarea[placeholder="Nội dung"]').value;

            if (tieuDe === "" || noiDung === "") {
                alert("Vui lòng nhập đủ Tiêu đề và Nội dung!");
                return;
            }

            // Gửi lên Firebase
            db.collection("posts").add({
                title: tieuDe,
                content: noiDung,
                createdAt: new Date().getTime()
            })
            .then(() => {
                alert("ĐĂNG THÀNH CÔNG! Dữ liệu đã lên Firebase.");
                location.reload(); 
            })
            .catch((error) => {
                alert("Lỗi rồi: " + error);
            });
        };
    }
};