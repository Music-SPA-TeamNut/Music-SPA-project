module.exports = function(db) {
    const AUTH_KEY_LENGTH = 60,
        AUTH_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM';

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function generateAuthKey(uniquePart) {
        var authKey = uniquePart,
            index;
        while (authKey.length < AUTH_KEY_LENGTH) {
            index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
            authKey += AUTH_KEY_CHARS[index];
        }
        return authKey;
    }

    let generateID = (function() {
        let id = 0;
        return function() {
            return id + Math.random().toString(36).substring(7);
        }
    })();

    function get(req, res) {
        var user = req.user;
        if (!user) {
            res.status(401)
                .json('Unauthorized user!');
            return;
        }
        var users = db('users')
            .map(function(user) {
                return {
                    username: user.username,
                    id: user.id
                };
            });

        res.json({
            result: users
        });
    }

    function post(req, res) {
        var user = req.body;

        if (!req.body.email || !req.body.username || !req.body.passHash) {
            res.status(403)
                .json("Invalid");
            return;
        }

        if (!validateEmail(req.body.email)) {
            res.status(403)
                .json("Invalid email");
            return;
        }

        var findUserIfExist = db('users').find({
            usernameToLower: user.username.toLowerCase()
        });

        if (findUserIfExist) {
            res.status(403)
                .json("User already exist");
            return;
        }

        user.usernameToLower = user.username.toLowerCase();

        user.id = generateID();

        user.authKey = generateAuthKey(user.id);

        user.songList = [];

        db('users').insert(user);

        db.save();

        res.status(201)
            .json({
                result: {
                    user
                }
            });
    }

    function put(req, res) {

        var reqUser = req.body;

        var user = db('users').find({
            usernameToLower: reqUser.username.toLowerCase()
        });

        if (!user || user.passHash !== reqUser.passHash) {
            res.status(404)
                .json('Invalid username or password');
            return;
        }

        res.json({
            result: {
                user
            }
        });
    }

    return {
        get: get,
        post: post,
        put: put
    };
};