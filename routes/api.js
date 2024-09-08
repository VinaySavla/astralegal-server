const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { ContactForm } = require("../models");
const { Appointment } = require("../models");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const e = require("express");
const axios = require('axios');
const moment = require("moment");

//For SMTP Mail Sending
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Creates a new Contact request on database
router.post("/contactus", async (req, res) => {
  const bodyData = req.body;

  message1 = {
    from: "astralegalco@gmail.com",
    to: "astralegalco@gmail.com",
    subject: `Contact us request from ${bodyData.first_name}`,
    html: `<p>You got a new message from:<p><p>Name : ${bodyData.first_name} ${bodyData.last_name}</p><p>Phone Number : ${bodyData.phone}</p><p>Email : ${bodyData.email}</p><p>Address : ${bodyData.address}</p><p>Message : ${bodyData.message}</p><p>Service : ${bodyData.service}</p><p>Best wishes, Astra Legal</p>`,
  };

    transporter.sendMail(message1, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        // console.log(info);
      }
    });

  const createResponse = await ContactForm.create(bodyData);
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(createResponse);
});

// Creates a new Appointment request on database
router.post("/appointment", async (req, res) => {
  const bodyData = req.body;

  message1 = {
    from: "astralegalco@gmail.com",
    to: "astralegalco@gmail.com",
    subject: `Appointent booked by ${bodyData.first_name}`,
    html: `<p>Appointment is booked by:<p><p>Name : ${bodyData.first_name} ${bodyData.last_name}</p><p>Phone Number : ${bodyData.phone}</p><p>Email : ${bodyData.email}</p><p>Date & Time : ${bodyData.date_time}</p><p>Message : ${bodyData.message}</p><p>Best wishes, Astra Legal</p>`,
  };

    transporter.sendMail(message1, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        // console.log(info);
      }
    });

  const createResponse = await Appointment.create(bodyData);
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(createResponse);
});

// Gets all the Appointments
router.get("/appointments", async (req, res) => {
  const contactData = await Appointment.findAll({
    //order condition
    order: [["TimeStamp", "DESC"]],
  });
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(contactData);
});

// Gets the Contact by id
router.get("/appointment/:datetime", async (req, res) => {
  const datetime = req.params.datetime;
  
  // Parse the datetime and calculate the next 15 days
  const startDate = moment(datetime).startOf('day'); // Starting from the given date
  const endDate = moment(datetime).add(15, 'days').endOf('day'); // 15 days later
  
  try {
    const appointments = await Appointment.findAll({
      where: {
        date_time: {
          [Op.between]: [startDate.toDate(), endDate.toDate()], // Date range between the provided date and 15 days later
        },
      },
      // include your other models here if needed
    });
    
    res.header({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    res.json(appointments); // Send the filtered appointments back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching appointments");
  }
});

// // Creates a new contact request on database
// router.post("/getintouch", async (req, res) => {
//   const bodyData = req.body;
//   const createResponse = await ContactForm.create(bodyData);
//   res.header({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//   });
//   res.json(createResponse);
// });

// // Creates a new User on database
// router.post("/signup", async (req, res) => {
//   const bodyData = req.body;
//   const createResponse = await Users.create(bodyData);
//   res.header({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//   });
//   res.json(createResponse);
// });

// // Verify User on database
// router.post("/signin", async (req, res) => {
//   const bodyData = req.body;
//   const createResponse = await Users.findOne({
//     where: {
//       Email: bodyData.Email,
//       Password: bodyData.Password,
//     },
//   });
//   res.header({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//   });
//   res.json(createResponse);
// });


// // Delete the Contact by id
// router.delete("/deleteContact/:id", async (req, res) => {
//   const Id = req.params.id;
//   // console.log(contactID);
//   const contactData = await ContactForm.destroy({
//     where: {
//       Id: Id
//     },
//     // include: [
//     //   {
//     //     model: User,
//     //     as: "user",
//     //   },
//     //   {
//     //     model: Status,
//     //     as: "status",
//     //   },
//     // ],
//   });
//   res.header({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//   });
//   res.json(contactData);
// });

// // Gets Google Reviews
// router.get("/reviews", async (req, res) => {
//   const apiKey = process.env.API_KEY;
//   const reviewsResponse = await axios.get(
//     `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJizxli4-p5zsRYUVs6CKc2bU&fields=name,rating,reviews&key=${apiKey}`
//   )

//   const reviews = reviewsResponse.data.result.reviews;

//   const existingReviewsResponse = await axios.get("https://admin.greencurvesecurities.com/items/GoogleReviews");
//   const existingReviews = existingReviewsResponse.data.data;

//   const newReviews = reviews.filter(review => {
//     const existingReview = existingReviews.find(er => er.author_name === review.author_name);
//     return !existingReview;
//   });

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   for (const review of newReviews) {
//     const postData = {
//       author_name: review.author_name,
//       profile_photo_url: review.profile_photo_url,
//       rating: review.rating,
//       text: review.text,
//     };

//     await axios.post("https://admin.greencurvesecurities.com/items/GoogleReviews", postData, config);
//   }

//   res.status(201).send(`New reviews posted successfully to Admin Portal`);
//   // res.header({
//   //   "Content-Type": "application/json",
//   //   "Access-Control-Allow-Origin": "*",
//   //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//   //   "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//   // });
//   // res.json(Reviews.data);
// });



// // Updates Contacted value
// router.put("/contacted/:id", async (req, res) => {
//   const contactID = req.params.id;
//   const contactData = await ContactForm.update(
//     { isContacted: true },
//     {
//       where: {
//         Id: contactID,
//       },
//     }
//   );
//   res.header({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//   });
//   res.json(contactData);
// });

module.exports = router;
