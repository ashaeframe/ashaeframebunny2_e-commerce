const express = require('express');
const router = express.Router();

// Dev-only endpoint to trigger seeding of the current DB instance
router.post('/seed', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not allowed in production' });
  }

  try {
    const { seedDatabase } = require('../seed');
    await seedDatabase();
    return res.json({ ok: true, message: 'Database seeded successfully' });
  } catch (err) {
    console.error('Admin seed error:', err);
    return res.status(500).json({ error: 'Seeding failed', details: err.message });
  }
});

module.exports = router;