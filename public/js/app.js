import 'jquery';

import * as userController from 'userController';
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




$(document).ready(checkButtons());

router
    .on({
        'search': function() {searchController.searchTracks()},
        'search/:id': (params) => trackController.loadTrack(params),
        'user/:username': () => trackController.showPlaylist(),
        'user/:username/tracks': () => trackController.showPlaylist(),
        'user/:username/tracks/:id': (params) => trackController.loadTrack(params),
        'search/add-to-playlist/:id': (params) => trackController.addToPlaylist(params),
        'user/remove-from-playlist/:id': (params) => trackController.removeFromPlaylist(params),
        'registration': function() {userController.showRegisterForm()},
        'signup': function() {userController.signUp()},
        'cancel': function() {userController.cancelRegistration()},
        'login': function() {userController.login()},
        'logout': function() {userController.logout()},
        'home': function() {$('#container').html('')},
    })
    .resolve();

router.notFound(() => notFound());

$(window).ready(function() {
    location.href = "/#/home";
    // router.resolve();
    router.updatePageLinks();
});
