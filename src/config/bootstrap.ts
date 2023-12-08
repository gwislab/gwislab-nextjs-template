import { PrismaClient, EUserRole } from '@prisma/client';
import { HelperUtils } from 'utils';

export const runBootstrap = async (prisma: PrismaClient) => {
  // save admin user info
  const utils = new HelperUtils();
  try {
    const admin = await prisma.user.create({
      data: {
        phoneNumber: '+23767777777777',
        isEmailVerified: true,
        userRole: EUserRole.ADMIN,
        password: await utils.hashText('237690095900@AdminDoormot'),
        name: EUserRole.ADMIN,
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
