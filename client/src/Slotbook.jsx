import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './slotbooking.css'; // Import your CSS file

const BookingSlot = () => {
  // State to keep track of selected date and slot
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');

  // Array of available slots
  const slots = [
    { time: '9am', id: 1 },
    { time: '10am', id: 2 },
    { time: '11am', id: 3 },
    { time: '2pm', id: 4 },
    { time: '3pm', id: 5 },
  ];

  // Function to handle slot selection
  const handleSlotSelect = (slotId) => {
    setSelectedSlot(slotId);
  };

  // Function to handle booking
  const handleBooking = () => {
    if (selectedSlot) {
      setBookingMessage(`Slot ${selectedSlot} booked successfully!`);
      // You can add logic here to update the backend with the booking information
      // For now, we'll just reset the selected slot
      setSelectedSlot(null);
    }
  };

  return (
    <div className="booking-slot-container">
      <h2>Date Selection</h2>
      <div className="date-picker-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="date-picker"
        />
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div>
          <h2>Available Slots for {selectedDate.toLocaleDateString()}</h2>
          <div className="slots">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`slot ${selectedSlot === slot.id ? 'selected' : ''}`}
                onClick={() => handleSlotSelect(slot.id)}
              >
                {slot.time}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Button */}
      {selectedSlot && (
        <div className="book-button-container">
          <button className="book-button" onClick={handleBooking}>Book</button>
        </div>
      )}

      {/* Booking Message */}
      {bookingMessage && (
        <div className="booking-message">{bookingMessage}</div>
      )}
    </div>
  );
};

export default BookingSlot;
