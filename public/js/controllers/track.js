import { loadTemplate } from 'templates';
import { addTrack, removeTrack, loadPlaylist } from 'userController';

const $container = $('#container');

export function loadTrack(params) {
    return Promise.resolve(loadTemplate('track'))
        .then(template => 
        $container.html(template(params))
)};

export function addToPlaylist(params) {
    // if(){}
    const id = params.id;
    const $element = $('[href="#/search/'+ id + '"]');
    const title = $element[0].children[0].innerText;
    const description = $element[0].children[1].innerText;
    const img = $element[0].children[2].currentSrc;

    // Promise.resolve(
    addTrack(id, title, description, img)
        // )
        // .then(result => {
        //     alert(result)
        // })
}

export function removeFromPlaylist(params) {
    const id = params.id;
    const user = localStorage.getItem('username');
    // Promise.resolve(
removeTrack(id);
location.hash = '#/user/' + user + '/playlist'
// )
//         .then(result =>
//             alert(result))
}

export function showPlaylist() {
    return Promise.all([
        loadPlaylist(),
        loadTemplate('playlist'),
    ])
    .then(([tracks, template]) => {
        console.log(tracks);
        $('#container').html(template(tracks))
    })
}