const RoomQuery = require('../persistence/roomRepository');

const RoomQueryService = {
  getAllRooms() {
    return RoomQuery.getAllrooms();
  },

  getRoomById(roomId) {
    return RoomQuery.getRoomById(roomId);
  }
};

module.exports = RoomQueryService;
