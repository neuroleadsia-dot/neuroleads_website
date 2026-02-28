const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS - only allow your frontend for API routes
app.use('/api', cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://neuroleads.fr',
    'https://www.neuroleads.fr',
  ],
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// Rate limiting - prevent abuse
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: { error: 'Trop de requêtes. Veuillez patienter.' },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 form submissions per 15 min per IP
  message: { error: 'Trop de soumissions. Veuillez patienter.' },
});

// ==========================================
// POST /api/chat - Proxy to Anthropic API
// ==========================================
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { messages, system } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages requis.' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 512,
        system: system || '',
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Anthropic API error:', response.status, errorData);
      return res.status(response.status).json({
        error: 'Erreur du service IA.',
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// ==========================================
// POST /api/contact - Proxy to EmailJS API
// ==========================================
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, company, service, budget, message } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }

    // EmailJS REST API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://neuroleads.fr',
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          name,
          email,
          company: company || 'Non renseigné',
          service,
          budget: budget || 'Non renseigné',
          message: message || 'Aucun message',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('EmailJS error:', response.status, errorText);
      return res.status(500).json({ error: "Erreur lors de l'envoi du message." });
    }

    res.json({ success: true, message: 'Message envoyé avec succès.' });
  } catch (error) {
    console.error('Contact proxy error:', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==========================================
// Production: Serve static frontend + SPA fallback
// ==========================================
const distPath = path.join(__dirname, '..', 'dist');
const fs = require('fs');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback: all non-API routes serve index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });

  console.log('Serving static files from dist/');
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Anthropic API key: ${process.env.ANTHROPIC_API_KEY ? '✓ loaded' : '✗ MISSING'}`);
  console.log(`EmailJS credentials: ${process.env.EMAILJS_SERVICE_ID ? '✓ loaded' : '✗ MISSING'}`);
});
