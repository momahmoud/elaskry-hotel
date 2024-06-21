import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => signIn({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success(
        `Welcome back, ${user?.user_metadata?.full_name ?? user?.user?.email}!`
      );
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.error("error", error);
      toast.error(error.message);
    },
  });

  return { login, isLogging };
}
