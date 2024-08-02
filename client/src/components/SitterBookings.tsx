import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
const { VITE_API } = import.meta.env;

export default function SitterBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${VITE_API}/booking`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Ошибочка", error);
      });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${day} ${months[month - 1]} ${year}`;
  }

  return (
    <>
      <h2>Входящие Брони</h2>
      <div style={{ display: "flex", gap: "50px" }}>
        {bookings.map((booking) => {
          const formattedStartDate = formatDate(booking.startdate);
          const formattedEndDate = formatDate(booking.enddate);

          return (
            <div key={booking.id}>
              <h4>Услуги</h4>
              <ul>
                {booking.bookedServices.map((bookedService) => (
                  <li key={bookedService.id}>{bookedService.Service.title}</li>
                ))}
              </ul>
              <p>
                Даты: {formattedStartDate} - {formattedEndDate}
              </p>
              <p>Общая стоимость: {booking.totalPrice} ₽</p>
              <h4>Владелец</h4>
              <p>Имя: {booking.owner.username}</p>
              <p>Контактный номер: {booking.owner.phone}</p>
              <h4>Питомец</h4>
              <p>Кличка: {booking.pet.name}</p>
              <p>Возраст: {booking.pet.age}</p>
              <p>Порода: {booking.pet.breed}</p>
              <p>Особые приметы: {booking.pet.description}</p>
              <img src={booking.pet.photo} style={{ width: "250px" }}></img>
            </div>
          );
        })}
      </div>
    </>
  );
}
