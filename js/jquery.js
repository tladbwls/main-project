// $(document).ready(function () {
//   //do somethinh...
// }); //not recommeded... (추천 안 함)

$(function () {
  //Masonry Efeect
  //   $(".grid").masonry({
  //     // options
  //     itemSelector: ".grid-item",
  //     // columnWidth: 200,
  //   });

  const gridBox = $(".grid");
  //   console.log(gridBox);

  const getGalleryData = (data) => {
    let items = [];
    $.each(data, function (i, item) {
      //   console.log(i);
      //   console.log(item);
      const galleryItems = `<div class="grid-item">
    <img src="/images/${item.datamain}" alt="" />
  </div>`;
      items.push($(galleryItems).get(0));
    });
    $(".grid").append(items);
    $(".grid").imagesLoaded(function () {
      // images have loaded
      $(".grid").masonry({
        // options
        itemSelector: ".grid-item",
        // columnWidth: 200,
      });
    });
  };

  $.getJSON("/data/gallery.json", getGalleryData);

  // Navigation Moving to Target Section
  $(".nav-lists li").on("click", function () {
    const targetIdx = $(this).index();
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;
    // console.log(pagePosition);
    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); //recommended...
