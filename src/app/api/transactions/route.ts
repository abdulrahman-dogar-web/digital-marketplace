import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { user: true, product: true },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(transactions);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transaction = await prisma.transaction.create({
      data: {
        userId: body.userId,
        productId: body.productId,
        amount: parseFloat(body.amount),
        method: body.method,
        txId: body.txId,
        screenshot: body.screenshot,
      },
    });
    return NextResponse.json(transaction);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const transaction = await prisma.transaction.update({
      where: { id },
      data,
    });
    return NextResponse.json(transaction);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}
