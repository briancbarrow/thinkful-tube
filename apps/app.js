
$(document).ready(function(){
  $('.lightbox').hide();
  $('#overlay').height($(window).height());
  $('#overlay').width($(window).width());
  $('.lightbox').height(0.6 * $(document).height());
  var searchTerm = '';
  $('#search-term').on('submit', function(event){
    event.preventDefault();    
    searchTerm = $('#query').val();
    getRequest(searchTerm);
  });

  function getRequest(searchTerm){
    var params = {
      part: 'snippet',
      q: searchTerm,
      key: 'AIzaSyAOlN6_KVX0PqPLsaA6raMgHhyA8DeX5Hw',
      maxResults: 10
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) { 
      // console.log(data);
      showResults(data);
    });
  };

  function getMoreResults(token) {
    var params = {
      part: 'snippet',
      q: searchTerm,
      key: 'AIzaSyAOlN6_KVX0PqPLsaA6raMgHhyA8DeX5Hw',
      maxResults: 10,
      pageToken: token
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) {
      showMore(data);
      //console.log(data);
    });
  };

  function showResults(data) {
    var html = "";

    $.each(data.items, function(index, value){      
      if(value.id.kind === 'youtube#channel'){
        html += '<div class="channel-result">';
        html += '<h3>Channel: ' + value.snippet.channelTitle + '</h3>';
        html += '<a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId + '">';
        html += '<img src="' + value.snippet.thumbnails.medium.url +'"></a></div>';
      } else {
        html += '<div class="result">';
        html += '<h3>' + value.snippet.title + '</h3>';
        html += '<p><a class="hide" target="_blank" href="https://www.youtube.com/embed/' + value.id.videoId + '">test link</a>';
        html += '<img src="' + value.snippet.thumbnails.medium.url +'"></p>';
        html += '<a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId;
        html += '<p class="more">More from this channel</p></a></div>'
      }
      $('#search-results').html(html);
    // console.log(value);
    });
    $('#search-results').append(
      '<p class="show-more">Show More</p>'
      );
    // console.log(data.items);    
    $('.show-more').on('click', function(event){
      $('.show-more').hide();
      getMoreResults(data.nextPageToken);
    })  
  };

  function showMore(data) {
    $.each(data.items, function(index, value){      
      if(value.id.kind === 'youtube#channel'){
        console.log(value.id.kind);
        $('#search-results').append(
          '<div class="channel-result">' +
          '<h3>Channel: ' + value.snippet.channelTitle + '</h3>' +
          '<a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId + '">' +
          '<img src="' + value.snippet.thumbnails.medium.url +'"></a></div>'
        );
      } else {
        console.log(value.id.kind);
        $('#search-results').append(
          '<div class="result">' +
          '<h3>' + value.snippet.title + '</h3>' +
          '<p><a class="hide" target="_blank" href="https://www.youtube.com/embed/' + value.id.videoId + '">test link</a>' +
          '<img src="' + value.snippet.thumbnails.medium.url +'"></p>' +
          '<a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId +
          '<p class="more">More from this channel</p></a></div>'
        );
      }      
    });
    $('#search-results').append(
        '<p class="show-more">Show More</p>'
      );
    $('.show-more').on('click', function(event){
      $('.show-more').hide();
      getMoreResults(data.nextPageToken);
    })  
  };
  $('#search-results').on('click', '.result', function(event){
    var link = $(this).children('p').children('.hide').attr('href');
    var left = $(document).width() * 0.25;
    $('.lightbox').width(left * 2);
    $('.lightbox').css('left', left)
    $('#overlay').fadeIn(500);
    $('.lightbox').fadeIn(501);
    $('.lightbox iframe').attr('src', link);
  });
  $('#overlay').on('click', function(event) {
    $('#overlay').fadeOut(500);
    $('.lightbox iframe').attr('src', $('iframe').attr('src'));
    $('.lightbox').fadeOut(400);

  })
});