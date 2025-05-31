const axios = require('axios');

exports.forwardRequest = async (req, res) => {
    try {
        const serviceUrl = getServiceUrl(req.path);
        const result = await axios({
            method: req.method,
            url: serviceUrl + req.originalUrl,
            data: req.body,
            headers: {
                'Authorization': req.headers['authorization']
            }
        });
        res.status(result.status).send(result.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
};

function getServiceUrl(path) {
    if (path.startsWith('/student')) return 'http://localhost:3001';
    if (path.startsWith('/room')) return 'http://localhost:3002';
    if (path.startsWith('/booking')) return 'http://localhost:3003';
    return 'http://localhost:3006'; // fallback
}