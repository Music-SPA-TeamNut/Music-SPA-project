export function checkButtons() {
    if(localStorage.getItem('btn-logout')) {
        $('#btn-login').addClass('hidden');
        $('#btn-register').addClass('hidden');
        $('#btn-logout').removeClass('hidden');
        $('#username-login').addClass('hidden');
        $('#password-login').addClass('hidden');
        $('#profile-link').attr('href', '#/user/' + localStorage.getItem('username'));
        $('#profile-link').text('Hello, ' + localStorage.getItem('username') + ' ');
        $('#profile-link').removeClass('hidden');
    }
}

export function getId(id) {
    localStorage.setItem('todoId', id)
    if(document.selectElementById('#'+id).hasAttribute('checked')) {
    localStorage.setItem('todoState', 'true')
    } else {
        localStorage.setItem('todoState', 'false')
    }
}

export function notFound() {
   $.get('templates/404.html', function(data) {
     $('#container').html(data);
 });
}