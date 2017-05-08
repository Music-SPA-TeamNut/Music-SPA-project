import 'jquery';

import userController from 'userController';
import searchController from 'searchController';
import homeController from 'homeController';
import trackController from 'trackController';
import { checkButtons, notFound } from 'helpers';

const router = new Navigo(null, false);

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

router
    .on({
        'search/:query': (params) => searchController.searchTracks(params),
        'search/:query/:id': (params) => trackController.loadTrack(params),
        // 'user/:username': () => trackController.showProfile(),
        'user/:username/playlist': () => trackController.showPlaylist(),
        'user/:username/playlist/:id': (params) => trackController.loadTrack(params),
        'search/:query/:id/add-to-playlist': (params) => trackController.addToPlaylist(params),
        'user/:username/playlist/:id/remove-from-playlist': (params) => trackController.removeFromPlaylist(params),
        'registration': () => userController.showRegisterForm(),
        'signup': () => userController.signUp(),
        'cancel': () => userController.cancelRegistration(),
        'login': () => userController.login(),
        'logout': () => userController.logout(),
        'home': () => homeController.showHome(),
        '': () => location.hash = "#/home",
    })
    .resolve();

router
    .notFound(() => notFound());

$(document).ready(checkButtons());
// $(window).ready(function() {
//     location.hash = "#/home";
    // router.resolve();
    // router.updatePageLinks();
// });
