import path from 'path';
import becknConfig from '../src/configManager';
import BecknContext from '../src/BecknContext';

// Initialize ConfigManager with the default config path
const config = new becknConfig();

// Optionally modify the config path if needed (example)
// configManager.setConfigPath(path.resolve(__dirname, '../new_config.yaml')); // Only if you need to change the config file

// Modify the config if needed (example)
config.set('mappingPath', path.resolve(__dirname, '../mapping.json'));

// Initialize BecknContext with the final config from ConfigManager
const becknContext = new BecknContext(config);

// Example raw data for an array of items
const rawDataItems = [
    {
        myId: 'item-123',
        myName: 'Sample Item 1',
        myPrice: 100.0
    },
    {
        myId: 'item-124',
        myName: 'Sample Item 2',
        myPrice: 200.0
    }
];

// Transform and validate OnSearch data
try {
    const transformedOnSearchData = becknContext.transform(rawDataItems);
    console.log('Transformed OnSearch Data:', JSON.stringify(transformedOnSearchData, null, 2));
} catch (error) {
    if (error instanceof Error) {
        console.error('Error transforming OnSearch data:', error.message);
    } else {
        console.error('Unexpected error transforming OnSearch data:', error);
    }
}