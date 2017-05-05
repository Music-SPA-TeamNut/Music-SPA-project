import * as data from 'data';
import { loadTemplate } from 'templates';
import encryptor from 'encryptor';

export function login() {

    const username = $('#username-login').val();
    const password = $('#password-login').val();
    const passHash = encryptor.encrypt(password);

    data.login(username, passHash)
        .then((result) => {
            console.log(result);
            localStorage.setItem('authKey', result.result.authKey)
            localStorage.setItem('btn-logout', 'true');
            localStorage.setItem('username', result.result.username)
            $('#btn-login').addClass('hidden');
            $('#btn-register').addClass('hidden');
            $('#btn-logout').removeClass('hidden');
            $('#username-login').addClass('hidden');
            $('#password-login').addClass('hidden');
            location.hash = '#/home';
            alert('Successfully logged in!');
        },
        errorMsg => alert(errorMsg.responseText));
}

export function showRegisterForm() {
    let $wrapper = $('#main-div');

    $wrapper.css("display", "block");
}

export function cancelRegistration() {
    let $wrapper = $('#main-div');

    $wrapper.css("display", "none");

    location.hash = "#/home";
}

export function signUp() {
    const email = $('#email-value').val();
    const username = $("#username-value").val()
        // TODO: repeat password function
    const password = $('#password-value').val();
    const passHash = encryptor.encrypt(password);

    data.register(email, username, passHash)
        .then(result => {
            console.log(result);
            login(username, passHash);
            cancelRegistration();
        },
        // errorMsg => alert(errorMsg.responseText)
        );
}

// export function register() {
//     const username = $('#input-username').val();
//     const password = $('#input-password').val();
//     const passHash = encryptor.encrypt(password);

//     data.register(username, passHash)
//         .then(
//             result => {
//                 toastr.success(`User ${username} registered successfully`);
//                 login()
//             },
//             errorMsg => toastr.error(errorMsg));
// }

export function logout() {
    localStorage.clear();
    $('#btn-login').removeClass('hidden');
    $('#btn-register').removeClass('hidden');
    $('#btn-logout').addClass('hidden');
    $('#username-login').removeClass('hidden');
    $('#password-login').removeClass('hidden');
    alert('Successfully logged out');
    location.hash = '#/home';
}