const AuthenticationService = require('../../business/AuthenticationService');

const AuthController = {
    async login(req, res) {
        const { id, password } = req.body;
        try {
            const student = await AuthenticationService.login(id, password);
            res.json({ success: true, student });
        } catch (err) {
            res.status(401).json({ success: false, error: err.message });
        }
    },
};

module.exports = AuthController;