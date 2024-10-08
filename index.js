import express from 'express';
import urlRoute from './routes/url.js';
import connectToMongoDB from './connect.js';
import { URL } from './models/url.js'

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/shortner')
.then(() => console.log('mongoDB connected'))

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) =>{
        const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate({
            shortId
        }, {
                $push: {
                    visitedHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`Server Started at : http://localhost:${PORT}/`));
