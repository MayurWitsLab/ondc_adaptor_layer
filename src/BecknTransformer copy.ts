import fs from 'fs';

class BecknTransformer {
    static loadMapping(mappingPath: string) {
        const file = fs.readFileSync(mappingPath, 'utf8');
        console.log(JSON.parse(file))
        return JSON.parse(file);
    }

    static transform(rawData: any, schema: any, mapping: any) {
        const transformedData: any = {};
        Object.keys(schema.properties).forEach(key => {
            console.log("key", key)
            console.log(Object.keys(mapping))
            const sourceKey = Object.keys(mapping).find(k => mapping[k] === key);
            if (sourceKey) {
                transformedData[key] = rawData[sourceKey] !== undefined ? rawData[sourceKey] : schema.properties[key].default;
            }
        });
        return transformedData;
    }
}

export default BecknTransformer;