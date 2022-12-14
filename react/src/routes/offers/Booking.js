import React, { useState } from 'react'
import {getPrice} from '../../api/booking.price.api.js'
import BookingForm from './BookingForm.js'

const Booking = (props) => {

  const [pricing, setPricing] = useState(false)
  const [toggle, setToggle] = useState(false)


  const bookFlight = () => {
    getPrice({
      offer: props.value
    }).then(res => {
      setPricing(res.data)
      setToggle(true)
    }).then()
  }

  return (
    <div>
      {toggle ? <BookingForm offer={props.value} setToggle={setToggle} /> : null}
      <button onClick={bookFlight}>Book Flight</button>
    </div>
  )
}

export default Booking
