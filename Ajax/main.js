$(document).ready(function () {
  var $movies = $("#movies");

  $.ajax({
    method: "GET",
    url: "https://yts.mx/api/v2/list_movies.json",
    success: function (data) {
      $.each(data.data.movies, function (i, movie) {
        $movies.append(
          ('<tr><td><a href="/details/'+movie.id+'"><img src="' +movie.medium_cover_image +'"></a></td><td><a href="/details/'+movie.id+'">'+movie.title+'</a></td></tr>')
        );
      });
    },
  });

  $("#select").change(function () {
    var genre = $("#select").val();
    $.ajax({
      method: "GET",
      url: "https://yts.mx/api/v2/list_movies.json?genre=" + genre,
      success: function (data) {
        $movies.empty();
        $.each(data.data.movies, function (i, movie) {
          $movies.append(
              ('<tr><td><a href="/details/'+movie.id+'"><img src="' +movie.medium_cover_image +'"></a></td><td><a href="/details/'+movie.id+'">'+movie.title+'</a></td></tr>')
            );
        });
      },
    });
  });

  $("#searchMovie").on("keyup", function (e) {
    let title = e.target.value;
    $.ajax({
      method: "GET",
      url: "https://yts.mx/api/v2/list_movies.json?query_term=" + title,
      success: function (data) {
        $movies.empty();
        $.each(data.data.movies, function (i, movie) {
          $movies.append(
              ('<tr><td><a href="/details/'+movie.id+'"><img src="' +movie.medium_cover_image +'"></a></td><td><a href="/details/'+movie.id+'">'+movie.title+'</a></td></tr>')
            );
        });
      },
    });
  });

});


