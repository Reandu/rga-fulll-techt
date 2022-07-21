
import { FindFleetByIdQuery } from "../../app/queries/findFleetById.query";
import { FindFleetsQuery } from "../../app/queries/findFleets.query";
import { FindVehicleByIdQuery } from "../../app/queries/findVehicleById.query";
import { FindVehiclesQuery } from "../../app/queries/findVehicles.query";
import { FindFleetByIdQueryHandler } from "../../app/queries/handler/findFleetById.handler";
import { FindFleetsHandler } from "../../app/queries/handler/findFleets.handler";
import { FindVehicleByIdQueryHandler } from "../../app/queries/handler/findVehicleById.handler";
import { FindVehiclesHandler } from "../../app/queries/handler/findVehicles.handler";
import { IQuery } from "../../app/queries/interface/query.interface";

export class QueryBus{

    constructor(
        private readonly findVehicleByIdQueryHandler = new FindVehicleByIdQueryHandler(),
        private readonly findVehiclesHandler = new FindVehiclesHandler(),
        private readonly findFleetByIdQueryHandler = new FindFleetByIdQueryHandler(),
        private readonly findFleetsHandler = new FindFleetsHandler()
    ) {}
    

    public async execute<T extends IQuery>(query: T): Promise<any> {
        if (query instanceof FindVehicleByIdQuery) {
            return await this.findVehicleByIdQueryHandler.execute(query)
        }

        if (query instanceof FindVehiclesQuery) {
            return await this.findVehiclesHandler.execute(query)
        }

        if (query instanceof FindFleetByIdQuery) {
            return await this.findFleetByIdQueryHandler.execute(query)
        }

        if (query instanceof FindFleetsQuery) {
            return await this.findFleetsHandler.execute(query)
        }

        throw new Error(`Handler for query ${query.queryName} not found`);
    }

    private static _instance: QueryBus
    static get instance(): QueryBus {
        if (!this._instance) {
            this._instance = new QueryBus();
        }

        return this._instance;
    }
}