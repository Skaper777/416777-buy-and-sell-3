'use strict';

const express = require(`express`);
const path = require(`path`);

const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const searchRoutes = require(`./routes/search`);

const {DEFAULT_PORT, PUBLIC_DIR, TEMPLATES_DIR} = require(`../constants`);

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/search`, searchRoutes);
app.use(`/offers`, offersRoutes);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, () => {
  console.info(`Сервер запущен на ${DEFAULT_PORT} порту`);
});
