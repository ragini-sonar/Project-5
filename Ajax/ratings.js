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
    console.log("saved to databse", ratedIndex);
  });
});

function saveToDatabase() {
  $.ajax({
    url: "/saverating",
    type: "POST",
    data: {
      movie_id: $(".movie_id").attr("id"),
      rating: ratedIndex,
    },
    success: function (data) {
      document.getElementById("detail-container").innerHTML = data.message;
    },
    error: function (data) {
      document.getElementsByClassName("container").innerHTML =
        data.responseText;
    },
  });
}

function reSetStarColor() {
  $(".fa-star").css("color", "black");
}
