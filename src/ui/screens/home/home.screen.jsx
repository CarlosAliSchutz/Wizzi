import { Footer } from "../../components/footer/footer.component";
import { Landscape } from "../../components/landscape/landscape.component";
import { Header } from "../../components/header/header.component";
import { Trips } from "../../components/trip/trip.component";

export function HomeScreen() {
  return (
    <main>
      <Landscape />
      <Header />
      <Trips />
      <Footer />
    </main>
  );
}
