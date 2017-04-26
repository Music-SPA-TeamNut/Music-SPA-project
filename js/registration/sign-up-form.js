let $form = $("#register");
let $wrapper = $('#main-div');
let $cancelbtn = $('.cancelbtn');

$form.on("click", function() {
    $wrapper.css("display", "block");
});

$cancelbtn.on('click', function() {
    $wrapper.css('display', 'none');
});