"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns"
import { Calendar as CalendarIcon, CheckCircle, Ticket } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  package: z.enum(["Couple Nest", "Friends Den", "Fam Jam"], {required_error: "Please select a package."}),
  date: z.date({ required_error: "A date for your event is required." }),
  message: z.string().optional(),
});


export function BookingForm() {
    const { toast } = useToast();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        }
    });

    async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/send-booking-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    date: values.date.toISOString(), // Convert date to string
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong. Please try again.');
            }

            setSubmitted(true);
            form.reset();
            
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "There was a problem sending your inquiry. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }
    
    if (submitted) {
        return (
            <section id="book" className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <Card className="max-w-2xl mx-auto shadow-xl text-center p-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold text-primary">Thank You!</h2>
                        <p className="text-foreground/80 mt-2">Your booking inquiry has been sent successfully. We will contact you within 24 hours to confirm the details.</p>
                        <Button onClick={() => setSubmitted(false)} className="mt-6">Make Another Inquiry</Button>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section id="book" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <Card className="max-w-7xl mx-auto shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                            <Ticket className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl text-primary">Book Your Celebration</CardTitle>
                        <CardDescription className="md:text-lg">
                            Fill out the form below to inquire about a reservation. We're excited to host you!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl><Input type="tel" placeholder="(123) 456-7890" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="package" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Package</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select a package" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Couple Nest">Couple Nest</SelectItem>
                                                    <SelectItem value="Friends Den">Friends Den</SelectItem>
                                                    <SelectItem value="Fam Jam">Fam Jam</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="date" render={({ field }) => (
                                        <FormItem className="flex flex-col pt-2">
                                            <FormLabel>Preferred Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                            {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Additional Information</FormLabel>
                                        <FormControl><Textarea placeholder="Tell us about your event, any special requests, etc." className="resize-none" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <a href="tel:+918884447958" className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold bg-red-100 hover:bg-red-200 transition-colors rounded-lg px-4 py-2">
                                    Call Now
                                </a>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
