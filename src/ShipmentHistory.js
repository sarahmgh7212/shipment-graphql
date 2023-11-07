import React from "react";
import { getDate, getTime } from "./helper";
import "./ShipmentHistory.css";
import "./ShipmentDetailsModal.css";
import { ReactComponent as SuccessCircle } from "./assets/success-circle.svg";
import { ReactComponent as InfoCircle } from "./assets/info-circle.svg";
import { ReactComponent as WarningCircle } from "./assets/warning-circle.svg";

function ShipmentHistory({ trackingEventHistory }) {
  return (
    <>
      <p className="section-title">Tracking History</p>
      <div className="tracking-container">
        <div className="tracking-content">
          <ul>
            {Array.isArray(trackingEventHistory) ? (
              trackingEventHistory.map((event) => (
                <div className="shipment-history-container">
                  {event.statusSeverity === "Success" && (
                    <div className="success-icon-wrapper">
                      <SuccessCircle />
                    </div>
                  )}
                  {event.statusSeverity === "Info" && (
                    <div className="info-icon-wrapper">
                      <InfoCircle />
                    </div>
                  )}
                  {event.statusSeverity === "Warning" && (
                    <div className="warning-icon-wrapper">
                      <WarningCircle />
                    </div>
                  )}
                  <li key={event.id} className="shipment-history-list">
                    <p> {event.status}</p>
                    <p className="flex-end">{getDate(event.timestamp)}</p>
                    <p> {event.location}</p>
                    <p className="flex-end">{getTime(event.timestamp)}</p>
                  </li>
                </div>
              ))
            ) : (
              <p>No tracking events available!</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ShipmentHistory;
