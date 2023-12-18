var check = localStorage.getItem("Check");
if(check == null){
    window.location.href="Index_Dang_nhap.html";
}

//kiem tra thông tin
document.querySelector('.Vaodangki').addEventListener('click', function() {

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const passwordd = document.getElementById("passwordd").value;

    const nguoi = {
        Tendangnhap: name,
        Password: password,
    }

    if(name === "" || password === "" || passwordd === ""){
        alert("Hãy điền đủ thông tin");
        document.getElementById("name").value ="";
        document.getElementById("password").value ="";
        document.getElementById("passwordd").value = "";

    }
    else if(password !== passwordd) {
        alert("Password không trùng kìa, nhập lại đi");
        document.getElementById("name").value ="";
        document.getElementById("password").value ="";
        document.getElementById("passwordd").value = "";

    }  
    else{ 
        var AllUser = JSON.parse(localStorage.getItem('Taikhoan'));

        const adminUser = AllUser.some(user => user.Tendangnhap === name);

        if (!adminUser) {
            AllUser.push(nguoi);
            const Jsonnguoi = JSON.stringify(AllUser);
            localStorage.setItem("Taikhoan", Jsonnguoi);
            alert("Đăng kí thành công. Hãy đăng nhập lại");
            window.location.href = "Index_Dang_nhap.html";
            localStorage.removeItem("Check");

        }else{
            alert("Tài khoản đã tồn tại");

        }
    }
})


document.getElementById("checkboxs").addEventListener('click', function(){
    if(this.checked){
        document.getElementById("hien_mat_khau").innerHTML = "Không hiện mật khẩu";
        document.getElementById("password").type = "text";
        document.getElementById("passwordd").type = "text";
    }else{
        document.getElementById("hien_mat_khau").innerHTML = "Hiện mật khẩu";
        document.getElementById("password").type = "password";
        document.getElementById("passwordd").type = "password";
    }
})
