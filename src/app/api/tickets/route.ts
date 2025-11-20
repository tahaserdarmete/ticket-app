import connectMongo from "@/utils/connect-mongo";
import {NextResponse as res} from "next/server";
import Ticket, {ITicket} from "../models/ticket";

export async function POST(req: Request) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // İsteğin body kısmındaki veriyi al
    const body = (await req.json()) as ITicket;

    // veritabanına yeni ticket ı kaydet
    const newTicket = await Ticket.create(body);

    // client'a cevap gönder
    return res.json(
      {
        message: "Ticket oluşturuldu",
        ticket: newTicket,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return res.json(
      {
        message: "Ticket oluşturulurken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {status: 400}
    );
  }
}

export async function GET() {
  try {
    // veritabanına bağlan
    await connectMongo();

    // ticket verileri al
    const tickets = await Ticket.find();

    // client'a cevap gönder
    return res.json({
      message: "Ticket verileri alındı",
      tickets,
    });
  } catch (error) {
    return res.json(
      {
        message: "Ticket verileri alınırken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {status: 400}
    );
  }
}
