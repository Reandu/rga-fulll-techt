export class PositionModel {
	constructor(
		private _longitude: string = "",
		private _latitude: string = "",
		private _altitude: string = ""
	) {}

	public get longitude(): string {
		return this._longitude;
	}

	public get latitude(): string {
		return this._latitude;
	}

	public get altitude(): string {
		return this._altitude;
	}
}
