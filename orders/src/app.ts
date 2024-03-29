import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ksntickets/common';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';


const app = express();


// This make sure ecpress trust traffic coming from ingres-nginx proxy
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        // This ensures the cookie doesn't get encrypted
        signed: false,

        // This ensures the user only accepts over https connection. If we are in test environment, secure becomes false
        secure: false
    })
);

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

// This catches any wrong route request.
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};