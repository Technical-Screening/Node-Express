import app from './app';

// const logger = require('./app/utils/logger');

app.listen(process.env.PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is online on port ${process.env.PORT}`);
  // logger.info(`Server started in port : ${process.env.PORT}!`);
});
