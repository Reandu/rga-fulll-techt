import { Given, setWorldConstructor, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Database } from '../../src/infra/repository/database';
import { VehicleEntity } from '../../src/infra/repository/entities/vehicle.entity';
import { CustomWorld } from '../support/curstomWorld';

setWorldConstructor(CustomWorld);

Given<CustomWorld>('a location', function () {
    this.latitude = "48.862725";
    this.longitude = "2.287592";
    return;
});

Given<CustomWorld>('my vehicle has been parked into this location', async function () {
    await this.vehicle.park(this.latitude, this.longitude);
    return;
});

When<CustomWorld>('I park my vehicle at this location', async function () {
    await this.vehicle.park(this.latitude, this.longitude);
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
    const ds = await Database.instance.dataSource();
    const vehicle = await ds.getRepository(VehicleEntity).findOneBy({
        id: this.vehicleId
    });
    expect(vehicle?.latitude).equal(this.latitude);
    expect(vehicle?.longitude).equal(this.longitude);
    return;
})

Then<CustomWorld>('I should be informed that {string}', async function (expectedResult) {
    expect(this.result).equal(expectedResult)
    return;
})

