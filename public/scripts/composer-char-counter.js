$(document).ready(function() {

let textarea = $('textarea');

textarea.on('input', function() {
  const counted = $(this).val().length;
  const counter = $(this).siblings('.counter');
  const charactersRemaining = 140 - counted;
  const updatedCount = counter.text(charactersRemaining);
  if (updatedCount.text() < 1) {
  updatedCount.css("color", "red");
  } else {
    updatedCount.css("color", "black");
  }
});


});