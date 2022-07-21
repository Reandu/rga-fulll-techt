import { Repository } from "../../infra/repository/repository";
import { VehicleEntity } from "../../infra/repository/entities/vehicle.entity";
import { PositionModel } from "./position.model";

export class VehicleModel {
	
	constructor(
		private _id: string,
		private _fleetId: string = null,
		private _position: PositionModel = new PositionModel()
	) {}
	private repository = Repository.instance;

	public get id(): string {
		return this._id;
	}

	public get fleetId(): string {
		return this._fleetId;
	}

	public get position(): PositionModel {
		return this._position;
	}

	public async register(fleetId: string) {
		if (this.fleetId === fleetId) {
			throw new Error(`this vehicle has already been registered into my fleet`);
		}
		this._fleetId = fleetId;
		await this.repository.saveVehicle(this);
	}

	public async park(latitude: string, longitude: string) {
		const newPosition = new PositionModel(longitude, latitude);
		
		if (
			this.position?.latitude === newPosition.latitude &&
			this.position?.longitude === newPosition.longitude
		) {
            throw new Error(`my vehicle is already parked at this location`)
		}

		this._position = newPosition;
		await this.repository.saveVehicle(this);
	}

	public toEntity() {
		return new VehicleEntity(
			this._id,
			this._fleetId,
			this._position.longitude,
			this._position.latitude
		)
	}
}
