// "use client";

import { SelfieCard } from "@/components/selfies/selfie-card.component";
import { API_URL } from "@/config";
import { IResponse, IResponseData, ISelfie, ISelfieData, ISelfiesData } from "@/types";
import Image from "next/image";


async function getHomeSelfies(): Promise<IResponse<ISelfiesData>> {
  // document.cookie = 'timezone=-120; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/';
  // document.cookie = 'PHPSESSID=r9h8qhpp29dm070rscgl9mpkr1; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/';

  const res = await fetch(`${API_URL}/ajax/selfies/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ajax: "1", s: "home"}).toString(),
    credentials: "include",
  });


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const selfiesData = await getHomeSelfies()
  return (
    <main>
      {
        selfiesData.responseData.selfies.map((s: ISelfie) =>
          <SelfieCard key={s.id} selfie={s} />
        )
      }
    </main>
  );
}
