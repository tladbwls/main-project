// $(document).ready(function () {
//   //do somethinh...
// }); //not recommeded... (추천 안 함)

$(function () {
  // Navigation Moving to Target Section
  $(".nav-lists li").on("click", function (e) {
    e.preventDefault(); //a에 적용된 기본 기능 제거 (클릭 이벤트)
    const targetIdx = $(this).index();
    console.log(this);
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;
    console.log($(".nav-lists li"));
    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); //recommended...
