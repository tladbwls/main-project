window.addEventListener("load", function () {
  async function checkSign() {
    const userIcon = this.document.querySelectorAll(".user");
    const adminIcon = this.document.querySelectorAll(".admin");
    const cart = this.document.querySelector(".cart");

    this.fetch("/soaply_backend/etc/check_sign.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const cartItemEl = `
         <a href="/soaply/pages/cart.html"><i class="ri-shopping-cart-line"></i><em>(${data.cart_count})</em></a>  
        `;

        if (data.userid === "guest") {
          //로그인 하지 않았을 때
          adminIcon.forEach((item) => {
            item.style.display = "none";
          }); //어드민 가려줌
          userIcon.forEach((item) => {
            item.innerHTML = ` <a href="/soaply/pages/sign-in.html">
            <i class="ri-user-3-fill"></i>
          </a>`;
          }); //사용자 정보 없는 아이콘

          cart.innerHTML = cartItemEl; //카트 숫자 아이콘
        } else {
          if (data.user_lvl === 1) {
            adminIcon.forEach((item) => {
              item.style.display = "flex";
            });
            userIcon.forEach((item) => {
              item.innerHTML = `<button class = "signout"><span>${data.userid}</span>&nbsp | <a href = "#">Logout</button>`;
            });

            cart.innerHTML = cartItemEl;
          } else {
            adminIcon.forEach((item) => {
              item.style.display = "none";
            });
            userIcon.forEach((item) => {
              item.innerHTML = `<button class = "signout"><span>${data.userid}</span>&nbsp | <a href = "#">Logout</button>`;
            });

            cart.innerHTML = cartItemEl;
          }
        }

        const signoutBtn = this.document.querySelectorAll(".signout a");

        if (signoutBtn) {
          signoutBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              e.preventDefault();
              this.fetch("/soaply_backend/model/register.php?q=signout")
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  this.alert("로그아웃 되었습니다!!");
                  this.location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  this.setTimeout(function () {
    checkSign();
  }, 300);
});
