let currentId = 10000000;

function generateStaffId() {
    return (currentId++).toString();
}

module.exports = generateStaffId;