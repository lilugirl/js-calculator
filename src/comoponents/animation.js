import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);

import { data } from "./data";
import { css } from "./css";
console.log("css", css);

class Animation {
  btnPress(dom) {
    if (dom) {
      dom.classList.remove("mousedown");
      dom.classList.add("mousedown");
    } else {
      console.error("cannot find dom");
    }
  }

  btnRelease(dom) {
    if (dom) {
      dom.classList.remove("mousedown");
    } else {
      console.error("cannot find dom");
    }
  }

  switchTheme({
    toDark = true,
    swtichBtnDuration = 0,
    backgroundDuration = 0,
    calculatorDuration = 0,
    calculatorDelay = 0,
  }) {
    if (toDark) {
      this.switchBtnToDark({ duration: swtichBtnDuration });
      this.backgroundToDark({ duration: backgroundDuration });
      this.calculatorToDark({
        duration: calculatorDuration,
        delay: calculatorDelay,
      });
    } else {
      this.switchBtnToLight({ duration: swtichBtnDuration });
      this.backgroundToLight({ duration: backgroundDuration });
      this.calculatorToLight({
        duration: calculatorDuration,
        delay: calculatorDelay,
      });
    }
  }

  switchBtnToDark({ tween = gsap.timeline(), duration = 0 }) {
    tween.to("#moon", {
      duration,
      ease: "power2",
      y: 40,
      opacity: 0,
      display: "none",
    });
    tween.to("#sun", {
      duration: 0,
      ease: "power2",
      y: -40,
      opacity: 0,
      display: "none",
    });
    tween.to("#sun", {
      duration,
      ease: "power2",
      y: 0,
      opacity: 1,
      display: "block",
    });
  }
  backgroundToDark({ tween = gsap.timeline(), duration = 0 }) {
    tween.to("body", { duration, background: css.darkPrimaryColor });
  }

  calculatorBtnGroundToDark({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = `#${btnInfo.id}`;
    let background = css.darkSpanBackgroundLinear;
    switch (btnInfo.id) {
      case "clear":
        background = css.clearDeepColor;
        break;
      case "delete":
        background = css.deleteDeepColor;
        break;
      case "equal":
        background = css.equalDeepColor;
    }
    tween.to(id, { duration, delay, background });
  }

  calculatorBtnBeforeToDark({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = CSSRulePlugin.getRule(`#${btnInfo.id}::before`);
    tween.to(id, {
      duration,
      delay,
      color: css.darkTextColor,
      textShadow: css.darkTextShadow,
      background: css.darkSpanBackgroundLinear,
      boxShadow:css.darkSpanBeforeBoxShadow,
      borderTop:css.darkSpanBeforeBorder,
      borderBottom:css.darkSpanBeforeBorder,
      borderLeft:css.darkSpanBeforeBorder
    });
  }

  calculatorBtnToDark({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    data.orderList
      .slice()
      .reverse()
      .forEach((btnInfo, index) => {
        this.calculatorBtnGroundToDark({
          btnInfo,
          duration,
          delay: index * delay,
        });
        this.calculatorBtnBeforeToDark({
          btnInfo,
          duration,
          delay: index * delay,
        });
      });
  }

  calculatorBackgroundToDark({ tween = gsap.timeline(), duration }) {
    tween.to(".calculator", {
      duration,
      boxShadow: css.darkCalculatorBgShadow,
    });
  }
  calculatorToDark({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    this.calculatorBackgroundToDark({ tween, duration });
    this.calculatorBtnToDark({ tween, duration, delay });
  }

  switchBtnToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to("#sun", {
      duration,
      ease: "power2",
      y: 40,
      opacity: 0,
      display: "none",
    });
    tween.to("#moon", {
      duration: 0,
      ease: "power2",
      y: -40,
      opacity: 0,
      display: "none",
    });
    tween.to("#moon", {
      duration,
      ease: "power2",
      y: 0,
      opacity: 1,
      display: "block",
    });
  }
  backgroundToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to("body", { duration, background: css.lightPrimaryColor });
  }

  calculatorBtnGroundToLight({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = `#${btnInfo.id}`;
    let background = css.lightSpanBackgroundLinear;
    switch (btnInfo.id) {
      case "clear":
        background = css.clearColor;
        break;
      case "delete":
        background = css.deleteColor;
        break;
      case "equal":
        background = css.equalColor;
    }
    tween.to(id, { duration, delay, background });
  }

  calculatorBtnBeforeToLight({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = CSSRulePlugin.getRule(`#${btnInfo.id}::before`);
    console.log("id", id);
    tween.to(id, {
      duration,
      delay,
      color: css.lightTextColor,
      textShadow: css.lightTextShadow,
      background: css.lightSpanBackgroundLinear,
      boxShadow:css.lightSpanBeforeBoxShadow,
      borderTop:css.lightSpanBeforeBorder,
      borderBottom:css.lightSpanBeforeBorder,
      borderLeft:css.lightSpanBeforeBorder
    });
  }

  calculatorBtnToLight({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    data.orderList.forEach((btnInfo, index) => {
      this.calculatorBtnGroundToLight({
        btnInfo,
        duration,
        delay: index * delay,
      });
      this.calculatorBtnBeforeToLight({
        btnInfo,
        duration,
        delay: index * delay,
      });
    });
  }

  calculatorBackgroundToLight({ tween = gsap.timeline(), duration }) {
    tween.to("body", { duration, background: css.lightPrimaryColor });
  }
  calculatorToLight({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    this.calculatorBackgroundToLight({ tween, duration });
    this.calculatorBtnToLight({ tween, duration, delay });
  }
}

const animation = new Animation();
export { animation };
