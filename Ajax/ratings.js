var ratedIndex = 0;

$(document).ready(function () {
  reSetStarColor();
  getAverageRating();

  // update ratings without reloading the page
  $("#submit").mouseleave(function () {
    getAverageRating();
  });

  $(".fa-star").on({
    // rating stars
    click: function () {
      ratedIndex = parseInt($(this).attr("data-index"));
    },

    // mouseover the stars
    mouseover: function () {
      reSetStarColor();
      var currentIndex = parseInt($(this).attr("data-index"));

      for (i = 0; i < currentIndex; i++) {
        $(".fa-star:eq(" + i + ")").css("color", "yellow");
      }
    },

    // mouseleave the stars
    mouseleave: function () {
      reSetStarColor();
      if (ratedIndex != 0) {
        for (i = 0; i < ratedIndex; i++) {
          $(".fa-star:eq(" + i + ")").css("color", "yellow");
        }
      }
    },
  });

  // submit the rating
  $("#submit").on("click", function () {
    saveToDatabase();
    console.log("saved to databse", ratedIndex);
  });
});

// printing average rating
function getAverageRating() {
  $.ajax({
    url: "/averageRating/" + $movie_id.attr("id"),
    method: "GET",
    processData: false,
    success: function (data) {
      document.getElementById("average").innerHTML =
        "Average rating: " +
        data.avgRating +
        "/5" +
        " 🎞️ " +
        "Total Ratings: " +
        data.nRatings;
    },
    error: function () {
      console.log("error found");
    },
  });
}

// insert rating to database through /saverating
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

// reset stars to black
function reSetStarColor() {
  $(".fa-star").css("color", "black");
}
