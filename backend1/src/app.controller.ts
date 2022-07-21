import { ParkVehicleCommand } from "./app/commands/parkVehicle.command";
import { RegisterVehicleCommand } from "./app/commands/registerVehicle.command";
import { FindVehicleByIdQuery } from "./app/queries/findVehicleById.query";
import { CommandBus } from "./infra/bus/command.bus";
import { QueryBus } from "./infra/bus/query.bus";
import { VehicleDto } from "./infra/repository/dto/vehicle.dto";

enum ResultEnum {
	Success = "success",
}

export class App {
	private queryBus = QueryBus.instance;
	private commandBus = CommandBus.instance;

	public async registerVehicle(
		fleetId: string,
		vehicleId: string
	): Promise<string> {
		try {
			const command = new RegisterVehicleCommand(fleetId, vehicleId);
			await this.commandBus.execute(command);
			return ResultEnum.Success;
		} catch (e) {
			return this.handleError(e);
		}
	}

	public async parkVehicle(
		fleetId: string,
		vehicleId: string,
		long: string,
		lat: string
	): Promise<string> {
		try {
			const command = new ParkVehicleCommand(
				fleetId,
				vehicleId,
				lat,
				long
			);
			await this.commandBus.execute(command);
			return ResultEnum.Success;
		} catch (e) {
			return this.handleError(e);
		}
	}

	public async getVehicle(vehicleId: string): Promise<VehicleDto> {
		try {
			const query = new FindVehicleByIdQuery(vehicleId);
			return await this.queryBus.execute(query);
		} catch (e) {
			this.handleError(e);
		}
	}

	private handleError(e: Error) {
		const exception = e as Error;
		return exception.message;
	}
}
