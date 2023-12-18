// Hàm để Tạo bảng để lưu trữ câu hỏi và render câu hỏi và câu trả lời xuống bảng
var dsQues = document.querySelector("#show-kq tbody");
var Account = JSON.parse(localStorage.getItem("Taikhoandangtruycap"));

var danh_sach_cau_hoi = localStorage.getItem("Câu hỏi");
danh_sach_cau_hoi = danh_sach_cau_hoi ? JSON.parse(danh_sach_cau_hoi) : [];

var select_loai_DA = document.getElementById("loaiDA");
var noi_dung_cau_hoi = document.getElementById("Cauhoi");

var khung_dien_DA =  document.querySelector(".dienDA");
var khung_mot_DA = document.querySelector(".motDA");
var khung_nhieu_DA = document.querySelector(".nDA");

var noi_dung_dien_DA = document.getElementById("diendapan");
var option_so_mot_DA = document.getElementById("Option_motDA");
var option_so_nhieu_DA = document.getElementById("Option_nDA");
var noi_dung_mot_DA = document.querySelector(".show_motDA");
var noi_dung_nhieu_DA = document.querySelector(".show_nDA");

var nut_luu = document.getElementById("save");
var nut_cap_nhat = document.getElementById("capnhat");
function renderQuestion(){
    dsQues.innerHTML="";

    if(danh_sach_cau_hoi.length === 0){
        dsQues.innerHTML = "<tr><td colspan='8' style='text-align:center'>Không có dữ liệu câu hỏi</td></tr>";
    }else{
        var hasUser = danh_sach_cau_hoi.find(key => key.Nguoigui === Account.Tendangnhap);
        if(hasUser){
            var duyecauhoi = 1;
            danh_sach_cau_hoi.forEach((key, i) => {
                if(key.Nguoigui === Account.Tendangnhap){
                    const row = document.createElement("tr");
                    row.innerHTML =`
                    <td>${duyecauhoi}</td>
                    <td>${key.Question}</td>
                    <td>${key.AnswerCollect.join(' - ')}</td>
                    <td id="duyet">${key.Trangthai}</td>
                    <td>
                        <button type="button" id="edit_${i}" onclick="sua(${i})">Sửa</button>
                        <button type="button" id="delete_${i}" onclick="xoa(${i})">Xóa</button>
                        <button type="button" id="xem_chi_tiet_${i}" onclick=xem_chi_tiet(${i})>Xem chi tiết</button>
                    </td> `;
        
                    dsQues.appendChild(row);
                    duyecauhoi++;
                }
            })
        }else{
            dsQues.innerHTML = "<tr><td colspan='8' style='text-align:center'>Không có dữ liệu câu hỏi</td></tr>";
        }
    }
}

//Lắng nghe sự kiện khi Load trang và khi chọn option phù hợp với câu trả lời
addEventListener('DOMContentLoaded', function(){
    hideALL();
    renderQuestion();
});

document.querySelector(".OptionQues > select").addEventListener('change', function(){
    hideALL();
    clear();
    
    var selectOption = this.value;
    if(selectOption === "Option_dienDA"){
        khung_dien_DA.style.display="block";
        nut_luu.style.display="block";
    } else if(selectOption === "Option_motDA"){
        khung_mot_DA.style.display="block";
        nut_luu.style.display="block";
    } else if(selectOption === "Option_nDA"){
        khung_nhieu_DA.style.display="block";
        nut_luu.style.display="block";
    }
});   


//Lắng nghe sự kiện với dạng chọn nhiều đáp án 
option_so_nhieu_DA.addEventListener('input', function(){
    var Option = parseInt(this.value);
    noi_dung_nhieu_DA.innerHTML ='';
    
    for(var i = 0; i < Option; i++) {
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'nDA';
        input.id = 'nDA'+ i;
        input.className = "nDA";

        var textarea = document.createElement('textarea');
        textarea.placeholder = 'Đáp án số ' + (i + 1);
        textarea.id = "nDA_" + i;

        var div = document.createElement('div');
        div.appendChild(input);
        div.appendChild(textarea);

        noi_dung_nhieu_DA.appendChild(div);
    }
});

//Lắng nghe sự kiện với dạng chọn một đáp án
option_so_mot_DA.addEventListener('input', function(){
    var Option = parseInt(this.value);
    noi_dung_mot_DA.innerHTML ='';
    
    for(var i = 0; i < Option; i++) {
        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'mDA';
        input.id = 'motDA' + i;
        input.className = i;

        var textarea = document.createElement('textarea');
        textarea.placeholder = 'Đáp án số ' + (i + 1);
        textarea.id = "motDA_" + i;
        

        var div = document.createElement('div');    
        div.appendChild(input);
        div.appendChild(textarea);

        noi_dung_mot_DA.appendChild(div);
    }
});

