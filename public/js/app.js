import 'jquery';

import * as userController from 'userController';
import * as searchController from 'searchController';
import { checkButtons } from 'helpers';

const router = new Navigo(null, false);

$('body').on('click', '#search-btn', () => {
    if ($('#search-field').val() === '') {
        return;
    } else {
        if (location.hash === '#/search') {
            searchController.searchTracks()
        } else {
            router.navigate('search');
            $('#search-field').val('')
        }
    }
});

$('body').on('keypress', '#search-field', (e) => {
    if (e.keyCode === 13) {
        if ($('#search-field').val() === '') {
            return;
        } else {
            if (location.hash === '#/search') {
                searchController.searchTracks()
            } else {
                router.navigate('search');
                $('#search-field').val('')
            }
        }
    }
})

$(document).ready(checkButtons());

router
    .on({
        'search': function() {searchController.searchTracks()},
        // 'tracks': () => console.log('Tracks loaded'),
        'registration': function() {userController.showRegisterForm()},
        'signup': function() {userController.signUp()},
        'cancel': function() {userController.cancelRegistration()},
        'login': function() {userController.login()},
        'logout': function() {userController.logout()},
        'home': function() {$('#container').html('')},
//         '*': () => $('#container').html(''),
    })
    .resolve();


router.notFound(function() {
    //   TO DO
});

// $(window).ready(function() {
//     location.href = "/#/home";
// });
