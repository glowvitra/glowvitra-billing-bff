import { NextFunction, Request, Response } from 'express';

export function swaggerAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const auth = {
    login: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD,
  };

  // check for basic auth credentials
  const authHeader = req.headers.authorization;
  const b64auth =
    typeof authHeader === 'string' ? authHeader.split(' ')[1] || '' : '';
  const [login, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  // Verify login and password are correct
  if (
    !login ||
    !password ||
    login !== auth.login ||
    password !== auth.password
  ) {
    res.setHeader('WWW-Authenticate', 'Basic realm="401"');
    res.statusCode = 401;

    res.end('Authentication required.');
  }
  next();
}
