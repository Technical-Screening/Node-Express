/**
 * global jest, before each
 */
import { mockDeep, mockReset } from 'jest-mock-extended';
import prisma from '../src/app/configs/db-client';

const prismaMock = prisma;

// eslint-disable-next-line no-undef
jest.mock('../src/app/configs/db-client', () => mockDeep());

// eslint-disable-next-line no-undef
beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
