import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Initializing Neural Seed Protocol...');

  // 1. Create Admin & Initial Sellers
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cybernest.io' },
    update: {},
    create: {
      username: 'Nexus_Admin',
      email: 'admin@cybernest.io',
      role: 'admin',
      rank: 'Nexus Master',
      xp: 9999,
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: 'seller@cybernest.io' },
    update: {},
    create: {
      username: 'Alpha_Operator',
      email: 'seller@cybernest.io',
      role: 'seller',
      rank: 'Cyber Agent',
      xp: 2500,
    },
  });

  console.log('✅ Citizen Nodes Established');

  // 2. Create Cinematic Assets
  const products = [
    {
      name: 'Neural Automation Suite',
      description: 'A complete AI-driven automation framework for futuristic SaaS management.',
      price: 299.00,
      rarity: 'Legendary',
      image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800',
      category: 'Automation',
      status: 'published',
      sellerId: seller.id,
    },
    {
      name: 'Cyber Nexus Prompt Pack',
      description: '1000+ elite prompts for generative AI mastery and high-conversion outputs.',
      price: 49.00,
      rarity: 'Elite',
      image_url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800',
      category: 'Prompts',
      status: 'published',
      sellerId: seller.id,
    },
    {
      name: 'Nexus Security Suite',
      description: 'Advanced encryption and protection layers for your digital assets.',
      price: 199.00,
      rarity: 'Legendary',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      category: 'Security',
      status: 'published',
      sellerId: admin.id,
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Neural Assets Synchronized');

  // 3. Create Initial Easter Eggs
  await prisma.egg.create({
    data: {
      code: 'NEURAL2025',
      reward: '50% NEURAL DISCOUNT',
      rarity: 'Legendary'
    }
  });

  console.log('✅ Reward Nodes Initialized');
  console.log('📡 Synchronization Complete. CyberNest is LIVE.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
