// localStorage.clear();
// let schedules = [];
// let editIndex = -1;

// // Gán vd ban đầu
// function initSchedules() {
//     if (!localStorage.getItem("schedules")) {
//         schedules = [
//             { class: "Gym", date: "27-01-2025", time: "7h30-9h30", name: "Vũ Văn Đoàn", email: "doan123@gmail.com" },
//             // { class: "Gym", date: "27-04-2025", time: "7h30-9h30", name: "Vũ Phương Anh", email: "panh123@gmail.com" },
//             // { class: "Yoga", date: "27-04-2025", time: "7h30-9h30", name: "Nguyễn Quang Hào", email: "hao123@gmail.com" },
//             // { class: "Zumba", date: "27-04-2025", time: "7h30-9h30", name: "Phạm Minh Sáng", email: "sang123@gmail.com" }
//         ];
//         localStorage.setItem("schedules", JSON.stringify(schedules));
//     } else {
//         schedules = JSON.parse(localStorage.getItem("schedules"));
//     }
//     displaySchedules();
// }

// // Hiển thị danh sách lịch
// function displaySchedules() {
//     let tbody = document.querySelector("tbody");
//     let html = "";
//     for (let i = 0; i < schedules.length; i++) {
//         let schedule = schedules[i];
//         html += `<tr>
//             <td>${schedule.class}</td>
//             <td>${schedule.date}</td>
//             <td>${schedule.time}</td>
//             <td>${schedule.name}</td>
//             <td>${schedule.email}</td>
//             <td>
//                 <a href="#" class="edit" onclick="editSchedule(${i})">Sửa</a>
//                 <a href="#" class="delete" onclick="deleteSchedule(${i})">Xóa</a>
//             </td>
//         </tr>
// `;

//     }
//     tbody.innerHTML = html;
// }

// // Mở modal để thêm lịch
// function openModal() {
//     let modal = document.getElementById("modal-container");
//     let modalTitle = document.getElementById("modalTitle");
//     modal.style.display = "block";
//     modalTitle.innerHTML = "Đặt lịch mới";
//     document.getElementById("class").value = "";
//     document.getElementById("date").value = "";
//     document.getElementById("time").value = "";
//     document.getElementById("name").value = "";
//     document.getElementById("email").value = "";
//     editIndex = -1;
// }

// // Mở modal để sửa lịch
// function editSchedule(index) {
//     let modal = document.getElementById("modal-container");
//     let modalTitle = document.getElementById("modalTitle");
//     modal.style.display = "block";
//     modalTitle.innerHTML = "Sửa lịch";

//     let schedule = schedules[index];
//     document.getElementById("class").value = schedule.class;
//     let dateParts = schedule.date.split("-");
//     let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
//     document.getElementById("date").value = formattedDate;
//     document.getElementById("time").value = schedule.time;
//     document.getElementById("name").value = schedule.name;
//     document.getElementById("email").value = schedule.email;
//     editIndex = index;
// }

// // Đóng modal
// function closeModal() {
//     let modal = document.getElementById("modal-container");
//     modal.style.display = "none";
// }

// // Lưu lịch (thêm hoặc sửa)
// function saveSchedule() {
//     let className = document.getElementById("class").value;
//     let date = document.getElementById("date").value;
//     let time = document.getElementById("time").value;
//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;

//     // Kiểm tra nếu thông tin chưa đầy đủ
//     if (!className || !date || !time || !name || !email) {
//         Swal.fire({
//             title: "Lỗi!",
//             text: "Vui lòng điền đầy đủ thông tin!",
//             icon: "error",
//             confirmButtonColor: "#3085d6",
//             confirmButtonText: "OK"
//         });
//         return;
//     }

