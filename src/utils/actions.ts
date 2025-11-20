"use server";

import Ticket from "@/app/api/models/ticket";
import connectMongo from "./connect-mongo";
import {redirect} from "next/navigation";

// server actions içerisinde olduğumuz için doğrudan veritabanı sorguları bile yapabiliyoruz.
export async function createTicketAction(formData: FormData) {
  // formdata içerisinden bilgileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // api isteği at (opsiyonel şuan kullanmıyoruz)
  // veritabanına bağlan
  await connectMongo();

  //   yeni ticket oluştur
  await Ticket.create(rawData);

  // tickets sayfasına yönlendir
  redirect("/tickets");
}

export async function updateTicketAction(formData: FormData) {
  // güncellenecek elemanın ıd'si
  const id = formData.get("id");

  // formdata içerisinden bilgileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // veritabanına bağlan
  await connectMongo();

  // ticket'ı veritabanında güncelle
  await Ticket.findByIdAndUpdate(id, rawData);

  //ticket sayfasına yönlendir
  redirect("/tickets");
}
