import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ShipmentDetailsModal from "./ShipmentDetailsModal";
import ShipmentItem from "./ShipmentItem";

const SHIPMENTS_QUERY = gql`
  query GetShipments {
    shipments {
      id
      trackingId
      lastUpdate
      status
      deliveredTime
      deliveryAddress
      totalTransit
    }
  }
`;

const ShipmentList = () => {
  const { loading, error, data } = useQuery(SHIPMENTS_QUERY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState({});

  const openModal = (shipment) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sorting the items based on the latest updated date so we have to reverse the array
  const sortedShipmentItems = [...data.shipments]
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdate);
      const dateB = new Date(b.lastUpdate);

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    })
    .toReversed();

  return (
    <div className="shipment-section">
      <div className="shipment-view-container">
        <div className="shipment-view-title">
          <p>Shipment</p>
          <p>Status</p>
        </div>

        <ul>
          {sortedShipmentItems &&
            sortedShipmentItems.map((shipment) => (
              <ShipmentItem
                key={shipment.id}
                shipment={shipment}
                onClick={openModal}
              />
            ))}
        </ul>
      </div>
      {/* {console.log(selectedShipment.trackingId)} */}
      <ShipmentDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        shipment={selectedShipment}
        // trackingId={selectedShipment.trackingId}
      />
    </div>
  );
};

export default ShipmentList;
