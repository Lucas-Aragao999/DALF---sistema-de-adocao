const express = require('express');
const { QrCodePix } = require('qrcode-pix');
const app = express();
const port = 3000;

// Configuração base do PIX
const pixBaseData = {
  version: '01',
  key: 'rodrigues.lds.lfr@gmail.com', // SUA CHAVE PIX
  name: 'DALF',
  city: 'CAMPINAS',
};

// Função para gerar o QR Code PIX
async function gerarQRCodePix(valor, transactionId) {
  const dados = { ...pixBaseData, value: valor, transactionId };
  const qrCodePix = QrCodePix(dados);
  const rawPixStr = qrCodePix.payload();
  const qrCodeBase64 = await qrCodePix.base64();
  return { rawPixStr, qrCodeBase64, txid: transactionId };
}

// Rota principal
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doe via PIX</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

      body {
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #e6f4ea 0%, #f8fdf9 100%);
        color: #1a2e1a;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
      }

      .container {
        background: #ffffff;
        padding: 48px;
        border-radius: 20px;
        box-shadow: 0 8px 24px rgba(0, 80, 40, 0.15);
        text-align: center;
        max-width: 460px;
        width: 90%;
        transition: transform 0.4s ease, box-shadow 0.4s ease;
        animation: slideUp 0.9s ease-out;
      }

      .container:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 28px rgba(0, 128, 64, 0.25);
      }

      h1 {
        font-size: 1.9rem;
        color: #0f5132;
        margin-bottom: 12px;
      }

      h2 {
        font-size: 1rem;
        color: #2e7d32;
        margin-bottom: 22px;
      }

      .buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
      }

      button {
        background: linear-gradient(145deg, #22c55e, #16a34a);
        color: #ffffff;
        border: none;
        padding: 12px 24px;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        font-size: 1rem;
        transition: transform 0.2s ease, box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -75%;
        width: 50%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
        transform: skewX(-25deg);
        transition: left 0.5s ease;
      }

      button:hover::before {
        left: 130%;
      }

      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(34, 197, 94, 0.35);
      }

      button:active {
        transform: scale(0.97);
      }

      .input-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin: 20px 0;
      }

      input[type="number"], input[type="text"] {
        padding: 10px 14px;
        border: 2px solid #16a34a;
        border-radius: 8px;
        outline: none;
        width: 140px;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        color: #14532d;
        background-color: #f0fdf4;
      }

      input[type="number"]:focus {
        border-color: #22c55e;
        box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        background-color: #ffffff;
      }

      #qrImage {
        display: none;
        border-radius: 12px;
        margin: 20px 0;
        width: 260px;
        height: 260px;
        box-shadow: 0 4px 16px rgba(0, 128, 64, 0.2);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
      }

      #qrImage.visible {
        display: inline-block;
        animation: fadeIn 0.6s ease;
      }

      .pix-code {
        background-color: #f0fdf4;
        color: #14532d;
        padding: 12px;
        border-radius: 8px;
        font-size: 0.85rem;
        text-align: left;
        word-break: break-all;
        margin-top: 16px;
        margin-bottom: 16px;
        border: 1px solid #bbf7d0;
      }

      #mensagem-copia {
        font-size: 0.9rem;
        margin-top: 10px;
        color: #16a34a;
        font-weight: 600;
        display: none;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Doe via PIX</h1>
      <h2>Escolha o valor que deseja doar:</h2>

      <div class="buttons">
        <button onclick="gerarPix(5)">R$ 5</button>
        <button onclick="gerarPix(10)">R$ 10</button>
        <button onclick="gerarPix(50)">R$ 50</button>
        <button onclick="gerarPix(100)">R$ 100</button>
      </div>

      <h2>Ou escolha um valor livre:</h2>
      <div class="input-container">
        <input id="valorLivre" type="number" step="0.01" placeholder="Ex: 25.50">
        <button onclick="gerarPixLivre()">Gerar QR Code</button>
      </div>

      <h2>Seu QR Code PIX</h2>
      <p id="txid"></p>
      <img id="qrImage" alt="QR Code PIX"/>

      <div class="pix-code" id="pixPayload"></div>
      <button onclick="copiarPix()">Copiar Código</button>
      <p id="mensagem-copia">Copiado!</p>
    </div>

    <script>
      async function gerarPix(valor) {
        const txid = 'TX' + Date.now();
        const resp = await fetch(\`/gerar?valor=\${valor}&txid=\${txid}\`);
        const data = await resp.json();
        atualizarPix(data);
      }

      async function gerarPixLivre() {
        const valor = parseFloat(document.getElementById('valorLivre').value);
        if (!valor || valor <= 0) {
          alert('Informe um valor válido!');
          return;
        }
        const txid = 'TX' + Date.now();
        const resp = await fetch(\`/gerar?valor=\${valor}&txid=\${txid}\`);
        const data = await resp.json();
        atualizarPix(data);
      }

      function atualizarPix(data) {
        document.getElementById('txid').innerText = 'TxID: ' + data.txid;
        document.getElementById('pixPayload').innerText = data.rawPixStr;
        const qrImg = document.getElementById('qrImage');
        qrImg.src = data.qrCodeBase64;
        qrImg.classList.add('visible');
      }

      function copiarPix() {
        const texto = document.getElementById('pixPayload').innerText;
        navigator.clipboard.writeText(texto).then(() => {
          const msg = document.getElementById('mensagem-copia');
          msg.style.display = 'block';
          setTimeout(() => (msg.style.display = 'none'), 2000);
        });
      }
    </script>
  </body>
  </html>
  `;
  res.send(html);
});

// Rota para gerar o PIX dinâmico
app.get('/gerar', async (req, res) => {
  try {
    const { valor, txid } = req.query;
    const { rawPixStr, qrCodeBase64, txid: t } = await gerarQRCodePix(parseFloat(valor), txid);
    res.json({ rawPixStr, qrCodeBase64, txid: t });
  } catch (e) {
    res.status(500).send('Erro ao gerar o QR Code');
  }
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:' + port);
});