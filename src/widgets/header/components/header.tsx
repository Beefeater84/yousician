import Background from "@/widgets/header/components/background";
import Container from "@/shared/components/container/Container";
import HeaderSearch from "@/widgets/search/components/headerSearch";

export default function Header({ startSearch }) {
  return (
    <header className="relative min-h-[261px] tablet:min-h-[300px] max-h-[none]">
      <Background />
      <Container
        classes="
            relative
            min-h-[261px]
            tablet:min-h-[300px]
            flex
            flex-col
            items-center
            justify-center
            py-[1.3rem]
            px-[1.3rem]
            tablet:py-4
            tablet:px-4"
      >
        <div className="text-center pb-[0.86rem] tablet:pb-[1.86rem]">
          <h1 className="pb-[12px]">NEW SONGS DELIVERED EVERY WEEK</h1>
          <span className="subheading">
            Here are the most recent additions to the Yousician App. Start
            playing today!
          </span>
        </div>
        <div className="h-[100%] max-w-[636px] w-[100%] mx-auto">
          <HeaderSearch startSearch={startSearch} />
        </div>
      </Container>
    </header>
  );
}
