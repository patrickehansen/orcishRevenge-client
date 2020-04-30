import ms from 'ms';

export default {
  server: process.env.NODE_ENV === 'development' ? 'http://localhost:6190' : 'https://orcish-revenge.herokuapp.com',
  popperURL: process.env.NODE_ENV === 'development' ? 'http://localhost:9001' : 'https://orcish-revenge.herokuapp.com/popped',
  localstorageKey: 'PEHLLC-orcishRevenge-IDToken',
  errorClearTime: ms('5s'),
};
