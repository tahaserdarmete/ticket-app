"use client";

import {deleteTicket} from "@/utils/service";
import {Trash} from "lucide-react";
import {useRouter} from "next/navigation";
import {FC} from "react";

interface Props {
  id: string;
}
const DeleteButton: FC<Props> = ({id}) => {
  const router = useRouter();
  // butona tıklanınca
  const handleDelete = () => {
    // kullanıcıdan onay al
    if (!confirm("Silmek istediğinize emin misiniz")) return;

    // silme işlemi için api isteği at
    deleteTicket(id)
      // silinen elemanın ekrandan ayrılması için componenti yenile
      .then(() => router.refresh());
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition"
    >
      <Trash className="size-4" />
    </button>
  );
};

export default DeleteButton;
