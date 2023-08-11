# Welcome to NuvoloStateUtils 👋

Update your State Definition in a safe way!

## Why this

Have you ever face a situation where you update your State Definitions, transitions, or policies but these updates only apply for new records?

Don't worry, this simple utility will help you to apply all your state changes for existing data. 

You can even select what data to apply changes by providing custom queries.

Let's started!

## How to use it

### Devices
Update all devices:

```sh
var type = x_nuvo_eam.StateUtils.CLINICAL_TYPE;
// But it can also be:
// var type = x_nuvo_eam.StateUtils.FACILITIES_TYPE;
// var type = x_nuvo_eam.StateUtils.LAB_TYPE;
// var type = x_nuvo_eam.StateUtils.MANUFACTURING_TYPE;

var utils = new x_nuvo_eam.StateUtils(type);
utils.deviceUpdateStateConfig();
```

Update some devices:

```sh
var type = x_nuvo_eam.StateUtils.CLINICAL_TYPE;
// But it can also be:
// var type = x_nuvo_eam.StateUtils.FACILITIES_TYPE;
// var type = x_nuvo_eam.StateUtils.LAB_TYPE;
// var type = x_nuvo_eam.StateUtils.MANUFACTURING_TYPE;

var encodedQuery = "test=123^random=hi";

var utils = new x_nuvo_eam.StateUtils(type);
utils.deviceUpdateStateConfig(encodedQuery);
```

### Work Orders
Update all Work Orders:

```sh
var type = x_nuvo_eam.StateUtils.CLINICAL_TYPE;
// But it can also be:
// var type = x_nuvo_eam.StateUtils.FACILITIES_TYPE;
// var type = x_nuvo_eam.StateUtils.LAB_TYPE;
// var type = x_nuvo_eam.StateUtils.MANUFACTURING_TYPE;

var utils = new x_nuvo_eam.StateUtils(type);
var workOrderTypeID = 'ftwretrwe12faftest';
utils.workOrderUpdateStateConfig(workOrderTypeID);
```

Update some Work Orders:

```sh
var type = x_nuvo_eam.StateUtils.CLINICAL_TYPE;
// But it can also be:
// var type = x_nuvo_eam.StateUtils.FACILITIES_TYPE;
// var type = x_nuvo_eam.StateUtils.LAB_TYPE;
// var type = x_nuvo_eam.StateUtils.MANUFACTURING_TYPE;

var encodedQuery = "test=123^random=hi";

var utils = new x_nuvo_eam.StateUtils(type);
var workOrderTypeID = 'ftwretrwe12faftest';
utils.workOrderUpdateStateConfig(workOrderTypeID, encodedQuery);
```

## Author

👤 **Luis Morón**

- Website: luifermoron.com
- Github: [@luifermoron](https://github.com/luifermoron)
- LinkedIn: [@luifermoron](https://linkedin.com/in/luifermoron)

## Show your support

Give a ⭐️ if this project helped you!