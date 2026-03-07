// Vercel Edge Middleware – Passwortschutz (serverseitig)
// Passwort wird aus Umgebungsvariable BETA_PASSWORD gelesen

export const config = {
  matcher: ['/((?!api|_vercel|favicon).*)']
};

export default function middleware(request) {
  const url = new URL(request.url);

  // /unlock?code=XXX setzt ein Cookie
  if (url.pathname === '/unlock') {
    const code = url.searchParams.get('code');
    const password = process.env.BETA_PASSWORD;

    if (!password || code === password) {
      const res = new Response(null, {
        status: 302,
        headers: { Location: '/' }
      });
      res.headers.set('Set-Cookie', `routaris_auth=1; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`);
      return res;
    }

    // Falscher Code → zurück zur Login-Seite mit Fehler
    return new Response(loginPage(true), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  // Kein Passwort gesetzt → Seite offen
  if (!process.env.BETA_PASSWORD) return;

  // Cookie prüfen
  const cookie = request.headers.get('cookie') || '';
  if (cookie.includes('routaris_auth=1')) return;

  // Login-Seite anzeigen
  return new Response(loginPage(false), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function loginPage(error) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Routaris Beta</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#1a1a2e;font-family:system-ui,-apple-system,sans-serif}
    .gate{text-align:center;color:#fff;max-width:360px;padding:2rem}
    .gate h1{font-size:1.8rem;margin:1rem 0 0.5rem;font-weight:700}
    .gate p{opacity:0.7;margin-bottom:1.5rem}
    .gate input{width:100%;padding:12px 16px;border-radius:12px;border:2px solid #333;background:#0d0d1a;color:#fff;font-size:1rem;text-align:center;outline:none}
    .gate input:focus{border-color:#4ecdc4}
    .gate button{margin-top:1rem;padding:12px 32px;border-radius:12px;border:none;background:#4ecdc4;color:#1a1a2e;font-size:1rem;font-weight:600;cursor:pointer}
    .gate button:hover{background:#45b7b0}
    .error{color:#e74c3c;margin-top:0.75rem}
  </style>
</head>
<body>
  <div class="gate">
    <div style="font-size:3rem">🌏</div>
    <h1>Routaris Beta</h1>
    <p>Zugang nur mit Einladungscode</p>
    <form action="/unlock" method="GET">
      <input name="code" type="password" placeholder="Code eingeben..." autofocus required>
      <button type="submit">Zugang</button>
      ${error ? '<p class="error">Falscher Code</p>' : ''}
    </form>
  </div>
</body>
</html>`;
}
