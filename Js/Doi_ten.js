window.onload = function(){
    var Account = JSON.parse(localStorage.getItem('Taikhoandangtruycap'));
    if(Account !== null){
        document.getElementById("nameUser").innerHTML = Account.Tendangnhap;   
    }
}

