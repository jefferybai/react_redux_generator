let HAZE_BASEPATH = 'https://cloud.paratera.com/haze/api';
let MOBILE_BASEPATH = 'https://mobile.paratera.com/mobileserver/mobile';
let SSH_BASEPATH = 'https://ssh.paratera.com/api';

if (process.env.NODE_ENV !== 'production') {
    HAZE_BASEPATH = 'http://localhost:3000/mock_data/haze';
    MOBILE_BASEPATH = 'http://localhost:3000/mock_data/mobile';
    SSH_BASEPATH = 'http://localhost:3000/mock_data/ssh';
}

export {
    HAZE_BASEPATH,
    MOBILE_BASEPATH,
    SSH_BASEPATH
}