#!/usr/bin/env node
import "reflect-metadata"
import { Command } from "commander";
import * as pj from "../package.json";
import { Controller } from "./app.controller";
import 'dotenv/config';

if (!process.env.FLEET_MANAGER_DB_PATH) {
	console.error('You must configure FLEET_MANAGER_DB_PATH : ');
	console.error('export FLEET_MANAGER_DB_PATH=/folder/example.db');
	process.exit();
}

const program = new Command();
const controller = new Controller();

program.name(pj.name)
	.description(pj.description)
	.version(pj.version, '-v, --version');

program.command("create")
	.description("create a new fleet")
	.argument("<userId>", "User identifier")
	.action(async (userId: string) => {
		console.log("create");
		const result = await controller.createFleet(userId);
		console.log(result);
	});

program
	.command("register-vehicle")
	.description("register a vehicle")
	.argument("<fleetId>", "User identifier")
	.argument("<vehicleId>", "Vehicle plate number")
	.action(async (fleetId: string, vehicleId: string) => {
        const result = await controller.registerVehicle(fleetId, vehicleId)
		console.log(result);
	});

program
	.command("localize-vehicle")
	.description("park a vehicle")
	.argument("<fleetId>", "User identifier")
	.argument("<vehicleId>", "Vehicle plate number")
	.argument("<latitude>", "Latitude")
	.argument("<longitude>", "Longitude")
	.argument("[altitude]", "Altitude")
	.action(async (fleetId: string, vehicleId: string, latitude: string, longitude: string, altitude: string) => {
		const result = await controller.parkVehicle(fleetId, vehicleId, latitude, longitude, altitude);
		console.log(result);
	});

program
	.command("get-fleets")
	.description("get all fleets")
	.action(async () => {
		console.table(await controller.getFleets());
	});

program
	.command("get-vehicles")
	.description("get all vehicles")
	.action(async () => {
		console.table(await controller.getVehicles());
	});

program.parse();
