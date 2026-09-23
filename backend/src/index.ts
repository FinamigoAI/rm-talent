import { buildApp } from './app';

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection (backstop):', reason);
});

const app = buildApp();
app.listen(process.env.PORT ?? 8080, () => {
  console.log('rm-talent-backend listening');
});
