import {FC} from "react";
import {getTickets} from "@/utils/service";
import Card from "@/components/card";

const TicketsGrid: FC = async () => {
  const {tickets} = await getTickets();

  // ticketların benzersiz kategorilerinde oluşan bir dizi
  const categories = [...new Set(tickets.map((ticket) => ticket.category))];

  return (
    <div>
      {categories.map((category, key) => {
        // ekrana basılacak category'nin ticketlerini bul
        const categoryTickets = tickets
          .filter((ticket) => ticket.category === category)
          .sort(
            (b, a) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        return (
          <div key={key} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                {category}
              </h2>

              <span>{categoryTickets.length} ticket</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryTickets.map((ticket) => (
                <Card key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketsGrid;
