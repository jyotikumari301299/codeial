const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs');
// log directory will be created if it does not exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp : {
        service: 'gmail',
        host:  'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'coding.ninja1503',
            pass: 'vandematram'
        },
        tls: {
            rejectUnauthorized: false
          }
    },
      google_client_id:"377139860752-mkuirhdd0i06mf034746i15g54k0ioos.apps.googleusercontent.com",
      google_client_secret: "uFw2QPmJap3Xs7Kp3e7lRUGq",
      google_call_back_url: "http://localhost:8000/users/auth/google/callback",
      jwt_secret: 'codeial',
      morgan: {
          mode: 'dev',
          options: {stream: accessLogStream}
      }
}

const production = {
    name: 'production',
    // CODEIAL_ASSET_PATH, CODEIAL_SESSION_COOKIE_KEY, CODEIAL_JWT_SECRET ,CODEIAL_GOOGLE_CLIENT_ID ,CODEIAL_GOOGLE_CALL_BACK_URL
    // CODEIAL_CLIENT_SECRET, are  environment 
    // variable which i have defined in system settings defined h
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_PRODUCTION_DB,
    smtp : {
        service: 'gmail',
        host:  'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'coding.ninja1503',
            pass: 'vandematram'
        },
        tls: {
            rejectUnauthorized: false
          }
    },
      google_client_id:  process.env.CODEIAL_GOOGLE_CLIENT_ID,
      google_client_secret: process.env.CODEIAL_CLIENT_SECRET,
      google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
      jwt_secret: process.env.CODEIAL_JWT_SECRET,
      morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }

}



module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);


// module.exports = development;













