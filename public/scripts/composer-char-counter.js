$(document).ready(function() {

let textarea = $('textarea');

textarea.on('keypress', function() {
  let originalCount = 139;
  let counted = $(this).val().length;
  console.log(originalCount - counted)
});


});