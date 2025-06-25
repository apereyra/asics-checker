const https = require('https');
const fetch = require('node-fetch');

// Configuración del bot
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// URL simplificada de la API
const API_URL = 'https://www.asics.com.ar/_v/segment/graphql/v1?workspace=master&operationName=productSearchV3&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22e48b7999b5713c9ed7d378bea1bd1cf64c81080be71d91e0f0b427f41e858451%22%7D%7D';

async function main() {
  try {
    console.log("Iniciando asics-checher.js");
    const res = await fetch(API_URL);
    const data = await res.json();

    const text = JSON.stringify(data).toLowerCase();
    const found = text.includes("resolution");

    if (found) {
      await sendTelegramMessage("👟 ¡Encontré un modelo con 'resolution' en la tienda de Asics!");
      console.log("Mensaje enviado.");
    } else {
      console.log("No se encontró ningún modelo 'resolution'.");
    }
  } catch (error) {
    console.error("Error al consultar la API o enviar mensaje:", error);
  }
}

async function sendTelegramMessage(msg) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: msg }),
  });
}

main();