const express = require('express');
const PhoneBook = require('../mongodb/Model/phoneBook');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const phoneNumber = await PhoneBook.find();

    res.status(200).json({
      status: 'Success',
      data: {
        phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      data: {
        error,
      },
    });
  }
});

module.exports = router;
