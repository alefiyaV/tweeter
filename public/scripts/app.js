$(document).ready(function() {
  alert("hello");

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


  function renderTweets(tweets) {
    for (content in tweets) {
      let tweet = tweets[content]
      let newTweet = createTweetElement(tweet)
      $('section#tweet-container').append(newTweet);
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


//$.ajax('/tweets').done(renderTweets);

function callTweetsFromMongoDb(){

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(result){
        console.log("result ",result);
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
  console.log(formData);
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