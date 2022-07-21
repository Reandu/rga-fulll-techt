import { VehicleModel } from "../../../domains/models/vehicle.model";
import { Repository } from "../../../infra/repository/repository";
import { ParkVehicleCommand } from "../parkVehicle.command";
import { ICommandHandler } from "./interface/commandeHandler.interface";

export class ParkVehicleCommandHandler
	implements ICommandHandler<ParkVehicleCommand>
{
	private repository = Repository.instance;

	public async execute(command: ParkVehicleCommand): Promise<void> {
		const vehicle = await this.repository.findVehicleById(command.vehicleId);

		if (!vehicle) {
            throw new Error(`Vehicle ${command.vehicleId} not found`);
        }
		
		await vehicle.toModel().park(command.lat, command.long);
	}
}
