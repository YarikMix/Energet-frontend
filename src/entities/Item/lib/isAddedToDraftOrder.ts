import { T_Order } from "entities/Order/model/types/Order.ts";

export const isAddedToDraftOrder = (order: T_Order, item_id: number) => {
    if (!order) {
        return false;
    }

    return order.items.find((i) => i.id == item_id) !== undefined;
};
