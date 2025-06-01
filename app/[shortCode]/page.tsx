// app/[shortCode]/page.tsx
import { prisma } from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';

export default async function RedirectPage({ 
  params 
}: { 
  params: { shortCode: string } 
}) {
  try {
    const link = await prisma.link.findUnique({
      where: { shortCode: params.shortCode },
    });

    if (link) {
      redirect(link.longUrl);
    } else {
      notFound();
    }
  } catch (error) {
    console.error('Database error:', error);
    notFound();
  }
}