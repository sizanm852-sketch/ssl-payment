import { v4 as uuidv4 } from 'uuid';
import { getValue, setValue } from "node-global-storage"
export const orderID = (): string => {
    const id = `INV-${uuidv4().replace(/-/g, "").substring(0, 12).toUpperCase()}`
    setValue("order_id", id)
    
    return id
}
