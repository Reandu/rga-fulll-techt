import { Repository } from "../../infra/repository/repository";
import { FleetEntity } from "../../infra/repository/entities/fleet.entity";
import { v4 as uuid } from "uuid";

export class FleetModel {
	constructor(private _id: string, private _userId: string) {}

	private repository = Repository.instance;

	public get id(): string {
		return this._id;
	}

	public get userId(): string {
		return this._userId;
	}

	/**
	 * Create a fleet
	 * @returns new fleet id 
	 */
	public async create(): Promise<string> {
		this._id = uuid();

		await this.repository.saveFleet(this.toEntity());

		return this._id;
	}

	/**
	 * Convert the model to entity
	 * @returns {FleetEntity} 
	 */
	private toEntity(): FleetEntity {
		return new FleetEntity(this._id, this._userId);
	}
}
