import { getProperties } from "@/components/properties/data";
import { PropertiesView } from "@/components/properties/properties-view";

export default async function PropertiesPage() {
  // TODO: this already awaits getProperties(), so pointing it at a real
  // fetch("/api/properties") call later needs no change here.
  const properties = await getProperties();

  return <PropertiesView properties={properties} />;
}
