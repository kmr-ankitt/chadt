import { createServer } from 'http';
import { app } from './express';

export const server = createServer(app);