import { Given } from "@cucumber/cucumber";
import { VehicleModel } from "../../src/domains/models/vehicle.model";
import { CustomWorld } from "../support/curstomWorld";


Given<CustomWorld>('my fleet', function () {
    this.myFleetId = 'myFleet';
    return;
});

Given<CustomWorld>('a vehicle', function () {
    this.vehicleId = 'vehicleId';
    this.vehicle = new VehicleModel(this.vehicleId);
    return;
});

Given<CustomWorld>('I have registered this vehicle into my fleet', async function () {
    this.vehicle.register(this.myFleetId);
    return;
});