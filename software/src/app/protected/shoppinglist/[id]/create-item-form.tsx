"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/use-fetch";
import { Category } from "@prisma/client";

import { getUserRedirect } from "@/lib/client/auth/checkauth";
import { useEffect, useState } from "react";
import { CirclePlus, LoaderCircle } from "lucide-react";

const formSchema = z.object({
  description: z.string().min(1, "An item description must be provided"),
  category: z.string(),
  quantity: z.string().min(1, "A quantity must be provided"),
  categoryId: z.string(),
});

type FetchCategoriesRequest = {
  status: number;
  categories: Category[];
};

type CreateItemFormProps = {
  shoppingListId: number;
};

function CreateItemForm({ shoppingListId }: CreateItemFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      category: "",
      quantity: "1",
      categoryId: "",
    },
  });

  const user = getUserRedirect();

  const fetchCategoriesRequest = useFetch<FetchCategoriesRequest>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/household/${user.householdId}/categories`
  );

  const categories: Category[] | null =
    fetchCategoriesRequest.data?.categories || null;

  useEffect(() => {
    fetchCategoriesRequest.fetchData();
  }, []);

  const [categoryInputDisplayed, setCategoryInputDisplayed] = useState<
    "existing" | "new"
  >("existing");

  const handleTryAgainClick = () => fetchCategoriesRequest.fetchData();

  const handleCreateNewCategoryClick = () => {
    setCategoryInputDisplayed("new");
    form.setValue("categoryId", "");
  };

  const handleChooseExistingCategoryClick = () => {
    setCategoryInputDisplayed("existing");
    form.setValue("category", "");
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter item description here..."
                  {...field}
                />
              </FormControl>

              <FormDescription>
                This is the description of the item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {categoryInputDisplayed === "existing" && (
          <>
            {categories === null ? (
              <div className="space-y-2.5">
                <h2 className="text-sm font-medium leading-none">Category</h2>
                <p className="text-red-600">
                  An error occurred while getting categories.
                </p>
                <Button
                  variant="secondary"
                  disabled={fetchCategoriesRequest.loading}
                  onClick={handleTryAgainClick}
                >
                  Try again
                  {fetchCategoriesRequest.loading && (
                    <LoaderCircle className="animate-spin" />
                  )}
                </Button>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>

                    <div className="flex">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="rounded-r-none">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>

                          <SelectContent>
                            {categories.map(({ id, description }) => (
                              <SelectItem key={id} value={id.toString()}>
                                {description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button
                        type="button"
                        variant="secondary"
                        className="rounded-l-none"
                        onClick={handleCreateNewCategoryClick}
                      >
                        <CirclePlus />
                        Create new
                      </Button>
                    </div>
                    <FormDescription>
                      This is the category the item belongs to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}

        {categoryInputDisplayed === "new" && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter category description here..."
                      {...field}
                      className="rounded-r-none"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-l-none"
                    onClick={handleChooseExistingCategoryClick}
                  >
                    Choose existing
                  </Button>
                </div>
                <FormDescription>
                  This is the description of the category the item belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Quantity"
                  {...field}
                  min="1"
                  max="1000"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreateItemForm;
