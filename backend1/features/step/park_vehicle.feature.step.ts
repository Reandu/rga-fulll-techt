import { expect } from 'chai';
import { When, Then, Given, setWorldConstructor } from '@cucumber/cucumber';
import { CustomWorld } from '../support/curstomWorld';
import { VehicleModel } from '../../src/domains/models/vehicle.model';

setWorldConstructor(CustomWorld);

Given<CustomWorld>('a location', function () {
    this.latitude = "48.862725";
    this.longitude = "2.287592";
    return;
});

Given<CustomWorld>('my vehicle has been parked into this location', async function () {
    this.vehicle.park(this.latitude, this.longitude);
    return;
});

When<CustomWorld>('I park my vehicle at this location', async function () {
    this.vehicle.park(this.latitude, this.longitude);
    return;
})

When<CustomWorld>('I try to park my vehicle at this location', async function () {
    try {
        await this.vehicle.park(this.latitude, this.longitude);
    } catch(e) {
        this.result = e.message;
    }
    return;
})

Then<CustomWorld>('the known location of my vehicle should verify this location', async function () {
    expect(this.vehicle.position.latitude).equal(this.latitude);
    expect(this.vehicle.position.longitude).equal(this.longitude);
    return;
})

Then<CustomWorld>('I should be informed that {string}', async function (expectedResult) {
    expect(this.result).equal(expectedResult)
    return;
})

