
const {Pool} = require('pg');
const nodemailer = require('nodemailer')
const sendgrid=require('nodemailer-sendgrid-transport');
const sendgridTransport = require('nodemailer-sendgrid-transport');



const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );



const pool = new Pool({
    host: '35.226.99.71',
    user: 'postgres',
    database: 'postgres',
    password: 'password'
});


let package = ""
let driversLicense = 0;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  var OTP = getRandomInt(5000000000);

const getPackage = (request, response) => {

    //package is assigned to a batch
    




    pool.query('SELECT OTP FROM package WHERE batchid =1 AND customername=\'Brand Bligh\'', (error, results) => {
      if (error) {
        throw error
      }
      console.log(typeof results.rows[0]['otp'])
     OTP = results.rows[0]['otp']
      response.status(200).json(results.rows)
     
    })
    transporter.sendMail({
        from: 'akulshi04@gmail.com', // sender address
        to: 'akulshi04@gmail.com', // list of receivers
        subject: 'Your Package Is On its Way!', // Subject line
        body: 'Please See Your OTP Number Listed Above',
        html: OTP + '<h5>Please See Your OTP number listed above</h5>'
    }, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    }); 
  }





let mailOptions = {
    from: 'akulshi04@gmail.com', // sender address
    to: 'dey.olenka@gmail.com', // list of receivers
    subject: 'Your Package Is On its Way!', // Subject line
    body: 'Please See Your OTP Number Listed Above',
    html: OTP + '<h5>Please See Your OTP Number Listed Above</h5>'
};

// send mail with defined transport object








  module.exports = {
    getPackage,
  }

