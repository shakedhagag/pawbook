"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { fetchAdminState } from "../../../store/slicers/adminSlice";

const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

type itemsObj = {
  id: string;
  label: string;
  checked: boolean;
};
const capitalize = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function PagesForm() {
  const dispatch: AppDispatch = useDispatch();
  const [items, setItems] = useState<itemsObj[]>([]);
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: {
      items: ["posts", "edit profile", "friends"],
    },
  });
  useEffect(() => {
    const fetchEnabledPages = async () => {
      const response = await axios.get("http://localhost:3030/admin/pages", {
        withCredentials: true,
      });
      // convert response.data to array of keys
      setItems(
        Object.keys(response.data.pages).map((key) => ({
          id: key,
          label: capitalize(key),
          checked: response.data.pages[key],
        }))
      );
    };
    dispatch(fetchAdminState());
    fetchEnabledPages();
  }, []);
  useEffect(() => {
    form.reset({
      items: items.filter((item) => item.checked).map((item) => item.id),
    });
  }, [items]);

  async function onSubmit(data: DisplayFormValues) {
    try {
      const response = await axios.put("http://localhost:3030/admin/pages", {
        pages: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Pages</FormLabel>
            <FormDescription>
              Select the pages you want to enable.
            </FormDescription>
          </div>
          {items.map((item) => (
            <FormItem
              key={item.id}
              className="flex flex-row items-start space-x-3 space-y-0"
            >
              <FormControl>
                <Checkbox
                  checked={form.watch("items").includes(item.id)}
                  onCheckedChange={(checked) => {
                    const currentValues = form.getValues("items");
                    if (checked && !currentValues.includes(item.id)) {
                      form.setValue("items", [...currentValues, item.id]);
                    } else {
                      form.setValue(
                        "items",
                        currentValues.filter((value) => value !== item.id)
                      );
                    }
                  }}
                />
              </FormControl>
              <FormLabel className="font-normal">{item.label}</FormLabel>
            </FormItem>
          ))}

          <FormMessage />
        </FormItem>
        <Button type="submit">Update Pages</Button>
      </form>
    </Form>
  );
}
