import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Database } from '../../src/infra/repository/database';
import { VehicleEntity } from '../../src/infra/repository/entities/vehicle.entity';
import { CustomWorld } from '../support/curstomWorld';

Given<CustomWorld>('the fleet of another user', function () {
    this.notMyFleetId = 'notMyFleet';
    return;
});

Given<CustomWorld>('this vehicle has been registered into the other user\'s fleet', async function () {
    await this.vehicle.register(this.notMyFleetId)
    return;
});

When<CustomWorld>('I register this vehicle into my fleet', async function () {
    await this.vehicle.register(this.myFleetId)
    return;
})

When<CustomWorld>('I try to register this vehicle into my fleet', async function () {
    try {
        await this.vehicle.register(this.myFleetId)
    } catch(e) {
        this.result = e.message;
    }
    return;
})

Then<CustomWorld>('this vehicle should be part of my vehicle fleet', async function () {
    const ds = await Database.instance.dataSource();
    const vehicle = await ds.getRepository(VehicleEntity).findOneBy({
        id: this.vehicleId
    });
    expect(vehicle?.fleetId).equal(this.myFleetId);
    return;
})

Then<CustomWorld>('I should be informed this {string}', async function (expectedResult) {
    expect(this.result).equal(expectedResult);
})
