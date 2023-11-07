import React from "react";
import "./ShipmentItem.css";
import { getDate } from "../helper";

function ShipmentItem({ onClick, shipment }) {
  const { trackingId, lastUpdate, status } = shipment;

  return (
    <>
      <li onClick={() => onClick(shipment)} className="shipment-list">
        <div className="shipment-list-item">
          <div>
            <p>{trackingId}</p>
            <small>Created: {getDate(lastUpdate)}</small>
          </div>
          <div className="shipment-status">{status}</div>
        </div>
      </li>
    </>
  );
}
export default ShipmentItem;
