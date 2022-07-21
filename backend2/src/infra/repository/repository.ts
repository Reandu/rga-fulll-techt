import { Database } from "./database";
import { FleetEntity } from "./entities/fleet.entity";
import { VehicleEntity } from "./entities/vehicle.entity";

export class Repository {
	constructor(
		private db: Database = Database.instance
	) {}

	public async saveFleet(fleetEntity: FleetEntity): Promise<void> {
		const ds = await this.db.dataSource();
		await ds.getRepository(FleetEntity).save(fleetEntity)
	}

	public async findFleetById(fleetId: string): Promise<FleetEntity> {
		const ds = await this.db.dataSource();
		return await ds.getRepository(FleetEntity).findOneBy({
			id: fleetId
		})
	}

	public async findFleets(): Promise<FleetEntity[]> {
		const ds = await this.db.dataSource();
		const fleets = await ds.getRepository(FleetEntity).find();
		return fleets;
	}

	public async saveVehicle(vehicleEntity: VehicleEntity): Promise<void> {
		const ds = await this.db.dataSource();
		await ds.getRepository(VehicleEntity).save(vehicleEntity);
	}

	public async findVehicleById(vehicleId: string): Promise<VehicleEntity> {
		const ds = await this.db.dataSource();
		const vehicle = await ds.getRepository(VehicleEntity).findOneBy({
			id: vehicleId
		});
		return vehicle;
	}

	public async findVehicles(): Promise<VehicleEntity[]> {
		const ds = await this.db.dataSource();
		const vehicles = await ds.getRepository(VehicleEntity).find();
		return vehicles;
	}

	private static _instance: Repository;
	public static get instance(): Repository {
		if (!this._instance) {
			this._instance = new Repository();
		}
		return this._instance;
	}
}