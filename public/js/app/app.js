import 'jquery';

import userController from 'userController';
import searchController from 'searchController';
import homeController from 'homeController';
import trackController from 'trackController';
import * as helpers from 'helpers';

const router = new Navigo('#/', false);

$('body').on('click', '#search-btn', () => {
    let query = $('#search-field').val();
    if ( query === '') {
        return;
    } else {
            router.navigate('search/' + query);
        }
});

$('body').on('keypress', '#search-field', (e) => {
    if (e.keyCode === 13) {
        let query = $('#search-field').val();
        if (query === '') {
            return;
        } else {
                router.navigate('search/' + query);
            }
    }
})
$('body').on('blur', '#email-value', (e) => helpers.validateEmail())
$('body').on('blur', '#username-value', (e) => helpers.validateUsername())
$('body').on('keyup', '#password-value2', (e) => helpers.validatePassword())
$('body').on('click', '#btn-signup', () => helpers.validateForm())
$('body').on('focus', '.invalid', (e) => $(e.target).css('background-color', 'rgb(255,255,255)'));

router
    .on({
        'search/:query': (params) => searchController.searchTracks(params),
        'search/:query/:id': (params) => trackController.loadTrackFromSearch(params),
        // 'user/:username': () => trackController.showProfile(),
        'user/:username/playlist': () => trackController.showPlaylist(),
        'user/:username/playlist/:id': (params) => trackController.loadTrackFromPlaylist(params),
        'search/:query/:id/add-to-playlist': (params) => trackController.addToPlaylist(params),
        'user/:username/playlist/:id/remove-from-playlist': (params) => trackController.removeFromPlaylist(params),
        'registration': () => userController.showRegisterForm(),
        'signup': () => userController.signUp(),
        'cancel': () => userController.hideRegisterForm(),
        'login': () => userController.login(),
        'logout': () => userController.logout(),
        'home': () => homeController.showHome(),
    })
    .resolve();

router
    .notFound(() => helpers.notFound());

$(document).ready(helpers.checkButtons());
$(window).ready(function() {
    location.hash = "#/home";
    // router.resolve();
    router.updatePageLinks();
});
