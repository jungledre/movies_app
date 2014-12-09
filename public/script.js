$(function(){

$('.deleteWatch').on('click', function(event){
    event.preventDefault();
    var thisDeleteButton = $(this)

    var movieNumbers = $(movieNumbers)

    $.ajax({
        url:'/movies/watchlist/' + thisDeleteButton.data('id'),
        type:'DELETE',
        success:function(result){
            thisDeleteButton.closest('#movie-item').slideUp('fast',function() {
                $(this).remove();
            });

        url:'/movies/watchlist/'



        }
    })
    // $.ajax({
    //       type: "POST",
    //       url: '/movies/watchlist/',
    //       data: data,
    //       success: function(result){
    //         thisDeleteButton.closest('#movie-count').text("Adrienne RULES");
    //         }
    //       dataType: dataType
    //     });
})

});
