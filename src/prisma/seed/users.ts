

import { Prisma } from '@prisma/client';

export const userIdWalterWhite = '1f008731-4645-43de-8af9-3060d4086001';
export const userIdJessePinkman = '1f008731-4645-43de-8af9-3060d4086002';

const baseImageUrl = 'https://raw.githubusercontent.com/mkosir/prisma-next-typescript/main/misc/user-images';

export const users: Array<Prisma.UserCreateInput> = [
    {
        id: userIdWalterWhite,
        email: 'walter.white@mail.com',
        name: 'Walter White',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: userIdJessePinkman,
        email: 'jesse.pinkman@mail.com',
        name: 'Jesse Pinkman',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086003',
        email: 'skyler.white@mail.com',
        name: 'Skyler White',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086004',
        email: 'hank.schrader@mail.com',
        name: 'Hank Schrader',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086005',
        email: 'marie.schrader@mail.com',
        name: 'Marie Schrader',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086006',
        email: 'saul.goodman@mail.com',
        name: 'Saul Goodman',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086007',
        email: 'gustavo.fring@mail.com',
        name: 'Gustavo Fring',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086008',
        email: 'michael.ehrmantraut@mail.com',
        name: 'Michael Ehrmantraut',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086009',
        email: 'hector.salamanca@mail.com',
        name: 'Hector Salamanca',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086010',
        email: 'alberto.salamanca@mail.com',
        name: 'Alberto Salamanca',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
    {
        id: '1f008731-4645-43de-8af9-3060d4086011',
        email: 'gale.boetticher@mail.com',
        name: 'Gale Boetticher',
        createdAt: new Date("2019-01-16 09:00:00"),
        updatedAt: new Date("2019-01-16 09:00:00")
    },
];