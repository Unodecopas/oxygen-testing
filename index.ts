interface iRoom {
  name: string;
  rate: number;
  discount: number;
  bookings: Booking[]
}

interface iBooking {
  name:string;
  email: string;
  checkin: string;
  checkout: string;
  discount: number;
  room: Room
}

class Room implements iRoom{
  name: string;
  rate: number;
  discount: number;
  bookings: Booking[]

  constructor(room: iRoom){
    this.name = room.name, 
    this.rate = room.rate,
    this.discount = room.discount, 
    this.bookings = room.bookings
  }
  isOccupied(date: string) {
   for (let i = 0; i <= this.bookings.length ; i++){
    return (date >= this.bookings[i].checkin && date <= this.bookings[i].checkout)
   }
  }

  allDaysInRange(startDate: string, endDate: string): string[]{
    const range:string[] = []
    let start: number = Number(startDate)
    let end: number = Number(endDate)
   for(let i = 0; i <= end - start; i++){
     range.push((start + i).toString())
   }
    return range
  }
  occupancyPercentage(startDate: string, endDate: string): number{
    const range: string[] = this.allDaysInRange(startDate, endDate)
    let totalDaysOccuped: number = 0
    range.forEach(day => {
      if (this.isOccupied(day)) totalDaysOccuped ++
    })
    return totalDaysOccuped / range.length * 100
  }
}

class Booking implements iBooking{
  name:string;
  email: string;
  checkin: string;
  checkout: string;
  discount: number;
  room: Room

  constructor(booking: iBooking){
    this.name = booking.name,
    this.email = booking.email,
    this.checkin = booking.checkin,
    this.checkout = booking.checkout,
    this.discount = booking.discount, 
    this.room = booking.room
  }

  getFee(): string {
    const maxValue: number = ((this.discount + this.room.discount) >= 90) ? 90 : this.discount + this.room.discount
    return (this.room.rate * (1-(maxValue/100))).toFixed(2)
  }
}


function totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
  let totalOccupancyPercentage: number = 0
  rooms.forEach( room => {
    totalOccupancyPercentage += room.occupancyPercentage(startDate, endDate) / rooms.length
  })
  return totalOccupancyPercentage
}


function avaliableRooms(rooms: Room[], startDate:string, endDate:string): Room[]{
  const avaliableRooms: Room[] = []
  rooms.forEach(room => {
    if(room.occupancyPercentage(startDate, endDate) === 0){
      avaliableRooms.push(room)
    }
  })
  return avaliableRooms || []
}




export {
  Room, Booking, totalOccupancyPercentage, avaliableRooms
}
