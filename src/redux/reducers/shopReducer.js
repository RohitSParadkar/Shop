const initialState = [
    {
        id: 0,
        shopName: "The Authentic Corner",
        area: "Thane",
        category: "Grocery",
        openingDate: "1999-05-05",
        closingDate: "2025-05-05"
    },
    {
        id: 1,
        shopName: "Brilliant Boutique",
        area: "Pune",
        category: "Butcher",
        openingDate: "2013-05-05",
        closingDate: "2019-02-05"
    },
    {
        id: 2,
        shopName: "Cartmax",
        area: "Mumbai Suburban",
        category: "Baker",
        openingDate: "2003-05-05",
        closingDate: "2020-02-05"
    },
    {
        id: 3,
        shopName: "More In Your Pockets",
        area: "Nashik",
        category: "Grocery",
        openingDate: "2000-05-05",
        closingDate: "2033-02-05"
    },
    {
        id: 4,
        shopName: "DollarSmart",
        area: "Nagpur",
        category: "Chemist",
        openingDate: "1998-05-05",
        closingDate: "2050-02-05"
    },
    {
        id: 5,
        shopName: "Megaplex",
        area: "Ahmednagar",
        category: "Grocery",
        openingDate: "2000-05-05",
        closingDate: "2018-02-05"
    },
    {
        id: 6,
        shopName: "Fuller Shelf",
        area: "Solapur",
        category: "Baker",
        openingDate: "2011-05-05",
        closingDate: "2012-02-05"
    },
    {
        id: 7,
        shopName: "Shopper's Delight",
        area: "Thane",
        category: "Stationery shop",
        openingDate: "2012-05-05",
        closingDate: "2025-02-05"
    },
];

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SHOP":
            state = [...state, action.payload];
            return state;
        case "UPDATE_SHOP":
            const shopUpdate = state.filter((shop) =>
                shop.id === action.payload.id
                    ? Object.assign(shop, action.payload)
                    : shop
            );
            state = shopUpdate;
            return state;
        case "DELETE_SHOP":
            const shopFilter = state.filter((shop) =>
                shop.id === action.payload ? null : shop
            );
            state = shopFilter;
            return state;
        default:
            return state;
    }
};

export default shopReducer;