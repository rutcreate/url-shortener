import nanoid from 'nanoid'
import { validationResult } from 'express-validator'
import ShortenUrl from '../models/shorten-url'

// create shorten url
const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // get url from request
    const { url } = req.body

    // find existing
    let shortenUrl = await ShortenUrl.findOne({ url })

    // if not found, create new one
    if (!shortenUrl) {
        // generate code
        const code = nanoid(7)

        // create new one
        shortenUrl = new ShortenUrl({
            url,
            code
        })
        await shortenUrl.save()
    }

    // return result
    res.json({
        url: shortenUrl.url,
        shortenUrl: `${process.env.BASE_URL}/${shortenUrl.code}`
    })
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
    create,
    redirect
}
