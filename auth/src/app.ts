import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@ksntickets/common';

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
)


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// This catches any wrong route request.
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};