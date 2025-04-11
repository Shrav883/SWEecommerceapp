export const mockOrders = [
    {
    orderId: "ORD-2024-001",
    orderDate: "2024-03-05",
    seats: "E4, E5, E6",
    totalAmount: 75.25,
    status: "Invalid",
    items: [
        { _id: "3001", name: "Antman", quantity: 2, price: 24.00 },
    ],
    shippingAddress: {
        city: "Anytown",
        country: "USA"
    }
    },
    {
    orderId: "ORD-2024-002",
    orderDate: "2024-03-10",
    seats: "D3, D4, D5, D6, D7, D8",
    totalAmount: 120.00,
    status: "Reserved",
    items: [
        { productId: "P201", name: "Lego Avengers", quantity: 5, price: 20.00 },
    ],
    shippingAddress: {
        city: "Somecity",
        country: "Canada"
    }
    },
]