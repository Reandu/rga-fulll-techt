import { CreateFleetCommand } from "./app/commands/createFleet.command";
import { ParkVehicleCommand } from "./app/commands/parkVehicle.command";
import { RegisterVehicleCommand } from "./app/commands/registerVehicle.command";
import { FindFleetsQuery } from "./app/queries/findFleets.query";
import { FindVehicleByIdQuery } from "./app/queries/findVehicleById.query";
import { FindVehiclesQuery } from "./app/queries/findVehicles.query";
import { CommandBus } from "./infra/bus/command.bus";
import { QueryBus } from "./infra/bus/query.bus";
import { FleetDto } from "./infra/dto/fleet.dto";
import { VehicleDto } from "./infra/dto/vehicle.dto";

enum ResultEnum {
	Success = "success",
}

export class Controller {
	private queryBus = QueryBus.instance;
	private commandBus = CommandBus.instance;

	/**
	 * Command : Register a vehicle at a location
	 * @param {string} fleetId Fleet id
	 * @param {string} vehicleId Plate number
	 * @returns {string} Result
	 */
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

	/**
	 * Command : Park a vehicle at a location
	 * @param {string} fleetId Fleet id
	 * @param {string} vehicleId Plate number
	 * @param {string} long Longitude
	 * @param {string} lat Latitude
	 * @param {string} alt Altitude
	 * @returns {string} Result
	 */
	public async parkVehicle(
		fleetId: string,
		vehicleId: string,
		long: string,
		lat: string,
		alt: string
	): Promise<string> {
		try {
			const command = new ParkVehicleCommand(
				fleetId,
				vehicleId,
				lat,
				long,
				alt
			);
			await this.commandBus.execute(command);
			return ResultEnum.Success;
		} catch (e) {
			return this.handleError(e);
		}
	}

	/**
	 * Query : Get a vehicle by id
	 * @param {string} vehicleId Plate number
	 * @returns {VehicleDto | string} Vehicle or error message
	 */
	public async getVehicleById(
		vehicleId: string
	): Promise<VehicleDto | string> {
		try {
			const query = new FindVehicleByIdQuery(vehicleId);
			return await this.queryBus.execute(query);
		} catch (e) {
			return this.handleError(e);
		}
	}

	/**
	 * Query : Get all vehicles
	 * @param {string} vehicleId Plate number
	 * @returns {VehicleDto[] | string} Vehicle list or error message
	 */
	public async getVehicles(): Promise<VehicleDto[] | string> {
		try {
			const query = new FindVehiclesQuery();
			return await this.queryBus.execute(query);
		} catch (e) {
			return this.handleError(e);
		}
	}

	/**
	 * Query : Get fleet by id
	 * @param {string} fleetId Fleet id
	 * @returns {FleetDto[] | string} Fleet list or error message
	 */
	public async getFleetById(fleetId: string): Promise<FleetDto | string> {
		try {
			const query = new FindVehicleByIdQuery(fleetId);
			return await this.queryBus.execute(query);
		} catch (e) {
			return this.handleError(e);
		}
	}

	/**
	 * Query : get all fleets
	 * @returns {FleetDto[] | string} Fleet list or error message
	 */
	public async getFleets(): Promise<FleetDto[] | string> {
		try {
			const query = new FindFleetsQuery();
			return await this.queryBus.execute(query);
		} catch (e) {
			return this.handleError(e);
		}
	}

	/**
	 * Command : Create a fleet
	 * @param {string} userId   
	 * @returns result message 
	 */
	public async createFleet(userId: string): Promise<string> {
		try {
			const command = new CreateFleetCommand(userId);
			return await this.commandBus.execute(command);
		} catch (e) {
			return this.handleError(e);
		}
	}

	private handleError(e: Error): string {
		return e.message;
	}
}
