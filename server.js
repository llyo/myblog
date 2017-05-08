import http from 'http';
import path from 'path';
import crypto from 'crypto';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import compression from 'compression';
import favicon from 'serve-favicon';
import logger from 'morgan';
import async from 'async';
import colors from 'colors';
import mongoose from 'mongoose';
import request from 'request';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, match, RoutingContext } from 'react-router';
import swig  from 'swig';
import xml2js from 'xml2js';
import _ from 'underscore';

import config from './config';
import routes from './app/routes';
import DB from './models/database';

const app = express();

mongoose.connect(config.database);
mongoose.connection.once('open',  () => {
  console.info('Congratulations: Success connect to MongoDB('.green + config.database.green + ')!'.green);
});
mongoose.connection.on('error', () => {
  console.info('Hey: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon4.png')));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/checkLoginStatus', (req, res, next) => {
  let param = req.body,
    msg = {};
  DB.session.findOne({sessionId: param.sessionId}, (err, session) => {
    if (err) return next(err);
    if (session) {
      DB.users.findOne({email: session.email}, (err, user) => {
        if (err) return next(err);
        if (user) {
          user.password = "******";
          let userInfo = {
            uesrId: user.userId,
            userName: user.userName,
            email: user.email,
            gender: user.gender
          }
          msg = {
            status: 200,
            userInfo: user
          };
          res.send(msg);
        } else {
          msg = {message: '查找的用户不存在！'};
          res.send(msg);
        }
      })
    } else {
      msg = {message: '请重新登录'};
      res.send(msg);
    }
  })
})

app.post('/api/login', (req ,res, next) => {
  let param = req.body,
    msg = {},
    message = '';
  DB.users.findOne({email: param.loginId, password: param.loginPwd}, (err, user) => {
    if (err) return next(err);
    if (!user) {
      msg = {
        message: '用户名或密码错误！'
      };
    } else {
      let time = new Date().getTime(),
        sessionId = '';
      if (param.remenber) {
        sessionId = crypto.createHash('sha1').update(param.loginId+param.loginPwd+time).digest('hex');
        let session = new DB.session({
            sessionId: sessionId,
            email: param.loginId
          });
        session.save((err) => {
          if (err) return next(err);
        })
      };
      user.password = "******";
      msg = {
        status: 200,
        sessionId: sessionId,
        time: time,
        userInfo: user
      };
    };
    res.send(msg);
  })
})

app.post('/api/saveArticle', (req, res, next) => {
  let param = req.body;
  let curCount = 0;
  DB.article.count({}, (err, count) => {
    if (err) return next(err);
    curCount = count + 1;
    let _data = _.extend({
      articleId: curCount,
      author: '游灵',
      createDate: new Date().getTime(),
      readTimes: 0
    }, param);
    let article = new DB.article(_data);
    article.save((err) => {
      if (err) return next(err);
      res.send({ message: 'new article has been saved successfully!' });
    });
  });
});

app.use((req, res) => {
  match({ routes: routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        let html = renderToString(<RoutingContext {...renderProps} />);
        let page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
const server = http.createServer(app);
const io = socketio(server);
let onlineUsers = 0;

io.sockets.on('connection', (socket) => {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', () => {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
