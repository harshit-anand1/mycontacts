const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");
const contactModel = require('../models/contactModel');
//@desc get all contacts
//@GET /api/contacts
const getContacts = asyncHandler(async (req,res)=>{
    const contacts =await Contact.find();
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req,res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
    console.log("the req body is", req .body);
});

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
   
    res.status(200).json(updatedContact);
});

const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    res.status(200).json(contact);
});
const deleteContact =  asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndRemove(req.params.id);
    
    res.status(200).json({messagee:`delete contact for ${req.params.id}`});
})



module.exports = {getContacts, createContact, updateContact, getContact, deleteContact}; 