//1. 클릭(submit) 요소 선택
const submitBtn = document.querySelector('input[type="submit"]');

//3. 제출 버튼 클릭했을 때 서버로 데이터 요청 후 응답값 출력
submitBtn.addEventListener("click", () => {
  //2. form에 작성한 데이터와 프로그램이 읽어들인 파일 데이터 저장
  const formData = new FormData(document.querySelector("form"));
  fetch("/main_backend/model/product_upload.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      alert(data.msg);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

// //get comments

// const getCmtLists = async () => {
//   await fetch(
//     `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=get_cmt`
//   )
//     .then((res) => res.json())
//     .then((lists) => {
//       console.log(lists);
//     })
//     .catch((err) => console.log(err));
// };

// getCmtLists();
