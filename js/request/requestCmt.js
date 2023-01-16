const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const isCheck = document.getElementsByName("cmt_star");
const url = document.location.href;
const urlIndex = Number(url.split("=")[1]);
// console.log(isCheck);
// console.log(urlIndex);

// 상품평 작성
cmtBtn.addEventListener("click", () => {
  let selected = false;
  //입력창 작성 체크
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요.");
    cmtInputBox.focus();
    return;
  }

  //별점 작성체크
  for (let radio of isCheck) {
    if (radio.checked) {
      selected = true;
    }
  }

  if (!selected) {
    const isInput = confirm(
      "별점 평가가 없으면 한개가 입력됩니다. \n입력하시겠습니까?"
    );
    if (!isInput) {
      return;
    }
    // alert("별점 선택");
    // return;
  }

  const formData = new FormData(
    document.querySelector(".comments-form > form")
  );
  fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=post_cmt`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      // console.log(res);
      // status = res.status;
      return res.json();
    })
    .then((resData) => {
      alert(resData.msg);
      location.reload();
      // console.log(resData);
    })
    .catch((err) => {
      console.log(err);
    });
});

const cmtWrapper = document.querySelector(".comment-wrapper");
const listCount = document.querySelector(".comments-info strong");
//get comments

const getCmtLists = async () => {
  await fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=get_cmt`
  )
    .then((res) => res.json())
    .then((lists) => {
      // console.log(lists);
      if (lists.msg) {
        cmtWrapper.innerHTML = `<p class ="no-list">${lists.msg}</p>`;
        return;
      }
      listCount.textContent = lists.length;
      let listsElmt;
      lists.map((list, idx) => {
        if (list.user_id === "guest") {
          listsElmt = `<div class="comments-lists">
              <div class="list-info">
                <p>${list.user_id}  |</p>
                <em>${list.cmt_reg} |</em>
                <div class = "star-lists"></div>
              </div>
              <div class="list-content" id ="list-${idx}">
                <p>${list.cmt_cont}</p>
              </div>
            </div>`;
        } else {
          if (list.user_id === list.session_id) {
            listsElmt = `
              <div class="comments-lists">
                <div class="list-info">
                  <p>${list.user_id} |</p>
                  <em>${list.cmt_reg} |</em>
                  <button type = "button" class = "cmt-update"> 수정하기 </button> |
                  <div class = "star-lists"></div>
                </div>
                <div class="list-content" id ="list-${idx}">
                  <p>${list.cmt_cont}</p>
                </div>
              </div>
            `;
          } else {
            listsElmt = `<div class="comments-lists">
              <div class="list-info">
                <p>${list.user_id}  |</p>
                <em>${list.cmt_reg} |</em>
                <div class = "star-lists"></div>
              </div>
              <div class="list-content" id ="list-${idx}">
                <p>${list.cmt_cont}</p>
              </div>
            </div>`;
          }
        }
        cmtWrapper.innerHTML += listsElmt;
      });

      updateCmt(lists); //수정하기 기능 분리 호출
      getRating(lists); //별점 출력 함수 선언
    })
    .catch((err) => console.log(err));
};

getCmtLists();

//별점 출력 함수 선언
function getRating(star) {
  // console.log(star);
  let starArr = [];
  const starLists = document.querySelectorAll(".star-lists");
  // console.log(star.rating); //제이슨 요소가 여러개이기 때문에 언디파인디으로 읽힘
  star.forEach((num) => {
    // console.log(num.rating);
    starArr.push(num.rating);
  });

  // console.log(starArr);

  starLists.forEach((elm, i) => {
    // console.log(starArr[i]);
    const negativeNo = 5 - starArr[i];
    for (let j = 0; j < starArr[i]; j++) {
      elm.innerHTML += '<i class = "ri-star-fill"></i>';
    }

    for (let k = 0; k < negativeNo; k++) {
      elm.innerHTML += '<i class = "ri-star-line"></i>';
    }
  });
}

//수정하기 기능 함수 선언
function updateCmt(cmtObjs) {
  // console.log(cmtObjs);
  const cmtUpBtns = document.querySelectorAll("button.cmt-update"); //수정하기 버튼 그룹
  // console.log(cmtUpBtns);
  if (cmtObjs.length !== 0 && cmtUpBtns) {
    cmtUpBtns.forEach((btn) => {
      // console.log(btn);
      btn.addEventListener("click", function () {
        //console.log(this);
        //노드 추적은 공백을 포함한다.
        const changeInput = this.parentNode.nextSibling.nextSibling;
        const thisIdx = changeInput.getAttribute("id").split("-")[1];
        console.log(thisIdx);
        // console.log(changeInput);
        console.log(cmtObjs[thisIdx].cmt_cont);
        this.classList.toggle("active");
        if (btn.classList.contains("active")) {
          this.textContent = "취소하기";
          changeInput.innerHTML = `
          <form onsubmit = "return false;" class ="update-form update-form-${thisIdx}">
            <input type = "text" name = "update_cont" value = "${cmtObjs[thisIdx].cmt_cont}">
            <button type = "submit">수정입력</button>
          </form>
          `;

          const udSubmitBtn = document.querySelector(
            `.update-form-${thisIdx} button`
          );

          udSubmitBtn.addEventListener("click", function () {
            const formData = new FormData(
              document.querySelector(`.update-form-${thisIdx}`)
            );
            fetch(
              `/main_backend/model/cmt_ctrl.php?cmt_idx=${cmtObjs[thisIdx].cmt_idx}&req_sign=patch_cmt`,
              {
                method: "PATCH",
                body: formData,
              }
            )
              .then((res) => {
                // console.log(res);
                // status = res.status;
                return res.json();
              })
              .then((resData) => {
                // console.log(resData);
                alert(resData.msg);
                location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else {
          this.textContent = "수정하기";
          changeInput.innerHTML = `
          <p>${cmtObjs[thisIdx].cmt_cont}</p>
          `;
        }
      });
    });
  } else {
  }
}
