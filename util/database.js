
const {Pool} = require('pg');
const nodemailer = require('nodemailer')
const sendgrid=require('nodemailer-sendgrid-transport');
const sendgridTransport = require('nodemailer-sendgrid-transport');


//Email Configuration
const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );

//1.package has been assigned batchID (Pre-populated)
//2.DriverID entered into batch table(Pre-populated)

const pool = new Pool({
    host: '35.226.99.71',
    user: 'postgres',
    database: 'postgres',
    password: 'password'
});


let package = ""
let driversLicense = 0;


const postPackage = (request, response) => {

  
  customerName = JSON.stringify(request.body)

  
  customerName = JSON.parse(customerName)['customername']


  function getOTP(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let OTP = getOTP(5000);

  //passing customer name statically for now. Eventually this will be a dynamic request. 
  values = [OTP, customerName]
  value = [customerName]


  //3.Generate OTP, writes OTP to table based on customerName
  console.log(OTP)
  pool.query('update Package set otp=$1 where customername=$2',values, (error, results) => {
    if (error) {
        throw error
      }
     })


    //Email with OTP and return package info and customerName
    pool.query('SELECT OTP FROM package WHERE customername=$1',value, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
     
    })

    //Sends Email
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
    html: '<h5>Please See Your OTP Number Listed Above</h5>'
};
// send mail with defined transport object



  module.exports = {
    postPackage,
  }

