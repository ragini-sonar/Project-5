var $movie_id;

$(document).ready(function () {
  var $movies = $("#movies");
  $movie_id = $(".movie_id");

  // display homepage
  $.ajax({
    method: "GET",
    url: "https://yts.mx/api/v2/list_movies.json",
    success: function (data) {
      $.each(data.data.movies, function (i, movie) {
        $movies.append(
          '<tr><td><a href="/details/' +
            movie.id +
            '"><img src="' +
            movie.medium_cover_image +
            '"></a></td><td><a href="/details/' +
            movie.id +
            '">' +
            movie.title +
            "</a></td></tr>"
        );
      });
    },
  });

  // genre dropdown
  $("#select").change(function () {
    var genre = $("#select").val();
    $.ajax({
      method: "GET",
      url: "https://yts.mx/api/v2/list_movies.json?genre=" + genre,
      success: function (data) {
        $movies.empty();
        $.each(data.data.movies, function (i, movie) {
          $movies.append(
            '<tr><td><a href="/details/' +
              movie.id +
              '"><img src="' +
              movie.medium_cover_image +
              '"></a></td><td><a href="/details/' +
              movie.id +
              '">' +
              movie.title +
              "</a></td></tr>"
          );
        });
      },
    });
  });

  // search bar
  $("#searchMovie").on("keyup", function (e) {
    let title = e.target.value;
    $.ajax({
      method: "GET",
      url: "https://yts.mx/api/v2/list_movies.json?query_term=" + title,
      success: function (data) {
        $movies.empty();
        $.each(data.data.movies, function (i, movie) {
          $movies.append(
            '<tr><td><a href="/details/' +
              movie.id +
              '"><img src="' +
              movie.medium_cover_image +
              '"></a></td><td><a href="/details/' +
              movie.id +
              '">' +
              movie.title +
              "</a></td></tr>"
          );
        });
      },
    });
  });

  // display details page
  $.ajax({
    method: "GET",
    url:
      "https://yts.mx/api/v2/movie_details.json?movie_id=" +
      $movie_id.attr("id"),
    success: function (data) {
      var movieData = data.data.movie;
      $movie_id.append(
        '<tr><td><img src="' +
          movieData.medium_cover_image +
          '"></td><td><p>' +
          movieData.title +
          "</p><br><p>" +
          movieData.year +
          "</p><br><p>" +
          movieData.description_intro +
          "</p><br></td></tr>"
      );
    },
  });
});
