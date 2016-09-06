$(document).ready(function(){
  $('#search-term').on('submit', function(event){
    event.preventDefault();    
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });

  function getRequest(searchTerm){
    var params = {
      part: 'snippet',
      q: searchTerm,
      key: 'AIzaSyAOlN6_KVX0PqPLsaA6raMgHhyA8DeX5Hw',
      maxResults: 2
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) { 
      console.log(data);
      showResults(data);
    });
  };

  function getMoreResults(token) {
    var params = {
      part: 'snippet',
      key: 'AIzaSyAOlN6_KVX0PqPLsaA6raMgHhyA8DeX5Hw',
      maxResults: 2,
      pageToken: token
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) {
      showMore(data);
      console.log(data);
    });
  };

  function showResults(data) {
    var html = "";
    $.each(data.items, function(index, value){
      if(value.id.kind === 'youtube#channel'){
        html += '<div class="result">';
        html += '<h3>Channel: ' + value.snippet.channelTitle + '</h3>';
        html += '<a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId + '">';
        html += '<img src="' + value.snippet.thumbnails.medium.url +'"></a></div>';
      } else {
        html += '<div class="result">';
        html += '<h3>' + value.snippet.title + '</h3>';
        html += '<p><a target="_blank" href="https://www.youtube.com/watch?v=' + value.id.videoId + '">';
        html += '<img src="' + value.snippet.thumbnails.medium.url +'"></a></p>';
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
    console.log(data);
    $.each(data.items, function(index, value){
      if(value.id.kind === 'youtube#channel'){
        $('#search-results').append(
          '<div class="result">' +
          '<h3>Channel: ' + value.snippet.channelTitle + '</h3>' +
          '<a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId + '">' +
          '<img src="' + value.snippet.thumbnails.medium.url +'"></a></div>'
        );
      } else {
        $('#search-results').append(
          '<div class="result">' +
          '<h3>Channel: ' + value.snippet.title + '</h3>' +
          '<p><a target="_blank" href="https://www.youtube.com/channel/' + value.id.videoId + '">' +
          '<img src="' + value.snippet.thumbnails.medium.url +'"></a></p>' +
          '<a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId +
          '<p class="more">More from this channel</p></a></div>'
        );
      }      
    });
    $('#search-results').append(
        '<p class="show-more"><a href="#">Show More</a></p>'
      );
  }
});