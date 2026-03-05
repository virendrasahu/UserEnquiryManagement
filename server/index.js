let express = require('express');
let mongoose = require('mongoose');
let app = express();
let cors = require('cors');
require('dotenv').config();

// app.use(cors())
// app.use(cors({
//   origin: "*"
// }));
app.use(cors({
  origin: "https://user-enquiry-management.vercel.app/"
}));


// Connect to MongoDB
app.use(express.json());
let enquiryRoutes = require('./App/routes/web/enquiryRoutes');
// Use the enquiry routes for handling API requests related to enquiries
app.use("/api/enquiry", enquiryRoutes); //http://localhost:8000/api/enquiry/insert
// Connect to MongoDB and start the server

mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
});

