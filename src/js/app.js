var Vue = require('vue');
Vue.config.debug = true;
Vue.use(require('vue-resource'));

new Vue({
    el: '#container',
    data: {
        fullRepoName: '',
        username: '',
        repo: ''
    },
    methods: {
        changeRepo: function() {
            var splitData = this.fullRepoName.split('/');
            this.username = splitData[0];
            this.repo = splitData[1];

            console.group("Vue Data");
            console.log("fullRepoName:", this.fullRepoName);
            console.log("username:", this.username);
            console.log("repo:", this.repo);
            console.groupEnd("Vue Data");
        }
    },
    components: {
        githubFileExplorer: require('./components/github-file-explorer')
    }
});