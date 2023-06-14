const express = require('express');
const PhoneBook = require('../mongodb/Model/phoneBook');

const router = express.Router();

router.post('/', async(req, res) => {
    try{
        const phoneNumber = new PhoneBook(req.body);
        await phoneNumber.save();
        res.status(201).json({
            status: "Success",
            data: {
                phoneNumber
            }
        });
    } catch(error){
        res.status(500).json({
            status: "Failed",
            data: {
                error
            }
        });
    }
});

module.exports = router;