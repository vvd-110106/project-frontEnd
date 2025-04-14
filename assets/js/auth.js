// Đăng ký
// localStorage.clear();
function fValid() {
    let fullName = document.getElementById("name").value;
    if (fullName === "") {
        document.getElementById("errName").innerHTML = "Họ và tên không được để trống.";
        document.getElementById("name").focus();
        return;
    } else {
        document.getElementById("errName").innerHTML = "";
    }

    let mail = document.getElementById("mail").value;
    if (mail === "") {
        document.getElementById("errMail").innerHTML = "Mail không được để trống";
        document.getElementById("mail").focus();
        return;
    } else if (!mail.includes("@") || !mail.includes(".")) {
        document.getElementById("errMail").innerHTML = "Mail không hợp lệ.";
        document.getElementById("mail").focus();
        return;
    } else {
        document.getElementById("errMail").innerHTML = "";
    }

    let inputPass = document.getElementById("pass").value;
    if (inputPass === "") {
        document.getElementById("errPass").innerHTML = "Mật khẩu không được để trống.";
        document.getElementById("pass").focus();
        return;
    } else if (inputPass.length < 8) {
        document.getElementById("errPass").innerHTML = "Mật khẩu tối thiểu phải 8 kí tự";
        document.getElementById("pass").focus();
        return;
    } else {
        document.getElementById("errPass").innerHTML = "";
    }

    let checkPass = document.getElementById("checkpass").value;
    if (checkPass === "") {
        document.getElementById("errPassCheck").innerHTML = "Mật khẩu không được để trống.";
        document.getElementById("checkpass").focus();
        return;
    } else if (checkPass.length < 8) {
        document.getElementById("errPassCheck").innerHTML = "Mật khẩu tối thiểu phải 8 kí tự";
        document.getElementById("checkpass").focus();
        return;
    } else if (checkPass !== inputPass) {
        document.getElementById("errPassCheck").innerHTML = "Mật khẩu không trùng khớp";
        document.getElementById("checkpass").focus();
        return;
    } else {
        document.getElementById("errPassCheck").innerHTML = "";
    }

    // Lấy danh sách người dùng hiện tại từ localStorage (nếu có)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra xem email đã tồn tại chưa
    if (users.some(user => user.email === mail)) {
        document.getElementById("errMail").innerHTML = "Email đã được đăng ký.";
        document.getElementById("mail").focus();
        return;
    }

    // Tạo đối tượng người dùng mới
    const newUser = {
        fullName: fullName,
        email: mail,
        password: inputPass,
        role: mail.includes("@admin") ? "admin" : "user"
    };

    // Thêm người dùng mới vào danh sách
    users.push(newUser);

    // Lưu danh sách người dùng mới vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
        title: "Successfully 🎉!",
        text: "Press Ok to skip",
        icon: "success"
    }).then(() => {
        window.location.href = "../admin/dashboard.html";
    });
}

// Tài khoản admin
const adminAccount = {
    fullName: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin"
};
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([adminAccount]));
} else {
    let users = JSON.parse(localStorage.getItem("users"));
    let adminExists = users.some(user => user.email === adminAccount.email);

    if (!adminExists) {
        users.push(adminAccount);
        localStorage.setItem("users", JSON.stringify(users));
    }
}

function fValidLogin() {
    let mail = document.getElementById("mail").value.trim();
    let inputPass = document.getElementById("pass").value.trim();

    document.getElementById("errEmail").innerHTML = "";
    document.getElementById("errPass").innerHTML = "";

    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm user theo email
    const user = users.find(user => user.email === mail);

    if (!user) {
        document.getElementById("errEmail").innerHTML = "Email không tồn tại.";
        return;
    }

    if (user.password !== inputPass) {
        document.getElementById("errPass").innerHTML = "Mật khẩu không đúng.";
        return;
    }

    // Lưu thông tin đăng nhập vào localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Kiểm tra role để chuyển hướng đúng trang
    if (user.role === "admin") {
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
        }).then(() => {
            window.location.href = "../adminPage/service.html";
        });
    } else {
        Swal.fire({
            title: "Log in successfully 🎉!",
            text: "Press Ok to skip",
            icon: "success"
        }).then(() => {
            window.location.href = "../admin/dashboard.html";
        });
    }
}

// Xử lý đăng xuất
function logout() {
    Swal.fire({
        title: "Bạn có chắc chắn muốn đăng xuất?",
        text: "Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, đăng xuất!",
        cancelButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("loggedInUser");
            Swal.fire({
                title: "Đăng xuất thành công!",
                text: "Bạn đã đăng xuất khỏi hệ thống.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "../auth/login.html";
            });
        }
    });
}

// Hàm cập nhật menu
function updateMenu() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const adminMenuItem = document.querySelector(".admin-login");
    const loginItem = document.querySelector("#login-item");

    // Kiểm tra hiển thị menu "Quản lý" cho admin
    if (loggedInUser && loggedInUser.role === "admin") {
        if (adminMenuItem) {
            adminMenuItem.style.display = "block";
        }
    } else {
        if (adminMenuItem) {
            adminMenuItem.style.display = "none";
        }
    }

    // Kiểm tra trạng thái đăng nhập để thay đổi mục "Đăng nhập"
    if (loggedInUser) {
        if (loginItem) {
            loginItem.innerHTML = '<a href="javascript:void(0);" onclick="logout()">Đăng xuất</a>';
        }
    } else {
        if (loginItem) {
            loginItem.innerHTML = '<a href="../auth/login.html">Đăng nhập</a>';
        }
    }
}
updateMenu();
