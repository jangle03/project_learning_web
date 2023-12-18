window.onload = function() {
    if(!localStorage.getItem('Taikhoan')){
        var admin = [{Tendangnhap: 'admin', Password: 'admin'}];
        localStorage.setItem('Taikhoan', JSON.stringify(admin));
    }
}

function signup(){
    var checklogin = true;
    localStorage.setItem("Check",checklogin);
}

document.querySelector('.Vaotrangchu').addEventListener('click', function(){
    const name =  document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const nguoi = {
            Tendangnhap: name,
            Password: password
        }
    
    if(name === "" || password === ""){
        alert("Hãy điền đủ thông tin");
        document.getElementById("name").value = "";
        document.getElementById("password").value = "";

    }else{
        var AllUser = JSON.parse(localStorage.getItem('Taikhoan'));

        if( AllUser !== null) {
            const adminUser = AllUser.find(user => user.Tendangnhap === name && user.Password === password); 

            if(adminUser){
                localStorage.setItem('Taikhoandangtruycap', JSON.stringify(nguoi));
                window.location.href = "Trang_chu.html";
               
                signup();
            }else{
                alert("Bạn nhập sai tài khoản. Hãy thử lại");
            }
        }
    }
})

document.getElementById("checkboxs").addEventListener('click', function(){
    if(this.checked){
        document.getElementById("hien_mat_khau").innerHTML = "Không hiện mật khẩu";
        document.getElementById("password").type = "text";
    }else{
        document.getElementById("hien_mat_khau").innerHTML = "Hiện mật khẩu";
        document.getElementById("password").type = "password";
    }
})

