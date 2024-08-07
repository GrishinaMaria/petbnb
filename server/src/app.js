require('dotenv').config();
const apiRouter = require('./routers/api.router');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { wss, upgradeCb } = require('./ws/upgradeCb');
const connectionCb = require('./ws/connectionCb');
const { initSocket } = require('./socket/socket');

const express = require('express');

const app = express();
const { PORT } = process.env || 3100;

// //! http сервер +
// const server = http.createServer(app);


//! Конфиг корса
const corsConfig = {
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
};
//! Подключение
app.use(cors(corsConfig));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', apiRouter);
app.use(express.static(path.join(__dirname, "public")));
// app.listen(PORT, () => {
//   console.log(`Server started at ${PORT} port`);
// });

//! http сервер +
const server = http.createServer(app);

//! папка ws для сокет-сервера и пишем 2 функции
server.on('upgrade', upgradeCb);
wss.on('connection', connectionCb);

//по лекции App поменяли на Server
// initSocket(server);
server.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
