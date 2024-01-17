function calculateDiscount(cartTotal, quantities) {
    const flat10Discount = cartTotal > 200 ? 10 : 0;
    const bulk5Discount = Math.max(...quantities.map(quantity => Math.max(quantity - 10, 0) * 0.05), 0);
    const bulk10Discount = sum(quantities) > 20 ? 10 : 0;
    let tiered50Discount = 0;

    if (sum(quantities) > 30 && quantities.some(quantity => quantity > 15)) {
        tiered50Discount = sum(quantities.map(quantity => Math.max(quantity - 15, 0) * 0.5));
    }

    const discounts = {
        flat_10_discount: flat10Discount,
        bulk_5_discount: bulk5Discount,
        bulk_10_discount: bulk10Discount,
        tiered_50_discount: tiered50Discount
    };

    const appliedDiscount = Object.keys(discounts).reduce((a, b) => discounts[a] > discounts[b] ? a : b);
    const discountAmount = discounts[appliedDiscount];

    return { appliedDiscount, discountAmount };
}

function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}

function main() {
    const products = { "Product A": 20, "Product B": 40, "Product C": 50 };
    const quantities = [];

    for (const [product, price] of Object.entries(products)) {
        const quantity = parseInt(prompt(`Enter quantity for ${product}: `));
        quantities.push(quantity);
    }

    const giftWraps = Object.keys(products).map(product =>
        prompt(`Is ${product} wrapped as a gift? (yes/no): `).toLowerCase() === 'yes'
    );

    const subtotal = sum(quantities.map((quantity, i) => quantity * Object.values(products)[i]));

    const { appliedDiscount, discountAmount } = calculateDiscount(subtotal, quantities);

    const shippingFee = Math.floor(sum(quantities) / 10) * 5;
    const giftWrapFee = sum(giftWraps);

    const total = subtotal - discountAmount + shippingFee + giftWrapFee;

    for (let i = 0; i < Object.keys(products).length; i++) {
        const product = Object.keys(products)[i];
        console.log(`${product} - Quantity: ${quantities[i]}, Total: ${quantities[i] * Object.values(products)[i]}`);
    }

    console.log(`\nSubtotal: $${subtotal}`);
    console.log(`Discount Applied: ${appliedDiscount}, Amount: $${discountAmount}`);
    console.log(`Shipping Fee: $${shippingFee}`);
    console.log(`Gift Wrap Fee: $${giftWrapFee}\nTotal: $${total}`);
}

main();
