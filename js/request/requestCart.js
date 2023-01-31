const getCartLists = async () => {
  await fetch("/soaply_backend/model/cart_ctrl.php?req_cart=get_cart")
    .then((res) => res.json())
    .then((cartData) => {
      const cartWrapper = document.querySelector(".cart-lists-wrapper");

      if (cartData.length === 0) {
        cartWrapper.innerHTML = `<p class="no-cart">카트에 상품이 없습니다.</p>`;
        return;
      }

      cartData.map((list) => {
        cartListEl = `
            <div class="cart-list">
              <div class="cart-frame">
                <div class="cart-image">
                  <img src="/soaply/images/products/${list.cart_img}" alt="">
                </div>
              </div>
              <div class="cart-text">
                <h2 class="item-title">${list.cart_name}</h2>
                <p> ${list.cart_desc}</p>
              </div>
              <div class="cart-price">
                <div class="qnts">
                  <button class ="down">-</button>
                  <strong class = "count">${list.cart_count}</strong>
                  <button class = "up">+</button>
                </div>
                <div class="sum">
                  합계 : <em>${list.cart_sum}</em>원
                </div>
              </div>
              <div class="cart-btns">
                <button class="common-btn remove-cart" id ="btn-${list.cart_idx}">상품삭제</button>
                <button class="common-btn">바로구매</button>
              </div>
            </div>
            `;
        cartWrapper.innerHTML += cartListEl;
      });

      const rmvCartBtn = document.querySelectorAll(".remove-cart");
      rmvCartBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          const cartIdx = Number(this.getAttribute("id").split("-")[1]);
          fetch(
            `/soaply_backend/model/cart_ctrl.php?req_cart=del_cart&cart_idx=${cartIdx}`
          )
            .then((res) => res.json())
            .then((del) => {
              alert(del.msg);
              location.reload();
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
};
window.addEventListener("load", getCartLists);
