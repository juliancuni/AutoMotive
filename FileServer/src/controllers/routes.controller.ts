import express from 'express';
import multer = require('multer');
import crypto from 'crypto';
import path from 'path';
import { PerdoruesModel } from '../models/perdorues.model';
import { NdermarrjeModel } from '../models/ndermarrje.model';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Files');
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return err;
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        })
    }
})

const upload = multer({ storage: storage });

export function Routes(app: express.Express) {

    app.get('/', (req: express.Request, res: express.Response) => {
        res.send("[Test]")
    })

    app.get('/api/files/download/:fileName', (req: express.Request, res: express.Response, next: express.NextFunction) => {

        var fileName = req.params.fileName;
        res.sendFile(process.env.PWD + "\\Files\\" + fileName);
    })

    app.post('/api/files/upload', upload.single('file'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const file = req.file;
        if (!file) {
            const error: Error = new Error('Ju lutem upload nje file');
            res.send(error);
        }
        let fileName = file.filename;
        let fileLink = "http://localhost:4000/api/files/download/" + fileName;
        let userId = req.cookies.$LoopBackSDK$userId;

        if (req.query.userId) {
            await PerdoruesModel.findOneAndUpdate(userId, { avatar: fileLink });
        }
        if (req.query.ndermarrjeId) {
            try {
                await NdermarrjeModel.findOneAndUpdate({}, { logo: fileLink })
            } catch (error) {
                console.log(error);
            }
        }

        res.send(fileLink);
    })

    app.use((req: express.Request, res: express.Response) => {
        res.type('application/json');
        res.status(404);
        res.json({ "message": "Not_Found" })
    })
}

