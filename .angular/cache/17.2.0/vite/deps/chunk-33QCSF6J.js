import {
  _isNumberValue,
  coerceBooleanProperty,
  coerceCssPixelValue
} from "./chunk-42SIO26Z.js";
import {
  TemplateRef,
  isDevMode
} from "./chunk-3CFXHCEH.js";
import {
  isObservable
} from "./chunk-GFVJDENN.js";
import {
  Subject,
  from,
  of,
  take
} from "./chunk-LOA65BFQ.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-environments.mjs
var environment = {
  isTestMode: false
};

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-logger.mjs
var record = {};
var PREFIX = "[NG-ZORRO]:";
function notRecorded(...args) {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), "");
  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}
function consoleCommonBehavior(consoleFunc, ...args) {
  if (environment.isTestMode || isDevMode() && notRecorded(...args)) {
    consoleFunc(...args);
  }
}
var warn = (...args) => consoleCommonBehavior((...arg) => console.warn(PREFIX, ...arg), ...args);

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-util.mjs
function isNotNil(value) {
  return typeof value !== "undefined" && value !== null;
}
function isNil(value) {
  return typeof value === "undefined" || value === null;
}
function isNonEmptyString(value) {
  return typeof value === "string" && value !== "";
}
function isTemplateRef(value) {
  return value instanceof TemplateRef;
}
function toBoolean(value) {
  return coerceBooleanProperty(value);
}
function toNumber(value, fallbackValue = 0) {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}
function toCssPixel(value) {
  return coerceCssPixelValue(value);
}
function valueFunctionProp(prop, ...args) {
  return typeof prop === "function" ? prop(...args) : prop;
}
function propDecoratorFactory(name, fallback) {
  function propDecorator(target, propName, originalDescriptor) {
    const privatePropName = `$$__zorroPropDecorator__${propName}`;
    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
    }
    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });
    return {
      get() {
        return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
      },
      set(value) {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(fallback(value));
        }
        this[privatePropName] = fallback(value);
      }
    };
  }
  return propDecorator;
}
function InputBoolean() {
  return propDecoratorFactory("InputBoolean", toBoolean);
}
function InputNumber(fallbackValue) {
  return propDecoratorFactory("InputNumber", (value) => toNumber(value, fallbackValue));
}
function getElementOffset(elem) {
  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 };
  }
  const rect = elem.getBoundingClientRect();
  const win = elem.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}
function isTouchEvent(event) {
  return event.type.startsWith("touch");
}
function getEventPosition(event) {
  return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}
function isPromise(obj) {
  return !!obj && typeof obj.then === "function" && typeof obj.catch === "function";
}
function isNumberFinite(value) {
  return typeof value === "number" && isFinite(value);
}
function toDecimal(value, decimal) {
  return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}
function sum(input, initial = 0) {
  return input.reduce((previous, current) => previous + current, initial);
}
var isBrowser = typeof window !== "undefined";
var isFirefox = isBrowser && window.mozInnerScreenX != null;
function inNextTick() {
  const timer = new Subject();
  Promise.resolve().then(() => timer.next());
  return timer.pipe(take(1));
}
function wrapIntoObservable(value) {
  if (isObservable(value)) {
    return value;
  }
  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }
  return of(value);
}
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var MARK_KEY = `rc-util-key`;
function getMark({ mark } = {}) {
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector("head");
  return head || document.body;
}
function injectCSS(css, options = {}) {
  if (!canUseDom()) {
    return null;
  }
  const styleNode = document.createElement("style");
  if (options.cspNonce) {
    styleNode.nonce = options.cspNonce;
  }
  styleNode.innerHTML = css;
  const container = getContainer(options);
  const { firstChild } = container;
  if (options.prepend && container.prepend) {
    container.prepend(styleNode);
  } else if (options.prepend && firstChild) {
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
var containerCache = /* @__PURE__ */ new Map();
function findExistNode(key, option = {}) {
  const container = getContainer(option);
  return Array.from(containerCache.get(container)?.children || []).find((node) => node.tagName === "STYLE" && node.getAttribute(getMark(option)) === key);
}
function updateCSS(css, key, options = {}) {
  const container = getContainer(options);
  if (!containerCache.has(container)) {
    const placeholderStyle = injectCSS("", options);
    const { parentNode } = placeholderStyle;
    containerCache.set(container, parentNode);
    parentNode.removeChild(placeholderStyle);
  }
  const existNode = findExistNode(key, options);
  if (existNode) {
    if (options.cspNonce && existNode.nonce !== options.cspNonce) {
      existNode.nonce = options.cspNonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  const newNode = injectCSS(css, options);
  newNode?.setAttribute(getMark(options), key);
  return newNode;
}
function getStatusClassNames(prefixCls, status, hasFeedback) {
  return {
    [`${prefixCls}-status-success`]: status === "success",
    [`${prefixCls}-status-warning`]: status === "warning",
    [`${prefixCls}-status-error`]: status === "error",
    [`${prefixCls}-status-validating`]: status === "validating",
    [`${prefixCls}-has-feedback`]: hasFeedback
  };
}

export {
  environment,
  PREFIX,
  warn,
  isNotNil,
  isNil,
  isNonEmptyString,
  isTemplateRef,
  toBoolean,
  toNumber,
  toCssPixel,
  valueFunctionProp,
  InputBoolean,
  InputNumber,
  getElementOffset,
  isTouchEvent,
  getEventPosition,
  isPromise,
  isNumberFinite,
  toDecimal,
  sum,
  inNextTick,
  wrapIntoObservable,
  canUseDom,
  updateCSS,
  getStatusClassNames
};
//# sourceMappingURL=chunk-33QCSF6J.js.map
