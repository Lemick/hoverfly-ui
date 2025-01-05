const nativeMax = Math.max;
const nativeMin = Math.min;

type DebounceOptions = {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
};

// biome-ignore lint/suspicious/noExplicitAny:
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: DebounceOptions,
): T & { cancel: () => void; flush: () => ReturnType<T> | undefined } {
  let lastArgs: Parameters<T> | undefined;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let lastThis: any;
  let maxWait: number | undefined;
  let result: ReturnType<T> | undefined;
  let timerId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  // biome-ignore lint/style/noParameterAssign:
  wait = Number(wait) || 0;

  if (typeof options === 'object') {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(Number(options.maxWait) || 0, wait) : undefined;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: number): ReturnType<T> {
    // biome-ignore lint/style/noNonNullAssertion:
    const args = lastArgs!;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    // @ts-ignore
    return result;
  }

  function leadingEdge(time: number): ReturnType<T> | undefined {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, (maxWait || 0) - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait || 0))
    );
  }

  function timerExpired(): void {
    const time = Date.now();
    if (shouldInvoke(time)) {
      trailingEdge(time);
    } else {
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
  }

  function trailingEdge(time: number): ReturnType<T> | undefined {
    timerId = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel(): void {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush(): ReturnType<T> | undefined {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced as T & {
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
  };
}
