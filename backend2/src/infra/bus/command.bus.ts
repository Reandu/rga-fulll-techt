import { CreateFleetCommand } from "../../app/commands/createFleet.command";
import { CreateFleetHandler } from "../../app/commands/handlers/createFleet.handler";
import { ParkVehicleCommandHandler } from "../../app/commands/handlers/parkVehicle.handler";
import { RegisterVehicleCommandHandler } from "../../app/commands/handlers/registerVehicle.handler";
import { ICommand } from "../../app/commands/interface/command.interface";
import { ParkVehicleCommand } from "../../app/commands/parkVehicle.command";
import { RegisterVehicleCommand } from "../../app/commands/registerVehicle.command";

export class CommandBus{
    constructor(
        private readonly parkVehicleCommandHandler =  new ParkVehicleCommandHandler(),
        private readonly registerVehicleCommandHandler =  new RegisterVehicleCommandHandler(),
        private readonly createFleetHandler =  new CreateFleetHandler(),
    ) {}
    
    public async execute<T extends ICommand>(command: T): Promise<string> {
        if (command instanceof ParkVehicleCommand) {
            await this.parkVehicleCommandHandler.execute(command)
            return;
        }

        if (command instanceof RegisterVehicleCommand) {
            await this.registerVehicleCommandHandler.execute(command)
            return;
        }

        if (command instanceof CreateFleetCommand) {
            const result = await this.createFleetHandler.execute(command)
            return result;
        }

        throw new Error(`Handler for command ${command.commandName} not found`);
    }

    private static _instance: CommandBus
    static get instance(): CommandBus {
        if (!this._instance) {
            this._instance = new CommandBus();
        }

        return this._instance;
    }
}