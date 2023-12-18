// Hàm để Tạo bảng để lưu trữ câu hỏi và render câu hỏi và câu trả lời xuống bảng
var danh_sach_cau_hoi = localStorage.getItem('Câu hỏi');
danh_sach_cau_hoi = danh_sach_cau_hoi ? JSON.parse(danh_sach_cau_hoi) : [];

var dsQues = document.querySelector("#show-kq tbody");
function renderQues(){
    dsQues.innerHTML="";

    if(danh_sach_cau_hoi.length === 0){
        dsQues.innerHTML = "<tr><td colspan='9' style='text-align:center'>Không có dữ liệu câu hỏi từ người gửi</td></tr>";
    
    }else{
        danh_sach_cau_hoi.forEach((key, i) => {
            const row = document.createElement("tr");
            row.innerHTML =`
            <td>${i+1}</td>
            <td>${key.Nguoigui}</td>
            <td>${key.Question}</td>
            <td>${key.AnswerCollect.join(' <br> ')}</td>
            <td id="duyet">${key.Trangthai}</td>
            <td>
                <button type="button" id="delete" class="xoa_${i}" onclick="xoa(${i})">Xóa</button>
                <button type="button" id="duyet" class="duyet${i}" onclick="duyet(${i})"></button>
                <button type="button" id="khongduyet" class="khong_duyet${i}" onclick="khongduyet(${i})"></button>
                <button type="button" id="xem_chi_tiet_${i}" onclick=xem_chi_tiet(${i})>Xem chi tiết</button>
            </td> `;

            dsQues.appendChild(row);
        })
    }

    for(var i = 0; i < danh_sach_cau_hoi.length; i++){
        if(danh_sach_cau_hoi[i].Trangthai === "Chờ duyệt"){
            document.querySelector(`.duyet${i}`).innerHTML = "Duyệt";
            document.querySelector(`.khong_duyet${i}`).innerHTML = "Không được duyệt";
        }else if(danh_sach_cau_hoi[i].Trangthai === "Đã duyệt"){
            document.querySelector(`.duyet${i}`).innerHTML = "Hủy đã duyệt";
            document.querySelector(`.khong_duyet${i}`).innerHTML = "Không được duyệt";
        }else if(danh_sach_cau_hoi[i].Trangthai === "Không được duyệt"){
            document.querySelector(`.duyet${i}`).innerHTML = "Duyệt";
            document.querySelector(`.khong_duyet${i}`).innerHTML = "Hủy không duyệt";
        }
    }
}

// hàm xóa câu hỏi
function xoa(i){
    if(confirm("Bạn muốn xóa câu hỏi này ư? ")){
        danh_sach_cau_hoi.splice(i,1);
        localStorage.setItem('Câu hỏi', JSON.stringify(danh_sach_cau_hoi));
        renderQues();
    }
}

renderQues();

// Hàm duyệt và không được duyệt câu hỏi
function duyet(i) {
    if (danh_sach_cau_hoi[i].Trangthai === "Chờ duyệt" || danh_sach_cau_hoi[i].Trangthai === "Không được duyệt") {
        danh_sach_cau_hoi[i].Trangthai = "Đã duyệt";
        localStorage.setItem('Câu hỏi', JSON.stringify(danh_sach_cau_hoi));
        renderQues();
    } else if (danh_sach_cau_hoi[i].Trangthai === "Đã duyệt") {
        danh_sach_cau_hoi[i].Trangthai = "Chờ duyệt";
        localStorage.setItem('Câu hỏi', JSON.stringify(danh_sach_cau_hoi));
        renderQues();
    }
}


function khongduyet(i){
    if(danh_sach_cau_hoi[i].Trangthai === "Chờ duyệt" || danh_sach_cau_hoi[i].Trangthai === "Đã duyệt"){
        danh_sach_cau_hoi[i].Trangthai = "Không được duyệt";
        localStorage.setItem('Câu hỏi', JSON.stringify(danh_sach_cau_hoi));
        renderQues();
    }else if(danh_sach_cau_hoi[i].Trangthai === "Không được duyệt"){
        danh_sach_cau_hoi[i].Trangthai = "Chờ duyệt";
        localStorage.setItem('Câu hỏi', JSON.stringify(danh_sach_cau_hoi));
        renderQues();
    }
}


