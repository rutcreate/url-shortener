const app = new Vue({
    el: '#app',

    // change delimiter due to twig template.
    delimiters: ['<%', '%>'],

    data () {
        return {
            // form url
            url: '',

            // shorten url from resp
            shortenUrl: '',

            // submitting status
            submitting: false
        }
    },

    computed: {
        submitButtonText () {
            return this.submitting ? 'Shortening...' : 'Shorten!'
        }
    },

    methods: {
        submitUrl () {
            // reset shorten url
            this.shortenUrl = ''

            // update submitting status
            this.submitting = true

            // prepare params
            const params = { url: this.url }

            // call api to create shorten url
            axios.post('/shorten-url', params)
                .then(resp => {
                    // get shorten url from resp
                    this.shortenUrl = resp.data.shortenUrl

                    // reset submitting status
                    this.submitting = false
                })
                .catch(err => {
                    // reset submitting status
                    this.submitting = false

                    // display error
                    alert(err)
                })
        }
    }
})
