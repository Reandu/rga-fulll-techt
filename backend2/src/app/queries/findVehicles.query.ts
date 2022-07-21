import { IQuery } from "./interface/query.interface";

export class FindVehiclesQuery implements IQuery {
    constructor() {}
    public readonly queryName = `FindVehiclesQuery`
}