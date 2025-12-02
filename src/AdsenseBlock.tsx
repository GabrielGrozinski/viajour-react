import { useEffect, useRef } from "react";

type AdsenseProps = {
  client: string;
  slot: string;
  format?: string;
  responsive?: string;
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdsenseBlock({
  client,
  slot,
  format = "auto",
  responsive = "true"
}: AdsenseProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error("Adsense Error:", err);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
}
