import { World } from "@cucumber/cucumber";
import { VehicleModel } from "../../src/domains/models/vehicle.model";

export class CustomWorld extends World{
    myFleetId: string;
    notMyFleetId: string;
    vehicleId: string;
    vehicle: VehicleModel;
    latitude: string;
    longitude: string;
    result: string;
}