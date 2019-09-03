import ShortenUrl from '../models/shorten-url'

// render home page with shorten url form.
const index = (req, res) => {
    res.render('index')
}

export default {
    index
}
