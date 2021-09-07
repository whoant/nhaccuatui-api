const axios = require('axios');
const cryptoJS = require('crypto-js');
const queryString = require('querystring');

const KEY =
    'U2FsdGVkX19BWoF1uTP8o90p9KAWsXZ/VJ41PG7XYF/63qnjiMh1TLy8zAfZBMa9iqiGyPiN5iMUocpD74kAsg==';

const API_KEY = 'e3afd4b6c89147258a56a641af16cc79';

const encrypt = () => {
    const t = new Date().getTime().toString();

    const n = cryptoJS.AES.decrypt(KEY, 'nhaccuatui').toString(
        cryptoJS.enc.Utf8
    );
    const s = cryptoJS.HmacSHA512(t, n).toString();
    return {
        a: API_KEY,
        s,
        t,
    };
};

const instance = axios.create({
    baseURL: 'https://beta.nhaccuatui.com/api',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

instance.interceptors.request.use(
    function (config) {
        config.url += `?${queryString.stringify(encrypt())}`;
        config.data = queryString.stringify(config.data);

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

module.exports = instance;
