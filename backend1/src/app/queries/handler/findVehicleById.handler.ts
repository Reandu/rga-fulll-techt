import { VehicleDto } from "../../../infra/repository/dto/vehicle.dto";
import { VehicleEntity } from "../../../infra/repository/entities/vehicle.entity";
import { Repository } from "../../../infra/repository/repository";
import { FindVehicleByIdQuery } from "../findVehicleById.query";
import { IQueryHandler } from "./interface/queryHandler.interface";

export class FindVehicleByIdQueryHandler implements IQueryHandler<FindVehicleByIdQuery, VehicleDto> {

    constructor(private repository = Repository.instance) {}

    public async execute(query: FindVehicleByIdQuery): Promise<VehicleDto> {
        const vehicle = await this.repository.findVehicleById(query.vehicleId);
        if (!vehicle) {
            throw new Error(`Vehicle ${query.vehicleId} not found`);
        }
        return vehicle.toDto();
    }
}