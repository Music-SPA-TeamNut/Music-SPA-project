import 'jquery';

import userController from 'userController';
import * as searchController from 'searchController';
import { checkButtons, notFound } from 'helpers';
import * as trackController from 'trackController';

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

router
    .on({
        'search': () => searchController.searchTracks(),
        'search/:id': (params) => trackController.loadTrack(params),
        'user/:username': () => trackController.showPlaylist(),
        'user/:username/playlist': () => trackController.showPlaylist(),
        'user/:username/playlist/:id': (params) => trackController.loadTrack(params),
        'search/add-to-playlist/:id': (params) => trackController.addToPlaylist(params),
        'user/remove-from-playlist/:id': (params) => trackController.removeFromPlaylist(params),
        'registration': () => userController.showRegisterForm(),
        'signup': () => userController.signUp(),
        'cancel': () => userController.cancelRegistration(),
        'login': () => userController.login(),
        'logout': () => userController.logout(),
        'home': ()  => $('#container').html(''),
    })
    .resolve();

router
    .notFound(() => notFound());

$(document).ready(checkButtons());
$(window).ready(function() {
    // location.href = "/#/home";
    // router.resolve();
    router.updatePageLinks();
});
