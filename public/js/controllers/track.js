import templates from 'templates';
import userController from 'userController';

const $container = $('#container');

class Tracks {
    
    loadTrackFromSearch(params) {
        const query = params.query
        const id = params.id;
        const element = document.getElementById(id);
        const title = element.getAttribute('data-title');
        const description = element.getAttribute('data-description');
        const img = element.getAttribute('data-img');
        const data = {
            query,
            id,
            title,
            description,
            img
        }
        return Promise.resolve(templates.loadTemplate('addtrack'))
            .then(template => 
            $container.html(template(data))
    )};

    loadTrackFromPlaylist(params) {
        return Promise.resolve(templates.loadTemplate('removetrack'))
            .then(template => {
            $container.html(template(params));
            }
    )};

    addToPlaylist(params) {
        if(localStorage.getItem('username')){
            const id = params.id;
            const element = document.getElementById(id);
            const title = element.getAttribute('data-title');
            const description = element.getAttribute('data-description');
            const img = element.getAttribute('data-img');

            userController.addTrack(id, title, description, img)
        } else {
            swal({  title: "Warning",
                        text: 'opaaa ... You need to be logged in to add songs to your playlist :)',
                        type: "warning" 
                    });
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