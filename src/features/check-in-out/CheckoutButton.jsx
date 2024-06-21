import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckout } = useCheckout();
  return (
    <Button
      disabled={isCheckout}
      onClick={() => checkout(bookingId)}
      variation="primary"
      size="small"
    >
      {isCheckout ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
