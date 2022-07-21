import { AfterAll, BeforeAll, Given } from "@cucumber/cucumber";
import { VehicleModel } from "../../src/domains/models/vehicle.model";
import { CustomWorld } from "../support/curstomWorld";
import fs from "fs";

const DB_PATH_TEST = 'test.db'

BeforeAll(() => {
    process.env.FLEET_MANAGER_DB_PATH=DB_PATH_TEST
    if (fs.existsSync(process.env.FLEET_MANAGER_DB_PATH)) {
        fs.unlinkSync(process.env.FLEET_MANAGER_DB_PATH);
    }
})

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
    await this.vehicle.register(this.myFleetId);
    return;
});

AfterAll(() => {
    if (fs.existsSync(DB_PATH_TEST)) {
        fs.unlinkSync(DB_PATH_TEST);
    }
})