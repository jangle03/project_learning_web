// Hàm đăng xuất của tất cả các trang
document.getElementById('logout').addEventListener('click', function(){
    localStorage.removeItem("Taikhoandangtruycap");
    localStorage.removeItem("Check");
})

