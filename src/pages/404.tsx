import Head from "next/head"
import Link from "next/link"

import Bubble from "@/components/thread/Bubble"

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not found · Joud El-Shawa</title>
      </Head>
      <main className="thread thread-short">
        <h1 className="sr-only">Page not found</h1>
        <ol className="run">
          <Bubble tail>
            There&apos;s nothing at this address.{" "}
            <Link href="/">Back to the conversation</Link>
          </Bubble>
        </ol>
      </main>
    </>
  )
}
