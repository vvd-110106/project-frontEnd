// localStorage.clear();
let schedules = [];
let editIndex = -1;
let currentPage = 1;
let limit = 5; 

// Gán dữ liệu ban đầu
function initSchedules() {
    if (!localStorage.getItem("schedules")) {
        schedules = [
            { class: "Gym", date: "2025-01-27", time: "7h30-9h30", name: "Vũ Văn Đoàn", email: "doan123@gmail.com" },
        ];
        localStorage.setItem("schedules", JSON.stringify(schedules));
    } else {
        schedules = JSON.parse(localStorage.getItem("schedules"));
    }
    displaySchedules();
}

// Hiển thị danh sách lịch
function displaySchedules() {
    let tbody = document.querySelector("tbody");
    let html = "";
    let start = limit *(currentPage-1);
    let end = start + limit;
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    let scheduleData = schedules.filter(schedule => schedule.email === loggedInUser.email);
    // Từ mảng schedules, lọc ra toàn bộ đối tượng schedule
    // có mail trùng với mail của user đang đăng nhập 
    // lưu vào 1 biến scheduleData
    // Xong gán scheduleData = pageData
    let pageData = scheduleData.slice(start, end)
    
    // let pageData = schedules.slice(start, end);
    for (let i = 0; i < pageData.length; i++) {
        let schedule = pageData[i];
        let index = start + i;
        html += `<tr>
            <td>${schedule.class}</td>
            <td>${schedule.date}</td>
            <td>${schedule.time}</td>
            <td>${schedule.name}</td>
            <td>${schedule.email}</td>
            <td>
                <a href="#" class="edit" onclick="editSchedule(${i})">Sửa</a>
                <a href="#" class="delete" onclick="deleteSchedule(${i})">Xóa</a>
            </td>
        </tr>`;
    }
    tbody.innerHTML = html;
    pagination();
}

// Mở modal để thêm lịch
function openModal() {
    let modal = document.getElementById("modal-container");
    let modalTitle = document.getElementById("modalTitle");
    modal.style.display = "block";
    modalTitle.innerHTML = "Đặt lịch mới";
    document.getElementById("class").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    editIndex = -1;
}

// Mở modal để sửa lịch
function editSchedule(index) {
    let modal = document.getElementById("modal-container");
    let modalTitle = document.getElementById("modalTitle");
    modal.style.display = "block";
    modalTitle.innerHTML = "Sửa lịch";

    let schedule = schedules[index];
    document.getElementById("class").value = schedule.class;
    document.getElementById("date").value = schedule.date;
    document.getElementById("time").value = schedule.time;
    editIndex = index;
}

// Đóng modal
function closeModal() {
    let modal = document.getElementById("modal-container");
    modal.style.display = "none";
}

// Lưu lịch (thêm hoặc sửa)
function saveSchedule() {
    let className = document.getElementById("class").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    if (!className || !date || !time ) {
        Swal.fire({
            title: "Lỗi!",
            text: "Vui lòng điền đầy đủ thông tin!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });
        return;
    }

    let isDuplicate = schedules.some((schedule, index) => 
        schedule.date === date && 
        schedule.time === time && 
        schedule.class === className && 
        index !== editIndex
    );

    if (isDuplicate) {
        Swal.fire({
            title: "Trùng!",
            text: "Lớp học bị trùng!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });
        return;
    }
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!loggedInUser) {
        Swal.fire({
            title: "Lỗi",
            text: "Bạn hãy đăng nhập!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });
        return;
    }
    let schedule = {
        class: className,
        date: date,
        time: time,
        name: loggedInUser.fullName,
        email: loggedInUser.email,

    };
    if (editIndex === -1) {
        schedules.push(schedule);
    } else {
        schedules[editIndex] = schedule;
    }

    // Lưu vào localStorage và cập nhật giao diện
    localStorage.setItem("schedules", JSON.stringify(schedules));
    closeModal();
    displaySchedules();
}

// Xóa lịch
function deleteSchedule(index) {
    Swal.fire({
        title: "Bạn có chắc chắn?",
        text: "Bạn sẽ không thể khôi phục lịch này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa!",
        cancelButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
            schedules.splice(index, 1);
            localStorage.setItem("schedules", JSON.stringify(schedules));
            displaySchedules();
            Swal.fire({
                title: "Đã xóa!",
                text: "Lịch tập đã được xóa thành công.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        }
    });
}

// Hàm phân trang 
function pagination() {
    let totalPages = Math.ceil(schedules.length / limit);
    let container = document.getElementById("pagination");
    if (!container) return;

    let html = "";
    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="goToPage(${i})" ${i === currentPage ? 'class="active-page"' : ''}>${i}</button>`;
    }

    container.innerHTML = html;
}
// Hiện thị dữ liệu trang 
function goToPage(page) {
    currentPage = page;
    displaySchedules();
}
// Khởi tạo và gán sự kiện
initSchedules();

let btn = document.querySelector("header button");
btn.onclick = openModal;

let span = document.getElementsByClassName("close")[0];
span.onclick = closeModal;

// Thêm sự kiện cho phần nền của modal để đóng modal
document.getElementById("modal-background").onclick = function () {
    closeModal();
};
