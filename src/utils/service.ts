import {
  MessageResponse,
  StatisticsResponse,
  TicketResponse,
  TicketsResponse,
} from "@/types";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

console.log("url", process.env.NEXT_PUBLIC_APP_URL);

export const wait = async (ms = 2000) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};

export const getTickets = async (): TicketsResponse => {
  const rest = await fetch(`${APP_URL}/api/tickets`);

  return rest.json();
};

export const deleteTicket = async (id: string): MessageResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`, {method: "DELETE"});

  return res.json();
};

export const getTicket = async (id: string): TicketResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`);

  return res.json();
};

export const getStatistics = async (): StatisticsResponse => {
  const rest = await fetch(`${APP_URL}/api/statistics`);

  return rest.json();
};
