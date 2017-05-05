export  function showForm() {
            $('#modal-body').removeClass('hidden');
            $('#modal-footer').removeClass('hidden')
        }

export function hideForm() {
            $('#modal-body').addClass('hidden');
            $('#modal-footer').addClass('hidden')
        }

export function checkButtons() {
    if(localStorage.getItem('btn-logout')) {
        $('#btn-login').addClass('hidden');
        $('#btn-register').addClass('hidden');
        $('#btn-logout').removeClass('hidden');
        $('#username-login').addClass('hidden');
        $('#password-login').addClass('hidden');
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