import templates from 'templates';
import userController from 'userController';

const $container = $('#container');

class Tracks {
    
    loadTrack(params) {
        return Promise.resolve(templates.loadTemplate('track'))
            .then(template => 
            $container.html(template(params))
    )};

    addToPlaylist(params) {
        if(localStorage.getItem('username')){
            const id = params.id;
            const query = params.query
            const $element = $('[href="#/search/'+ query + '/' + id + '"]');
            const title = $element[0].children[0].innerText;
            const description = $element[0].children[1].innerText;
            const img = $element[0].children[2].currentSrc;

            userController.addTrack(id, title, description, img)
        } else {
            alert('opaaa ... You need to be logged in to add songs to your playlist :)');
            return;
        }
    }

    removeFromPlaylist(params) {
        const id = params.id;
        const user = localStorage.getItem('username');
    userController.removeTrack(id);
    location.hash = '#/user/' + user + '/playlist'
    }

    showPlaylist() {
        return Promise.all([
            userController.loadPlaylist(),
            templates.loadTemplate('playlist'),
        ])
        .then(([tracks, template]) => {
            console.log(tracks);
            $('#container').html(template(tracks))
        })
    }
}
const tracks = new Tracks();
export default tracks;

// const $container = $('#container');

// export function loadTrack(params) {
//     return Promise.resolve(loadTemplate('track'))
//         .then(template => 
//         $container.html(template(params))
// )};

// export function addToPlaylist(params) {
//     if(localStorage.getItem('username')){
//         const id = params.id;
//         const $element = $('[href="#/search/'+ id + '"]');
//         const title = $element[0].children[0].innerText;
//         const description = $element[0].children[1].innerText;
//         const img = $element[0].children[2].currentSrc;

//         addTrack(id, title, description, img)
//     } else {
//         alert('opaaa ... You need to be logged in to add songs to your playlist :)');
//         return;
//     }
// }

// export function removeFromPlaylist(params) {
//     const id = params.id;
//     const user = localStorage.getItem('username');
// removeTrack(id);
// location.hash = '#/user/' + user + '/playlist'
// }

// export function showPlaylist() {
//     return Promise.all([
//         userController.loadPlaylist(),
//         loadTemplate('playlist'),
//     ])
//     .then(([tracks, template]) => {
//         console.log(tracks);
//         $('#container').html(template(tracks))
//     })
// }