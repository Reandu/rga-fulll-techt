import { ICommand } from "./interface/command.interface";

export class CreateFleetCommand implements ICommand {
    constructor(public readonly userId) {}

    public readonly commandName = `CreateFleetCommand`;
}