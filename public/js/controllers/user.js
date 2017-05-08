import * as data from 'data';
import { loadTemplate } from 'templates';
import encryptor from 'encryptor';

const user = localStorage.getItem('username');

class UserController {
    login() {
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
                $('#profile-link').attr('href', '#/user/' + result.result.username);
                $('#profile-link').text('Hello, ' + result.result.username);
                $('#profile-link').removeClass('hidden');
                location.hash = '#/home';
                alert('Successfully logged in!');
            },
            errorMsg => alert(errorMsg.responseText));
    }

    showRegisterForm() {
        const $wrapper = $('#main-div');

        $wrapper.css("display", "block");
    }

    cancelRegistration() {
        const $wrapper = $('#main-div');

        $wrapper.css("display", "none");
        location.hash = "#/home";
    }

    signUp() {
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

    logout() {
        localStorage.clear();
        $('#btn-login').removeClass('hidden');
        $('#btn-register').removeClass('hidden');
        $('#btn-logout').addClass('hidden');
        $('#username-login').removeClass('hidden');
        $('#password-login').removeClass('hidden');
        $('#profile-link').text('');
        $('#profile-link').addClass('hidden');
        alert('Successfully logged out');
        location.hash = '#/home';
    }

    addTrack(id, title, description, img) {
        const headervalue = localStorage.getItem('authKey');
        data.postTrack(headervalue, id, title, description, img)
            .then(result => alert(result),
            errorMsg => alert(errorMsg.responseText));
    }

    removeTrack(id) {
        const headervalue = localStorage.getItem('authKey');
        data.deleteTrack(headervalue, id)
            .then(result => alert(result),
            errorMsg => alert(errorMsg.responseText));
    }

    loadPlaylist() {
        const headervalue = localStorage.getItem('authKey');
        return Promise.resolve(data.getTracks(headervalue));
    }
}

const userController = new UserController();
export default userController;

// export function login() {
//     const username = $('#username-login').val();
//     const password = $('#password-login').val();
//     const passHash = encryptor.encrypt(password);

//     data.login(username, passHash)
//         .then((result) => {
//             console.log(result);
//             localStorage.setItem('authKey', result.result.authKey)
//             localStorage.setItem('btn-logout', 'true');
//             localStorage.setItem('username', result.result.username)
//             $('#btn-login').addClass('hidden');
//             $('#btn-register').addClass('hidden');
//             $('#btn-logout').removeClass('hidden');
//             $('#username-login').addClass('hidden');
//             $('#password-login').addClass('hidden');
//             $('#profile-link').attr('href', '#/user/' + result.result.username);
//             $('#profile-link').text('Hello, ' + result.result.username);
//             $('#profile-link').removeClass('hidden');
//             location.hash = '#/home';
//             alert('Successfully logged in!');
//         },
//         errorMsg => alert(errorMsg.responseText));
// }

// export function showRegisterForm() {
//     const $wrapper = $('#main-div');

//     $wrapper.css("display", "block");
// }

// export function cancelRegistration() {
//     const $wrapper = $('#main-div');

//     $wrapper.css("display", "none");
//     location.hash = "#/home";
// }

// export function signUp() {
//     const email = $('#email-value').val();
//     const username = $("#username-value").val()
//         // TODO: repeat password function
//     const password = $('#password-value').val();
//     const passHash = encryptor.encrypt(password);

//     data.register(email, username, passHash)
//         .then(result => {
//             console.log(result);
//             login(username, passHash);
//             cancelRegistration();
//         },
//         // errorMsg => alert(errorMsg.responseText)
//         );
// }

// export function logout() {
//     localStorage.clear();
//     $('#btn-login').removeClass('hidden');
//     $('#btn-register').removeClass('hidden');
//     $('#btn-logout').addClass('hidden');
//     $('#username-login').removeClass('hidden');
//     $('#password-login').removeClass('hidden');
//     $('#profile-link').text('');
//     $('#profile-link').addClass('hidden');
//     alert('Successfully logged out');
//     location.hash = '#/home';
// }

// export function addTrack(id, title, description, img) {
//     const headervalue = localStorage.getItem('authKey');
//     data.postTrack(headervalue, id, title, description, img)
//         .then(result => alert(result),
//         errorMsg => alert(errorMsg.responseText));
// }

// export function removeTrack(id) {
//     const headervalue = localStorage.getItem('authKey');
//     data.deleteTrack(headervalue, id)
//         .then(result => alert(result),
//         errorMsg => alert(errorMsg.responseText));
// }

// export function loadPlaylist() {
//     const headervalue = localStorage.getItem('authKey');
//     return Promise.resolve(data.getTracks(headervalue));
// }