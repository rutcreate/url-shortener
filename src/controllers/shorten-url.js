// create shorten url
const create = (req, res) => {
    // TODO
    // find existing one
    // if not found, create new one

    // prepare data for return
    const result = {
        url: 'https://www.google.com/intl/en/policies/privacy/',
        shortenUrl: 'https://shrt.com/h3Zk32p'
    }

    // return result
    res.json(result)
}

export default {
    create
}
