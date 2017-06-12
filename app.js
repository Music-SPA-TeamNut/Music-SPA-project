const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


const db = require('./db')
const url = 'mongodb://team-nut:Ebre5debre@ds131061.mlab.com:31061/music-app-db';

// app.engine('jade', require('jade').__express)
// app.set('view engine', 'jade')

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));

require('./utils/authorized-user')(app, db);
app.use('/api/users', require('./routers/usersRouter'));
app.use('/api/tracks', require('./routers/tracksRouter'))
// app.use('api/categories', require('./controllers/tracksRouter'))

// Connects to Mongo on start
db.connect(url, function(err, db) {
    if(err) {
        console.log('Unable to connect to Mongo!')
        process.exit(1);
    } else {
        let port = Number(process.env.PORT || 3013)
        app.listen(port, function() {
            console.log('Listening to port ' + port + ' ...')
        })
    }
})