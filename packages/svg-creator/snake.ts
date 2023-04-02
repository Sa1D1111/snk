// import { getSnakeLength, snakeToCells } from "@snk/types/snake";
// import type { Snake } from "@snk/types/snake";
// import type { Point } from "@snk/types/point";
// import { h } from "./xml-utils";
// import { createAnimation } from "./css-utils";

// export type Options = {
//   colorSnake: string;
//   sizeCell: number;
//   sizeDot: number;
// };

// const lerp = (k: number, a: number, b: number) => (1 - k) * a + k * b;




// // support for custome head,tail,body color
// //export const createSnake = (
// //   chain: Snake[],
// //   { sizeCell, sizeDot }: Options,
// //   duration: number
// // ) => {
// //   const snakeN = chain[0] ? getSnakeLength(chain[0]) : 0;

// //   const snakeParts: Point[][] = Array.from({ length: snakeN }, () => []);

// //   for (const snake of chain) {
// //     const cells = snakeToCells(snake);
// //     for (let i = cells.length; i--; ) snakeParts[i].push(cells[i]);
// //   }

// //   const svgElements = snakeParts.map((_, i, { length }) => {
// //     // compute snake part size
// //     const dMin = sizeDot * 0.8;
// //     const dMax = sizeCell * 0.9;
// //     const iMax = Math.min(4, length);
// //     const u = (1 - Math.min(i, iMax) / iMax) ** 2;
// //     const s = lerp(u, dMin, dMax);

// //     const m = (sizeCell - s) / 2;

// //     const r = Math.min(4.5, (4 * s) / sizeDot);

// //     const isHead = i === 0;
// //     const isTail = i === length - 1;
// //     const isMiddle = i === Math.floor(length / 2);

// //     // let fillColor = '--cs';
// //     // if (isHead || isTail) {
// //     //   fillColor = '#000000'; // Black for head and tail
// //     // } else if (isMiddle) {
// //     //   fillColor = '#FF0000'; // Red for middle body dot
// //     // }


// //     let fillColor = "#FFF";
// //     if (isHead) {
// //   fillColor = "red"; // Red for snake head
// // } else if (isTail) {
// //   fillColor = "black"; // Black for snake tail
// // } else {
// //   fillColor = "white"; // White for snake body
// // }

// //     return h("rect", {
// //       class: `s s${i}`,
// //       x: m.toFixed(1),
// //       y: m.toFixed(1),
// //       width: s.toFixed(1),
// //       height: s.toFixed(1),
// //       rx: r.toFixed(1),
// //       ry: r.toFixed(1),
// //       style: `fill: ${fillColor}`,
// //     });
// //   });




// export const createSnake = (
//   chain: Snake[],
//   { sizeCell, sizeDot }: Options,
//   duration: number
// ) => {
//   const snakeN = chain[0] ? getSnakeLength(chain[0]) : 0;

//   const snakeParts: Point[][] = Array.from({ length: snakeN }, () => []);

//   for (const snake of chain) {
//     const cells = snakeToCells(snake);
//     for (let i = cells.length; i--; ) snakeParts[i].push(cells[i]);
//   }

//   const svgElements = snakeParts.map((_, i, { length }) => {
//     // compute snake part size
//     const dMin = sizeDot * 0.8;
//     const dMax = sizeCell * 0.9;
//     const iMax = Math.min(4, length);
//     const u = (1 - Math.min(i, iMax) / iMax) ** 2;
//     const s = lerp(u, dMin, dMax);

//     const m = (sizeCell - s) / 2;

//     const r = Math.min(4.5, (4 * s) / sizeDot);

//     return h("rect", {
//       class: `s s${i}`,
//       x: m.toFixed(1),
//       y: m.toFixed(1),
//       width: s.toFixed(1),
//       height: s.toFixed(1),
//       rx: r.toFixed(1),
//       ry: r.toFixed(1),
//     });
//   });