//Hàm lấy những đáp án đúng
function collect() {

    var selectAnswer = [];

    if(select_loai_DA.value === 'Option_dienDA'){
        var fill = noi_dung_dien_DA.value.trim();
        if(fill !== ""){
            selectAnswer.push(fill);
        }
    }else if(select_loai_DA.value === 'Option_motDA') {
        var radiobuttons = document.querySelectorAll('.motDA input[type="radio"]');
        radiobuttons.forEach(function(radio, i){
            if (radio.checked) {
                var text = document.getElementById('motDA_' + i).value;
                selectAnswer.push(text);
            }
        })
    }else if(select_loai_DA.value === 'Option_nDA'){
        var checkboxes = document.querySelectorAll('.nDA input[type="checkbox"]');
        checkboxes.forEach(function(checkbox, i){
            if (checkbox.checked) {
                var text = document.getElementById('nDA_' + i).value;
                selectAnswer.push(text);
            }
        })
    }
    return selectAnswer;
}

//hàm kiểm tra xem đã nhập đủ chưa
function Kiem_tra_ans() {
    if(select_loai_DA.value === 'Option_dienDA'){
        return true;
    }else if(select_loai_DA.value === 'Option_motDA') {
        var radiobuttons = document.querySelectorAll('.motDA input[type="radio"]');
        for( var i = 0; i < radiobuttons.length; i++){
            var text = document.getElementById('motDA_' + i).value.trim();
            if(text === ""){
                alert("Hãy nhập đủ câu trả lời");
                return false;
            }   
        }
        return true;
    }else if(select_loai_DA.value === 'Option_nDA'){
        var checkboxes = document.querySelectorAll('.nDA input[type="checkbox"]');
        for( var i = 0; i < checkboxes.length; i++){
            var text = document.getElementById('nDA_' + i).value.trim();
            if(text === ""){
                alert("Hãy nhập đủ câu trả lời");
                return false;
            }   
        }
        return true;
    }
}

//hàm kiểm trả đã điền đủ và tích chọn đáp án đúng chưa ?
function Kiem_tra_checked() {
    if(select_loai_DA.value === 'Option_dienDA'){
        const fill = noi_dung_dien_DA.value.trim();
        if(fill === ""){
            alert("Hãy nhập câu đủ trả lời");
            return false;
        }
        return true;
    }else if(select_loai_DA.value === 'Option_motDA') {
        const radiobuttons = document.querySelectorAll('.motDA input[type="radio"]');
        if(radiobuttons.length === 0){
            alert("Hãy tạo ít nhất 2 đáp án");
            return false;
        }

        var check = 0;
        for(var i = 0; i < radiobuttons.length; i++){
            if(radiobuttons[i].checked){
                check++;
            }
        }

        if(check == 0 ){
            alert("Bạn cần chọn đáp án đúng");
            return false;
        }

        return true;

    }else if(select_loai_DA.value === 'Option_nDA'){
        const checkboxes = document.querySelectorAll('.nDA input[type="checkbox"]');
        if(checkboxes.length === 0){
            alert("Hãy tạo ít nhất 2 đáp án");
            return false;
        }

        var check = 0;
        for(var i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked){
                check++;
            }
        }

        if(check === 0 ){
            alert("Bạn cần chọn đáp án đúng");
            return false;
        }
        return true;
    }
}


//hàm lưu lại câu trả lời
 function luu_cap_nhat_cau_hoi(){
    var questionObject = {
        Question: noi_dung_cau_hoi.value,
        Time: new Date().toLocaleString(),
        Trangthai: 'Chờ duyệt',
        Nguoigui: Account.Tendangnhap
    }
    //luu toan bo cau trả lời
    if (select_loai_DA.value === "Option_dienDA") {
        questionObject.LoaiCauhoi = "Điền đáp án";
        questionObject.Answer = collect();
        questionObject.AnswerCollect = collect();
        clear();

    } else if (select_loai_DA.value === 'Option_motDA') {

        const numOpt = parseInt(document.getElementById("Option_motDA").value);
        const optionAnswer = [];
        for (var i = 0; i < numOpt; i++) {
            optionAnswer.push(document.getElementById('motDA_' + i).value);
        }
        questionObject.Answer = optionAnswer;
        questionObject.AnswerCollect = collect();
        questionObject.LoaiCauhoi = "Một đáp án";
        questionObject.SoluongDapAn = numOpt;
        clear();

    } else if (select_loai_DA.value === "Option_nDA") {

        const numOpt = parseInt(option_so_nhieu_DA.value);
        const optionAnswer = [];
        for (var i = 0; i < numOpt; i++) {
            optionAnswer.push(document.getElementById('nDA_' + i).value);
        }
        questionObject.Answer = optionAnswer;
        questionObject.AnswerCollect = collect();
        questionObject.LoaiCauhoi = "Nhiều đáp án";
        questionObject.SoluongDapAn = numOpt;
        clear();

    }
    return questionObject;
 }

