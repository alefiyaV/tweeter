$(document).ready(function() {

  function renderTweets(tweets) {
    for (content in tweets) {
      let tweet = tweets[content]
      let newTweet = createTweetElement(tweet)
      $('section#tweet-container').prepend(newTweet);
    }
  }

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    let $header = $('<header>').addClass('tweet-header');
    let $img = $('<img>').addClass('avatar').attr('src', `${tweet.user.avatars.small}`);
    let $userName = $('<h3>').text(`${tweet.user.name}`);
    let $handle = $('<p>').addClass('handle').text(`${tweet.user.handle}`);
    let $content = $('<p>').addClass('content').text(`${tweet.content.text}`);
    let $footer = $('<footer>').addClass('tweet-footer');
    let $timestamp = $('<p>').addClass('time-stamp').text(`${tweet.created_at}`);
    let $interactionImgs1 = $('<img>').addClass('interaction').attr('src', '/images/flag.png');
    let $interactionImgs2 = $('<img>').addClass('interaction').attr('src', '/images/heart.png');
    let $interactionImgs3 = $('<img>').addClass('interaction').attr('src', '/images/retweet.png');

    $header.append($img, $userName, $handle)
    $footer.append($timestamp, $interactionImgs1, $interactionImgs2, $interactionImgs3)

    $tweet.append($header, $content, $footer);

    return $tweet
  };


$.ajax('/tweets').done(renderTweets);

function callTweetsFromMongoDb(){

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(result){
        console.log("we are in success");
        renderTweets(result);
      },
      error: function(err){
        console.log("we are in error");
      }
  });

}

$('#new-tweet-form').on('submit', function (e) {
  e.preventDefault();

  let formData = $('#new-tweet-form').serialize();
  let text = $('#tweet-text').val()

  if (text === "" || text === null || text.length > 140) {
    alert("Please enter a valid tweet");
    return;
  }
  //console.log(formData);
  $.ajax({
    method:'POST',
    url: '/tweets',
    data: formData,
    success: function(result){
      console.log("The AJAX POST was successful");
    },
    error: function(err){
      console.log("There was an error in posting",err);
    }
  }).then(function () {
    $('#tweet-text').val('');
    $('#char-counter').text(140);
    callTweetsFromMongoDb();
  });
  //   return $.ajax('/');
  // }).then(renderTweets);
});

  //Starting point of the script.
  //renderTweets(data);
  callTweetsFromMongoDb();


}); //Document ready ends here.