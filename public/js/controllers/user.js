import data from 'data';
import encryptor from 'encryptor';
import swall from 'alerts';

// const user = localStorage.getItem('username');

class UserController {
    login() {
        const username = $('#username-login').val();
        const password = $('#password-login').val();
        const passHash = encryptor.encrypt(password);

        if(!username || !password) {
            swal({  title: "Warning",
                        text: 'Please enter username and password',
                        type: "warning" 
                    })
                location.hash = '#/home'
                return;
            }

        data.login(username, passHash)
            .then((result) => {
                console.log(result);
                localStorage.setItem('authKey', result.result.authKey)
                localStorage.setItem('btn-logout', 'true');
                localStorage.setItem('username', result.result.username)
                $('#btn-login').addClass('hidden');
                $('#btn-register').addClass('hidden');
                $('#btn-logout').removeClass('hidden');
                $('#username-login').addClass('hidden');
                $('#password-login').addClass('hidden');
                $('#profile-link').attr('href', '#/user/' + result.result.username + '/playlist');
                $('#profile-link').text('Hello, ' + result.result.username);
                $('#profile-link').removeClass('hidden');
                location.hash = '#/home';
                // alert('Successfully logged in!');
                swal({  title: "Success!",
                        text: "You are logged in!",
                        type: "success",
                        timer: 2000 })
                    },
            errorMsg => { swal({  title: "Warning",
                        text: errorMsg.responseText,
                        type: "warning" 
                    }),
                    location.hash = '#/home';
                })
    }

    showRegisterForm() {
        $.get('/templates/registration.html', function(data){
            $('#form-background').html(data);
        });
        $('#form-background').css("display", "block");
    }

    hideRegisterForm() {
        $('#form-background').css("display", "none");
        $('#form-background').html('');
        location.hash = "#/home";
    }

    signUp() {
        const email = $("#email-value").val();
        const username = $("#username-value").val()
        const password = $("#password-value2").val();
        const passHash = encryptor.encrypt(password);
        const user = {email, username, passHash}
        this.hideRegisterForm();
        
        data.register(user)
            .then(result => {
                location.hash = '#/home';
                swal({  title: "Success!",
                        text: "You are registered!",
                        type: "success",
                        timer: 2000 });
            },
            errorMsg => swal({  title: "Warning",
                        text: errorMsg.responseText,
                        type: "warning" 
                        })
            );
    }

    logout() {
        localStorage.clear();
        $('#btn-login').removeClass('hidden');
        $('#btn-register').removeClass('hidden');
        $('#btn-logout').addClass('hidden');
        $('#username-login').removeClass('hidden');
        $('#password-login').removeClass('hidden');
        $('#profile-link').text('');
        $('#profile-link').addClass('hidden');
        swal({  title: "Success!",
                        text: "You are logged out!",
                        type: "success",
                        timer: 2000 });
        location.hash = '#/home';
    }

    addTrack(id, title, description, img) {
        const headervalue = localStorage.getItem('authKey');
        data.postTrack(headervalue, id, title, description, img)
            .then(result => swal({  title: "Success!",
                        text: result,
                        type: "success",
                        timer: 2000
                        }),
            errorMsg => swal({  title: "Warning",
                        text: errorMsg.responseText,
                        type: "warning" 
                        })
            )}

    removeTrack(id) {
        const headervalue = localStorage.getItem('authKey');
        data.deleteTrack(headervalue, id)
            .then(result => swal({  title: "Success!",
                        text: result,
                        type: "success",
                        timer: 2000 }),
            errorMsg => swal({  title: "Just to let you know!",
                        text: errorMsg.responseText,
                        type: "warning",
                        })
            )}

    loadPlaylist() {
        const headervalue = localStorage.getItem('authKey');
        return Promise.resolve(data.getTracks(headervalue));
    }
}

const userController = new UserController();
export default userController;
