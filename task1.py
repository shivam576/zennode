def calculate_discount(cart_total, quantities):
    flat_10_discount = 10 if cart_total > 200 else 0
    bulk_5_discount = max([(quantity - 10) * 0.05 for quantity in quantities], default=0)
    bulk_10_discount = 10 if sum(quantities) > 20 else 0
    tiered_50_discount = 0

    if sum(quantities) > 30 and any(quantity > 15 for quantity in quantities):
        tiered_50_discount = sum([max(quantity - 15, 0) * 0.5 for quantity in quantities])

    discounts = {
        "flat_10_discount": flat_10_discount,
        "bulk_5_discount": bulk_5_discount,
        "bulk_10_discount": bulk_10_discount,
        "tiered_50_discount": tiered_50_discount
    }

    applied_discount = max(discounts, key=discounts.get)
    discount_amount = discounts[applied_discount]

    return applied_discount, discount_amount


def main():
    products = {"Product A": 20, "Product B": 40, "Product C": 50}
    quantities = []

    for product, price in products.items():
        quantity = int(input(f"Enter quantity for {product}: "))
        quantities.append(quantity)

    gift_wraps = [input(f"Is {product} wrapped as a gift? (yes/no): ").lower() == 'yes' for product in products]

    subtotal = sum([quantities[i] * products[list(products.keys())[i]] for i in range(len(products))])

    applied_discount, discount_amount = calculate_discount(subtotal, quantities)

    shipping_fee = (sum(quantities) // 10) * 5
    gift_wrap_fee = sum(gift_wraps)

    total = subtotal - discount_amount + shipping_fee + gift_wrap_fee

    for i in range(len(products)):
        print(f"{list(products.keys())[i]} - Quantity: {quantities[i]}, Total: {quantities[i] * products[list(products.keys())[i]]}")

    print(f"\nSubtotal: ${subtotal}")
    print(f"Discount Applied: {applied_discount}, Amount: ${discount_amount}")
    print(f"Shipping Fee: ${shipping_fee}")
    print(f"Gift Wrap Fee: ${gift_wrap_fee}")
    print(f"\nTotal: ${total}")


if _name_ == "_main_":
    main()
