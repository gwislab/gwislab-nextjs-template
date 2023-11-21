import { registerEnumType } from '@nestjs/graphql';
import { ELocale, ESignUpMethod, EUserGender, EUserRole } from '@prisma/client';

registerEnumType(EUserRole, {
  name: 'EUserRole',
});

registerEnumType(EUserGender, {
  name: 'EUserGender',
});

registerEnumType(ESignUpMethod, {
  name: 'ESignUpMethod',
});

registerEnumType(ELocale, {
  name: 'ELocale',
});
