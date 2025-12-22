import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <title>Azores Bloom Candles | Velas Natura Artesanais dos Açores</title>
        <meta
          name="description"
          content="Velas artesanais 100% naturais feitas nos Açores. Candles com aromas autênticos da natureza açoriana. Lavanda, eucalipto, oceano. Entrega em Portugal."
        />
        <meta
          name="keywords"
          content="candle azores, velas açores, natura candles, velas naturais, velas artesanais açores"
        />
      </head>

      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
