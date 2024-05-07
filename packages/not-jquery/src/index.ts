type NotNullOrUndefined<T> = Exclude<T, undefined | null>;

export const $ = <E extends Element>(selector: string) => {
  const el = document.querySelector<E>(selector);

  const onn = el?.addEventListener.bind(el);

  return {
    el,
    on(...args: Parameters<NotNullOrUndefined<typeof onn>>) {
      onn?.(...args);
      return this;
    },
  };
};
