import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const eggs = await prisma.egg.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(eggs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch eggs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const egg = await prisma.egg.create({
      data: {
        code: body.code,
        reward: body.reward,
        rarity: body.rarity || 'Common',
      },
    });
    return NextResponse.json(egg);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create egg' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const egg = await prisma.egg.update({
      where: { id },
      data,
    });
    return NextResponse.json(egg);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update egg' }, { status: 500 });
  }
}