//     // Kiểm tra nếu có lớp học trùng ngày, giờ, và tên lớp
//     if (schedules.some(schedule => 
//         schedule.date === date && schedule.time === time && schedule.class === className)) {
//         Swal.fire({
//             title: "Trùng!",
//             text: "Lớp học đã có vào giờ này và ngày này. Vui lòng chọn thời gian khác!",
//             icon: "error",
//             confirmButtonColor: "#3085d6",
//             confirmButtonText: "OK"
//         });
//         return;
//     }
//     let dateParts = date.split("-");
//     let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

//     // Tạo đối tượng lịch học
//     let schedule = {
//         class: className,
//         date: formattedDate,
//         time: time,
//         name: name,
//         email: email
//     };

//     // Nếu không chỉnh sửa, thêm mới lịch, nếu có chỉnh sửa, thay thế lịch cũ
//     if (editIndex === -1) {
//         schedules.push(schedule);
//     } else {
//         schedules[editIndex] = schedule;
//     }

//     // Lưu vào localStorage và cập nhật giao diện
//     localStorage.setItem("schedules", JSON.stringify(schedules));
//     closeModal();
//     displaySchedules();
// }


// // Xóa lịch
// function deleteSchedule(index) {
//     Swal.fire({
//         title: "Bạn có chắc chắn?",
//         text: "Bạn sẽ không thể khôi phục lịch này!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Có, xóa!",
//         cancelButtonText: "Hủy"
//     }).then((result) => {
//         if (result.isConfirmed) {
//             schedules.splice(index, 1);
//             localStorage.setItem("schedules", JSON.stringify(schedules));
//             displaySchedules();
//             Swal.fire({
//                 title: "Đã xóa!",
//                 text: "Lịch tập đã được xóa thành công.",
//                 icon: "success",
//                 confirmButtonColor: "#3085d6",
//                 confirmButtonText: "OK"
//             });
//         }
//     });
// }

// // Sự kiện khi trang tải
// // window.onload = function () {
// //     initSchedules();

// //     let btn = document.querySelector("header button");
// //     btn.onclick = openModal;

// //     let span = document.getElementsByClassName("close")[0];
// //     span.onclick = closeModal;

// //     window.onclick = function (event) {
// //         let modal = document.getElementById("modal-container");
// //         if (event.target == modal) {
// //         }
// //     };
// // };
// initSchedules();

// let btn = document.querySelector("header button");
// btn.onclick = openModal;

// let span = document.getElementsByClassName("close")[0];
// span.onclick = closeModal;

// // Thêm sự kiện cho phần nền của modal để đóng modal
// document.getElementById("modal-background").onclick = function () {
//     closeModal();  // Đóng modal khi nhấp vào nền ngoài modal
// };


// const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!loggedInUser) {
//         Swal.fire({
//             title: "Lỗi!",
//             text: "Không tìm thấy người dùng đăng nhập!",
//             icon: "error",
//             confirmButtonText: "OK"
//         });
//         return;
//     }
//     name: loggedInUser.fullName,
//         email: loggedInUser.email


// let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
// let editIndex = -1;
// let filteredData = schedules; // Lưu dữ liệu đã lọc để tái sử dụng

// // Hàm cập nhật số liệu trên các thẻ (Gym, Yoga, Zumba)
// function updateCards(data) {
//     const gymCount = data.filter(item => item.class.toLowerCase() === "gym").length;
//     const yogaCount = data.filter(item => item.class.toLowerCase() === "yoga").length;
//     const zumbaCount = data.filter(item => item.class.toLowerCase() === "zumba").length;

//     document.querySelectorAll(".card p")[0].textContent = gymCount;
//     document.querySelectorAll(".card p")[1].textContent = yogaCount;
//     document.querySelectorAll(".card p")[2].textContent = zumbaCount;
// }

// // Hàm hiển thị bảng dữ liệu
// function renderTable(data) {
//     const tbody = document.querySelector("tbody");
//     tbody.innerHTML = "";

