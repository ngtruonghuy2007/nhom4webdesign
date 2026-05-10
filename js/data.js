// --- 1. HÀM MENU (PHẢI ĐẶT NGOÀI CÙNG) ---
function toggleMenu() {
    var x = document.getElementById("nav-list");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// --- 2. CẤU HÌNH FIREBASE (Lấy từ ảnh của bạn) ---
const firebaseConfig = {
    apiKey: "AIzaSyArSZZ_HDDQGcgHHB0qh22N7ruXa8K8FEA",
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

// --- 3. LỆNH ĐĂNG BÀI ---
window.addEventListener('load', function() {
    const btnDang = document.getElementById('btn-dang');
    if (btnDang) {
        btnDang.onclick = function(e) {
            e.preventDefault();

            // Lấy dữ liệu từ ID tieuDe và noiDung
            const t = document.getElementById('tieuDe').value;
            const n = document.getElementById('noiDung').value;

            if (t.trim() === "" || n.trim() === "") {
                alert("Vui lòng nhập đủ Tiêu đề và Nội dung!");
                return;
            }

            db.collection("posts").add({
                title: t,
                content: n,
                time: new Date().toLocaleString()
            }).then(() => {
                alert("Đăng bài thành công!");
                location.reload();
            }).catch((err) => {
                alert("Lỗi: " + err);
            });
        };
    }
});