import { FleetModel } from "../../../domains/models/fleet.model";
import { Repository } from "../../../infra/repository/repository";
import { CreateFleetCommand } from "../createFleet.command";
import { ParkVehicleCommand } from "../parkVehicle.command";
import { ICommandHandler } from "./interface/commandeHandler.interface";

export class CreateFleetHandler implements ICommandHandler<CreateFleetCommand> {
	public async execute(command: CreateFleetCommand): Promise<string> {
		const fleet = new FleetModel(null, command.userId);
		return await fleet.create();
	}
}
