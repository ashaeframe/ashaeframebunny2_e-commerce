(async () => {
  try {
    const resp = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'customer@bunny.com', password: 'customer123' }),
    });
    console.log('Status:', resp.status);
    const body = await resp.text();
    try { console.log('Body:', JSON.stringify(JSON.parse(body), null, 2)); } catch(e) { console.log('Body (raw):', body); }
  } catch (err) {
    console.error('Request error:', err);
    process.exit(1);
  }
})();