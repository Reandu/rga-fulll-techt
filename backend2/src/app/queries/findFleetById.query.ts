import { IQuery } from "./interface/query.interface";

export class FindFleetByIdQuery implements IQuery {
    constructor(public readonly fleetId: string) {}
    public readonly queryName = `FindFleetByIdQuery`
}