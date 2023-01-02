const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const url = document.location.href;
const urlIndex = Number(url.split("=")[1]);
console.log(urlIndex);

cmtBtn.addEventListener("click", () => {
  //입력창 작성 체크
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요.");
    cmtInputBox.focus();
    return;
  }

  const formData = new FormData(document.querySelector(".comments-form form"));
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
      console.log(lists);
      if (lists.msg) {
        cmtWrapper.innerHTML = `<p class ="no-list">${lists.msg}</p>`;
        return;
      }
      listCount.textContent = lists.length;
      let listsElmt;
      lists.map((list) => {
        if (list.user_id === list.session_id) {
          listsElmt = `
            <form onsubmit = "return false;">
              <div class="comments-lists">
                <div class="list-info">
                  <p>${list.user_id} |</p>
                  <em>${list.cmt_reg} |</em>
                  <button type = "submit" class = "cmt_update"> 수정하기 </button> 
                </div>
                <div class="list-content">
                  <p>${list.cmt_cont}</p>
                </div>
              </div>
            </form>  
            `;
        } else {
          listsElmt = `<div class="comments-lists">
              <div class="list-info">
                <p>${list.user_id}  |</p>
                <em>${list.cmt_reg}</em>
              </div>
              <div class="list-content">
                <p>${list.cmt_cont}</p>
              </div>
            </div>`;
        }
        cmtWrapper.innerHTML += listsElmt;
      });
    })
    .catch((err) => console.log(err));
};

getCmtLists();
