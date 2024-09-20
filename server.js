const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body;
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const requestBody = {
    event: {
      token,
      expectedAction: 'LOGIN',
      siteKey: process.env.REACT_APP_SITE_KEY,
    },
  };

  try {
    const response = await axios.post(
      `https://recaptchaenterprise.googleapis.com/v1/projects/chatgpt-436120/assessments?key=${API_KEY}`,
      requestBody
    );

    const { score } = response.data.riskAnalysis;

    if (score >= 0.5) {
      return res.status(200).json({ success: true, score });
    } else {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.', score });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error.response ? error.response.data : error.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
