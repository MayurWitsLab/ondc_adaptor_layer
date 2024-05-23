import fs from 'fs';
import YAML from 'yaml';
import Ajv from 'ajv';
import BecknTransformer from './BecknTransformer';
import becknConfig from './configManager';

class BecknContext {
    config: any;
    schemas: any = {};
    ajv: Ajv;
    mapping: any;

    constructor(config: becknConfig) {
        this.config = config.getAll();
        this.ajv = new Ajv();
        this.loadSchemasFromOpenAPI(this.config.schemaPath);
        this.loadMapping(this.config.mappingPath);
    }

    loadSchemasFromOpenAPI(schemaPath: string) {
        const file = fs.readFileSync(schemaPath, 'utf8');
        const openApiSpec = YAML.parse(file);
        this.schemas = openApiSpec.components.schemas;
    }

    loadMapping(mappingPath: string) {
        this.mapping = BecknTransformer.loadMapping(mappingPath);
    }

    getSchema(name: string) {
        return this.schemas[name];
    }

    validate(schemaName: string, data: any) {
        const schema = this.getSchema(schemaName);
        const validate = this.ajv.compile(schema);
        const valid = validate(data);
        if (!valid) {
            console.error(validate.errors);
        }
        return valid;
    }

    transform(rawData: any) {
        const declaredSchemas = Object.keys(this.mapping);
        for (const schemaName of declaredSchemas) {
            const transformedData = BecknTransformer.transform(rawData, schemaName, this.mapping);
            return { schema: schemaName, data: transformedData };
        }
        throw new Error('No valid schema found for the provided data');
    }
}

export default BecknContext;