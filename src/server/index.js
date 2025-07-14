const express = require('express');
const axios = require('axios');
const os = require('os');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// This lets our server read JSON data from forms
app.use(express.json());
app.use(express.static('dist'));

// Existing endpoint
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// NEW: This handles form submissions
app.post('/api/submit-application', async (req, res) => {
  try {
    console.log('Received application:', req.body);

    // Prepare data for Alloy API
    const alloyData = {
      name_first: req.body.firstName,
      name_last: req.body.lastName,
      address_line_1: req.body.addressLine1,
      address_line_2: req.body.addressLine2 || '',
      address_city: req.body.city,
      address_state: req.body.state,
      address_postal_code: req.body.zipCode,
      address_country_code: 'US',
      document_ssn: req.body.ssn,
      email_address: req.body.email,
      birth_date: req.body.dateOfBirth
    };

    console.log('Sending to Alloy:', alloyData);

    // Create Basic Auth header
    const token = process.env.ALLOY_WORKFLOW_TOKEN;
    const secret = process.env.ALLOY_WORKFLOW_SECRET;
    const auth = Buffer.from(`${token}:${secret}`).toString('base64');

    // Make API call to Alloy
    const alloyResponse = await axios.post(
      'https://sandbox.alloy.co/v1/evaluations/',
      alloyData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Alloy response:', alloyResponse.data);

    // Extract the outcome from Alloy's response
    const outcome = alloyResponse.data.summary?.outcome || 'Unknown';

    res.json({ outcome: outcome });
  } catch (error) {
    console.error('Error processing application:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to process application',
      details: error.response?.data || error.message
    });
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
