const RoomQuery = require('../persistence/roomRepository');

const RoomQueryService = {
  getAllRooms() {
    return RoomQuery.getAllRooms();
  },

  getRoomById(roomId) {
    return RoomQuery.getRoomById(roomId);
  }
};

module.exports = RoomQueryService;
