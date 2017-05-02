(function(){
    $('#search-btn').click(function() {
        if ($('#search-field').val() === '') {
            return;
        }
        const searchTerm = $('#search-field').val();
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&videoCategoryId=10&key=AIzaSyB7EMVgOaBihxou_GLXdcZcCWSWbVg8NJ0'
        $.getJSON(url, function(data){
            $container = $('#container');
            $container.html('');
            $.each(data.items, function(i, item) {
                $result = $('<a/>').addClass('result').attr('href', 'https://www.youtube.com/watch?v=' + item.id.videoId);
                $resultTitle = $('<h3/>').addClass('result-title').text(item.snippet.title).appendTo($result);
                $resultDescription = $('<p/>').addClass('result-description').text(item.snippet.description).appendTo($result);
                $resultImage = $('<img/>').addClass('result-image').attr('src', item.snippet.thumbnails.medium.url).appendTo($result);
                $result.appendTo($container);
            })
        })
    }

    )
}());

(function() {
    $('#search-field').keypress(function(e) {
        if ($('#search-field').val() === '') {
            return;
        }
        if (e.keyCode == 13) {
            const searchTerm = $('#search-field').val();
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&videoCategoryId=10&key=AIzaSyB7EMVgOaBihxou_GLXdcZcCWSWbVg8NJ0'
        $.getJSON(url, function(data){
            $container = $('#container');
            $container.html('');
            $.each(data.items, function(i, item) {
                $result = $('<a/>').addClass('result').attr('href', 'https://www.youtube.com/watch?v=' + item.id.videoId);
                $resultTitle = $('<h3/>').addClass('result-title').text(item.snippet.title).appendTo($result);
                $resultDescription = $('<p/>').addClass('result-description').text(item.snippet.description).appendTo($result);
                $resultImage = $('<img/>').addClass('result-image').attr('src', item.snippet.thumbnails.medium.url).appendTo($result);
                $result.appendTo($container);
            })
        })
        }
    })
}());
