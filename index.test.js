const {Room, Booking, totalOccupancyPercentage, avaliableRooms} = require('./index')

const roomTemplate = {
  name: 'Room',
  bookings: [],
  rate: 100,
  discount: 15
}

const bookingTemplate = {
  name: 'Booking',
  email: 'pirate@pirate.com',
  checkin: '20220512',
  checkout: '20220514',
  discount: 35,
  room: {}
}

describe('Room', ()=>{
  test('Room occupied', ()=>{
    const booking = new Booking({...bookingTemplate})
    const room = new Room({...roomTemplate, bookings:[booking]})
    expect(room.isOccupied('20220512')).toBe(true)
  })
   test('Room avalaible', ()=>{
    const booking = new Booking({...bookingTemplate})
    const room = new Room({...roomTemplate, bookings:[booking]})
    expect(room.isOccupied('20220516')).toBe(false)
  })
  
  test('Total dias', ()=> {
    const room = new Room({...roomTemplate})
    expect(room.allDaysInRange('20220513','20220516')).toHaveLength(4)
  })
  test('occupancypercentage is 100', ()=> {
    const booking = new Booking({...bookingTemplate})
    const booking2 = new Booking({...bookingTemplate, checkin:'20220510', checkout:'20220511'})
    const room = new Room({...roomTemplate, bookings:[booking, booking2]})
    expect(room.occupancyPercentage('20220512', '20220514')).toBe(100)
  })
   test('occupancypercentage is 0', ()=> {
    const booking = new Booking({...bookingTemplate})
    const booking2 = new Booking({...bookingTemplate, checkin:'20220507', checkout:'20220509'})
    const room = new Room({...roomTemplate, bookings:[booking, booking2]})
    expect(room.occupancyPercentage('20220308', '20220414')).toBe(0)
  })
    test('occupancypercentage', ()=> {
    const booking = new Booking({...bookingTemplate, checkin:'20220514', checkout:'20220520'})
    const room = new Room({...roomTemplate, bookings:[booking]})
    expect(room.occupancyPercentage('20220510', '20220525')).toBe(43.75)
  })

})

describe('Bookings', ()=>{
  test('fee must be 5000', ()=> {
    const room = new Room({...roomTemplate})
    const booking = new Booking({...bookingTemplate, room})
    room.bookings.push(booking)
    expect(booking.getFee()).toBe("50.00")
  })
  test('fee must be 8500', ()=> {
    const room = new Room({...roomTemplate, discount: 15})
    const booking = new Booking({...bookingTemplate, room, discount: 0})
    room.bookings.push(booking)
    expect(booking.getFee()).toBe("85.00")
  })
  test('fee must not exceed 100%', ()=> {
    const room = new Room({...roomTemplate, discount: 100})
    const booking = new Booking({...bookingTemplate, room, discount: 120})
    room.bookings.push(booking)
    expect(booking.getFee()).toBe("10.00")
  })
})

describe('global functions', ()=> {
  test('totalpercentage must be 50', ()=> {
    const booking = new Booking({...bookingTemplate})
    const booking2 = new Booking({...bookingTemplate, checkin:'20220518', checkout:'20220520'})
    const room = new Room({...roomTemplate, bookings:[booking2]})
    const room2 = new Room({...roomTemplate, bookings: [booking]})
    const rooms = [room, room2]
    expect(totalOccupancyPercentage(rooms, '20220512', '20220514')).toEqual(50)
  })
  test('avalaible rooms must be 0', ()=> {
    const booking = new Booking({...bookingTemplate})
    const booking2 = new Booking({...bookingTemplate, checkin:'20220514', checkout:'20220520'})
    const room = new Room({...roomTemplate, bookings:[booking2]})
    const room2 = new Room({...roomTemplate, bookings: [booking]})
    const rooms = [room, room2]
    expect(totalOccupancyPercentage(rooms, '20220312', '20220420')).toEqual(0)
  })
  test('avalaible rooms must be return a room avalaible', () => {
    const booking = new Booking({...bookingTemplate})
    const booking2 = new Booking({...bookingTemplate, checkin:'20220518', checkout:'20220520', name:'Booking2'})
    const room = new Room({...roomTemplate, bookings:[booking]})
    const room2 = new Room({...roomTemplate, bookings: [booking2], name:'room2'})
    const rooms = [room, room2]
    expect(avaliableRooms(rooms, '20220512', '20220513')).toContainEqual(room2)
  })
  test('avalaible rooms must return an empty array', () => {
    const booking = new Booking({...bookingTemplate})
    const booking2 = new Booking({...bookingTemplate, checkin:'20220512', checkout:'20220514', name:'Booking2'})
    const room = new Room({...roomTemplate, bookings:[booking]})
    const room2 = new Room({...roomTemplate, bookings: [booking2], name:'room2'})
    const rooms = [room, room2]
    expect(avaliableRooms(rooms, '20220512', '20220514')).toEqual([])
  })
})