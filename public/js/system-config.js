SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': '../libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../libs/systemjs-plugin-babel/systemjs-babel-browser.js',

        'main': '/js/app.js',
        'router': '/libs/navigo/lib/navigo.js',
        'requester': '/js/requester.js',
        'templates': '/js/templates.js',
        'data': '/js/data.js',
        'searchController': '/js/controllers/search.js',
        'userController': '/js/controllers/user.js',
        'encryptor': '/js/encryptor.js',
        'helpers': '/js/helpers.js',

        'jquery': '../libs/jquery/dist/jquery.js',
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min.js',
        // 'handlebars': '../libs/handlebars/dist/',
        
    }
})

System.import('main');