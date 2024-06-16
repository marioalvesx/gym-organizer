"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Exercise } from "../types";
import { upsertExercise } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertExerciseSchema } from "../schema";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { log } from "console";

type ExerciseUpsertSheetProps = {
  children?: React.ReactNode;
  defaultValue?: Exercise;
};

export function ExerciseUpsertSheet({ children }: ExerciseUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertExerciseSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("OLA");

    console.log(data);

    const exerciseData = {
      ...data,
      series: Number(data.series),
      repetitions: Number(data.repetitions),
    } as {
      title: string;
      series?: number;
      repetitions?: number;
      id?: string;
      doneAt?: string;
    };
    console.log(data);
    console.log(exerciseData);

    await upsertExercise(exerciseData);
    router.refresh();

    ref.current?.click();

    toast({
      title: "Exercise saved",
      description: "The exercise has been saved successfully.",
      duration: 5000,
    });
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8 h-screen">
            <SheetHeader>
              <SheetTitle>Exercise Details</SheetTitle>
              <SheetDescription>
                Enter the details of the exercise. You can add a new exercise or
                update an existing one.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Exercise Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter exercise name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the exercise to be performed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the exercise" {...field} />
                  </FormControl>
                  <FormDescription>
                    Detailed description of how the exercise should be
                    performed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="series"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Series</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of series"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repetitions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Repetitions</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of repetitions per series"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto">
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
