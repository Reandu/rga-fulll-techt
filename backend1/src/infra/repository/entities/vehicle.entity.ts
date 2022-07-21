import { PositionModel } from "../../../domains/models/position.model";
import { VehicleModel } from "../../../domains/models/vehicle.model";
import { VehicleDto } from "../dto/vehicle.dto";

export class VehicleEntity {
	constructor(
		public readonly id: string,
        public readonly fleetId: string,
        public readonly longitude: string,
        public readonly latitude: string
	) { }
    

    public toModel(): VehicleModel {
		return new VehicleModel(
            this.id,
            this.fleetId,
            new PositionModel(this.longitude, this.latitude)
        )
	}

    public toDto(): VehicleDto {
		return { ...this }
	}
}