//     data.forEach((item, index) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${item.class}</td>
//             <td>${item.date || ''}</td>
//             <td>${item.time || ''}</td>
//             <td>${item.name || ''}</td>
//             <td>${item.email}</td>
//             <td>
//                 <span class="edit" onclick="editSchedule(${index})">Sửa</span>
//                 <span class="delete" onclick="deleteSchedule(${index})">Xóa</span>
//             </td>
//         `;
//         tbody.appendChild(row);
//     });
// }

// // Hàm lọc dữ liệu dựa trên bộ lọc
// function showMoreFilters() {
//     const classSelect = document.getElementById("classSelect").value;
//     const emailInput = document.querySelector('input[placeholder="Tìm theo email"]').value.toLowerCase();
//     const dateInput = document.querySelector('input[type="date"]').value;

//     filteredData = schedules.filter(item => {
//         const matchesClass = classSelect === "full" || item.class.toLowerCase() === classSelect;
//         const matchesEmail = emailInput ? item.email.toLowerCase().includes(emailInput) : true;
//         const matchesDate = dateInput ? item.date === dateInput : true;

//         return matchesClass && matchesEmail && matchesDate;
//     });

//     renderTable(filteredData);
//     updateCards(filteredData);
//     renderChart(filteredData);
// }

// // Hàm xóa lịch
// function deleteSchedule(index) {
//     Swal.fire({
//         title: 'Bạn có chắc muốn xóa lịch này không?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Xóa',
//         cancelButtonText: 'Hủy'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             schedules.splice(index, 1);
//             localStorage.setItem("schedules", JSON.stringify(schedules));
//             // SỬA: Thay vì cập nhật filteredData thủ công, gọi showMoreFilters để đồng bộ dữ liệu đã lọc và cập nhật giao diện ngay lập tức
//             showMoreFilters();
//             // MÃ CŨ:
//             // filteredData = schedules.filter(item => {
//             //     const classSelect = document.getElementById("classSelect").value;
//             //     const emailInput = document.querySelector('input[placeholder="Tìm theo email"]').value.toLowerCase();
//             //     const dateInput = document.querySelector('input[type="date"]').value;
//             //     const matchesClass = classSelect === "full" || item.class.toLowerCase() === classSelect;
//             //     const matchesEmail = emailInput ? item.email.toLowerCase().includes(emailInput) : true;
//             //     const matchesDate = dateInput ? item.date === dateInput : true;
//             //     return matchesClass && matchesEmail && matchesDate;
//             // });
//             // renderTable(filteredData);
//             // updateCards(filteredData);
//             // renderChart(filteredData);
//             Swal.fire('Đã xóa!', 'Lịch tập đã được xóa.', 'success');
//         }
//     });
// }

// // Hàm mở modal để chỉnh sửa lịch
// function editSchedule(index) {
//     const modal = document.getElementById("editModal");
//     const schedule = schedules[index];

//     // Điền dữ liệu hiện tại của lịch vào các ô trong modal
//     document.getElementById("edit-class").value = schedule.class;
//     document.getElementById("edit-date").value = schedule.date;
//     document.getElementById("edit-time").value = schedule.time;

//     // Lưu chỉ số của lịch đang chỉnh sửa
//     editIndex = index;

//     // Hiển thị modal
//     modal.style.display = "block";
// }

// // Hàm đóng modal chỉnh sửa
// function closeEditModal() {
//     const modal = document.getElementById("editModal");
//     modal.style.display = "none";
// }

// // Hàm lưu lịch đã chỉnh sửa
// function saveEditedSchedule() {
//     const className = document.getElementById("edit-class").value;
//     const date = document.getElementById("edit-date").value;
//     const time = document.getElementById("edit-time").value;

//     // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
//     if (!className || !date || !time) {
//         Swal.fire({
//             title: "Lỗi!",
//             text: "Vui lòng điền đầy đủ thông tin!",
//             icon: "error",
//             confirmButtonText: "OK"
//         });
//         return;
//     }

//     // Cập nhật thông tin lịch
//     schedules[editIndex].class = className;
//     schedules[editIndex].date = date;
//     schedules[editIndex].time = time;

