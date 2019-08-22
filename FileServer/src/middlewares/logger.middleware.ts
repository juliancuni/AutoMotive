import express from 'express';

const LoggerMiddleWare = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(`IP: ${req.ip} Method: ${req.method} Url: ${req.originalUrl} StatusCode: ${res.statusCode} Time: ${elapsed}ms`)
    })
    next();
}

export { LoggerMiddleWare };