class Order {
    constructor(orderId, productName, quantity) {
        this.orderId = orderId;
        this.productName = productName;
        this.quantity = quantity;
    }

    getOrderId() {
        return this.orderId;
    }

    getProductName() {
        return this.productName;
    }

    getQuantity() {
        return this.quantity;
    }

    setOrderId(orderId) {
        this.orderId = orderId;
    }

    setProductName(productName) {
        this.productName = productName;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

}

module.exports = Order;
