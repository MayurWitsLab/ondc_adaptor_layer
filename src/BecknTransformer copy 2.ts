import fs from 'fs';

class BecknTransformer {
    static loadMapping(mappingPath: string) {
        const file = fs.readFileSync(mappingPath, 'utf8');
        return JSON.parse(file);
    }

    static setNestedProperty(obj: any, path: string, value: any) {
        const keys = path.split('.');
        console.log("keys", keys)
        let temp = obj;
        while (keys.length > 1) {
            const key: any = keys.shift();
            console.log("key", key)
            if (!temp[key]) temp[key] = {};
            temp = temp[key];
        }
        temp[keys[0]] = value;
        console.log("temp", temp)
    }

    static transform(rawData: any, schema: any, mapping: any) {
        const transformedData: any = {};
        Object.keys(mapping).forEach(sourceKey => {
            const targetKey = mapping[sourceKey];
            console.log(targetKey)
            const value = rawData[sourceKey];
            if (value !== undefined) {
                this.setNestedProperty(transformedData, targetKey, value);
            }
        });
        return transformedData;
    }
}

export default BecknTransformer;