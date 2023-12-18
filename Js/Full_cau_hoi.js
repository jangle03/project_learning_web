// Hàm để Tạo bảng để lưu trữ câu hỏi và render câu hỏi và câu trả lời xuống bảng
var danh_sach_cau_hoi = localStorage.getItem('Câu hỏi');
danh_sach_cau_hoi = danh_sach_cau_hoi ? JSON.parse(danh_sach_cau_hoi) : [];

var dsQues = document.querySelector("#show-kq tbody");
function renderQues(){
    dsQues.innerHTML="";
    if(danh_sach_cau_hoi.length === 0){
        dsQues.innerHTML = "<tr><td colspan='7' style='text-align:center'>Không có câu hỏi đã duyệt</td></tr>";
    
    }else{
        var hasUser = danh_sach_cau_hoi.find(key => key.Trangthai === "Đã duyệt");

        if(hasUser){
            var duyecauhoi = 1;
            danh_sach_cau_hoi.forEach(key => {
                if(key.Trangthai === "Đã duyệt"){
                    const row = document.createElement("tr");
                    row.innerHTML =`
                    <td>${duyecauhoi}</td>
                    <td>${key.Nguoigui}</td>
                    <td>${key.LoaiCauhoi}</td>
                    <td>${key.Question}</td>
                    <td>${key.Answer.join(' <br> ')}</td>
                    <td>${key.AnswerCollect.join(' <br> ')}</td>
                    <td>${key.Trangthai}</td>`;
    
                    dsQues.appendChild(row);
                    duyecauhoi++;
                }
            });
        }else{
            dsQues.innerHTML = "<tr><td colspan='7' style='text-align:center'>Không có câu hỏi đã duyệt</td></tr>";
        }
    }
}

renderQues(danh_sach_cau_hoi);
