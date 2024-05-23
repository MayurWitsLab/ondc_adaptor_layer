import fs from 'fs';
import _ from 'lodash';

class BecknTransformer {
    static loadMapping(mappingPath: string) {
        const file = fs.readFileSync(mappingPath, 'utf8');
        return JSON.parse(file);
    }

    static transformItem(rawData: any, schemaName: string, mapping: any) {
        const schemaMapping = mapping[schemaName];
        if (!schemaMapping) {
            throw new Error(`No mapping found for schema: ${schemaName}`);
        }

        const transformedData: any = {};
        Object.keys(schemaMapping).forEach(sourceKey => {
            console.log("sourceKey", sourceKey)
            const targetKey = schemaMapping[sourceKey];
            console.log("targetKey", targetKey)
            const value = _.get(rawData, sourceKey);
            console.log("value", value)
            if (value !== undefined) {
                _.set(transformedData, targetKey, value);
            } else {
                console.warn(`Warning: Source key "${sourceKey}" not found in raw data`);
            }
        });
        console.log(transformedData)
        return transformedData;
    }

    static transform(rawData: any, schemaName: string, mapping: any) {
        return rawData.map((item: any) => this.transformItem(item, schemaName, mapping));
    }
}

export default BecknTransformer;