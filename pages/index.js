import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";
import EventContract from "../components/EventContract";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Event Organizer</title>
        <meta name="description" content="EventContract" />
      </Head>
      <Header />
      <EventContract />
      <Footer />
    </div>
  );
}
