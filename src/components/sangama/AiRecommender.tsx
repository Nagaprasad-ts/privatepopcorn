"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getEventPackageRecommendation, type EventPackageRecommendationOutput } from "@/ai/flows/event-package-recommendation";
import { Loader2, Wand2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  numberOfPeople: z.coerce.number().min(1, { message: "At least one person must attend." }).max(50, {message: "For parties larger than 50, please contact us directly."}),
  typeOfEvent: z.string().min(1, { message: "Please select an event type." }),
});

export function AiRecommender() {
  const [isPending, startTransition] = useTransition();
  const [recommendation, setRecommendation] = useState<EventPackageRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfPeople: 2,
      typeOfEvent: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setRecommendation(null);
    startTransition(async () => {
      try {
        const result = await getEventPackageRecommendation(values);
        if (result) {
          setRecommendation(result);
        } else {
          setError("We couldn't generate a recommendation at this time. Please try again.");
        }
      } catch (e) {
          setError("An error occurred. Please try again later.");
      }
    });
  }
  
  const handleReset = () => {
    setRecommendation(null);
    setError(null);
    form.reset();
  }

  return (
    <section id="recommender" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-md text-red-600 font-semibold">AI Planner</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-800">Find Your Perfect Package</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Not sure which package to choose? Let our AI guide you to the perfect celebration.
            </p>
          </div>
        </div>
        
        <Card className="max-w-2xl lg:max-w-4xl mx-auto bg-white border rounded-lg shadow-lg p-6 sm:p-8">
          <CardContent className="p-0">
            {recommendation ? (
                <div className="grid md:grid-cols-2 md:gap-8 items-start">
                    <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-800">Your Request</h3>
                        <div className="mt-4 space-y-2 text-gray-600">
                            <p><strong>Number of Guests:</strong> {form.getValues('numberOfPeople')}</p>
                            <p><strong>Type of Event:</strong> {form.getValues('typeOfEvent')}</p>
                        </div>
                        <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto mt-6">
                            Plan Another Event
                        </Button>
                    </div>
                    <Alert className="border-green-500/50 bg-green-50 text-left mt-6 md:mt-0">
                        <Sparkles className="h-5 w-5 text-green-600" />
                        <AlertTitle className="text-green-800 font-bold text-lg">Here's Our Recommendation!</AlertTitle>
                        <AlertDescription className="text-gray-700 whitespace-pre-wrap mt-2">
                            {recommendation.packageSuggestion}
                        </AlertDescription>
                    </Alert>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="numberOfPeople"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Number of Guests</FormLabel>
                                    <FormControl>
                                    <Input type="number" placeholder="e.g., 2" {...field} className="py-6"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="typeOfEvent"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Type of Event</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="py-6">
                                        <SelectValue placeholder="Select an event type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Anniversary">Anniversary</SelectItem>
                                        <SelectItem value="Birthday Party">Birthday Party</SelectItem>
                                        <SelectItem value="Date Night">Date Night</SelectItem>
                                        <SelectItem value="Family Get-together">Family Get-together</SelectItem>
                                        <SelectItem value="Friends Hangout">Friends Hangout</SelectItem>
                                        <SelectItem value="Proposal">Proposal</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 text-lg" disabled={isPending}>
                            {isPending ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Thinking...</>
                            ) : (
                            <><Wand2 className="mr-2 h-5 w-5" /> Get Recommendation</>
                            )}
                        </Button>
                    </form>
                </Form>
            )}
            {error && !isPending && (
                <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}