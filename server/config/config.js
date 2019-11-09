const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    dev: {
        DATABASE: 'mongodb://localhost:27017/assessment-db',
        SECRET: 'secret'
    }
}

exports.get = function(env){

    return config[env] || config.dev

}