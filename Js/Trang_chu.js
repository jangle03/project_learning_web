var Account = JSON.parse(localStorage.getItem('Taikhoandangtruycap'));
if(Account.Tendangnhap === "admin"){
    document.getElementById('admin').style.display ="block";
}
