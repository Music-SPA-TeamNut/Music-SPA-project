import 'jquery';
import * as helpers from 'helpers';
import router from '../app/app.js'

// email ELs
$('body').on('blur', '#email-value', (e) => helpers.validateEmail())
$('body').on('blur', '#username-value', (e) => helpers.validateUsername())
$('body').on('keyup', '#password-value2', (e) => helpers.validatePassword())
$('body').on('click', '#btn-signup', () => helpers.validateForm())
$('body').on('focus', '.invalid', (e) => $(e.target).css('background-color', 'rgb(255,255,255)'))

// search ELs
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

// logged user check
$(document).ready(helpers.checkButtons());

// $(window).ready(function() {
//     location.hash = "#/home";
//     // router.resolve();
//     router.updatePageLinks();
// });
    