import { NextResponse } from 'next/server';

const PERSONAL_DOMAINS = new Set([
  'gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com',
  'protonmail.com','rediffmail.com','live.com','ymail.com','yahoo.in'
]);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, company, phone, idea } = body;

  if (!name?.trim() || !email?.trim() || !idea?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (idea.trim().length < 5) {
    return NextResponse.json({ error: 'Please describe your idea in more detail' }, { status: 400 });
  }

  const sanitize = (s: string) => s.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: sanitize(name),
        email: sanitize(email),
        company: company ? sanitize(company) : '',
        phone: phone?.trim() ?? '',
        idea: sanitize(idea),
        submittedAt: new Date().toISOString(),
      }),
    }).catch(err => console.error('[contact webhook] failed:', err));
  }

  return NextResponse.json({ success: true });
}
