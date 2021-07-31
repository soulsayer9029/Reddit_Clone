import nodemailer from 'nodemailer'
import { PASSWORD } from '../constants';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to:string,html:string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    // console.log(testAccount)
    // create reusable transporter object using the default SMTP transport
    var transporter=nodemailer.createTransport({
      service:'Gmail',
      auth:{
          user:'devolver.tech@gmail.com',
          pass:PASSWORD
  
      },
      port:465
  })
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from:'devolver.tech@gmail.com',
      to:to,
      subject:'Change Password',
      html
    });
    console.log(info)
  
    
  }
  
