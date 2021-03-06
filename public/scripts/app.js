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
    let $timestamp = $('<p>').addClass('time-stamp').text(`Question posted on ${tweet.created_at}`);
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

  $('#error').hide();

  $('#new-tweet-form').on('submit', function (e) {
  e.preventDefault();

  let formData = $('#new-tweet-form').serialize();
  let text = $('#tweet-text').val()

  if (text === "" || text === null || text.length > 140) {
    $('#error').show(200);
    return;
  }

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
    $('#error').text();
    callTweetsFromMongoDb();
    });
  });

  callTweetsFromMongoDb();

  $('.new-tweet').hide();
  $('.tweet-button').on('click', function() {
    $('.new-tweet').slideDown(500);
    $('textarea#tweet-text').focus();
  $('#load-more-tweets').on('click', function() {
    $('#error').hide();
    })

  });
}); //Document ready ends here.