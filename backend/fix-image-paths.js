const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixImagePaths() {
  try {
    console.log('Starting to fix image paths...');

    // Fix gallery image paths
    const galleryImages = await prisma.gallery.findMany();
    console.log(`Found ${galleryImages.length} gallery images`);

    for (const image of galleryImages) {
      if (image.image && !image.image.includes('/public/uploads/')) {
        const backendUrl = process.env.BACKEND_URL || 'https://coreaeration.com/backend';
        const newPath = image.image.replace('/uploads/', `${backendUrl}/public/uploads/`);
        await prisma.gallery.update({
          where: { id: image.id },
          data: { image: newPath }
        });
        console.log(`Updated gallery image ${image.id}: ${image.image} -> ${newPath}`);
      }
    }

    // Fix user company logo paths
    const users = await prisma.user.findMany({
      where: {
        companyLogo: {
          not: null
        }
      }
    });
    console.log(`Found ${users.length} users with company logos`);

    for (const user of users) {
      if (user.companyLogo && !user.companyLogo.includes('/public/uploads/')) {
        const backendUrl = process.env.BACKEND_URL || 'https://coreaeration.com/backend';
        const newPath = user.companyLogo.replace('/uploads/', `${backendUrl}/public/uploads/`);
        await prisma.user.update({
          where: { id: user.id },
          data: { companyLogo: newPath }
        });
        console.log(`Updated user ${user.id} logo: ${user.companyLogo} -> ${newPath}`);
      }
    }

    console.log('Image path fixing completed!');
  } catch (error) {
    console.error('Error fixing image paths:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixImagePaths();
