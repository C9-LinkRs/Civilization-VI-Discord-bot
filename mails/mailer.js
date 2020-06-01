let nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  maxConnections: 3,
  pool: true,
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD
  }
});

module.exports.sendMail = async (to, subject, text) => {
  let mailOptions = {
    from: process.env.MAILER_EMAIL,
    to,
    subject,
    text,
    html: text
  };
  
  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return reject(error);
        else return resolve(info);
      });
    });
  } catch (error) {
    throw error;
  }
}