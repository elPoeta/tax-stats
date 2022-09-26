import Link from "next/link";
import { ITaxTypes } from "../../interfaces/ITax";
import { TaxItem } from "./TaxItem";

export const Taxs = ({ taxTypes }: { taxTypes: ITaxTypes[] }) => {
  const getIcon = (id: number): string => {
    switch (id) {
      case 0:
        return "CalendarDaysIcon";
      case 1:
        return "CalculatorIcon";
      case 2:
        return "BeakerIcon";
      case 3:
        return "BanknotesIcon";
      case 4:
        return "FireIcon";
      case 5:
        return "WifiIcon";
      case 6:
        return "BoltIcon";
      case 7:
        return "TicketIcon";
      case 8:
        return "UserIcon";
      case 9:
        return "ShoppingCartIcon";
      default:
        return "CurrencyDollarIcon";
    }
  };
  return (
    <section>
      <h2 className="p-4 text-2xl text-center font-bold">Tax</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:container lg:my-0 lg:mx-auto p-2">
        {taxTypes.map((taxType) => (
          <Link key={taxType.id} href={`/tax/${taxType.id}`}>
            <a>
              <TaxItem name={taxType.name} icon={getIcon(taxType.id)} />
            </a>
          </Link>
        ))}
        <Link key={0} href="/tax/0">
          <a>
            <TaxItem name="All" icon={getIcon(0)} />
          </a>
        </Link>
      </div>
    </section>
  );
};
