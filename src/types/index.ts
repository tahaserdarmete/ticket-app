export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: "Bağlantı Sorunu" | "Donanım Sorunu" | "Yazılım Sorunu" | "Diğer";
  priority: number;
  progress: number;
  status: "Beklemede" | "Devam Ediyor" | "Çözüldü";
  createdAt: string;
  updatedAt: string;
}

export type TicketsResponse = Promise<{
  message: string;
  tickets: Ticket[];
}>;

export type TicketResponse = Promise<{
  message: string;
  ticket: Ticket;
}>;

export type MessageResponse = Promise<{
  message: string;
}>;

export type StatisticsResponse = Promise<{
  message: string;
  totalTickets: number;
  ticketsByCategory: {
    "Donanım Sorunu": number;
    "Yazılım Sorunu": number;
    "Bağlantı Sorunu": number;
  };
  ticketsByStatus: {
    Çözüldü: number;
    "Devam Ediyor": number;
    Beklemede: number;
  };
  completionRate: number;
  criticalTickets: number;
  averagePriority: number;
  now: string;
  today: string;
  ticketCreatedToday: number;
  ticketCreatedLast7Days: number;
  ticketCreatedThisMonth: number;
  ticketCreatedThisYear: number;
}>;
