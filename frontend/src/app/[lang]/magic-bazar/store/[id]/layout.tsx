import { getKidStores } from "@/lib/bazar/kidStores";

export async function generateStaticParams() {
    const stores = await getKidStores();
    return stores.map(store => ({ id: store.id }));
}

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
