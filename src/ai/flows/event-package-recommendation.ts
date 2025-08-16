// This is an AI-powered tool that suggests the best event package based on user input.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EventPackageRecommendationInputSchema = z.object({
  numberOfPeople: z
    .number()
    .describe('The number of people attending the event.'),
  typeOfEvent: z.string().describe('The type of event being planned.'),
});

export type EventPackageRecommendationInput =
  z.infer<typeof EventPackageRecommendationInputSchema>;

const EventPackageRecommendationOutputSchema = z.object({
  packageSuggestion: z
    .string()
    .describe(
      'The name of the suggested event package (e.g., Couple Nest, Friends Den, or Fam Jam).' + 
      'Also include a short paragraph describing why this package is the best option.'
    ),
});

export type EventPackageRecommendationOutput =
  z.infer<typeof EventPackageRecommendationOutputSchema>;

export async function getEventPackageRecommendation(
  input: EventPackageRecommendationInput
): Promise<EventPackageRecommendationOutput> {
  return eventPackageRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'eventPackageRecommendationPrompt',
  input: {schema: EventPackageRecommendationInputSchema},
  output: {schema: EventPackageRecommendationOutputSchema},
  prompt: `Based on the number of people ({{{numberOfPeople}}}) and the type of event ({{{typeOfEvent}}}), suggest the most suitable event package from the following options: Couple Nest, Friends Den, and Fam Jam. Explain why this package is the best option in a short paragraph.`,
});

const eventPackageRecommendationFlow = ai.defineFlow(
  {
    name: 'eventPackageRecommendationFlow',
    inputSchema: EventPackageRecommendationInputSchema,
    outputSchema: EventPackageRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
