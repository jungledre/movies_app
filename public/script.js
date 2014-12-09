$(function(){

$('.deleteWatch').on('click', function(event){
    event.preventDefault();
    var thisDeleteButton = $(this)

    $.ajax({
        url:'/movies/watchlist/' + thisDeleteButton.data('id'),
        type:'DELETE',
        success:function(result){
            thisDeleteButton.closest('#movie-item').slideUp('fast',function() {
                $(this).remove();
            });

        url:'/movies/watchlist/'
        }
    });
});

$('.addWatch').on('click', function(event){
    event.preventDefault();
    var thisCode = $(this).data('code')

    $.post("/movies/"+$(this).data('code'), {
        title: $(this).data('title'),
        year: $(this).data('year'),
        code: $(this).data('code')
    }, function(data){
        alert('Hello again!');
    });
});



});
