let services = [];
let editIndex = -1;

// Khởi tạo dữ liệu ban đầu
function initServices() {
    if (!localStorage.getItem("services")) {
        services = [
            { name: "Gym", description: "Tập luyện với các thiết bị hiện đại", image: "https://s3-alpha-sig.figma.com/img/d405/a43c/2e91df2b44cac686ac97525ce247c5b6?Expires=1744588800&Key-Pair-Id=APKA4GOSFWCW27IBOMQ&Signature=q2Q8uLyU0TGl~sBOL2xDnfDX-2a9r~SpmOfz9PdOv7f~NQfCjdzqW90baI~J9z2Y6aFm2kiP4TKAnCFrjxhHrM7gnrfl7GX~ubrz5fhJBH8L3LKe~0MZ3iUdxhxi1PZ17-zBIzqZAV-rxCkyob3excIOtvV1P7BNgChkvnT~iq1AinHIS1y0XqPRJtxmkMErNEI0I2jskfX9oKMr-XHFfdTnSvlqFqphIdNrhKLVKvTJ5nStj4bdU3aE4pLmK-jCWkPwFXHhnR~FRBF-yFW1RQtUlwc184Y0zE0P4VuxqtxDsd4xcsX~vR~K6eRGosnDOkEa5cLMEwis1T2lG--nxA__" },
            { name: "Yoga", description: "Thư giãn và cân bằng cơ thể", image: "https://s3-alpha-sig.figma.com/img/c76c/19de/1febdf97cf79d8ed83568b0a54081504?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jvgNDCDL4mWqA0jpFoD2DS46oSUwz2hFXdNmY65bo-8EUYYI6jFriGMOIuxnG~JSyCJoM4Ud9P-XYa0N63vjyxRCfa0gu2~ICXUxWs1QDI9gfrlhVEU2AxLjm6NavXhC5cgN5OeVZF1FmDuy1R~1raKGjXfmjNyAzcb6dWdDAIWBRCKBjv18iD453uao00x6tiXQOXJVsQTVp~FzWAlvMTZjNOQvHiEY2qXmwANAeEMK2NX50ouJtdcGvQLJm0CmfFKfGEQOifxBwq06taIuuAUHBf9vDTMD8l7QvTFjvxRSAcndn9-fg2EurYUvYlFyN0YNYJToJGjbfOSw~uFoRA__" },
            { name: "Zumba", description: "Đốt cháy calo với nhịp điệu sôi động", image: "https://s3-alpha-sig.figma.com/img/7ef9/67fa/e24731f1d342cc2c22dbd1e6701e6e6e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VNWfcYK3ChgOhb4bsJ2awwqCldNKQRrNuFihPoSB8UmUFv5NSUz6DwsS0KSZcooFaXDysjpgLcLM9CDQdrFlblZw8COPe8MxumfMLvzTCXGMyk4urduDzdG1HTm0plzwiVi2QRskpC~UirRLQbLv1oX75l3ThC7T2Qdle8Q3kszIOP5P5wOv-qa43YsVHi4FtlaSh5HxCfkIgjl2KxBq8bH7vAXqlQ1PjFnzJXl7psUmcA7DfVN5J25PYUN2T~yvfeAsxTSZYlbn33oLF15QWPDAsLzMPlmg-hfJfoolxpyDaiSbMiZYCTQmakD--9pIZnqAPT~gR3HqNHOW1Rj0fw__" }
        ];
        localStorage.setItem("services", JSON.stringify(services));
    } else {
        services = JSON.parse(localStorage.getItem("services"));
    }
    displayServices();
}

// Hiển thị danh sách dịch vụ
function displayServices() {
    let tbody = document.getElementById("tableBody");
    let html = "";
    for (let i = 0; i < services.length; i++) {
        let service = services[i];
        html += `<tr>
                    <td>${service.name}</td>
                    <td>${service.description}</td>
                    <td><img src="${service.image}" alt="${service.name}"></td>
                    <td>
                        <a href="#" class="edit" onclick="editService(${i})">Sửa</a>
                        <a href="#" class="delete" onclick="deleteService(${i})">Xóa</a>
                    </td>
                </tr>`;
    }
    tbody.innerHTML = html;
}

// Mở modal để thêm dịch vụ
function openModal() {
    let modal = document.getElementById("modal");
    let modalTitle = document.querySelector(".modal-content h3");
    modal.style.display = "flex";
    modalTitle.innerHTML = "Thêm dịch vụ mới";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
    editIndex = -1;
}

// Mở modal để sửa dịch vụ
function editService(index) {
    let modal = document.getElementById("modal");
    let modalTitle = document.querySelector(".modal-content h3");
    modal.style.display = "flex";
    modalTitle.innerHTML = "Sửa dịch vụ";

    let service = services[index];
    document.getElementById("name").value = service.name;
    document.getElementById("description").value = service.description;
    document.getElementById("image").value = service.image;
    editIndex = index;
}

// Đóng modal
function closeModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Lưu dịch vụ (thêm hoặc sửa)
function saveService(event) {
    event.preventDefault(); // Ngăn form submit mặc định
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let image = document.getElementById("image").value;

    // Kiểm tra thông tin bắt buộc
    if (!name || !description || !image) {
        Swal.fire({
            title: "Lỗi!",
            text: "Vui lòng điền đầy đủ thông tin!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });
        return;
    }

    // Kiểm tra trùng lặp
    let isDuplicate = services.some((service, index) =>
        service.name === name && index !== editIndex
    );

    if (isDuplicate) {
        Swal.fire({
            title: "Trùng!",
            text: "Tên dịch vụ đã tồn tại!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });
        return;
    }

    let service = {
        name: name,
        description: description,
        image: image
    };

    if (editIndex === -1) {
        services.push(service);
        Swal.fire({
            title: "Thành công!",
            text: "Dịch vụ đã được thêm thành công.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });
    } else {
        services[editIndex] = service;
        Swal.fire({
            title: "Thành công!",
            text: "Dịch vụ đã được sửa thành công.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });
    }

    // Lưu vào localStorage và cập nhật giao diện
    localStorage.setItem("services", JSON.stringify(services));
    closeModal();
    displayServices();
}

// Xóa dịch vụ
function deleteService(index) {
    Swal.fire({
        title: "Bạn có chắc chắn?",
        text: "Bạn sẽ không thể khôi phục dịch vụ này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa!",
        cancelButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
            services.splice(index, 1);
            localStorage.setItem("services", JSON.stringify(services));
            displayServices();
            Swal.fire({
                title: "Đã xóa!",
                text: "Dịch vụ đã được xóa thành công.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        }
    });
}

// Đóng modal khi nhấp ra ngoài nội dung modal
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Khởi tạo dữ liệu
initServices();