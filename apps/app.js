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
      maxResults: 10
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) { 
      showResults(data.items);
    });
  } 

  function showResults(data) {
    var html = "";
    $.each(data, function(index, value){
      if(value.id.kind === 'youtube#channel'){
      html += '<p><a target="_blank" href="https://www.youtube.com/channel/' + value.id.channelId + '">';
      html +='<img src="' + value.snippet.thumbnails.medium.url +'"></a></p>';
      } else {
        html += '<p><a target="_blank" href="https://www.youtube.com/watch?v=' + value.id.videoId + '">';
        html +='<img src="' + value.snippet.thumbnails.medium.url +'"></a></p>';
      }
      $('#search-results').html(html);
    console.log(value);
    });
    // console.log(data.items);
      
  }
});