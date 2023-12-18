function xem_chi_tiet(i){
    var danh_sach_cau_hoi = JSON.parse(localStorage.getItem("Câu hỏi"));
    document.querySelector(".showCH").style.display = "block";
    document.getElementById("xem_chi_tiet_loai_cau_hoi").innerHTML = danh_sach_cau_hoi[i].LoaiCauhoi;
    document.getElementById("xem_chi_tiet_time").innerHTML = danh_sach_cau_hoi[i].Time;
    document.getElementById("xem_chi_tiet_cau_hoi").innerHTML = danh_sach_cau_hoi[i].Question;
    document.getElementById("xem_chi_tiet_dap_an").innerHTML = danh_sach_cau_hoi[i].Answer.join(" - ");
    document.getElementById("xem_chi_tiet_dap_an_dung").innerHTML = danh_sach_cau_hoi[i].AnswerCollect;
    document.getElementById("xem_chi_tiet_trang_thai").innerHTML = danh_sach_cau_hoi[i].Trangthai;
    document.getElementById("xem_chi_tiet_nguoi_gui").innerHTML = danh_sach_cau_hoi[i].Nguoigui;
}

function thoat(){
    document.querySelector(".showCH").style.display = "none";
}
