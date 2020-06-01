$(document).ready(function(){

    var $movies = $('#movies');

    $.ajax({
        method: 'GET',
        url: 'https://yts.mx/api/v2/list_movies.json',
        success: function(data){
            $.each(data.data.movies, function(i, movie){
                $movies.append('<img src="'+movie.medium_cover_image+'"><p>'+movie.title+'</p><br>');
            });
        }
    });
});