import { Column, Entity, PrimaryColumn } from "typeorm";
import { PositionModel } from "../../../domains/models/position.model";
import { VehicleModel } from "../../../domains/models/vehicle.model";
import { VehicleDto } from "../../dto/vehicle.dto";
import { IEntity } from "./interface/entity.interface";

@Entity()
export class VehicleEntity implements IEntity {
	constructor(
		id: string,
		fleetId: string,
		longitude: string,
		latitude: string,
		altitude: string
	) { 
        this.id = id;
		this.fleetId = fleetId;
		this.longitude = longitude;
		this.latitude = latitude;
		this.altitude = altitude;    
    }

    @PrimaryColumn()
    public readonly id: string;

    @Column()
    public readonly fleetId: string;

    @Column()
    public readonly longitude: string;

    @Column()
    public readonly latitude: string;

    @Column()
    public readonly altitude: string;

	public toDto(): VehicleDto {
        return { ...this }
	}

    public toModel(): VehicleModel {
		return new VehicleModel(
            this.id,
            this.fleetId,
            new PositionModel(this.longitude, this.latitude, this.altitude)
        )
	}
}
