// 1. Cấu hình Firebase (Giữ nguyên chìa khóa của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyArSZZ_HDDQGcgHHB0qH22N7ruXa8K8FEA",
  authDomain: "news-vnu.firebaseapp.com",
  projectId: "news-vnu",
  storageBucket: "news-vnu.firebasestorage.app",
  messagingSenderId: "492900694720",
  appId: "1:492900694720:web:8fa7a4faa3cec34b134b25",
  measurementId: "G-FGF2P4QED0"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. Hàm tổng hợp để không làm mất tính năng cũ
window.addEventListener('load', function() {
    
    // --- PHẦN MENU (Khôi phục lại tính năng 3 gạch) ---
    const menuIcon = document.querySelector('.menu-icon'); // Hoặc ID/Class của nút 3 gạch
    const navMenu = document.querySelector('.nav-menu');   // Hoặc ID/Class của menu bạn muốn hiện

    if (menuIcon && navMenu) {
        menuIcon.onclick = function() {
            navMenu.classList.toggle('active'); // Thêm hoặc xóa class để hiện menu
        };
    }

    // --- PHẦN ĐĂNG BÀI (Firebase) ---
    const btnDangBai = document.querySelector('button'); 
    if (btnDangBai) {
        btnDangBai.onclick = function(e) {
            e.preventDefault();

            const tieuDe = document.querySelector('input[placeholder="Tiêu đề"]').value;
            const noiDung = document.querySelector('textarea[placeholder="Nội dung"]').value;

            if (tieuDe === "" || noiDung === "") {
                alert("Vui lòng nhập đủ Tiêu đề và Nội dung!");
                return;
            }

            db.collection("posts").add({
                title: tieuDe,
                content: noiDung,
                createdAt: new Date().getTime()
            })
            .then(() => {
                alert("Đăng bài thành công!");
                location.reload(); 
            })
            .catch((error) => {
                alert("Lỗi Firebase: " + error);
            });
        };
    }
});