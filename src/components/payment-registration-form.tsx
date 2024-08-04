"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAddPayment } from "@/hooks/mutations/use-add-payment";
import { cn } from "@/utils/shadcn";
import { Label, User } from "@/utils/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  text: z.string().min(1),
  date: z.date(),
  costKr: z.preprocess((val) => {
    if (typeof val === "number") return val;

    if (typeof val !== "string") return;

    const parsedValue = parseFloat(val);
    if (isNaN(parsedValue)) return;

    return parsedValue;
  }, z.number().min(0)),
  labelId: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

type PaymentRegistrationFormProps = {
  userId: User["externalId"];
  labels: Label[];
};

export function PaymentRegistrationForm({
  labels,
  userId,
}: PaymentRegistrationFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      date: new Date(),
      costKr: 0,
      labelId: "",
    },
  });

  const { mutate: addPayment, isPending } = useAddPayment();

  const { toast } = useToast();

  function onSubmit(values: FormValues) {
    let labelId: number | null = parseInt(values.labelId);

    if (labelId === -1) {
      labelId = null;
    }

    addPayment(
      {
        text: values.text,
        date: values.date,
        ownerId: userId,
        costNorwegianØre: values.costKr * 100,
        labelId,
      },
      {
        onSuccess: () => {
          toast({
            title: "Payment registered",
          });

          form.reset({
            text: "",
            date: new Date(),
            costKr: 0,
            labelId: "",
          });
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="house rent" {...field} />
              </FormControl>
              <FormDescription>
                The thing that you spent money on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>The date when you payed</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="costKr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost Kr</FormLabel>
              <FormControl>
                <Input
                  placeholder="10.00"
                  type="number"
                  step="any"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The amount of money in kr that you spent
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="labelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a label" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="-1">No label</SelectItem>
                  {labels.map((label) => (
                    <SelectItem key={label.id} value={label.id.toString()}>
                      {label.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
