import * as data from 'data';
import { load as loadTemplate } from 'templates';

export function login() {

    const username = $('#username-login').val();
    const password = $('#password-login').val();

    data.login(username, password)
        .then(result => {
            localStorage.authKey = result.authKey;
        });
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

    data.register(email, username, password)
        .then(result => {
            console.log(result);
        });
}

export function register() {
    const username = $('#input-username').val();
    const password = $('#input-password').val();
    const passHash = password; // HASH ME

    data.register(username, passHash)
        .then(
            result => {
                toastr.success(`User ${username} registered successfully`);
                login()
            },
            errorMsg => toastr.error(errorMsg));
}

export function logout() {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
    $('#auth-btn').removeClass('hidden');
    $('#signout-btn').addClass('hidden');
    //toastr.success('Logged out');
    location.href = '#/home';
}