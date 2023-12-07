import { PrismaClient, UserRole } from '@prisma/client';
import { Utils } from 'src/services/utils.service';
import config from './config';

const registerAssets = (prisma: PrismaClient) => {
  try {
    const assets = [
      {
        name: 'logo.png',
        type: 'image/png',
      },
      {
        name: 'facebook.png',
        type: 'image/png',
      },
      {
        name: 'linkedin.png',
        type: 'image/png',
      },
      {
        name: 'github.png',
        type: 'image/png',
      },
      {
        name: 'twitter.png',
        type: 'image/png',
      },
      {
        name: 'instagram.png',
        type: 'image/png',
      },
      {
        name: 'arrow.png',
        type: 'image/png',
      },
    ];

    assets.forEach(async (asset) => {
      const foundAsset = await prisma.serverDocument.findFirst({
        where: { name: asset.name },
      });

      if (!foundAsset) {
        await prisma.serverDocument.create({
          data: {
            name: asset.name,
            originalName: asset.name,
            type: asset.type,
            fullPath: `${process.cwd()}/uploads/assets/${asset.name}`,
            size: 200,
            url: `${config.serverUrl}/file/pb/${asset.name}`,
            isPublic: true,
            destination: `${process.cwd()}/uploads/assets`,
            createdBy: 'bootstrap',
          },
        });
      }
    });
  } catch (error) {
    console.log(
      '******* An error occurred saving server assets ******* ',
      JSON.stringify({ error }),
    );
  }
};

export const runBootstrap = async (prisma: PrismaClient) => {
  // save admin user info
  const utils = new Utils();
  try {
    registerAssets(prisma);

    const resources = await prisma.resource.findMany();
    const resourceCategories = await prisma.resourceCategory.findMany();
    const projects = await prisma.project.findMany();
    const serverDocs = await prisma.serverDocument.findMany();

    serverDocs.forEach(async (resource) => {
      // if (resource.url.includes('api')) {
      await prisma.serverDocument.update({
        where: { id: resource.id },
        data: {
          url: resource.url.replace('api', 'dev'),
          isPublic: !resource.fullPath.includes('private'),
        },
      });
      // }
    });

    resourceCategories.forEach(async (resource) => {
      if (resource.imageUrl.includes('api')) {
        await prisma.resourceCategory.update({
          where: { id: resource.id },
          data: { imageUrl: resource.imageUrl.replace('api', 'dev') },
        });
      }
    });

    projects.forEach(async (project) => {
      if (project.projectDiagramUrls.join().includes('api')) {
        await prisma.project.update({
          where: { id: project.id },
          data: {
            projectDiagramUrls: project.projectDiagramUrls.map((url) =>
              url.replace('api', 'dev'),
            ),
          },
        });
      }
    });

    resources.forEach(async (resource) => {
      if (
        resource.imageUrl?.includes?.('api') ||
        resource.pdfUrl?.includes?.('api') ||
        resource.wordUrl?.includes?.('api') ||
        resource.slidesUrl?.includes?.('api') ||
        resource.slidesUrl?.includes?.('api')
      ) {
        await prisma.resource.update({
          where: { id: resource.id },
          data: {
            imageUrl: resource?.imageUrl?.replace?.('api', 'dev'),
            pdfUrl: resource?.pdfUrl?.replace?.('api', 'dev'),
            wordUrl: resource?.wordUrl?.replace?.('api', 'dev'),
            slidesUrl: resource?.slidesUrl?.replace?.('api', 'dev'),
            courseUrl: resource?.slidesUrl?.replace?.('api', 'dev'),
          },
        });
      }
    });

    const admin = await prisma.user.create({
      data: {
        phoneNumber: '+23767777777777',
        userRole: UserRole.ADMIN,
        password: await utils.hashText('237690095900@AdminWandaPrep'),
        name: UserRole.ADMIN,
        locale: 'EN',
        email: 'admin@admins.com',
      },
    });

    if (admin) {
      console.log('******* ADMIN USER CREATED SUCCESSFULLY *******');
    }
  } catch (error) {
    console.log('******* Admin user already exists *******');
  }
};
