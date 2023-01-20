$(function () {
  // Navigation Moving to Target Section
  $(document).ajaxComplete(function () {
    //비동기 데이터가 완전히 로된 이후 실행
    $(".nav-lists li").on("click", function (e) {
      e.preventDefault(); //a에 적용된 기본 기능 제거 (클릭 이벤트)
      const targetIdx = $(this).index();
      const pagePosition = $(".nav-target").eq(targetIdx).offset().top;
      $("html, body").animate({ scrollTop: pagePosition - 30 }, 100);
    });
  });
});
