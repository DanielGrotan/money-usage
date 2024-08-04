import { createPayment } from "@/api/payment";
import { useMutation } from "@tanstack/react-query";

export function useAddPayment() {
  return useMutation({
    mutationFn: createPayment,
  });
}
