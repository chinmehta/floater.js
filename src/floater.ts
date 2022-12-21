import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import FloaterConfig from "./types/config";

@customElement("floater")
export class Floater extends LitElement {

  /*
   * Declare reactive properties
   */

  @property()
  userInput: FloaterConfig = {
    data: ["Word", "Word2"],
    startTransitionTimeInMs: 5000,
    stopTransitionTimeInMs: 500,
    transitionName: "ease-out",
    containerSelector: ".section-text-container",
    classes: [],
    colors: ["#000"],
    minTextSizeInPx: 20,
    maxTextSizeInPx: 20,
    rotation: false,
  };

  /*
   * Variables
   */
  PARENT_ELEMENT: any = this.querySelector(this.userInput.containerSelector);
  textValuesContainer: Array<any>;
  initialSpaceAvailableForLetter: Array<any>;
  continuousAnimationInterval: any;
  initialSpaceCalculation:boolean = false;
  CLASS_NAME_FOR_FLOAT_ELEMENTS = "floating-text-value";

  /*
   * Functions
   */

  startUntilStop() {
    this.stopTextAnimation();
    this.startTextAnimation();
    this.continuousAnimationInterval = setInterval(() => {
      this.startTextAnimation();
    }, this.userInput.startTransitionTimeInMs * 0.9);
  }

  stopTextAnimation() {
    clearInterval(this.continuousAnimationInterval);
    this.textValuesContainer.map((element) =>
      this.moveTextOrigionalPosition(element)
    );
  }

  /*
   * Get random position in PARENT_CONTAINER for all the element inside to move
   */
  startTextAnimation() {
    this.textValuesContainer.map((element, index) =>
      this.moveTextRandomPosition(element, index)
    );
    this.initialSpaceCalculation = true;
  }

  /*
   * Takes an HTMLElement and moves the element into random position inside PARENT_CONTAINER
   * @param {HTMLElement} element
   * @param {number} index
   */
  moveTextRandomPosition(element: HTMLElement, index: number) {
    const [ELEMENT_Y, ELEMENT_X] = this.getRandomPositionToMove(
      element,
      index
    );

    const rotate =
      (this.getRandomNumberInRange() > 0.5 ? 1 : -1) *
      this.getRandomNumberInRange(0, 360);

    this.userInput.rotation ? (element.style.transform = `rotate(${rotate}deg)`) : "";
    element.style.transition =
      this.userInput.startTransitionTimeInMs + "ms " + this.userInput.transitionName;
    element.style.top = ELEMENT_Y + "px";
    element.style.left = ELEMENT_X + "px";
  }

  /*
   * Moves elements to origional position
   * @param {HTMLElement} - element
   */
  moveTextOrigionalPosition(element: HTMLElement) {
    element.style.transition =
      this.userInput.stopTransitionTimeInMs + "ms " + this.userInput.transitionName;
    element.style.top = "0";
    element.style.left = "0";
    element.style.transform = "rotate(0deg)";
    element.style.position = "relative";
  }

  /*
   * Generate and return a random X and Y conrdinate for an HTMLElement
   * @param {HTMLElement} - element
   * @param {number} - index
   * @returns
   */
  getRandomPositionToMove(element: HTMLElement, index: number) {
    this.initialSpaceCalculation
      ? null
      : this.calculateAvailableSpace(element);

    const X_SPACE = this.getRandomNumberInRange(
      this.initialSpaceAvailableForLetter[index].left,
      this.initialSpaceAvailableForLetter[index].right
    );

    const Y_SPACE = this.getRandomNumberInRange(
      this.initialSpaceAvailableForLetter[index].top,
      this.initialSpaceAvailableForLetter[index].bottom
    );

    return [Y_SPACE, X_SPACE];
  }

  /*
   * Calcluate space available for an element
   * Generate and return a random X and Y conrdinate for an HTMLElement
   * add it to a variable to keep track of origional space
   * @param {HTMLElement} element
   */
  calculateAvailableSpace(element: HTMLElement) {
    const positionObj = {
      top: -Math.abs(element.offsetTop - element.offsetHeight),
      right:
        this.PARENT_ELEMENT.offsetWidth -
        element.offsetLeft -
        element.offsetWidth,
      bottom:
        this.PARENT_ELEMENT.offsetHeight -
        element.offsetTop -
        element.offsetHeight,
      left: -Math.abs(element.offsetLeft - element.offsetWidth),
    };
    this.initialSpaceAvailableForLetter.push(positionObj);
  }

  /*
   * Create a span node for word
   * Adding common class name to every node
   * Adding initial styles for alignment
   * Appending node to parent element
   */
  createMovableElementForText(word: string = "") {
    const span = document.createElement("span");
    span.style.transition =
      this.userInput.startTransitionTimeInMs + "ms " + this.userInput.transitionName;
    span.innerHTML = word.replaceAll(" ", "&nbsp");
    // TODO: check for userInput.classes array
    // span.className = this.userInput.classes.push(this.CLASS_NAME_FOR_FLOAT_ELEMENTS).join(" ");
    span.className = this.CLASS_NAME_FOR_FLOAT_ELEMENTS;
    span.style.position = "relative";
    span.style.top = "0";
    span.style.left = "0";
    span.style.fontSize =
      this.getRandomNumberInRange(this.userInput.minTextSizeInPx, this.userInput.maxTextSizeInPx) + "px";
    span.style.color = this.userInput.colors
      ? this.userInput.colors![this.getRandomNumberInRange(0, this.userInput.colors.length - 1)]
      : "#000000";
    span.style.color = "#000000";
    span.style.height = "min-content";
    this.PARENT_ELEMENT.appendChild(span);
  }

  /*
   * Sets container overflow to hidden
   * calls createuserInput.dataWordElements to create a node for every element in array
   * add all created nodes to an container/array
   ** TODO: call this onload of component(after getting data) 
   */
  createMovableListOnLoad() {
    this.PARENT_ELEMENT.style.overflow = "hidden";
    this.userInput.data.map((element) => this.createMovableElementForText(element));
    this.textValuesContainer = Array.from(
      this.querySelectorAll(this.CLASS_NAME_FOR_FLOAT_ELEMENTS)
    );
  }

  /*
   * Return random number in the range
   * equation used to include starting and ending limit in the range:
   * Math.floor(Math.random() * (n - m + 1)) + m;
   * @param {number} startLimit - starting number for random range
   * @param {number} endLimit - ending number for random range
   * @return {number}
   */
  getRandomNumberInRange(startLimit = 0, endLimit = 1) {
    return Math.floor(Math.random() * (endLimit - startLimit + 1)) + startLimit;
  }

  /*
   * Return single dom element from query selector
   * @param {string} selector - html selector
   * @return {Element}
   */
  querySelector(selector: string) {
    return document.querySelector(selector);
  }

  /*
   * Return all matching dom element from query selector all
   * @param {string} selector - html selector
   * @return Array<Element>
   */
  querySelectorAll(selector: string) {
    return document.querySelectorAll(selector);
  }

  /*
   * Render the UI as a function of component state
   */
  render() {
    return html`<p>Hello!</p>`;
  }
}
