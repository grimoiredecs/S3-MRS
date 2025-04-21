const QRCode = require('qrcode');

async function generateQRCode(bookingData) {
    try {
        const qr = await QRCode.toDataURL(JSON.stringify(bookingData));
        return qr; // Base64 encoded PNG image
    } catch (err) {
        throw new Error('QR Code generation failed');
    }
}

module.exports = generateQRCode;