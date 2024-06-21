import { useMutation } from "@tanstack/react-query";
import { signUp as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading: isCreating } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (data) => {
      console.log("data", data);
      toast.success(
        "Account created successfully, Please verify the new account from the user's email address"
      );
    },
    onError: (error) => {
      console.error("error", error);
      toast.error(error.message);
    },
  });

  return { signup, isCreating };
}
