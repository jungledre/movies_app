$(function(){

$('.deleteWatch').on('click', function(event){
    event.preventDefault();
    var thisDeleteButton = $(this)
    $.ajax({
        url:'/watchlist/' + thisDeleteButton.data('id'),
        type:'DELETE',
        success:function(result){
            thisDeleteButton.closest('#watchlist-item').slideUp('fast',function() {
                $(this).remove();
                // $('.movie-count').each(function(i){
                //     $(this).text(i+1)
                // });
            })

        url:'/watchlist/'
        }
        // beforeSend:function(result){
        //     $(.deleteWatch).addClass('is-loading');
        // }
    });
});

$('.hiddenAdd').on('click', function(event){
    event.preventDefault();
    var thisDeleteButton = $(this)

    $.ajax({
        url:'/watchlist/' + data('code'),
        type:'DELETE',
        success:function(result){
            alert("hi")
            thisDeleteButton.closest('.hiddenAdd').hide('fast',function() {
                $thisDeleteButton.remove();
                $('.addWatch').show('fast')
            })
        }
    });

});

$('.addWatch').on('click', function(event){
    event.preventDefault();
    var thisButtonAdd = $(this).find('button');

    $.post('/', {
        title: thisButtonAdd.data('title'),
        year: thisButtonAdd.data('year'),
        code: thisButtonAdd.data('code')

    }, function(data){
        thisButtonAdd.closest('.addWatch').toggle();
        $('.hiddenAdd').toggle();;
    });
});
});
