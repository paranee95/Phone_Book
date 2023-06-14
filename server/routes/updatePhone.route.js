const express = require('express');
const PhoneBook = require('../mongodb/Model/phoneBook');

const router = express.Router();

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const phoneNumber = await PhoneBook.findByIdAndUpdate(
      id,
      { name, phone },
      { new: true }
    );

    res.status(201).json({
      status: 'Success',
      data: {
        phoneNumber,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      data: {
        err,
      },
    });
  }
});

module.exports = router;
