import { IQuery } from "./interface/query.interface";

export class FindFleetsQuery implements IQuery {
    constructor() {}
    public readonly queryName = `FindFleetsQuery`
}