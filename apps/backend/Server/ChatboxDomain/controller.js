// controllers/ChatController.js
import ChatService from './services.js';

const ChatController = {
    sendMessage: async (req, res) => {
        try {
            const saved = await ChatService.sendMessage(req.body);
            res.status(201).json(saved);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getConversation: async (req, res) => {
        const { studentId, adminId } = req.params;
        try {
            const history = await ChatService.getConversation(studentId, adminId);
            res.json(history);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default ChatController;