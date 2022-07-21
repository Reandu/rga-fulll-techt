import { ICommand } from "../../interface/command.interface";

export interface ICommandHandler<TCommand extends ICommand, TResult = any> {
    execute(command: TCommand): Promise<TResult>;
}