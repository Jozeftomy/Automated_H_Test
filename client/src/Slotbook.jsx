import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./slotbooking.css";
import axios from "axios";
import { backendBaseUrl } from "./utils/urls";

const BookingSlot = ({ username }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookedDates, setBookedDates] = useState([]); // State to track booked dates

  const slots = [
    { time: "9am", id: 1 },
    { time: "10am", id: 2 },
    { time: "11am", id: 3 },
    { time: "2pm", id: 4 },
    { time: "3pm", id: 5 },
  ];

  const handleSlotSelect = (slotId) => {
    setSelectedSlot(slotId);
  };

  const handleBooking = async () => {
    if (selectedSlot && selectedDate) {
      const bookingData = {
        date: selectedDate,
        slot: selectedSlot,
        username,
      };

      console.log("bookingData", bookingData);
      await axios
        .post(`${backendBaseUrl}/api/bookings/`, bookingData)
        .then((response) => {
          setBookingMessage(`Slot ${selectedSlot} booked successfully!`);
          setBookedDates([...bookedDates, selectedDate]); // Add date to booked dates
          setSelectedSlot(null);
        })
        .catch((error) => {
          console.error("Error booking slot:", error);
          setBookingMessage("Failed to book slot. Please try again later.");
        });
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
          excludeDates={bookedDates} // Disable booked dates
        />
      </div>

      {selectedDate && (
        <div>
          <h2>Available Slots for {selectedDate.toLocaleDateString()}</h2>
          <div className="slots">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`slot ${selectedSlot === slot.id ? "selected" : ""}`}
                onClick={() => handleSlotSelect(slot.id)}
              >
                {slot.time}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div className="book-button-container">
          <button className="book-button" onClick={handleBooking}>
            Book
          </button>
        </div>
      )}

      {bookingMessage && (
        <div className="booking-message">{bookingMessage}</div>
      )}
    </div>
  );
};

export default BookingSlot;
