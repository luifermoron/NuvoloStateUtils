var StateUtils = Class.create();
StateUtils.CLINICAL_TYPE = 'CLINICAL_TYPE';
StateUtils.FACILITIES_TYPE = 'FACILITIES_TYPE';
StateUtils.LAB_TYPE = 'LAB_TYPE';
StateUtils.MANUFACTURING_TYPE = 'MANUFACTURING_TYPE';

StateUtils.prototype = {
    type: 'StateUtils',
    initialize: function(type) {
        if (type == StateUtils.CLINICAL_TYPE) {
            this.DEVICE_TABLE = "x_nuvo_eam_clinical_devices";
            this.WORK_ORDER_TABLE = "x_nuvo_eam_clinical_work_orders";
        } else if (type == StateUtils.FACILITIES_TYPE) {
            this.DEVICE_TABLE = "x_nuvo_eam_facilities_devices";
            this.WORK_ORDER_TABLE = "x_nuvo_eam_facilities_work_orders";
        } else if (type == StateUtils.LAB_TYPE) {
            this.DEVICE_TABLE = "x_nuvo_eam_lab_devices";
            this.WORK_ORDER_TABLE = "x_nuvo_eam_lab_work_orders";
        } else if (type == StateUtils.MANUFACTURING_TYPE) {
            this.DEVICE_TABLE = "x_nuvo_eam_manufacturing_devices";
            this.WORK_ORDER_TABLE = "x_nuvo_eam_manufacturing_work_orders";
        } 
    },
    deviceUpdateStateConfig: function(encodedQueryOp) {
        var allDevicesGR = new GlideRecord(this.DEVICE_TABLE);
        if (encodedQueryOp)
            allDevicesGR.addEncodedQuery(encodedQueryOp);
        allDevicesGR.query();


        var tmpGR = new GlideRecord(this.DEVICE_TABLE);
        tmpGR.initialize();
        var currentTime = +new Date();
        tmpGR.name = currentTime.toString() + "";
        tmpGR.insert();


        allDevicesGR.setValue("stc_blueprint", tmpGR.getValue("stc_blueprint"));
        allDevicesGR.updateMultiple();


        var deleteTmpGR = new GlideRecord(this.DEVICE_TABLE);
        deleteTmpGR.get(tmpGR.sys_id.toString() + "");
        deleteTmpGR.deleteRecord();
    },
    workOrderUpdateStateConfig: function(workOrderTypeID, encodedQueryOp) {
        if (!workOrderTypeID) return; // WORK ORDER TYPE SYS_ID IS MANDATORY!! example: 0658985edbe38010f48662eb8a96198b
        
        var allWorkOrdersGR = new GlideRecord(this.WORK_ORDER_TABLE);
        if (encodedQueryOp)
            allWorkOrdersGR.addEncodedQuery(encodedQueryOp);
        allWorkOrdersGR.query();

        //Tmp Device
        var tmpDeviceGR = new GlideRecord(this.DEVICE_TABLE);
        tmpDeviceGR.initialize();
        var currentTime = +new Date();
        tmpDeviceGR.name = currentTime.toString() + "";
        tmpDeviceGR.insert();

        //Tmp work order
        var tmpWorkOrderGR = new GlideRecord(this.WORK_ORDER_TABLE);
        tmpWorkOrderGR.initialize();
        tmpWorkOrderGR.asset = tmpDeviceGR.sys_id.toString() + "";
        tmpWorkOrderGR.work_order_type = workOrderTypeID;
        tmpWorkOrderGR.short_description = "Temp WO.This work order must be deleted. Useless.";
        tmpWorkOrderGR.insert();


        allWorkOrdersGR.setValue("stc_blueprint", tmpWorkOrderGR.getValue("stc_blueprint"));
        allWorkOrdersGR.updateMultiple();

        // Delete temporary objects
        var deleteTmpWorkOrderGR = new GlideRecord(this.WORK_ORDER_TABLE);
        deleteTmpWorkOrderGR.addEncodedQuery("asset=" + tmpDeviceGR.sys_id.toString() + "^");
        deleteTmpWorkOrderGR.query();
        deleteTmpWorkOrderGR.deleteMultiple();

        var deleteTmpDeviceGR = new GlideRecord(this.DEVICE_TABLE);
        deleteTmpDeviceGR.get(tmpDeviceGR.sys_id.toString() + "");
        deleteTmpDeviceGR.deleteRecord();
    },
};