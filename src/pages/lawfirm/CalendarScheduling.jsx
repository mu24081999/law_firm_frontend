// Calendar.js
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { createEventApi, getUserEventsApi } from "../../redux/services/event";
import Swal from "sweetalert2";

const localizer = momentLocalizer(moment);

const CalendarScheduling = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { events: eventsData } = useSelector((state) => state.event);
  const [events, setEvents] = useState([]);
  const handleSelectSlot = async ({ start, end }) => {
    const { value: formValues } = await Swal.fire({
      title: "Add Event",
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
          <label>Title</label>
          <input id="swal-title" class="swal2-input" placeholder="Enter event title">
  
          <label>Location</label>
          <input id="swal-location" class="swal2-input" placeholder="Enter location">
  
          <label>Description</label>
          <textarea id="swal-description" class="swal2-textarea" placeholder="Enter description" style="resize: vertical; min-height: 60px;"></textarea>
  
          <label>Event Type</label>
          <select id="swal-type" class="swal2-select" style="padding: 8px; border-radius: 5px;">
            <option value="">Select Event Type</option>
            <option value="meeting">Meeting</option>
            <option value="court_hearing">Court Hearing</option>
            <option value="deadline">Deadline</option>
            <option value="other">Other</option>
          </select>
        </div>
      `,
      confirmButtonText: "Add Event",
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("swal-title").value.trim();
        const location = document.getElementById("swal-location").value.trim();
        const description = document
          .getElementById("swal-description")
          .value.trim();
        const event_type = document.getElementById("swal-type").value;

        if (!title || !location || !description || !event_type) {
          Swal.showValidationMessage("Please fill in all fields");
          return;
        }

        return { title, location, description, event_type };
      },
    });

    if (formValues) {
      const params = {
        title: formValues.title,
        location: formValues.location,
        description: formValues.description,
        event_type: formValues.event_type,
        eventDate: moment(start).toISOString(),
        userId: user?.id,
      };

      dispatch(createEventApi(token, params));
      setEvents([...events, params]);
    }
  };
  useEffect(() => {
    dispatch(getUserEventsApi(token, user?.id));
  }, [token, user, dispatch]);
  useEffect(() => {
    Array.isArray(eventsData) &&
      eventsData?.length > 0 &&
      setEvents(
        eventsData.map((event) => ({
          ...event,
          start: new Date(event.eventDate),
          end: new Date(event.eventDate),
        }))
      );
    return () => {};
  }, [eventsData]);
  return (
    <>
      <div style={{ height: "100vh", padding: 20 }}>
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          defaultView={Views.MONTH}
          views={["month", "week", "day"]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "90vh" }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) =>
            alert(
              `${event.title}\nLocation: ${event.location}\nDescription: ${event.description}`
            )
          }
        />
      </div>
    </>
  );
};

export default CalendarScheduling;
