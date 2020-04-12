import http from 'http';
import path from 'path';
import fs from 'fs';
import express from 'express';
import debug from 'debug';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import morgan from 'morgan';
import apiRoutes from './routes/routes';

bodyParserXml(bodyParser);
global.appRoot = path.resolve(__dirname);
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' });

const app = express();
app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  `${Math.round(tokens['response-time'](req, res))}ms`
].join('\t\t'), {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode === 404 || req.originalUrl === '/' || req.path === '/logs'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({
  xmlParseOptions: {
    normalize: true,
    normalizeTags: false,
    explicitArray: false,
    // eslint-disable-next-line no-unused-vars
    valueProcessors: [(value, name) => Number.parseFloat(value) || value]
  }
}));

const PORT = process.env.PORT || 4000;
export const server = http.createServer(app);

app.use('/api/v1/on-covid-19', apiRoutes);

app.get('/', (req, res) => res.send('Running http server'));

app.all('*', (req, res) => {
  res.status(404);
  return res.send('Ooops! Not Found!!!');
});

server.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});

export default app;
