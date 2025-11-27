'use server';

/**
 * @fileOverview Summarizes pending leave requests for admins using AI.
 *
 * - summarizeLeaveRequests - A function that summarizes leave requests.
 * - SummarizeLeaveRequestsInput - The input type for the summarizeLeaveRequests function.
 * - SummarizeLeaveRequestsOutput - The return type for the summarizeLeaveRequests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLeaveRequestsInputSchema = z.array(
  z.object({
    userId: z.string().describe('The ID of the user requesting leave.'),
    userName: z.string().describe('The name of the user requesting leave.'),
    startDate: z.string().describe('The start date of the leave request.'),
    endDate: z.string().describe('The end date of the leave request.'),
    reason: z.string().describe('The reason for the leave request.'),
    status: z.literal('Pending').describe('The status of the leave request, which is always Pending.'),
  })
).describe('An array of pending leave requests.');

export type SummarizeLeaveRequestsInput = z.infer<typeof SummarizeLeaveRequestsInputSchema>;

const SummarizeLeaveRequestsOutputSchema = z.object({
  summary: z.string().describe('A summary of the pending leave requests.'),
});

export type SummarizeLeaveRequestsOutput = z.infer<typeof SummarizeLeaveRequestsOutputSchema>;

export async function summarizeLeaveRequests(input: SummarizeLeaveRequestsInput): Promise<SummarizeLeaveRequestsOutput> {
  return summarizeLeaveRequestsFlow(input);
}

const summarizeLeaveRequestsPrompt = ai.definePrompt({
  name: 'summarizeLeaveRequestsPrompt',
  input: {schema: SummarizeLeaveRequestsInputSchema},
  output: {schema: SummarizeLeaveRequestsOutputSchema},
  prompt: `You are an AI assistant helping an admin summarize pending leave requests.

  Given the following leave requests, provide a concise summary of the overall leave situation, highlighting any potential issues or concerns.

  Leave Requests:
  {{#each this}}
  - User: {{userName}} (ID: {{userId}})
    Start Date: {{startDate}}
    End Date: {{endDate}}
    Reason: {{reason}}
  {{/each}}

  Summary:`,
});

const summarizeLeaveRequestsFlow = ai.defineFlow(
  {
    name: 'summarizeLeaveRequestsFlow',
    inputSchema: SummarizeLeaveRequestsInputSchema,
    outputSchema: SummarizeLeaveRequestsOutputSchema,
  },
  async input => {
    const {output} = await summarizeLeaveRequestsPrompt(input);
    return output!;
  }
);
