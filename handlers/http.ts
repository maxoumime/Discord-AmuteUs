import 'dotenv/config';
import express from 'express';
import type {Commands} from '../commands';

const app = express();
app.use(express.json());

export const listenHttp = (commands: Commands) => {
    app.use((req, res, next) => {
        console.log('[HTTP]', req.path.replace('/command/', ''));
        return next();
    });

    app.post('/command/ping', async (req, res) => {
        const result = await commands.ping.executeAsync();
        return res.send(result);
    });

    app.post('/command/mute', async (req, res) => {
        const {mute} = req.body;
        const result = await commands.mute.executeAsync({
            isAdmin: true,
            mute: mute ? mute.toLowerCase() === 'true' : null
        });
        return res.send(result);
    });

    app.listen(3000);

    console.log('HTTP Ready!');
};
