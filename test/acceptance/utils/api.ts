import { agent } from 'supertest';
import app from '../../../server';

export const Api = agent(app);
