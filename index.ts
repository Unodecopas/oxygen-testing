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

  constructor({name, rate, discount, bookings}: iRoom){
    this.name = name, 
    this.rate = rate,
    this.discount = discount, 
    this.bookings = bookings
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

  constructor({name, email, checkin, checkout, discount, room}: iBooking){
    this.name = name,
    this.email = email,
    this.checkin = checkin,
    this.checkout = checkout,
    this.discount = discount, 
    this.room = room
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
