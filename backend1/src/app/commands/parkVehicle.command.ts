import { ICommand } from "./interface/command.interface";

export class ParkVehicleCommand implements ICommand {
    constructor(public readonly fleetId: string,
                public readonly vehicleId: string, 
                public readonly lat: string, 
                public readonly long: string) {}
    public readonly commandName = `ParkVehicleCommand`;
}