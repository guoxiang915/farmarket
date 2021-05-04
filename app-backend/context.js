import jwt from 'jsonwebtoken';

export const getUser = token => {
  token.replace(/^Bearer /, '');
  return jwt.verify(token.replace(/^Bearer /, ''), process.env.JWT_SECRET, {
    algorithm: 'HS512',
  });
};

export const createContext = ({ event, context }) => {
  let { headers } = event;
  if (!event.headers) {
    headers = {};
  }
  headers['Access-Control-Allow-Origin'] = '*';

  try {
    const token = headers.authorization || '';
    const user = getUser(token);

    context.user = user;
  } catch (e) {
    context.user = null;
  }

  return context;
};
