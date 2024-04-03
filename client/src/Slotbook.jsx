import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './slotbooking.css'; // Import your CSS file

const BookingSlot = () => {
  // State to keep track of selected date and slot
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

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

      <div className="selected-slot">
        {selectedSlot && (
          <p>
            You have booked your slot sucessfully: {slots.find((slot) => slot.id === selectedSlot).time} on{' '}
            {selectedDate.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSlot;
