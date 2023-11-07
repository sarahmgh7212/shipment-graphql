import React, { useEffect, useState } from "react";
import ShipmentHistory from "./ShipmentHistory";
import "./ShipmentDetailsModal.css";
import "./ShipmentItem.css";
import { useQuery, gql } from "@apollo/client";
import { getDate, getTime } from "./helper";

const TRACKINGEVENT_QUERY = gql`
  query GetTrackingEvent($trackingId: String!) {
    trackingEvents(trackingId: $trackingId) {
      id
      trackingId
      status
      statusSeverity
      location
      timestamp
    }
  }
`;

function ShipmentDetailsModal({ isOpen, onClose, shipment }) {
  const [trackingEventHistory, setTrackingEventHistory] = useState({});
  const {
    trackingId,
    status,
    deliveredTime,
    deliveryAddress,
    lastUpdate,
    totalTransit,
  } = shipment;

  const { loading, error, data } = useQuery(TRACKINGEVENT_QUERY, {
    variables: { trackingId },
  });

  useEffect(() => {
    if (data && data.trackingEvents.length > 0) {
      setTrackingEventHistory(data.trackingEvents);
    }
  }, [data]);

  if (!isOpen || !shipment) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h1 className="tracking-id">{trackingId}</h1>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <p className="section-title">Shipment</p>
        {
          <div className="shipment-container">
            <p>Status</p>
            <div className="shipment-status">{status}</div>
            <p>Delivered Time</p>

            {deliveredTime != null ? (
              <p>
                {" "}
                {getDate(deliveredTime)} {getTime(deliveredTime)}
              </p>
            ) : (
              <p>N/A</p>
            )}
            <p>Delivery address</p>
            <p>{deliveryAddress}</p>
            <p>Last updated</p>
            <p>
              {getDate(lastUpdate)} &nbsp; {getTime(lastUpdate)}
            </p>
            <p>Total transit time</p>
            <p>{totalTransit}</p>
          </div>
        }
        <div className="close-btn-wrapper" onClick={onClose}>
          <svg
            className="close-btn-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </div>

        <ShipmentHistory trackingEventHistory={trackingEventHistory} />
      </div>
    </div>
  );
}

export default ShipmentDetailsModal;
