const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Regex para validar IPv4
function isIPv4(ip) {
    const ipv4Regex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) return false;

    return ip.split('.').every(num => Number(num) >= 0 && Number(num) <= 255);
}

// Extrai IPv4 mesmo se vier em formato IPv6 (::ffff:192.168.0.1)
function extractIPv4(ip) {
    if (!ip) return null;

    // Caso venha múltiplos IPs (proxy)
    ip = ip.split(',')[0].trim();

    // Remove prefixo IPv6
    if (ip.includes('::ffff:')) {
        ip = ip.split('::ffff:')[1];
    }

    return isIPv4(ip) ? ip : null;
}

app.get('/', (req, res) => {
    let rawIp =
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress;

    const ipv4 = extractIPv4(rawIp);

    if (ipv4) {
        const log = `${new Date().toISOString()} - ${ipv4}\n`;
        fs.appendFileSync('ips.log', log);

        return res.send(`IPv4 registrado: ${ipv4}`);
    } else {
        return res.send('Nenhum IPv4 válido encontrado');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});