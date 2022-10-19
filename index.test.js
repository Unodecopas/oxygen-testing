"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const globals_1 = require("@jest/globals");
const roomTemplate = new index_1.Room({
    name: 'Room',
    bookings: [],
    rate: 100,
    discount: 15
});
const bookingTemplate = new index_1.Booking({
    name: 'Booking',
    email: 'pirate@pirate.com',
    checkin: '20220512',
    checkout: '20220514',
    discount: 35,
    room: roomTemplate
});
(0, globals_1.describe)('Room', () => {
    (0, globals_1.test)('Room occupied', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking] }));
        (0, globals_1.expect)(room.isOccupied('20220512')).toBe(true);
    });
    (0, globals_1.test)('Room avalaible', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking] }));
        (0, globals_1.expect)(room.isOccupied('20220516')).toBe(false);
    });
    (0, globals_1.test)('Total dias', () => {
        const room = new index_1.Room(Object.assign({}, roomTemplate));
        (0, globals_1.expect)(room.allDaysInRange('20220513', '20220516')).toHaveLength(4);
    });
    (0, globals_1.test)('occupancypercentage is 100', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220510', checkout: '20220511' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking, booking2] }));
        (0, globals_1.expect)(room.occupancyPercentage('20220512', '20220514')).toBe(100);
    });
    (0, globals_1.test)('occupancypercentage is 0', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220507', checkout: '20220509' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking, booking2] }));
        (0, globals_1.expect)(room.occupancyPercentage('20220308', '20220414')).toBe(0);
    });
    (0, globals_1.test)('occupancypercentage', () => {
        const booking = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220514', checkout: '20220516' }));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220512', checkout: '20220513' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking, booking2] }));
        (0, globals_1.expect)(room.occupancyPercentage('20220510', '20220525')).toBe(18.75);
    });
});
(0, globals_1.describe)('Bookings', () => {
    (0, globals_1.test)('fee must be 5000', () => {
        const room = new index_1.Room(Object.assign({}, roomTemplate));
        const booking = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { room }));
        room.bookings.push(booking);
        (0, globals_1.expect)(booking.getFee()).toBe("50.00");
    });
    (0, globals_1.test)('fee must be 8500', () => {
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { discount: 15 }));
        const booking = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { room, discount: 0 }));
        room.bookings.push(booking);
        (0, globals_1.expect)(booking.getFee()).toBe("85.00");
    });
    (0, globals_1.test)('fee must not exceed 100%', () => {
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { discount: 100 }));
        const booking = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { room, discount: 120 }));
        room.bookings.push(booking);
        (0, globals_1.expect)(booking.getFee()).toBe("10.00");
    });
});
(0, globals_1.describe)('global functions', () => {
    (0, globals_1.test)('totalpercentage must be 50', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220518', checkout: '20220520' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking2] }));
        const room2 = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking] }));
        const rooms = [room, room2];
        (0, globals_1.expect)((0, index_1.totalOccupancyPercentage)(rooms, '20220512', '20220514')).toEqual(50);
    });
    (0, globals_1.test)('totalpercentage must be 0', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220514', checkout: '20220520' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking2] }));
        const room2 = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking] }));
        const rooms = [room, room2];
        (0, globals_1.expect)((0, index_1.totalOccupancyPercentage)(rooms, '20220312', '20220420')).toEqual(0);
    });
    (0, globals_1.test)('avalaible rooms must be return a room avalaible', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220518', checkout: '20220520', name: 'Booking2' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking] }));
        const room2 = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking2], name: 'room2' }));
        const rooms = [room, room2];
        (0, globals_1.expect)((0, index_1.avaliableRooms)(rooms, '20220512', '20220513')).toContainEqual(room2);
    });
    (0, globals_1.test)('avalaible rooms must be return rooms avalaibles', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220518', checkout: '20220520', name: 'Booking2' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking] }));
        const room2 = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking2], name: 'room2' }));
        const rooms = [room, room2];
        (0, globals_1.expect)((0, index_1.avaliableRooms)(rooms, '20220312', '20220313')).toEqual([room, room2]);
    });
    (0, globals_1.test)('avalaible rooms must return an empty array', () => {
        const booking = new index_1.Booking(Object.assign({}, bookingTemplate));
        const booking2 = new index_1.Booking(Object.assign(Object.assign({}, bookingTemplate), { checkin: '20220512', checkout: '20220514', name: 'Booking2' }));
        const room = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking] }));
        const room2 = new index_1.Room(Object.assign(Object.assign({}, roomTemplate), { bookings: [booking2], name: 'room2' }));
        const rooms = [room, room2];
        (0, globals_1.expect)((0, index_1.avaliableRooms)(rooms, '20220512', '20220514')).toEqual([]);
    });
});
