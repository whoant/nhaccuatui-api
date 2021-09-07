const callApi = require('./lib');

class Nhaccuatui {
    getSong(key) {
        return callApi.post('/media/info', {
            key,
            type: 'song',
        });
    }

    getPlaylist(key) {
        return callApi.post('/media/info', {
            key,
            type: 'playlist',
        });
    }

    getLyric(key) {
        return callApi.post('/lyric', {
            key,
            type: 'song',
        });
    }

    getTop20() {
        return callApi.post('/ranking/top20', {
            category: 'nhac-viet',
            type: 'song',
            size: 20,
        });
    }

    getTop100(key) {
        return callApi.post('/top100', {
            key,
        });
    }

    getHome() {
        return callApi.post('/home');
    }

    getTopic() {
        return callApi.post('/topic');
    }
}

module.exports = new Nhaccuatui();