//   const transform = ({ x, y }: Point) =>
//     `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;

//   const styles = [
//     `.s{ 
//       shape-rendering: geometricPrecision;
//       fill: var(--cs);
//       animation: none linear ${duration}ms infinite
//     }`,

//     ...snakeParts.map((positions, i) => {
//       const id = `s${i}`;
//       const animationName = id;

//       const keyframes = removeInterpolatedPositions(
//         positions.map((tr, i, { length }) => ({ ...tr, t: i / length }))
//       ).map(({ t, ...p }) => ({ t, style: transform(p) }));

//       return [
//         createAnimation(animationName, keyframes),

//         `.s.${id}{
//           ${transform(positions[0])};
//           animation-name: ${animationName}
//         }`,
//       ];
//     }),
//   ].flat();

//   return { svgElements, styles };
// };




import { getSnakeLength, snakeToCells } from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Point } from "@snk/types/point";
import { h } from "./xml-utils";
import { createAnimation } from "./css-utils";

export type Options = {
  colorSnakeHead: string;
  colorSnakeBody: string;
  colorSnakeTail: string;
  sizeCell: number;
  sizeDot: number;
};

const lerp = (k: number, a: number, b: number) => (1 - k) * a + k * b;

export const createSnake = (
  chain: Snake[],
  { sizeCell, sizeDot, colorSnakeHead, colorSnakeBody, colorSnakeTail }: Options,
  duration: number
) => {
  const snakeN = chain[0] ? getSnakeLength(chain[0]) : 0;

  const snakeParts: Point[][] = Array.from({ length: snakeN }, () => []);

  for (const snake of chain) {
    const cells = snakeToCells(snake);
    for (let i = cells.length; i--; ) snakeParts[i].push(cells[i]);
  }

  const svgElements = snakeParts.map((_, i, { length }) => {
    // compute snake part size
    const dMin = sizeDot * 0.8;
    const dMax = sizeCell * 0.9;
    const iMax = Math.min(4, length);
    const u = (1 - Math.min(i, iMax) / iMax) ** 2;
    const s = lerp(u, dMin, dMax);

    const m = (sizeCell - s) / 2;

    const r = Math.min(4.5, (4 * s) / sizeDot);

    let fillColor = colorSnakeBody;
    if (i === 0) {
      fillColor = colorSnakeHead; // Red for snake head
    } else if (i === length - 1) {
      fillColor = colorSnakeTail; // Black for snake tail
    }

    return h("rect", {
      class: `s s${i}`,
      x: m.toFixed(1),
      y: m.toFixed(1),
      width: s.toFixed(1),
      height: s.toFixed(1),
      rx: r.toFixed(1),
      ry: r.toFixed(1),
      style: `fill: ${fillColor}`,
    });
  });

  const transform = ({ x, y }: Point) =>
    `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;

  const styles = [
    `.s{ 
      shape-rendering: geometricPrecision;
      fill: var(--cs);
      animation: none linear ${duration}ms infinite
    }`,

    ...snakeParts.map((positions, i) => {
      const id = `s${i}`;
      const animationName = id;

      const keyframes = removeInterpolatedPositions(
        positions.map((tr, i, { length }) => ({ ...tr, t: i / length }))
      ).map(({ t, ...p }) => ({ t, style: transform(p) }));

      return [
        createAnimation(animationName, keyframes),

        `.s.${id}{
          ${transform(positions[0])};
          animation-name: ${animationName}
        }`,
      ];
    }),
  ].flat();

  return { svgElements, styles };
};




const removeInterpolatedPositions = <T extends Point>(arr: T[]) =>
  arr.filter((u, i, arr) => {
    if (i - 1 < 0 || i + 1 >= arr.length) return true;

    const a = arr[i - 1];
    const b = arr[i + 1];

    const ex = (a.x + b.x) / 2;
    const ey = (a.y + b.y) / 2;

    // return true;
    return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
  });
