$(function(){

$('.deleteWatch').on('click', function(event){
    event.preventDefault();
    var thisDeleteButton = $(this)

    $.ajax({
        url:'/watchlist/' + thisDeleteButton.data('id'),
        type:'DELETE',
        success:function(result){
            thisDeleteButton.closest('#movie-item').slideUp('fast',function() {
                $(this).remove();
            });

        url:'/watchlist/'
        }
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
    // var thisCode = $(this).data('code')
    var thisButtonAdd = $(this).find('button');

    console.log({
        title: thisButtonAdd.data('title'),
        year: thisButtonAdd.data('year'),
        code: thisButtonAdd.data('code')
    });

    $.post('/', {
        title: thisButtonAdd.data('title'),
        year: thisButtonAdd.data('year'),
        code: thisButtonAdd.data('code')

    }, function(data){
        thisButtonAdd.closest('.addWatch').hide('fast', function(){ $('.hiddenAdd').show('fast') })
    });
});
});
