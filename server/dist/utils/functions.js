"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderID = void 0;
const uuid_1 = require("uuid");
const node_global_storage_1 = require("node-global-storage");
const orderID = () => {
    const id = `INV-${(0, uuid_1.v4)().replace(/-/g, "").substring(0, 12).toUpperCase()}`;
    (0, node_global_storage_1.setValue)("order_id", id);
    return id;
};
exports.orderID = orderID;
