import { getUserDetailsByAuthToken } from '../model';
import { to } from '@nc/utils/async';

export default async function authentication(req, res, next) {
  const authToken = req.headers['x-auth-token'];
  if (!authToken) {
    return res.status(401).end('Unauthenticated');
  }
  const [userError, userDetails] = await to(getUserDetailsByAuthToken(authToken));
  if (userError) {
    return res.status(401).end('Unauthenticated');
  }
  req.user = userDetails;
  next();
}
