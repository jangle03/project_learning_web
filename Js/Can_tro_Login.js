// Phần xóa khi vào đúng và ra đúng
function check(){
    localStorage.removeItem('Check');
}

//Kiểm tra khi mở file từ đâu
var check_login = localStorage.getItem('Check');
if(check_login == null){
    window.location.href= "Index_Dang_nhap.html";
}
