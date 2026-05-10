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

// 2. Hàm Menu & Giao diện
window.toggleMenu = () => {
    const nav = document.getElementById("nav-list");
    nav.style.display = (nav.style.display === "block") ? "none" : "block";
};

window.toggleContent = (id) => {
    const c = document.getElementById(`content-${id}`);
    const b = document.getElementById(`btn-tg-${id}`);
    const isHidden = c.style.display === "none";
    c.style.display = isHidden ? "block" : "none";
    b.innerText = isHidden ? "Ẩn bớt" : "Xem thêm";
};

// 3. Like & Bình luận (Lưu vĩnh viễn trên Firebase)
window.handleLike = (id, current) => {
    const btn = document.getElementById(`btn-like-${id}`);
    btn.classList.add('like-bounce');
    db.collection("posts").doc(id).update({ likes: (current || 0) + 1 })
    .then(() => setTimeout(() => btn.classList.remove('like-bounce'), 400));
};

window.sendComment = (postId) => {
    const inp = document.getElementById(`cmt-in-${postId}`);
    if(!inp.value.trim()) return;
    db.collection("comments").add({
        postId: postId,
        text: inp.value,
        time: new Date().getTime()
    }).then(() => inp.value = "");
};

window.deleteComment = (cmtId) => {
    if(confirm("Thu hồi nhận xét này?")) db.collection("comments").doc(cmtId).delete();
};

// Hàm load bình luận real-time cho từng bài viết (Chống mất khi F5)
window.loadComments = (postId) => {
    db.collection("comments").where("postId", "==", postId).orderBy("time", "asc")
    .onSnapshot(snap => {
        const box = document.getElementById(`cmt-box-${postId}`);
        if(!box) return;
        box.innerHTML = "";
        snap.forEach(doc => {
            const cmt = doc.data();
            box.innerHTML += `
                <div class="comment-item">
                    <span>${cmt.text}</span>
                    <button onclick="deleteComment('${doc.id}')" style="color:red; border:none; background:none; cursor:pointer;">Thu hồi</button>
                </div>`;
        });
    });
};

// 4. Khởi chạy hệ thống
window.addEventListener('load', () => {
    // Đếm số chữ
    const nd = document.getElementById('noiDung');
    const wc = document.getElementById('wordCount');
    if(nd) nd.oninput = () => wc.innerText = nd.value.length;

    // Đăng bài
    const btnDang = document.getElementById('btn-dang');
    if(btnDang) {
        btnDang.onclick = () => {
            const t = document.getElementById('tieuDe').value;
            const n = document.getElementById('noiDung').value;
            if(!t || !n) return alert("Nhập đủ thông tin!");db.collection("posts").add({ title: t, content: n, likes: 0, time: new Date().toLocaleString() })
            .then(() => { alert("Đã đăng bài!"); location.reload(); });
        };
    }

    // Hiển thị danh sách bài đăng & Bình luận
    const kq = document.getElementById('ketQua');
    db.collection("posts").orderBy("time", "desc").onSnapshot(snap => {
        kq.innerHTML = "";
        snap.forEach(doc => {
            const p = doc.data(), id = doc.id, l = p.likes || 0;
            kq.innerHTML += `
                <div style="border:1px solid #ddd; padding:15px; margin-bottom:20px; border-radius:8px; background:#fff;">
                    <h4 style="margin:0; color:#003366;">${p.title}</h4>
                    <small style="color:gray;">${p.time}</small>
                    <div id="content-${id}" style="margin-top:10px;">${p.content}</div>
                    <div style="margin-top:10px; display:flex; gap:15px;">
                        <button onclick="toggleContent('${id}')" id="btn-tg-${id}">Ẩn bớt</button>
                        <button id="btn-like-${id}" onclick="handleLike('${id}', ${l})" style="cursor:pointer; border:none; background:none;">❤️ Thích (${l})</button>
                    </div>
                    <div style="margin-top:15px; background:#eee; padding:10px; border-radius:5px;">
                        <div style="display:flex; gap:5px;">
                            <input id="cmt-in-${id}" placeholder="Viết nhận xét..." style="flex:1;">
                            <button onclick="sendComment('${id}')">Gửi</button>
                        </div>
                        <div id="cmt-box-${id}" style="margin-top:10px;"></div>
                    </div>
                </div>`;
            loadComments(id); // Kích hoạt nạp bình luận vĩnh viễn cho bài này
        });
    });
});