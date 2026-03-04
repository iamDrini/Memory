export type Theme = "code" | "da" | "foods";

export interface Card {
    id: string;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export const THEME_IMAGES: Record<Theme, string[]> = {
    code: [
        "angular.png",
        "bt.png",
        "css.png",
        "db.png",
        "django.png",
        "firestore.png",
        "git.png",
        "github.png",
        "html.png",
        "js.png",
        "node.png",
        "python.png",
        "react.png",
        "sass.png",
        "terminal.png",
        "ts.png",
        "vs.png",
        "vue.png"
    ],
    da: [
        "arrow.png",
        "bestellapp.png",
        "broc.png",
        "dabubble.png",
        "egg.png",
        "flower.png",
        "hat.png",
        "icon.png",
        "join.png",
        "noodle.png",
        "poke.png",
        "pollo.png",
        "ramen.png",
        "shark.png",
        "sign.png",
        "smiley.png",
        "switch.png",
        "tic.png"
    ],
    foods: [
        "brezel.png",
        "burger.png",
        "chocolate.png",
        "cookie.png",
        "corndog.png",
        "cupcake.png",
        "donut.png",
        "fries.png",
        "icecream.png",
        "pizza.png",
        "pudding.png",
        "sandwich.png",
        "shrimps.png",
        "sushi.png",
        "taco.png",
        "vanilla.png",
        "wings.png",
        "wrap.png"
    ]
};