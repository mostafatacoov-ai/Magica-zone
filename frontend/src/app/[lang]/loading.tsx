import MagicaLoader from "@/components/ui/MagicaLoader";

export default function LangLoading({ params }: { params?: { lang?: string } }) {
    return <MagicaLoader fullScreen={true} lang={params?.lang || "en"} />;
}
