import { gsap } from "gsap";

/*
  Helper provided by GSAP for seamless horizontal looping.
  https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
*/

interface LoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | boolean;
  center?: boolean | string | Element;
  paddingRight?: number | string;
  reversed?: boolean;
  onChange?: (item: HTMLElement, index: number) => void;
}

interface HorizontalTimeline extends gsap.core.Timeline {
  toIndex: (
    index: number,
    vars?: gsap.TweenVars,
  ) => gsap.core.Tween | gsap.core.Timeline;
  closestIndex: (setCurrent?: boolean) => number;
  current: () => number;
  next: (vars?: gsap.TweenVars) => gsap.core.Tween | gsap.core.Timeline;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween | gsap.core.Timeline;
  times: number[];
}

export function horizontalLoop(
  items: Element | Element[] | string,
  config: LoopConfig,
): HorizontalTimeline {
  let timeline: HorizontalTimeline;
  const itemsArray = gsap.utils.toArray(items) as HTMLElement[];
  config = config || {};

  gsap.context(() => {
    const onChange = config.onChange;
    let lastIndex = 0;
    const tl = gsap.timeline({
      repeat: config.repeat,
      onUpdate:
        onChange &&
        function () {
          const i = (tl as unknown as HorizontalTimeline).closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(itemsArray[i], i);
          }
        },
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    }) as HorizontalTimeline;

    const length = itemsArray.length;
    const startX = itemsArray[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const spaceBefore: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    let indexIsDirty = false;
    const center = config.center;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap(typeof config.snap === "number" ? config.snap : 1);
    let timeOffset = 0;
    const container =
      center === true
        ? (itemsArray[0].parentNode as HTMLElement)
        : (gsap.utils.toArray(
            center || itemsArray[0].parentNode,
          )[0] as HTMLElement);
    let totalWidth: number;
    const getTotalWidth = () =>
      itemsArray[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      itemsArray[length - 1].offsetWidth *
        (gsap.getProperty(itemsArray[length - 1], "scaleX") as number) +
      (parseFloat(config.paddingRight as string) || 0);

    const populateWidths = () => {
      let b1 = container.getBoundingClientRect();
      let b2;
      itemsArray.forEach((el, i) => {
        widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) *
            100 +
            (gsap.getProperty(el, "xPercent") as number),
        );
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(itemsArray, {
        xPercent: (i: number) => xPercents[i],
      });
      totalWidth = getTotalWidth();
    };

    let timeWrap: (value: number) => number;
    const populateOffsets = () => {
      timeOffset = center
        ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
        : 0;
      if (center) {
        times.forEach((_, i) => {
          times[i] = timeWrap(
            ((tl.labels["label" + i] as number) || 0) +
              (tl.duration() * widths[i]) / 2 / totalWidth -
              timeOffset,
          );
        });
      }
    };

    const getClosest = (values: number[], value: number, wrap: number) => {
      let i = values.length;
      let closest = 1e10;
      let index = 0;
      let d;
      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) {
          d = wrap - d;
        }
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    };

    const populateTimeline = () => {
      let i, item, curX, distanceToStart, distanceToLoop;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = itemsArray[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop =
          distanceToStart +
          widths[i] * (gsap.getProperty(item, "scaleX") as number);
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0,
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond,
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    };

    const refresh = (deep: boolean) => {
      const progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      if (deep && tl.paused()) {
        tl.time(times[curIndex], true);
      } else {
        tl.progress(progress, true);
      }
    };

    const onResize = () => refresh(true);

    gsap.set(itemsArray, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);

    function toIndex(index: number, vars?: gsap.TweenVars) {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }

    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent?: boolean) => {
      const index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars?: gsap.TweenVars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete && (tl.vars.onReverseComplete as () => void)();
      tl.reverse();
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    if (onChange) {
      onChange(itemsArray[curIndex], curIndex);
    }
    timeline = tl;
    return () => window.removeEventListener("resize", onResize);
  });

  return timeline!;
}
