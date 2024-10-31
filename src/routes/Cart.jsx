import { useCart } from "./cart/card-context"; // Adjust the import path if needed
import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Cart() {
  const { cartItems } = useCart();

  return (
    <div className="cart-container p-[16px]">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Product: ${item.skuCode}`}
                secondary={
                  <>
                    <div>Color: {item.color}</div>
                    <div>Size: {item.size}</div>
                    <div>Quantity: {item.quantity}</div>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
