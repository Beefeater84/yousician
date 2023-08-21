import Background from "@/widgets/header/components/background";
import Container from "@/shared/components/container/Container";
import HeaderSearch from "@/widgets/search/components/headerSearch";

export default function Header() {
  return (
    <header className="relative min-h-[300px] max-h-[none]">
      <Background />
      <Container classes="relative min-h-[300px] flex flex-col items-center justify-center py-4 px-4">
        <div className="text-center pb-[1.86rem]">
          <h1 className="pb-[12px]">NEW SONGS DELIVERED EVERY WEEK</h1>
          <span className="subheading">
            Here are the most recent additions to the Yousician App. Start
            playing today!
          </span>
        </div>
        <div className="h-[100%] max-w-[636px] w-[100%] mx-auto">
          <HeaderSearch />
        </div>
      </Container>
    </header>
  );
}
