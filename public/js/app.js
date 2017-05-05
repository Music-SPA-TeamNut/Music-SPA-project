import 'jquery';

import * as userController from 'userController';
import * as searchController from 'searchController';
import { checkButtons } from 'helpers';

const router = new Navigo(null, false);

$('body').on('click', '#search-btn', () => {
    if($('#search-field').val() === '') {
        return;
    } else {
        if(location.hash === '#/home/search') {
            searchController.searchTracks()
        } else {
        router.navigate('search');
        $('#search-field').val('')
        }
    }
});

$('body').on('keypress', '#search-field', (e) => {
    if(e.keyCode === 13) {
        if($('#search-field').val() === '') {
        return;
    } else {
        if(location.hash === '#/home/search') {
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
        'search': () => searchController.searchTracks(),
        // 'tracks': () => console.log('Tracks loaded'),
        'registration': () => userController.showRegisterForm(),
        'signup': () => userController.signUp(),
        'cancel': () => userController.cancelRegistration(),
        'login': () => userController.login(),
        'logout': () => userController.logout(),
        '': () => $('#container').html(''),
        '*': () => $('#container').html(''),
    })
    // .resolve();

// router
//     .on(() => $('#container').html(''))
//     .resolve();
// router
//     .on('search', () => searchController.searchTracks())
//     .resolve();


router.notFound(function () {
//   TO DO
});
    
// $(window).ready(function() {
//     location.href = "/#/home";
// });
