import { FleetDto } from "../../../infra/dto/fleet.dto";
import { Repository } from "../../../infra/repository/repository";
import { FindFleetsQuery } from "../findFleets.query";
import { IQueryHandler } from "./interface/queryHandler.interface";

export class FindFleetsHandler implements IQueryHandler<FindFleetsQuery, FleetDto[]> {

    constructor(private repository = Repository.instance) {}

    public async execute(query: FindFleetsQuery): Promise<FleetDto[]> {
        const fleetEntityList = await this.repository.findFleets();
        return fleetEntityList.map(entity => entity.toDto());
    }
}