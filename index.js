"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avaliableRooms = exports.totalOccupancyPercentage = exports.Booking = exports.Room = void 0;
class Room {
    constructor({ name, rate, discount, bookings }) {
        this.name = name,
            this.rate = rate,
            this.discount = discount,
            this.bookings = bookings;
    }
    isOccupied(date) {
        for (let i = 0; i <= this.bookings.length; i++) {
            return (date >= this.bookings[i].checkin && date <= this.bookings[i].checkout);
        }
    }
    allDaysInRange(startDate, endDate) {
        const range = [];
        let start = Number(startDate);
        let end = Number(endDate);
        for (let i = 0; i <= end - start; i++) {
            range.push((start + i).toString());
        }
        return range;
    }
    occupancyPercentage(startDate, endDate) {
        const range = this.allDaysInRange(startDate, endDate);
        let totalDaysOccuped = 0;
        range.forEach(day => {
            if (this.isOccupied(day))
                totalDaysOccuped++;
        });
        return totalDaysOccuped / range.length * 100;
    }
}
exports.Room = Room;
class Booking {
    constructor({ name, email, checkin, checkout, discount, room }) {
        this.name = name,
            this.email = email,
            this.checkin = checkin,
            this.checkout = checkout,
            this.discount = discount,
            this.room = room;
    }
    getFee() {
        const maxValue = ((this.discount + this.room.discount) >= 90) ? 90 : this.discount + this.room.discount;
        return (this.room.rate * (1 - (maxValue / 100))).toFixed(2);
    }
}
exports.Booking = Booking;
function totalOccupancyPercentage(rooms, startDate, endDate) {
    let totalOccupancyPercentage = 0;
    rooms.forEach(room => {
        totalOccupancyPercentage += room.occupancyPercentage(startDate, endDate) / rooms.length;
    });
    return totalOccupancyPercentage;
}
exports.totalOccupancyPercentage = totalOccupancyPercentage;
function avaliableRooms(rooms, startDate, endDate) {
    const avaliableRooms = [];
    rooms.forEach(room => {
        if (room.occupancyPercentage(startDate, endDate) === 0) {
            avaliableRooms.push(room);
        }
    });
    return avaliableRooms || [];
}
exports.avaliableRooms = avaliableRooms;
