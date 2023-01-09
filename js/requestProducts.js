/********** Get products json data **********/
const productsBox = document.querySelector(".products");

const pgadr = window.location.href;
let queryQnt;
if (pgadr.includes("shop")) {
  queryQnt = "all";
} else {
  queryQnt = 3;
}

const getData = async () => {
  await fetch(`/main_backend/model/get_products.php?qnt=${queryQnt}`)
    .then((response) => response.json())
    .then((data) => {
      let dataEl;
      data.map((item) => {
        // console.log(item);
        dataEl = `
        <div class="product-frame">
          <div class="product-item">
            <img src="/main_project/images/products/${item.pro_img}" alt="" />
            <div class="product-text">
              <h4>${item.pro_name}</h4>
              <strong>${item.pro_pri
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
              <p>${item.pro_desc}</p>
              <a href="/main_project/pages/details.html?idx=${
                item.pro_idx
              }" class="common-btn">자세히보기</a>
            </div>
          </div>
        </div>
        `;
        productsBox.innerHTML += dataEl;
      });
    })
    .catch((err) => console.log(err));
};
getData();
