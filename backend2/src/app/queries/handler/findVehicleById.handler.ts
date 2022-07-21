import { VehicleDto } from "../../../infra/dto/vehicle.dto";
import { Repository } from "../../../infra/repository/repository";
import { FindVehicleByIdQuery } from "../findVehicleById.query";
import { IQueryHandler } from "./interface/queryHandler.interface";

export class FindVehicleByIdQueryHandler implements IQueryHandler<FindVehicleByIdQuery, VehicleDto> {

    constructor(private repository = Repository.instance) {}

    public async execute(query: FindVehicleByIdQuery): Promise<VehicleDto> {
        const vehicleEntity = await this.repository.findVehicleById(query.vehicleId);
        if (!vehicleEntity) {
            throw new Error(`Vehicle ${query.vehicleId} not found`);
        }
        return vehicleEntity.toDto();
    }
}