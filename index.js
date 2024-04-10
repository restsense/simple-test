import rsExporterClass from "@restsense/agent/api/exporter/InMemoryExporter.ts";
import {startTracesInstrumentation} from "@restsense/agent/api";
import express from "express";
import dataStore  from "nedb";
import cors from "cors";

let rsExporter = new rsExporterClass();
startTracesInstrumentation(rsExporter);

import {loadBackend}  from "./api.js";

let dbContacts = new dataStore();

let app = express();

const PORT = (process.env.PORT || 10000);

app.use(cors());

app.use(express.json());

loadBackend(app,dbContacts);

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}.`);
});

console.log(`Server initializing...`);