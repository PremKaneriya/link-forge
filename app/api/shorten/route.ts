// app/api/shorten/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request: NextRequest) {
  try {
    const { longUrl } = await request.json();

    if (!longUrl) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Check if URL already exists
    const existingLink = await prisma.link.findFirst({
      where: { longUrl }
    });

    if (existingLink) {
      return NextResponse.json({ 
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${existingLink.shortCode}` 
      });
    }

    // Generate unique short code
    let shortCode = generateShortCode();
    let attempts = 0;
    
    while (attempts < 5) {
      const existing = await prisma.link.findUnique({
        where: { shortCode }
      });
      
      if (!existing) break;
      
      shortCode = generateShortCode();
      attempts++;
    }

    // Create new link
    const link = await prisma.link.create({
      data: {
        longUrl,
        shortCode,
      },
    });

    return NextResponse.json({ 
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${link.shortCode}` 
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}