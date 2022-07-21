import { IQuery } from "../../interface/query.interface";

export interface IQueryHandler<TQuery extends IQuery = any, TResult = any> {
    execute(command: TQuery): Promise<TResult>;
}