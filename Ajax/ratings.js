var ratedIndex = 0;

$(document).ready(function () {
  reSetStarColor();

  $(".fa-star").on("click", function () {
    ratedIndex = parseInt($(this).attr("data-index"));
  });

  $(".fa-star").mouseover(function () {
    reSetStarColor();
    var currentIndex = parseInt($(this).attr("data-index"));

    for (i = 0; i < currentIndex; i++) {
      $(".fa-star:eq(" + i + ")").css("color", "yellow");
    }
  });

  $(".fa-star").mouseleave(function () {
    reSetStarColor();

    if (ratedIndex != 0) {
      for (i = 0; i < ratedIndex; i++) {
        $(".fa-star:eq(" + i + ")").css("color", "yellow");
      }
    }
  });

  $("#submit").on("click", function () {
    saveToDatabase();
    console.log(ratedIndex);
  });
});

function saveToDatabase() {
  $.ajax({
    url: "/saverating",
    type: "POST",
    dataType: "json",
    containtType: "application/json; charset=utf-8",
    data: {
      movie_id: $(".movie_id").attr("id"),
      rating: ratedIndex,
    },
    success: function (res) {
      console.log("success in savetodatabasefunction");
    },
  });
}

function reSetStarColor() {
  $(".fa-star").css("color", "black");
}
