import requester from 'requester';

class Data { 

    login(username, passHash) {
        const body = {
            username,
            passHash
        };
        return requester.putRequest('api/users/auth', body)
    }

    register(user) {
        const body = user;
        return requester.postRequest('api/users', body)
    }

    search(searchTerm) {
        const key = 'AIzaSyB7EMVgOaBihxou_GLXdcZcCWSWbVg8NJ0';
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&videoCategoryId=10&key=' + key;

        return requester.getRequest(url) 
    }

    postTrack(headervalue, id, title, description, img) {
        const body = {
            id,
            title,
            description,
            img
        }
        const header = {
            'x-auth-key': headervalue
        }
        
        return requester.postRequest('api/tracks', body, header)
    }

    deleteTrack(headervalue, id) {
        // const body = {
        //     id
        // }
        const header = {
            'x-auth-key': headervalue
        }
        return requester.removeRequest('api/tracks/'+ id, header)
    }

    getTracks(headervalue) {
        const header = {
            'x-auth-key': headervalue
        }

        return requester.getRequest('api/tracks', header);
    }
}
const data = new Data();
export default data;





// export function login(username, passHash) {
//     const body = {
//         username,
//         passHash
//     };
//     return requester.put('api/users/auth', body)
// }

// export function register(user) {
//     const body = user;
//     return requester.post('api/users', body)
// }

// export function search(searchTerm) {
//     const key = 'AIzaSyB7EMVgOaBihxou_GLXdcZcCWSWbVg8NJ0';
//     const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&videoCategoryId=10&key=' + key;

//     return requester.get(url) 
// }

// export function postTrack(headervalue, id, title, description, img) {
//     const body = {
//         id,
//         title,
//         description,
//         img
//     }
//     const header = {
//         'x-auth-key': headervalue
//     }
    
//     return requester.post('api/tracks', body, header)
// }

// export function deleteTrack(headervalue, id) {
//     // const body = {
//     //     id
//     // }
//     const header = {
//         'x-auth-key': headervalue
//     }
//     return requester.remove('api/tracks/'+ id, header)
// }

// export function getTracks(headervalue) {
//     const header = {
//         'x-auth-key': headervalue
//     }

//     return requester.get('api/tracks', header);
// }