import nanoid from 'nanoid'
import { check, validationResult } from 'express-validator'
import ShortenUrl from '../models/shorten-url'

// create shorten url
const create = async (req, res) => {
    // get url and code from request
    let data = req.body

    // validate url
    await check('url').isURL().withMessage('Wrong URL format').run(req)

    // validate code if given
    if (data.code) {
        await check('code')
            .isLength({ min: 5 }).withMessage('Alias must be at least 5 characters')
            .isLength({ max: 16 }).withMessage('Alias must not be more than 16 characters')
            .matches(/^[A-Za-z0-9_-]+$/g).withMessage('Alias must be an alphanumeric characters').run(req)
    }

    // return errors if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // shorten url object
    let shortenUrl

    // find existing code, if code is given
    if (data.code) {
        shortenUrl = await ShortenUrl.findOne({ code: data.code })

        // if code is already exists, return error
        if (shortenUrl) {
            return res.status(422).json({
                errors: [
                    {
                        msg: 'Alias is already exists',
                        param: 'code'
                    }
                ]
            })
        }
    }
    else {
        // find existing url
        shortenUrl = await ShortenUrl.findOne({ url: data.url, custom: false })
    }

    // if not found, create new one
    if (!shortenUrl) {
        // if no code given, generate new code
        const code = data.code || nanoid(7)

        // create new one
        shortenUrl = new ShortenUrl({
            url: data.url,
            code: code,
            custom: !!data.code
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
