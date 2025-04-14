let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
let editIndex = -1;
let filteredData = schedules; // Lưu dữ liệu đã lọc để tái sử dụng

// Hàm cập nhật số liệu trên các thẻ (Gym, Yoga, Zumba)
function updateCards(data) {
    const gymCount = data.filter(item => item.class.toLowerCase() === "gym").length;
    const yogaCount = data.filter(item => item.class.toLowerCase() === "yoga").length;
    const zumbaCount = data.filter(item => item.class.toLowerCase() === "zumba").length;

    document.querySelectorAll(".card p")[0].textContent = gymCount;
    document.querySelectorAll(".card p")[1].textContent = yogaCount;
    document.querySelectorAll(".card p")[2].textContent = zumbaCount;
}

function renderTable(data) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.class}</td>
            <td>${item.date || ''}</td>
            <td>${item.time || ''}</td>
            <td>${item.name || ''}</td>
            <td>${item.email}</td>
            <td>
                <span class="edit" onclick="editSchedule(${index})">Sửa</span>
                <span class="delete" onclick="deleteSchedule(${index})">Xóa</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm lọc dữ liệu dựa trên bộ lọc
function showMoreFilters() {
    const classSelect = document.getElementById("classSelect").value;
    const emailInput = document.querySelector('input[placeholder="Tìm theo email"]').value.toLowerCase();
    const dateInput = document.querySelector('input[type="date"]').value;

    filteredData = schedules.filter(item => {
        const matchesClass = classSelect === "full" || item.class.toLowerCase() === classSelect;
        const matchesEmail = emailInput ? item.email.toLowerCase().includes(emailInput) : true;
        let formattedDateInput = "";
        if (dateInput) {
            const dateParts = dateInput.split("-"); // Tách YYYY-MM-DD
            formattedDateInput = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`; // Thành YYYY-DD-MM
        }
        const matchesDate = dateInput ? item.date === formattedDateInput : true;

        return matchesClass && matchesEmail && matchesDate;
    });

    renderTable(filteredData);
    updateCards(filteredData);
    renderChart(filteredData);
}

// Hàm xóa lịch
function deleteSchedule(index) {
    Swal.fire({
        title: 'Bạn có chắc muốn xóa lịch này không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            schedules.splice(index, 1);
            localStorage.setItem("schedules", JSON.stringify(schedules));
            // Cập nhật filteredData để loại bỏ lịch vừa xóa
            filteredData = schedules.filter(item => {
                const classSelect = document.getElementById("classSelect").value;
                const emailInput = document.querySelector('input[placeholder="Tìm theo email"]').value.toLowerCase();
                const dateInput = document.querySelector('input[type="date"]').value;

                const matchesClass = classSelect === "full" || item.class.toLowerCase() === classSelect;
                const matchesEmail = emailInput ? item.email.toLowerCase().includes(emailInput) : true;
                const matchesDate = dateInput ? item.date === dateInput : true;

                return matchesClass && matchesEmail && matchesDate;
            });
            renderTable(filteredData);
            updateCards(filteredData);
            renderChart(filteredData);
            Swal.fire('Đã xóa!', 'Lịch tập đã được xóa.', 'success');
        }
    });
}

// Hàm mở modal để chỉnh sửa lịch
function editSchedule(index) {
    const modal = document.getElementById("editModal");
    const schedule = schedules[index];

    // Điền dữ liệu hiện tại của lịch vào các ô trong modal
    document.getElementById("edit-class").value = schedule.class;
    document.getElementById("edit-date").value = schedule.date;
    document.getElementById("edit-time").value = schedule.time;

    // Lưu chỉ số của lịch đang chỉnh sửa
    editIndex = index;

    // Hiển thị modal
    modal.style.display = "block";
}

// Hàm đóng modal chỉnh sửa
function closeEditModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

// Hàm lưu lịch đã chỉnh sửa
function saveEditedSchedule() {
    const className = document.getElementById("edit-class").value;
    const date = document.getElementById("edit-date").value;
    const time = document.getElementById("edit-time").value;

    // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (!className || !date || !time) {
        Swal.fire({
            title: "Lỗi!",
            text: "Vui lòng điền đầy đủ thông tin!",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    // Cập nhật thông tin lịch
    schedules[editIndex].class = className;
    schedules[editIndex].date = date;
    schedules[editIndex].time = time;


    // Lưu vào localStorage và cập nhật bảng
    localStorage.setItem("schedules", JSON.stringify(schedules));
    // Cập nhật filteredData để phản ánh lịch vừa chỉnh sửa
    filteredData = schedules.filter(item => {
        const classSelect = document.getElementById("classSelect").value;
        const emailInput = document.querySelector('input[placeholder="Tìm theo email"]').value.toLowerCase();
        const dateInput = document.querySelector('input[type="date"]').value;

        const matchesClass = classSelect === "full" || item.class.toLowerCase() === classSelect;
        const matchesEmail = emailInput ? item.email.toLowerCase().includes(emailInput) : true;
        const matchesDate = dateInput ? item.date === dateInput : true;

        return matchesClass && matchesEmail && matchesDate;
    });
    renderTable(filteredData);
    updateCards(filteredData);
    renderChart(filteredData);
    closeEditModal();
    Swal.fire('Đã lưu!', 'Lịch tập đã được cập nhật.', 'success');
}

// Khởi tạo dữ liệu mẫu nếu localStorage rỗng
if (schedules.length === 0) {
    schedules = [
        { class: "Gym", date: "2025-01-27", time: "7h30-9h30", name: "Vũ Văn Đoàn", email: "doan123@gmail.com" },
        { class: "Yoga", date: "2025-01-28", time: "9h00-10h30", name: "Nguyễn Thị An", email: "an456@gmail.com" }
    ];
    localStorage.setItem("schedules", JSON.stringify(schedules));
    filteredData = schedules;
}

// Bieeurr đồ

let classChart;

function renderChart(data) {
    const gymCount = data.filter(item => item.class.toLowerCase() === "gym").length;
    const yogaCount = data.filter(item => item.class.toLowerCase() === "yoga").length;
    const zumbaCount = data.filter(item => item.class.toLowerCase() === "zumba").length;

    const ctx = document.getElementById('classChart').getContext('2d');

    if (classChart) {
        classChart.destroy();
    }

    classChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gym', 'Yoga', 'Zumba'],
            datasets: [{
                label: 'Số lượng lịch',
                data: [gymCount, yogaCount, zumbaCount],
                backgroundColor: [
                    'rgba(100, 149, 237, 0.6)',
                    'rgba(144, 238, 144, 0.6)',
                    'rgba(221, 160, 221, 0.6)'
                ],
                borderColor: [
                    'rgba(100, 149, 237, 1)',
                    'rgba(144, 238, 144, 1)',
                    'rgba(221, 160, 221, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Cho phép CSS quyết định tỉ lệ
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}


updateCards(filteredData);
renderTable(filteredData);
renderChart(filteredData); 