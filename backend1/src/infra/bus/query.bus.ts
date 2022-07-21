import { ParkVehicleCommandHandler } from "../../app/commands/handlers/parkVehicle.handler";
import { RegisterVehicleCommandHandler } from "../../app/commands/handlers/registerVehicle.handler";
import { ICommand } from "../../app/commands/interface/command.interface";
import { ParkVehicleCommand } from "../../app/commands/parkVehicle.command";
import { RegisterVehicleCommand } from "../../app/commands/registerVehicle.command";
import { FindVehicleByIdQuery } from "../../app/queries/findVehicleById.query";
import { FindVehicleByIdQueryHandler } from "../../app/queries/handler/findVehicleById.handler";
import { IQuery } from "../../app/queries/interface/query.interface";

export class QueryBus{

    constructor(
        private readonly findVehicleByIdQueryHandler = new FindVehicleByIdQueryHandler()
    ) {}
    

    public async execute<T extends IQuery>(query: T): Promise<any> {
        let result;
        if (query instanceof FindVehicleByIdQuery) {
            return await this.findVehicleByIdQueryHandler.execute(query)
        }

        throw new Error(`Handler for command ${query.queryName} not found`);
    }

    private static _instance: QueryBus
    static get instance(): QueryBus {
        if (!this._instance) {
            this._instance = new QueryBus();
        }

        return this._instance;
    }
}