//     // Lưu vào localStorage
//     localStorage.setItem("schedules", JSON.stringify(schedules));

//     // SỬA: Thay vì cập nhật filteredData thủ công, gọi showMoreFilters để đồng bộ dữ liệu đã lọc và cập nhật giao diện ngay lập tức
//     showMoreFilters();
//     // MÃ CŨ:
//     // filteredData = schedules.filter(item => {
//     //     const classSelect = document.getElementById("classSelect").value;
//     //     const emailInput = document.querySelector('input[placeholder="Tìm theo email"]').value.toLowerCase();
//     //     const dateInput = document.querySelector('input[type="date"]').value;
//     //     const matchesClass = classSelect === "full" || item.class.toLowerCase() === classSelect;
//     //     const matchesEmail = emailInput ? item.email.toLowerCase().includes(emailInput) : true;
//     //     const matchesDate = dateInput ? item.date === dateInput : true;
//     //     return matchesClass && matchesEmail && matchesDate;
//     // });
//     // renderTable(filteredData);
//     // updateCards(filteredData);
//     // renderChart(filteredData);

//     closeEditModal();
//     Swal.fire('Đã lưu!', 'Lịch tập đã được cập nhật.', 'success');
// }

// // Khởi tạo dữ liệu mẫu nếu localStorage rỗng
// if (schedules.length === 0) {
//     schedules = [
//         { class: "Gym", date: "2025-01-27", time: "7h30-9h30", name: "Vũ Văn Đoàn", email: "doan123@gmail.com" },
//         { class: "Yoga", date: "2025-01-28", time: "9h00-10h30", name: "Nguyễn Thị An", email: "an456@gmail.com" }
//     ];
//     localStorage.setItem("schedules", JSON.stringify(schedules));
//     filteredData = schedules;
// }

// // Biểu đồ
// let classChart;

// function renderChart(data) {
//     const gymCount = data.filter(item => item.class.toLowerCase() === "gym").length;
//     const yogaCount = data.filter(item => item.class.toLowerCase() === "yoga").length;
//     const zumbaCount = data.filter(item => item.class.toLowerCase() === "zumba").length;

//     const ctx = document.getElementById('classChart').getContext('2d');

//     if (classChart) {
//         classChart.destroy();
//     }

//     classChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Gym', 'Yoga', 'Zumba'],
//             datasets: [{
//                 label: 'Số lượng lịch',
//                 data: [gymCount, yogaCount, zumbaCount],
//                 backgroundColor: [
//                     'rgba(100, 149, 237, 0.6)',
//                     'rgba(144, 238, 144, 0.6)',
//                     'rgba(221, 160, 221, 0.6)'
//                 ],
//                 borderColor: [
//                     'rgba(100, 149, 237, 1)',
//                     'rgba(144, 238, 144, 1)',
//                     'rgba(221, 160, 221, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false, // Cho phép CSS quyết định tỉ lệ
//             plugins: {
//                 legend: {
//                     display: true,
//                     position: 'top'
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     ticks: {
//                         precision: 0
//                     }
//                 }
//             }
//         }
//     });
// }

// // Khởi tạo giao diện
// updateCards(filteredData);
// renderTable(filteredData);
// renderChart(filteredData);

// // SỬA: Thêm sự kiện cho các trường lọc để tự động cập nhật giao diện khi người dùng thay đổi bộ lọc (cải thiện trải nghiệm người dùng)
// // LƯU Ý: Có thể bỏ nếu bạn muốn người dùng chủ động nhấn nút để lọc, nhưng giữ lại sẽ giúp giao diện phản hồi tức thì
// document.getElementById("classSelect").addEventListener("change", showMoreFilters);
// document.querySelector('input[placeholder="Tìm theo email"]').addEventListener("input", showMoreFilters);
// document.querySelector('input[type="date"]').addEventListener("change", showMoreFilters);
// // MÃ CŨ: Không có sự kiện nào được gắn cho các trường lọc trong mã gốc