import React from "react";

export type TVehicle = "car" | "moto" | "auto";

export interface IFare {
  car: number;
  moto: number;
  auto: number;
}

interface IVehiclePanelProps {
  setVehiclePanel: (show: boolean) => void;
  setConfirmRidePanel: (show: boolean) => void;
  selectVehicle: (type: TVehicle) => void;
  fare: IFare;
}

const VehiclePanel: React.FC<IVehiclePanelProps> = ({
  setVehiclePanel,
  setConfirmRidePanel,
  selectVehicle,
  fare,
}) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("car");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-10"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="UberGo car"
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.car}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("moto");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="Uber Moto"
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.moto}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("auto");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="UberAuto"
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;