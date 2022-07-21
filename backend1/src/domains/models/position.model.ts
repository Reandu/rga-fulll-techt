export class PositionModel {
	constructor(
		private _longitude: string = "",
		private _latitude: string = ""
	) {}

	public get longitude(): string {
		return this._longitude;
	}

	public get latitude(): string {
		return this._latitude;
	}
}
