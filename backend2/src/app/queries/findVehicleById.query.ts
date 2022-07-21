import { IQuery } from "./interface/query.interface";

export class FindVehicleByIdQuery implements IQuery {
    constructor(
        public readonly vehicleId: string
    ) {}
    public readonly queryName = `FindVehicleByIdQuery`
}