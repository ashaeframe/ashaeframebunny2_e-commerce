(async () => {
  const fetch = globalThis.fetch;
  try {
    const registerResp = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test+cli@example.com', password: 'password123' }),
    });
    console.log('Register status:', registerResp.status);
    console.log('Register body:', await registerResp.json());

    const loginResp = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test+cli@example.com', password: 'password123' }),
    });
    console.log('Login status:', loginResp.status);
    console.log('Login body:', await loginResp.json());
  } catch (err) {
    console.error('Request error:', err);
    process.exit(1);
  }
})();