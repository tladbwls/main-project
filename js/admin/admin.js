//jQuery logic
$(function () {
  $(".upload-hidden").on("change", function () {
    //on은 자바스크립트의 addEventListner 역할을 한다.
    let fileneme;
    if (window.FileReader) {
      //파일 리더 작동 확인
      fileneme = $(this)[0].files[0].name;
      console.log(fileneme);
    }
    $(this).siblings().val(fileneme);
  });
  $("#main-image").on("change", imgFileSelect);
});

// imgFileSelect function here...
const imgFileSelect = (event) => {
  const input = event.target; //변화된 입력창 타켓 저장
  const reader = new FileReader(); //FileReader 기능 저장 - 서버로 전송되는 파일의 정보를 읽음
  reader.onload = function () {
    const dataURL = reader.result; //base64로 인코딩된 값
    const output = document.querySelector("#img");
    output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); //파일 입력이 저장된 객체의 files배열에 FileReader 기능 실행
};

//tabs code
const btns = document.querySelectorAll(".admin-btns button");
const panels = document.querySelectorAll(".admin-panels .panel");

btns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    btns.forEach((item) => {
      item.classList.remove("active");
    });
    panels.forEach((panel) => {
      panel.style.display = "none";
    });
    btns[idx].classList.add("active");
    panels[idx].style.display = "flex";
  });
});
