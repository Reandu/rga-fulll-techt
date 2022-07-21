import { VehicleEntity } from "./entities/vehicle.entity";
import { VehicleModel } from "../../domains/models/vehicle.model";

export class Repository {
	constructor(
		private vehicles: VehicleEntity[] = []
	) {}

	public async saveVehicle(model: VehicleModel): Promise<void> {
		const vehicleEntity = model.toEntity();
		
		const index = this.vehicles.findIndex(
			(vehicle) => vehicle.id === vehicleEntity.id
		);
		
		if (index >= 0) {
			this.vehicles[index] = vehicleEntity;
		} else {
			this.vehicles.push(vehicleEntity);
		}
	}

	public async findVehicleById(vehicleId: string): Promise<VehicleEntity> {
		return this.vehicles.find((vehicle) => vehicle.id === vehicleId );
	};

	private static _instance: Repository;
	static get instance(): Repository {
		if (!this._instance) {
			this._instance = new Repository();
		}
		return this._instance;
	}
}
