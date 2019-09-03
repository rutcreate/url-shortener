const app = new Vue({
    el: '#app',

    // change delimiter due to twig template.
    delimiters: ['<%', '%>'],

    data () {
        return {
            // form url
            url: '',

            // custom alias
            code: '',

            // shorten url from resp
            result: null,

            // errors from resp
            errors: {},

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
            // clear result
            this.result = null

            // clear errors
            this.errors = {}

            // update submitting status
            this.submitting = true

            // prepare params
            const params = { url: this.url, code: this.code }

            // call api to create shorten url
            axios.post('/shorten-url', params)
                .then(resp => {
                    // update shorten url from resp
                    this.result = {
                        url: this.url,
                        shortenUrl: resp.data.shortenUrl
                    }

                    // reset submitting status
                    this.submitting = false
                })
                .catch(err => {
                    // reset submitting status
                    this.submitting = false

                    // update errors
                    this.formatErrors(err.response.data.errors)
                })
        },

        formatErrors (errors) {
            this.errors = {}
            errors.forEach(error => {
                if (this.errors[error.param] === undefined) {
                    this.errors[error.param] = []
                }
                this.errors[error.param].push(error.msg)
            })
        }
    }
})
