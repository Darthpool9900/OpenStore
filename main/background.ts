import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import express from 'express';
import { Sequelize } from 'sequelize';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes';
import 'dotenv/config';
import dotenv from 'dotenv';

dotenv.config({ path: './secrets.env' });


const isProd = process.env.NODE_ENV === 'production'

// Define the root directory path
const ROOT_DIR = path.resolve(__dirname);

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(ROOT_DIR, '../finish.db'),
});

// Initialize Express server
const expressApp = express();

// Apply middleware before routes
expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(router);

expressApp.listen(2000, () => {
  console.log('Express server is listening');
});


if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
