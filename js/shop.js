// $(function () {
//   $(document).ajaxComplet(function () {
//     const loadMore = () => {
//       console.log($(".product-frame"));
//     };

//     loadMore();
//   });
// });

window.addEventListener("load", function () {
  $(function () {
    // console.log($(".product-frame"));
    $(".product-frame").hide();
    $(".product-frame").slice(0, 3).show(); //참조 : https://hianna.tistory.com/398
  });
});
