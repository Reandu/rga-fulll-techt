import { ICommand } from "./interface/command.interface";

export class RegisterVehicleCommand implements ICommand {
    constructor(
        public readonly fleedId: string,
        public readonly vehicleId: string
    ) {}
    public readonly commandName = `RegisterVehicleCommand`;
}