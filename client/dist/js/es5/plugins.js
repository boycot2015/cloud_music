'use strict';

$.extend({
    filterPlayCount: function filterPlayCount(num) {
        num = num > 10000 ? parseInt(num / 10000) + '万' : num;
        return num;
    },

    $route: {
        path: function path() {
            var path = window.location.href;
            if (path.includes('?')) path = path.split('?')[0];
            return path;
        }
    },
    $router: {
        push: function push(path) {
            // window.location.href = path
            $('#iframe-pages').attr('src', path + '.html');
        },
        replace: function replace() {
            window.location.replace(path);
        },
        go: function go() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            // window.location.go(num)
            window.history.go(num);
        },
        back: function back() {
            window.history.back(-1);
        }
    }
});