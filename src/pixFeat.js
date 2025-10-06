const express = require('express');
const { QrCodePix } = require('qrcode-pix');
const app = express();
const port = 3000;

// Dados PIX fixos
const PIX_KEY = 'rodrigues.lds.lfr@gmail.com'; // <- sua chave PIX
const PIX_NAME = 'DALF';
const PIX_CITY = 'CAMPINAS';

// Função que gera o QR Code Pix
async function gerarQRCode(valor, txid) {
  const qrCodePix = QrCodePix({
    version: '01',
    key: PIX_KEY,
    name: PIX_NAME,
    city: PIX_CITY,
    value: valor,
    transactionId: txid,
  });

  const payload = qrCodePix.payload();
  const base64 = await qrCodePix.base64();
  return { payload, base64 };
}

// Página principal com botões
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doações PIX - DALF</title>
    <style>
      body {
        background: #f2f5f7;
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
      }
      .container {
        background: #fff;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        text-align: center;
        width: 400px;
      }
      h1 { color: #006400; }
      button {
        margin: 8px;
        padding: 12px 20px;
        background: #008000;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.2s;
      }
      button:hover { background: #00a000; }
      #qr-section {
        margin-top: 30px;
        display: none;
      }
      img {
        margin-top: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 260px;
        height: 260px;
      }
      .pix-code {
        word-break: break-all;
        background: #f1f1f1;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        text-align: left;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Doe via PIX</h1>
      <p>Selecione um valor para gerar o QR Code:</p>
      <div>
        <button onclick="gerarPix(5)">R$ 5</button>
        <button onclick="gerarPix(10)">R$ 10</button>
        <button onclick="gerarPix(50)">R$ 50</button>
        <button onclick="gerarPix(100)">R$ 100</button>
      </div>
      <p>Ou escolha um valor livre:</p>
      <input id="valorLivre" type="number" placeholder="Ex: 25.50" min="0" step="0.01">
      <button onclick="gerarPixLivre()">Gerar QR Code</button>

      <div id="qr-section">
        <h2>QR Code PIX</h2>
        <img id="qr-img" src="">
        <div class="pix-code">
          <p id="pix-code"></p>
        </div>
        <button onclick="copiarCodigo()">Copiar Código</button>
        <p id="msg-copia" style="color:green;display:none;">Código copiado!</p>
      </div>
    </div>

    <script>
      async function gerarPix(valor) {
        const response = await fetch(\`/gerar?valor=\${valor}\`);
        const data = await response.json();
        mostrarPix(data);
      }

      async function gerarPixLivre() {
        const valor = document.getElementById('valorLivre').value;
        if (!valor || parseFloat(valor) <= 0) {
          alert('Digite um valor válido!');
          return;
        }
        const response = await fetch(\`/gerar?valor=\${valor}\`);
        const data = await response.json();
        mostrarPix(data);
      }

      function mostrarPix(data) {
        document.getElementById('qr-section').style.display = 'block';
        document.getElementById('qr-img').src = data.qrCodeBase64;
        document.getElementById('pix-code').innerText = data.payload;
        document.getElementById('txid').innerText = data.txid;
      }

      function copiarCodigo() {
        const codigo = document.getElementById('pix-code').innerText;
        navigator.clipboard.writeText(codigo).then(() => {
          const msg = document.getElementById('msg-copia');
          msg.style.display = 'block';
          setTimeout(() => msg.style.display = 'none', 2000);
        });
      }
    </script>
  </body>
  </html>
  `;
  res.send(html);
});

// Endpoint para gerar o QR Code com valor selecionado
app.get('/gerar', async (req, res) => {
  try {
    const valor = parseFloat(req.query.valor);
    if (isNaN(valor) || valor <= 0) {
      return res.status(400).json({ erro: 'Valor inválido' });
    }
    const txid = 'TX' + Date.now();
    const { payload, base64 } = await gerarQRCode(valor, txid);

    res.json({
      qrCodeBase64: base64,
      payload,
      txid,
    });
  } catch (err) {
    console.error('Erro ao gerar QR Code PIX:', err);
    res.status(500).json({ erro: 'Falha ao gerar o QR Code PIX' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
