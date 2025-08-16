"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section id="recommender" className="w-ful py-12 md:py-24 lg:py-32 bg-primary/5">
      <div className="container px-4 md:px-6">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit mb-2">
                <Wand2 className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-3xl text-primary">AI Event Planner</CardTitle>
            <CardDescription className="md:text-lg">
              Not sure which package to choose? Let our AI guide you to the perfect celebration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recommendation ? (
                <div>
                    <Alert className="border-accent bg-accent/5 text-accent-foreground">
                        <Sparkles className="h-4 w-4 text-accent" />
                        <AlertTitle className="text-accent font-headline text-lg">Our Recommendation For You!</AlertTitle>
                        <AlertDescription className="text-foreground/90 whitespace-pre-wrap">
                            {recommendation.packageSuggestion}
                        </AlertDescription>
                    </Alert>
                    <Button onClick={handleReset} variant="outline" className="w-full mt-4">
                        Start Over
                    </Button>
                </div>
            ) : (
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="numberOfPeople"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Guests</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="e.g., 2" {...field} />
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
                                <FormLabel>Type of Event</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
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
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPending}>
                            {isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
                            ) : (
                            <><Wand2 className="mr-2 h-4 w-4" /> Get Recommendation</>
                            )}
                        </Button>
                        </form>
                    </Form>
                </div>
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