//Hàm lưu kết quả vào localstoges và chuyển câu hỏi xuống bảng
nut_luu.addEventListener('click', function() {
    if(noi_dung_cau_hoi.value === ""){
        alert("Hãy nhập đầy đủ nội dung");
    }else{
        if(Kiem_tra_ans()&& Kiem_tra_checked()){
            if(confirm("Bạn chắc chắn thêm câu hỏi chứ? ")){
                var questionObject = luu_cap_nhat_cau_hoi();
    
                danh_sach_cau_hoi.push(questionObject);
                localStorage.setItem('Câu hỏi', JSON.stringify(danh_sach_cau_hoi));
                renderQuestion();  
            }
        }
    }
})

// -------------------------------------------------------------------------------
var Edit = -1;
function sua(i){
    if(danh_sach_cau_hoi[i].Trangthai === "Đã duyệt" || danh_sach_cau_hoi[i].Trangthai === "Không được duyệt" ){
        alert("Câu hỏi đã được phản ánh, bạn không thể sửa câu hỏi");
    }else{
        if(confirm("Bạn muốn sửa câu hỏi ?")){
            Edit = i;
        
            var question = danh_sach_cau_hoi[i];

            noi_dung_cau_hoi.value = question.Question;
    
            hideALL();
            
            if(question.LoaiCauhoi =="Điền đáp án") {
                khung_dien_DA.style.display="block";
                select_loai_DA.value = 'Option_dienDA';
                noi_dung_dien_DA.value = question.Answer;
    
            }else if(question.LoaiCauhoi === "Một đáp án") {
                khung_mot_DA.style.display="block";
                select_loai_DA.value = 'Option_motDA';
                option_so_mot_DA.value = question.SoluongDapAn;
                noi_dung_mot_DA.innerHTML = '';
    
                var Soluong = question.SoluongDapAn;
                for(var j = 0; j < Soluong; j++) {
                    var input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'mDA';
                    input.id = 'motDA' + j;
            
                    var textarea = document.createElement('textarea');
                    textarea.placeholder = 'Đáp án số ' + (j + 1);
                    textarea.id = "motDA_" + j;
                    textarea.value = question.Answer[j];
            
                    var div = document.createElement('div');
                    div.appendChild(input);
                    div.appendChild(textarea);
            
                    noi_dung_mot_DA.appendChild(div);
                }
            }else if(question.LoaiCauhoi === "Nhiều đáp án"){
                khung_nhieu_DA.style.display="block";
                select_loai_DA.value = "Option_nDA";
                option_so_nhieu_DA.value = question.SoluongDapAn;
                noi_dung_nhieu_DA.innerHTML = '';
    
                var Soluong = question.SoluongDapAn;
                for(var j = 0; j < Soluong; j++) {
                    var input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = 'nDA';
                    input.id = 'nDA'+ j;
            
                    var textarea = document.createElement('textarea');
                    textarea.placeholder = 'Đáp án số ' + (j + 1);
                    textarea.id = "nDA_" + j;
                    textarea.value = question.Answer[j];
            
                    var div = document.createElement('div');
                    div.appendChild(input);
                    div.appendChild(textarea);
            
                    noi_dung_nhieu_DA.appendChild(div);
                }
            }
    
            // Ẩn nút "Lưu" và hiển thị nút "Cập nhật"
            nut_luu.style.display = "none";
            nut_cap_nhat.style.display = "block";
        }
    }
};


//hàm khi bấm nút cập nhật
nut_cap_nhat.addEventListener('click', function(){
    if(Kiem_tra_ans()&& Kiem_tra_checked()){
        if(Edit !== -1){
            if(confirm("Bạn muốn cập nhật câu hỏi ?")){
                var questionObject = luu_cap_nhat_cau_hoi();
        
                danh_sach_cau_hoi[Edit] = questionObject;
                localStorage.setItem('Câu hỏi',JSON.stringify(danh_sach_cau_hoi)) ;
                renderQuestion();
                hideALL();
            
                Edit= -1;
            }
        }
    }
})

function clear(){
    noi_dung_cau_hoi.value = "";
    option_so_nhieu_DA.value = "";
    option_so_mot_DA.value = "";
    noi_dung_nhieu_DA.innerHTML = "";
    noi_dung_mot_DA.innerHTML = "";
    noi_dung_dien_DA.value = "";

}
//Hàm ẩn các loại đáp án
function hideALL(){
    document.getElementById('capnhat').style.display="none";
    document.querySelectorAll(".dienDA, .motDA, .nDA").forEach(function(a){
        a.style.display = "none";
    });
}

// hàm xóa câu hỏi
function xoa(i){
    if(danh_sach_cau_hoi[i].Trangthai === "Đã duyệt" || danh_sach_cau_hoi[i].Trangthai === "Không được duyệt" ){
        alert("Câu hỏi đã được phản ánh, bạn không thể xóa câu hỏi");
    }else{
        if(confirm("Bạn muốn xóa câu hỏi này? ")){
            danh_sach_cau_hoi.splice(i,1);
            localStorage.setItem('Câu hỏi', JSON.stringify(danh_sach_cau_hoi));
            renderQuestion();
        }
    }
}




