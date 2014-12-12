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
    // var thisCode = $(this).data('code')
    var thisButtonAdd = $(this).find('button');

    console.log({
        title: thisButtonAdd.data('title'),
        year: thisButtonAdd.data('year'),
        code: thisButtonAdd.data('code')

    });

    $.post('/movies', {
        title: thisButtonAdd.data('title'),
        year: thisButtonAdd.data('year'),
        code: thisButtonAdd.data('code')

    }, function(data){
        thisButtonAdd.closest('.addWatch').hide('fast', function(){ $('.hiddenAdd').show('fast') })

    });
});



});
