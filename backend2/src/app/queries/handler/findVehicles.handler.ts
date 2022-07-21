import { VehicleDto } from "../../../infra/dto/vehicle.dto";
import { Repository } from "../../../infra/repository/repository";
import { FindVehiclesQuery } from "../findVehicles.query";
import { IQueryHandler } from "./interface/queryHandler.interface";

export class FindVehiclesHandler implements IQueryHandler<FindVehiclesQuery, VehicleDto[]> {

    constructor(private repository = Repository.instance) {}

    public async execute(query: FindVehiclesQuery): Promise<VehicleDto[]> {
        const vehicleEntityList = await this.repository.findVehicles();
        return vehicleEntityList.map(entity => entity.toDto());
    }
}