import nanoid from 'nanoid'
import ShortenUrl from '../models/shorten-url'

// create shorten url
const create = async (req, res) => {
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
        shortenUrl: shortenUrl.code
    })
}

export default {
    create
}
