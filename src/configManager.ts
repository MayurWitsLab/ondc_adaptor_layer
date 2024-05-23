import fs from 'fs';
import YAML from 'yaml';
import path from 'path';

class becknConfig {
    private config: any;
    private configPath: string;

    constructor(configPath: string = path.resolve(__dirname, '../config.yaml')) {
        this.configPath = configPath;
        this.load();
    }

    load() {
        try {
            const file = fs.readFileSync(this.configPath, 'utf8');
        this.config = YAML.parse(file);
        }
        catch (error) {
            console.error(`Error loading configuration file at ${this.configPath}:`, error);
            throw error;
        }
        
    }

    get(key: string) {
        return this.config[key];
    }

    set(key: string, value: any) {
        this.config[key] = value;
    }

    getAll() {
        return this.config;
    }
}

export default becknConfig;