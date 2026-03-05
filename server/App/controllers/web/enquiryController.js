let enquiryModel = require('../../models/enquiry.models');
let enquiryInsert = (req, res) => {
    let { name, email, phone, message } = req.body;
    let enquiry = new enquiryModel({
        name,
        email,
        phone,
        message
    });
    // Save the enquiry to the database
    enquiry.save().then(() => {
        console.log("Enquiry saved successfully");
        res.send({status:1, message:"Enquiry saved successfully"});
    }).catch((err) => {
        res.send({status:0, message:"Error While saving enquiry", error: err.message });
    });
};

let enquiryList = async (req, res) => {
    let enquiryData = await enquiryModel.find();
    res.send({
        status: 200,
        message: "Enquiry list retrieved successfully",
        data: enquiryData
    });
}

let enquiryDelete = async (req, res) => {
    let enquiryId = req.params.id;
    let deletedData = await enquiryModel.deleteOne({ _id: enquiryId });
    res.send({
        status: 200,
        message: "Enquiry deleted successfully",
        data: deletedData
    });
}

let enquirySingleRow = async (req, res) => {
    let enquiryId = req.params.id;
    let enquiry  = await enquiryModel.findOne({ _id: enquiryId });
    res.send({
        status: 200,
        message: "Enquiry retrieved successfully",
        data: enquiry
    });
}

let enquiryUpdate = async (req, res) => {
    let enquiryId = req.params.id;
    let { name, email, phone, message } = req.body;
    updateobject = {
        name,
        email,
        phone,
        message
    };
    let updatedData = await enquiryModel.updateOne({ _id: enquiryId }, updateobject);
    res.send({
        status: 200,
        message: "Enquiry updated successfully",
        data: updatedData
    });
}

module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate };