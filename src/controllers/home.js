// render home page with shorten url form.
const index = (req, res) => {
    res.send('home')
}

// redirect to original url
const redirect = (req, res) => {
    // TODO
    // find existing
    // if not found, raise 404
    // otherwise redirect

    // get code from url
    const code = req.params.code

    // redirect to original url
    res.redirect(`http://thisistheoriginalurl.com/with/code/${code}`)
}

export default {
    index,
    redirect
}
