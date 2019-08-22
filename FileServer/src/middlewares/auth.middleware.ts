import express from 'express';
import { AccessTokenModel } from '../models/accessToken.model';

const AuthGuard = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let accessToken: any = req.cookies.$LoopBackSDK$id;

    if (typeof accessToken !== undefined || accessToken !== "" || accessToken !== null) {

        let authErr = new Error();
        authErr.message = "UNAUTHORIZED";
        authErr.name = "401"
        authErr.stack = "";
        //check nese ka apo jo token
        if (accessToken) {
            try {
                //ballafaqoje me db
                let dbAT: any = await AccessTokenModel.exists({ _id: accessToken });
                if (dbAT) {
                    next()
                } else {
                    //TODO kontrollo kur skadon

                    //ka token por nuk gjendet ne db
                    res.statusCode = 401;
                    res.json(authErr);
                    res.end();
                    // next(authErr);
                }

            } catch (mongoErr) {
                res.statusCode = 500;

                //kap ndonje err nga mongo
                res.json(mongoErr);
                res.end();
                // next(mongoErr);
            }
        } else {
            //error ska token fare

            res.statusCode = 401;
            res.json(authErr);
            res.end();
            // next(authErr)
        }
    }
}

export { AuthGuard };