import { FleetDto } from "../../../infra/dto/fleet.dto";
import { Repository } from "../../../infra/repository/repository";
import { FindFleetByIdQuery } from "../findFleetById.query";
import { IQueryHandler } from "./interface/queryHandler.interface";

export class FindFleetByIdQueryHandler implements IQueryHandler<FindFleetByIdQuery, FleetDto> {

    constructor(private repository = Repository.instance) {}

    public async execute(query: FindFleetByIdQuery): Promise<FleetDto> {
        const fleetEntity = await this.repository.findFleetById(query.fleetId);
        if (!fleetEntity) {
            throw new Error(`Fleet ${query.fleetId} not found`);
        }
        return fleetEntity.toDto();
    }
}