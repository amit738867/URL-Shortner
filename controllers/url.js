import nanoid from 'nanoid'
import { URL } from '../models/url.js'

export default async function handleGenerate(req, res){
        const body = req.body;
        if(!body.url) return res.status(400).json({ error: 'url is required'});
        const shortID = nanoid(6);
        await URL.create(
            {
                shortId: shortID,
                redirectURL: body.url,
                visitedHistory: [],

            }
        )
    
        return res.json({ id: shortID });
}

