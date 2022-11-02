import express, { Request, Response, NextFunction } from 'express';
const app = express();

// import connectDB from './loaders/db';
import routes from './routes';
//const schedule = require('node-schedule'); //특정시간에 함수를 실행하는 모듈
require('dotenv').config(); //환경변수 관리

app.use(express.urlencoded({ extended: true })); //요청의 본문에 있는 데이터를 req.body 객체로 만든다.
app.use(express.json()); //JSON 문자열이 넘어오는 경우 객체로 만든다.

app.use(routes);

interface ErrorType {
  message: string;
  status: number;
}

//push
// var admin = require('firebase-admin');
// var serviceAccount = require('../photosurfer-firebase-adminsdk-j0t18-cfad93f7a2.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(0, 6)];
// rule.hour = 8;
// rule.minute = 0;
// rule.tz = "Asia/Seoul";
// const job = schedule.scheduleJob(rule, PushController.pushPlan);

app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app
  .listen(process.env.PORT, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on('error', err => {
    console.error(err);
    process.exit(1);
  });

module.exports = app;
