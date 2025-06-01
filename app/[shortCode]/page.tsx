import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function RedirectPage({ params }: { params: { shortCode: string } }) {
  const link = await prisma.link.findUnique({
    where: { shortCode: params.shortCode },
  });

  if (link) {
    redirect(link.longUrl);
  } else {
    return <p>404 Not Found</p>;
  }
}
