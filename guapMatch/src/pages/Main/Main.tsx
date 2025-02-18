import Carousel from "../../components/carousel/carousel";

const images = [
    { img: "/cat_match_1.svg", text: "Знакомимся" },
    { img: "/catsTolking.svg", text: "Общаемся" },
    { img: "/cattolking_1.svg", text: "Встречаемся" },
    { img: "/catsTolking.svg", text: "Любимся" },
];

export function Main() {
    return (
        <div>
            <Carousel images={images} />
        </div>
    );
}
