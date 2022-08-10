import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import FloaterConfig from "./types/config";

@customElement("floater")
export class Floater extends LitElement {
  /*
   * Define scoped styles right wiuth your component, in plain CSS
   */
  static styles = css`
    :host {
      color: blue;
    }
  `;

  /*
   * Declare reactive properties
   */

  @property()
  data: FloaterConfig['data'] = ['Word', 'Word2'];
  @property()
  containerSelector: FloaterConfig['containerSelector'] = ".section-text-container";
  @property()
  startTransitionTime?: FloaterConfig['startTransitionTime'] = 5000;
  @property()
  stopTransitionTime?: FloaterConfig['stopTransitionTime'] = 500;
  @property()
  transitionName?: FloaterConfig['transitionName'] = "ease-out";
  @property()
  classes?: FloaterConfig['classes'] = ['text-red', 'font-20'];
  @property()
  colors?: FloaterConfig['data'] = ['#000000'];
  @property()
  minTextSize?: FloaterConfig['minTextSize'] = 20;
  @property()
  maxTextSize?: FloaterConfig['maxTextSize'] = 20;
  @property()
  rotation?: FloaterConfig['rotation'] = false;
 

  /*
   * Variables
   */


  /*
   * Functions
   */

  /*
   * Return random number in the range
   * equation used to include starting and ending limit in the range:
   * Math.floor(Math.random() * (n - m + 1)) + m;
   * @param {number} startLimit - starting number for random range
   * @param {number} endLimit - ending number for random range
   * @return {number}
   */
   getRandomNumberInRange(startLimit = 0, endLimit = 0) {
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
