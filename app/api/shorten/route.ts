import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function POST(req: NextRequest) {
  const { longUrl } = await req.json();

  let shortCode;
  let existing;

  do {
    shortCode = generateShortCode();
    existing = await prisma.link.findUnique({ where: { shortCode } });
  } while (existing);

  const newLink = await prisma.link.create({
    data: { longUrl, shortCode },
  });

  return NextResponse.json({ shortUrl: `${req.nextUrl.origin}/${shortCode}` });
}
