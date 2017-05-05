import 'jquery';

import { MyRouter } from 'myRouter';
import * as userController from 'userController';

const router = new MyRouter();

router
    .on('', () => location.hash = '#/home')
    .on('/', () => location.hash = '#/home')
    .on('/auth', userController.get)
    .on('/registration', userController.showRegisterForm)
    .on('/signup', userController.signUp)
    .on('/cancel', userController.cancelRegistration)
    .on('/login', userController.login)
    .on('/logout', userController.logout);

$(window).ready(function() {
    location.href = "http://localhost:3000/#/home";
});
$(window).on('hashchange', () => router.navigate());