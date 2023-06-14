const express = require('express');
const PhoneBook = require('../mongodb/Model/phoneBook');

const router = express.Router();

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const phoneNumber = await PhoneBook.findByIdAndDelete(id);

    if (!phoneNumber) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Phone book entry not found',
      });
    }

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
