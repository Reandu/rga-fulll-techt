import { DataSource } from "typeorm";
import { FleetEntity } from "./entities/fleet.entity";
import { VehicleEntity } from "./entities/vehicle.entity";

export class Database {
    
    private _dataSource: DataSource = new DataSource({
        type: "sqlite",
        database: process.env.FLEET_MANAGER_DB_PATH,
        synchronize: true,
        logging: false,
        entities: [VehicleEntity, FleetEntity]
    })

    public async dataSource(): Promise<DataSource> {
        if (!this._dataSource.isInitialized) {
            return await this._dataSource.initialize()
        } else {
            return this._dataSource
        }
    }

    private static _instance: Database;
    public static get instance(): Database {
        if (!this._instance) {
            this._instance = new Database();
        }   
        return this._instance;
    }
}



