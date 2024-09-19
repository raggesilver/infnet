export declare const $: (<E extends HTMLElement>(
  selector: string,
) => {
  el: E | null;
  on(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined,
  ): any;
  html(str: string): any;
  show(): any;
  hide(): any;
}) & {
  /**
   * Create a reactive list.
   *
   * Reactive lists allow you to append items to a list and have them
   * automatically rendered in the DOM.
   *
   * @param root The root element of the list. This must already exist in the
   * DOM.
   * @param key The key to use to identify each item in the list.
   * @param builder A callback that returns an HTMLElement for each item in the
   * list.
   * @param array Initial values to append to the list.
   * @returns A reactive array that you can use to manipulate the list. Keep in
   * mind that the only supported methods are `push`, `unshift`, `pop`, and
   * `splice`. Any other method will not update the DOM.
   */
  reactiveList: <T>(
    root: HTMLElement,
    key: keyof T,
    builder: (item: T, index: number) => HTMLElement,
    array?: T[],
  ) => T[];
};

export {};
