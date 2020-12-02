const config={
    production :{
        SECRET: process.env.apiSecret,
        DATABASE: process.env.apiDb
    },
    default : {
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb://localhost:27017/Users'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}