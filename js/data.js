// 1. Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyArSZZ_HDDQGcgHHB0qh22N7ruXa8K8FEA",
    authDomain: "news-vnu.firebaseapp.com",
    projectId: "news-vnu",
    storageBucket: "news-vnu.firebasestorage.app",
    messagingSenderId: "492900694720",
    appId: "1:492900694720:web:8fa7a4faa3cec34b134b25"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. Các hàm bổ trợ (Menu, Like, Ẩn/Hiện, Bình luận)
function toggleMenu() {
    var x = document.getElementById("nav-list");
    x.style.display = (x.style.display === "block") ? "none" : "block";
}

function toggleContent(id) {
    const c = document.getElementById(`content-${id}`);
    const b = document.getElementById(`btn-tg-${id}`);
    c.style.display = (c.style.display === "none") ? "block" : "none";
    b.innerText = (c.style.display === "none") ? "Xem thêm" : "Ẩn bớt";
}

function handleLike(id, current) {
    const btn = document.getElementById(`btn-like-${id}`);
    btn.classList.add('like-bounce'); // Hiệu ứng nảy (yêu cầu CSS bên dưới)
    db.collection("posts").doc(id).update({ likes: (current || 0) + 1 })
    .then(() => setTimeout(() => btn.classList.remove('like-bounce'), 400));
}

function sendComment(id) {
    const i = document.getElementById(`cmt-in-${id}`);
    const box = document.getElementById(`cmt-box-${id}`);
    if(i.value.trim()) {
        box.innerHTML += `<p style="margin:5px 0; font-size:13px;"><b>Bạn:</b> ${i.value}</p>`;
        i.value = "";
    }
}

// 3. Khởi chạy tính năng khi load trang
window.addEventListener('load', function() {
    // --- ĐẾM SỐ CHỮ ---
    const noiDung = document.getElementById('noiDung');
    const count = document.getElementById('wordCount');
    if (noiDung && count) { noiDung.oninput = function() { count.innerText = this.value.length; }; }

    // --- ĐĂNG BÀI ---
    const btnDang = document.getElementById('btn-dang');
    if (btnDang) {
        btnDang.onclick = function(e) {
            e.preventDefault();
            const t = document.getElementById('tieuDe').value, n = document.getElementById('noiDung').value;
            if (!t || !n) return alert("Nhập đủ tiêu đề và nội dung!");
            db.collection("posts").add({ title: t, content: n, likes: 0, time: new Date().toLocaleString() })
            .then(() => { alert("Đăng thành công!"); location.reload(); });
        };
    }

    // --- HIỂN THỊ DANH SÁCH BÀI + TƯƠNG TÁC ---
    const ketQua = document.getElementById('ketQua');
    db.collection("posts").orderBy("time", "desc").onSnapshot((snap) => {
        ketQua.innerHTML = "";
        snap.forEach((doc) => {
            const p = doc.data(), id = doc.id, l = p.likes || 0;
            ketQua.innerHTML += `
                <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 8px; background:#fff;"><h4 style="margin:0; color:#003366;">${p.title}</h4>
                    <small style="color:gray;">${p.time}</small>
                    <div id="content-${id}" style="margin-top:10px;">${p.content}</div>
                    <div style="margin-top:10px; display:flex; gap:15px;">
                        <button onclick="toggleContent('${id}')" id="btn-tg-${id}" style="cursor:pointer;">Ẩn bớt</button>
                        <button id="btn-like-${id}" style="border:none; background:none; cursor:pointer;" onclick="handleLike('${id}', ${l})">❤️ Thích (<span>${l}</span>)</button>
                    </div>
                    <div style="margin-top:15px; background:#f4f4f4; padding:10px; border-radius:5px;">
                        <input id="cmt-in-${id}" placeholder="Bình luận..." style="width:70%;">
                        <button onclick="sendComment('${id}')">Gửi</button>
                        <div id="cmt-box-${id}" style="margin-top:5px;"></div>
                    </div>
                </div>`;
        });
    });
});