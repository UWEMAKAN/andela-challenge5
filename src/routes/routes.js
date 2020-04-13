import express from 'express';
import fs from 'fs';
import path from 'path';
import xml from 'jsontoxml';
import estimator from '../controller/controller';

const apiRouter = express.Router();

function router() {
  let estimate = {};
  // eslint-disable-next-line consistent-return
  apiRouter.use('/', (req, res, next) => {
    if (/(\/logs)$/.test(req.path) || !(/\/$|(\/json)$|(\/xml)$/.test(req.path))) {
      return next();
    }
    const data = req.body.data || req.body;
    if (!data) {
      res.status(400);
      return res.send('Ooops! Invalid request body');
    }
    estimator(data)
      .then((results) => {
        estimate = results;
        return next();
      })
      .catch((error) => {
        res.status(400);
        return res.send(error.message);
      });
  });

  apiRouter.route(/\/$|(\/json)$/)
    .post((req, res) => res.json(estimate));

  apiRouter.route('/xml')
    .post((req, res) => {
      res.type('application/xml');
      return res.send(xml(estimate));
    });

  apiRouter.route('/logs')
    .get((req, res) => {
      fs.readFile(path.join(global.appRoot, './logs/access.log'), { encoding: 'utf8', flag: 'r' }, (err, data) => {
        if (err) {
          res.status(404);
          return res.send('Ooops! resource not found');
        }
        // res.type('text/plain');
        res.set('Content-Type', 'text/plain');
        return res.send(data);
      });
    });

  apiRouter.route('*')
    .all((req, res) => {
      res.status(404);
      return res.send('Ooops! Not Found!!!');
    });

  return apiRouter;
}

export default router();
