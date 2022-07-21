import { Column, Entity, PrimaryColumn } from "typeorm";
import { VehicleModel } from "../../../domains/models/vehicle.model";
import { FleetDto } from "../../dto/fleet.dto";
import { IEntity } from "./interface/entity.interface";

@Entity()
export class FleetEntity implements IEntity {
	constructor(
		id: string,
		userId: string
	) {
		this.id = id;
		this.userId = userId;
	}

	@PrimaryColumn()
	public readonly id: string;

	@Column()
	public readonly userId: string;

	public toDto(): FleetDto {
		return { ...this }
	}

    public toModel(): VehicleModel {
		return new VehicleModel(
            this.id,
            this.userId
        )
	}
}
