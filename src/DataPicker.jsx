import React, { useState } from "react";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  // Format the date as yyyy-mm-dd for the date input
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Handle the next day
  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1); // Move to the next day
    setSelectedDate(nextDay);
  };

  // Handle the previous day
  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1); // Move to the previous day
    setSelectedDate(prevDay);
  };

  // Handle direct date change from the input
  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Button to go to the previous day */}
      <button
        onClick={handlePrevDay}
        className="bg-[#F1F4FB] w-[30px] h-[30px] rounded-[10px] flex items-center justify-center text-[12px]"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {/* Date input field */}
      <input
        type="date"
        value={formatDate(selectedDate)}
        onChange={() => handleDateChange()}
        style={{
          margin: "0 5px",
          padding: "5px",
          fontSize: "16px",
          textAlign: "center",
          background: "F1F4FB",
        }}
      />

      {/* Button to go to the next day */}
      <button
        onClick={() => handleNextDay()}
        className="bg-[#F1F4FB] w-[30px] h-[30px] rounded-[10px] flex items-center justify-center text-[12px]"
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default DatePicker;
