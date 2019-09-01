import ShortenUrl from '../models/shorten-url'

// render home page with shorten url form.
const index = (req, res) => {
    res.render('index')
}

// redirect to original url
const redirect = async (req, res) => {
    // get code from url
    const code = req.params.code

    // find existing
    let shortenUrl = await ShortenUrl.findOne({ code })

    // if found, redirect to original url
    if (shortenUrl) {
        res.redirect(shortenUrl.url)
    }
    // otherwise, go to home page
    else {
        res.redirect('/')
    }
}

export default {
    index,
    redirect
}
