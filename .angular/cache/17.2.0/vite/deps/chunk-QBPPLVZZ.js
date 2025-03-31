import {
  reqAnimFrame
} from "./chunk-3Z4XHAHP.js";
import {
  environment,
  getEventPosition,
  isTouchEvent
} from "./chunk-BXW7EGDN.js";
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from "./chunk-EWCJVIPH.js";
import {
  MediaMatcher
} from "./chunk-I4UEI3OK.js";
import {
  Platform
} from "./chunk-2CIJKQHJ.js";
import {
  DOCUMENT
} from "./chunk-B62JIAQI.js";
import {
  Inject,
  Injectable,
  NgZone,
  RendererFactory2,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-3CFXHCEH.js";
import {
  Subject,
  auditTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  startWith,
  takeUntil
} from "./chunk-LOA65BFQ.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-services.mjs
var NOOP = () => {
};
var _NzResizeService = class _NzResizeService {
  constructor(ngZone, rendererFactory2) {
    this.ngZone = ngZone;
    this.rendererFactory2 = rendererFactory2;
    this.resizeSource$ = new Subject();
    this.listeners = 0;
    this.disposeHandle = NOOP;
    this.handler = () => {
      this.ngZone.run(() => {
        this.resizeSource$.next();
      });
    };
    this.renderer = this.rendererFactory2.createRenderer(null, null);
  }
  ngOnDestroy() {
    this.handler = NOOP;
  }
  subscribe() {
    this.registerListener();
    return this.resizeSource$.pipe(auditTime(16), finalize(() => this.unregisterListener()));
  }
  unsubscribe() {
    this.unregisterListener();
  }
  registerListener() {
    if (this.listeners === 0) {
      this.ngZone.runOutsideAngular(() => {
        this.disposeHandle = this.renderer.listen("window", "resize", this.handler);
      });
    }
    this.listeners += 1;
  }
  unregisterListener() {
    this.listeners -= 1;
    if (this.listeners === 0) {
      this.disposeHandle();
      this.disposeHandle = NOOP;
    }
  }
};
_NzResizeService.ɵfac = function NzResizeService_Factory(t) {
  return new (t || _NzResizeService)(ɵɵinject(NgZone), ɵɵinject(RendererFactory2));
};
_NzResizeService.ɵprov = ɵɵdefineInjectable({
  token: _NzResizeService,
  factory: _NzResizeService.ɵfac,
  providedIn: "root"
});
var NzResizeService = _NzResizeService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: RendererFactory2
  }], null);
})();
var testSingleRegistry = /* @__PURE__ */ new Map();
var _NzSingletonService = class _NzSingletonService {
  constructor() {
    this._singletonRegistry = /* @__PURE__ */ new Map();
  }
  get singletonRegistry() {
    return environment.isTestMode ? testSingleRegistry : this._singletonRegistry;
  }
  registerSingletonWithKey(key, target) {
    const alreadyHave = this.singletonRegistry.has(key);
    const item = alreadyHave ? this.singletonRegistry.get(key) : this.withNewTarget(target);
    if (!alreadyHave) {
      this.singletonRegistry.set(key, item);
    }
  }
  unregisterSingletonWithKey(key) {
    if (this.singletonRegistry.has(key)) {
      this.singletonRegistry.delete(key);
    }
  }
  getSingletonWithKey(key) {
    return this.singletonRegistry.has(key) ? this.singletonRegistry.get(key).target : null;
  }
  withNewTarget(target) {
    return {
      target
    };
  }
};
_NzSingletonService.ɵfac = function NzSingletonService_Factory(t) {
  return new (t || _NzSingletonService)();
};
_NzSingletonService.ɵprov = ɵɵdefineInjectable({
  token: _NzSingletonService,
  factory: _NzSingletonService.ɵfac,
  providedIn: "root"
});
var NzSingletonService = _NzSingletonService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSingletonService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function getPagePosition(event) {
  const e = getEventPosition(event);
  return {
    x: e.pageX,
    y: e.pageY
  };
}
var _NzDragService = class _NzDragService {
  constructor(rendererFactory2) {
    this.draggingThreshold = 5;
    this.currentDraggingSequence = null;
    this.currentStartingPoint = null;
    this.handleRegistry = /* @__PURE__ */ new Set();
    this.renderer = rendererFactory2.createRenderer(null, null);
  }
  requestDraggingSequence(event) {
    if (!this.handleRegistry.size) {
      this.registerDraggingHandler(isTouchEvent(event));
    }
    if (this.currentDraggingSequence) {
      this.currentDraggingSequence.complete();
    }
    this.currentStartingPoint = getPagePosition(event);
    this.currentDraggingSequence = new Subject();
    return this.currentDraggingSequence.pipe(map((e) => ({
      x: e.pageX - this.currentStartingPoint.x,
      y: e.pageY - this.currentStartingPoint.y
    })), filter((e) => Math.abs(e.x) > this.draggingThreshold || Math.abs(e.y) > this.draggingThreshold), finalize(() => this.teardownDraggingSequence()));
  }
  registerDraggingHandler(isTouch) {
    if (isTouch) {
      this.handleRegistry.add({
        teardown: this.renderer.listen("document", "touchmove", (e) => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.next(e.touches[0] || e.changedTouches[0]);
          }
        })
      });
      this.handleRegistry.add({
        teardown: this.renderer.listen("document", "touchend", () => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
          }
        })
      });
    } else {
      this.handleRegistry.add({
        teardown: this.renderer.listen("document", "mousemove", (e) => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.next(e);
          }
        })
      });
      this.handleRegistry.add({
        teardown: this.renderer.listen("document", "mouseup", () => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
          }
        })
      });
    }
  }
  teardownDraggingSequence() {
    this.currentDraggingSequence = null;
  }
};
_NzDragService.ɵfac = function NzDragService_Factory(t) {
  return new (t || _NzDragService)(ɵɵinject(RendererFactory2));
};
_NzDragService.ɵprov = ɵɵdefineInjectable({
  token: _NzDragService,
  factory: _NzDragService.ɵfac,
  providedIn: "root"
});
var NzDragService = _NzDragService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDragService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }], null);
})();
function easeInOutCubic(t, b, c, d) {
  const cc = c - b;
  let tt = t / (d / 2);
  if (tt < 1) {
    return cc / 2 * tt * tt * tt + b;
  } else {
    return cc / 2 * ((tt -= 2) * tt * tt + 2) + b;
  }
}
var _NzScrollService = class _NzScrollService {
  constructor(ngZone, doc) {
    this.ngZone = ngZone;
    this.doc = doc;
  }
  /** Set the position of the scroll bar of `el`. */
  setScrollTop(el, topValue = 0) {
    if (el === window) {
      this.doc.body.scrollTop = topValue;
      this.doc.documentElement.scrollTop = topValue;
    } else {
      el.scrollTop = topValue;
    }
  }
  /** Get position of `el` against window. */
  getOffset(el) {
    const ret = {
      top: 0,
      left: 0
    };
    if (!el || !el.getClientRects().length) {
      return ret;
    }
    const rect = el.getBoundingClientRect();
    if (rect.width || rect.height) {
      const doc = el.ownerDocument.documentElement;
      ret.top = rect.top - doc.clientTop;
      ret.left = rect.left - doc.clientLeft;
    } else {
      ret.top = rect.top;
      ret.left = rect.left;
    }
    return ret;
  }
  /** Get the position of the scoll bar of `el`. */
  // TODO: remove '| Window' as the fallback already happens here
  getScroll(target, top = true) {
    if (typeof window === "undefined") {
      return 0;
    }
    const method = top ? "scrollTop" : "scrollLeft";
    let result = 0;
    if (this.isWindow(target)) {
      result = target[top ? "pageYOffset" : "pageXOffset"];
    } else if (target instanceof Document) {
      result = target.documentElement[method];
    } else if (target) {
      result = target[method];
    }
    if (target && !this.isWindow(target) && typeof result !== "number") {
      result = (target.ownerDocument || target).documentElement[method];
    }
    return result;
  }
  isWindow(obj) {
    return obj !== null && obj !== void 0 && obj === obj.window;
  }
  /**
   * Scroll `el` to some position with animation.
   *
   * @param containerEl container, `window` by default
   * @param y Scroll to `top`, 0 by default
   */
  scrollTo(containerEl, y = 0, options = {}) {
    const target = containerEl ? containerEl : window;
    const scrollTop = this.getScroll(target);
    const startTime = Date.now();
    const {
      easing,
      callback,
      duration = 450
    } = options;
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      const nextScrollTop = (easing || easeInOutCubic)(time > duration ? duration : time, scrollTop, y, duration);
      if (this.isWindow(target)) {
        target.scrollTo(window.pageXOffset, nextScrollTop);
      } else if (target instanceof HTMLDocument || target.constructor.name === "HTMLDocument") {
        target.documentElement.scrollTop = nextScrollTop;
      } else {
        target.scrollTop = nextScrollTop;
      }
      if (time < duration) {
        reqAnimFrame(frameFunc);
      } else if (typeof callback === "function") {
        this.ngZone.run(callback);
      }
    };
    this.ngZone.runOutsideAngular(() => reqAnimFrame(frameFunc));
  }
};
_NzScrollService.ɵfac = function NzScrollService_Factory(t) {
  return new (t || _NzScrollService)(ɵɵinject(NgZone), ɵɵinject(DOCUMENT));
};
_NzScrollService.ɵprov = ɵɵdefineInjectable({
  token: _NzScrollService,
  factory: _NzScrollService.ɵfac,
  providedIn: "root"
});
var NzScrollService = _NzScrollService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzScrollService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var NzBreakpointEnum;
(function(NzBreakpointEnum2) {
  NzBreakpointEnum2["xxl"] = "xxl";
  NzBreakpointEnum2["xl"] = "xl";
  NzBreakpointEnum2["lg"] = "lg";
  NzBreakpointEnum2["md"] = "md";
  NzBreakpointEnum2["sm"] = "sm";
  NzBreakpointEnum2["xs"] = "xs";
})(NzBreakpointEnum || (NzBreakpointEnum = {}));
var gridResponsiveMap = {
  xs: "(max-width: 575px)",
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1600px)"
};
var siderResponsiveMap = {
  xs: "(max-width: 479.98px)",
  sm: "(max-width: 575.98px)",
  md: "(max-width: 767.98px)",
  lg: "(max-width: 991.98px)",
  xl: "(max-width: 1199.98px)",
  xxl: "(max-width: 1599.98px)"
};
var _NzBreakpointService = class _NzBreakpointService {
  constructor(resizeService, mediaMatcher) {
    this.resizeService = resizeService;
    this.mediaMatcher = mediaMatcher;
    this.destroy$ = new Subject();
    this.resizeService.subscribe().pipe(takeUntil(this.destroy$)).subscribe(() => {
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
  subscribe(breakpointMap, fullMap) {
    if (fullMap) {
      const get = () => this.matchMedia(breakpointMap, true);
      return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged((x, y) => x[0] === y[0]), map((x) => x[1]));
    } else {
      const get = () => this.matchMedia(breakpointMap);
      return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
    }
  }
  matchMedia(breakpointMap, fullMap) {
    let bp = NzBreakpointEnum.md;
    const breakpointBooleanMap = {};
    Object.keys(breakpointMap).map((breakpoint) => {
      const castBP = breakpoint;
      const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
      breakpointBooleanMap[breakpoint] = matched;
      if (matched) {
        bp = castBP;
      }
    });
    if (fullMap) {
      return [bp, breakpointBooleanMap];
    } else {
      return bp;
    }
  }
};
_NzBreakpointService.ɵfac = function NzBreakpointService_Factory(t) {
  return new (t || _NzBreakpointService)(ɵɵinject(NzResizeService), ɵɵinject(MediaMatcher));
};
_NzBreakpointService.ɵprov = ɵɵdefineInjectable({
  token: _NzBreakpointService,
  factory: _NzBreakpointService.ɵfac,
  providedIn: "root"
});
var NzBreakpointService = _NzBreakpointService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzBreakpointService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NzResizeService
  }, {
    type: MediaMatcher
  }], null);
})();
var _NzDestroyService = class _NzDestroyService extends Subject {
  ngOnDestroy() {
    this.next();
    this.complete();
  }
};
_NzDestroyService.ɵfac = /* @__PURE__ */ (() => {
  let ɵNzDestroyService_BaseFactory;
  return function NzDestroyService_Factory(t) {
    return (ɵNzDestroyService_BaseFactory || (ɵNzDestroyService_BaseFactory = ɵɵgetInheritedFactory(_NzDestroyService)))(t || _NzDestroyService);
  };
})();
_NzDestroyService.ɵprov = ɵɵdefineInjectable({
  token: _NzDestroyService,
  factory: _NzDestroyService.ɵfac
});
var NzDestroyService = _NzDestroyService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDestroyService, [{
    type: Injectable
  }], null, null);
})();
var _ImagePreloadService = class _ImagePreloadService {
  constructor(document, platform) {
    this.document = document;
    this.platform = platform;
    this.counter = /* @__PURE__ */ new Map();
    this.linkRefs = /* @__PURE__ */ new Map();
  }
  addPreload(option) {
    if (this.platform.isBrowser) {
      return () => void 0;
    }
    const uniqueKey = `${option.src}${option.srcset}`;
    let currentCount = this.counter.get(uniqueKey) || 0;
    currentCount++;
    this.counter.set(uniqueKey, currentCount);
    if (!this.linkRefs.has(uniqueKey)) {
      const linkNode = this.appendPreloadLink(option);
      this.linkRefs.set(uniqueKey, linkNode);
    }
    return () => {
      if (this.counter.has(uniqueKey)) {
        let count = this.counter.get(uniqueKey);
        count--;
        if (count === 0) {
          const linkNode = this.linkRefs.get(uniqueKey);
          this.removePreloadLink(linkNode);
          this.counter.delete(uniqueKey);
          this.linkRefs.delete(uniqueKey);
        } else {
          this.counter.set(uniqueKey, count);
        }
      }
    };
  }
  appendPreloadLink(option) {
    const linkNode = this.document.createElement("link");
    linkNode.setAttribute("rel", "preload");
    linkNode.setAttribute("as", "image");
    linkNode.setAttribute("href", option.src);
    if (option.srcset) {
      linkNode.setAttribute("imagesrcset", option.srcset);
    }
    this.document.head.appendChild(linkNode);
    return linkNode;
  }
  removePreloadLink(linkNode) {
    if (this.document.head.contains(linkNode)) {
      this.document.head.removeChild(linkNode);
    }
  }
};
_ImagePreloadService.ɵfac = function ImagePreloadService_Factory(t) {
  return new (t || _ImagePreloadService)(ɵɵinject(DOCUMENT), ɵɵinject(Platform));
};
_ImagePreloadService.ɵprov = ɵɵdefineInjectable({
  token: _ImagePreloadService,
  factory: _ImagePreloadService.ɵfac,
  providedIn: "root"
});
var ImagePreloadService = _ImagePreloadService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImagePreloadService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: Platform
  }], null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-animation.mjs
var _AnimationDuration = class _AnimationDuration {
  // Tooltip
};
_AnimationDuration.SLOW = "0.3s";
_AnimationDuration.BASE = "0.2s";
_AnimationDuration.FAST = "0.1s";
var AnimationDuration = _AnimationDuration;
var _AnimationCurves = class _AnimationCurves {
};
_AnimationCurves.EASE_BASE_OUT = "cubic-bezier(0.7, 0.3, 0.1, 1)";
_AnimationCurves.EASE_BASE_IN = "cubic-bezier(0.9, 0, 0.3, 0.7)";
_AnimationCurves.EASE_OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)";
_AnimationCurves.EASE_IN = "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
_AnimationCurves.EASE_IN_OUT = "cubic-bezier(0.645, 0.045, 0.355, 1)";
_AnimationCurves.EASE_OUT_BACK = "cubic-bezier(0.12, 0.4, 0.29, 1.46)";
_AnimationCurves.EASE_IN_BACK = "cubic-bezier(0.71, -0.46, 0.88, 0.6)";
_AnimationCurves.EASE_IN_OUT_BACK = "cubic-bezier(0.71, -0.46, 0.29, 1.46)";
_AnimationCurves.EASE_OUT_CIRC = "cubic-bezier(0.08, 0.82, 0.17, 1)";
_AnimationCurves.EASE_IN_CIRC = "cubic-bezier(0.6, 0.04, 0.98, 0.34)";
_AnimationCurves.EASE_IN_OUT_CIRC = "cubic-bezier(0.78, 0.14, 0.15, 0.86)";
_AnimationCurves.EASE_OUT_QUINT = "cubic-bezier(0.23, 1, 0.32, 1)";
_AnimationCurves.EASE_IN_QUINT = "cubic-bezier(0.755, 0.05, 0.855, 0.06)";
_AnimationCurves.EASE_IN_OUT_QUINT = "cubic-bezier(0.86, 0, 0.07, 1)";
var AnimationCurves = _AnimationCurves;
var collapseMotion = trigger("collapseMotion", [
  state("expanded", style({ height: "*" })),
  state("collapsed", style({ height: 0, overflow: "hidden" })),
  state("hidden", style({ height: 0, overflow: "hidden", borderTopWidth: "0" })),
  transition("expanded => collapsed", animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition("expanded => hidden", animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition("collapsed => expanded", animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition("hidden => expanded", animate(`150ms ${AnimationCurves.EASE_IN_OUT}`))
]);
var treeCollapseMotion = trigger("treeCollapseMotion", [
  transition("* => *", [
    query("nz-tree-node:leave,nz-tree-builtin-node:leave", [
      style({ overflow: "hidden" }),
      stagger(0, [
        animate(`150ms ${AnimationCurves.EASE_IN_OUT}`, style({ height: 0, opacity: 0, "padding-bottom": 0 }))
      ])
    ], {
      optional: true
    }),
    query("nz-tree-node:enter,nz-tree-builtin-node:enter", [
      style({ overflow: "hidden", height: 0, opacity: 0, "padding-bottom": 0 }),
      stagger(0, [
        animate(`150ms ${AnimationCurves.EASE_IN_OUT}`, style({ overflow: "hidden", height: "*", opacity: "*", "padding-bottom": "*" }))
      ])
    ], {
      optional: true
    })
  ])
]);
var fadeMotion = trigger("fadeMotion", [
  transition(":enter", [style({ opacity: 0 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 1 }))]),
  transition(":leave", [style({ opacity: 1 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 0 }))])
]);
var helpMotion = trigger("helpMotion", [
  transition(":enter", [
    style({
      opacity: 0,
      transform: "translateY(-5px)"
    }),
    animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
      opacity: 1,
      transform: "translateY(0)"
    }))
  ]),
  transition(":leave", [
    style({
      opacity: 1,
      transform: "translateY(0)"
    }),
    animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
      opacity: 0,
      transform: "translateY(-5px)"
    }))
  ])
]);
var moveUpMotion = trigger("moveUpMotion", [
  transition("* => enter", [
    style({
      transformOrigin: "0 0",
      transform: "translateY(-100%)",
      opacity: 0
    }),
    animate(`${AnimationDuration.BASE}`, style({
      transformOrigin: "0 0",
      transform: "translateY(0%)",
      opacity: 1
    }))
  ]),
  transition("* => leave", [
    style({
      transformOrigin: "0 0",
      transform: "translateY(0%)",
      opacity: 1
    }),
    animate(`${AnimationDuration.BASE}`, style({
      transformOrigin: "0 0",
      transform: "translateY(-100%)",
      opacity: 0
    }))
  ])
]);
var notificationMotion = trigger("notificationMotion", [
  state("enterRight", style({ opacity: 1, transform: "translateX(0)" })),
  transition("* => enterRight", [style({ opacity: 0, transform: "translateX(5%)" }), animate("100ms linear")]),
  state("enterLeft", style({ opacity: 1, transform: "translateX(0)" })),
  transition("* => enterLeft", [style({ opacity: 0, transform: "translateX(-5%)" }), animate("100ms linear")]),
  state("enterTop", style({ opacity: 1, transform: "translateY(0)" })),
  transition("* => enterTop", [style({ opacity: 0, transform: "translateY(-5%)" }), animate("100ms linear")]),
  state("enterBottom", style({ opacity: 1, transform: "translateY(0)" })),
  transition("* => enterBottom", [style({ opacity: 0, transform: "translateY(5%)" }), animate("100ms linear")]),
  state("leave", style({
    opacity: 0,
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%"
  })),
  transition("* => leave", [
    style({
      opacity: 1,
      transform: "scaleY(1)",
      transformOrigin: "0% 0%"
    }),
    animate("100ms linear")
  ])
]);
var ANIMATION_TRANSITION_IN = `${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_QUINT}`;
var ANIMATION_TRANSITION_OUT = `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_QUINT}`;
var slideMotion = trigger("slideMotion", [
  state("void", style({
    opacity: 0,
    transform: "scaleY(0.8)"
  })),
  state("enter", style({
    opacity: 1,
    transform: "scaleY(1)"
  })),
  transition("void => *", [animate(ANIMATION_TRANSITION_IN)]),
  transition("* => void", [animate(ANIMATION_TRANSITION_OUT)])
]);
var slideAlertMotion = trigger("slideAlertMotion", [
  transition(":leave", [
    style({ opacity: 1, transform: "scaleY(1)", transformOrigin: "0% 0%" }),
    animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT_CIRC}`, style({
      opacity: 0,
      transform: "scaleY(0)",
      transformOrigin: "0% 0%"
    }))
  ])
]);
var zoomBigMotion = trigger("zoomBigMotion", [
  transition("void => active", [
    style({ opacity: 0, transform: "scale(0.8)" }),
    animate(`${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_CIRC}`, style({
      opacity: 1,
      transform: "scale(1)"
    }))
  ]),
  transition("active => void", [
    style({ opacity: 1, transform: "scale(1)" }),
    animate(`${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_CIRC}`, style({
      opacity: 0,
      transform: "scale(0.8)"
    }))
  ])
]);
var zoomBadgeMotion = trigger("zoomBadgeMotion", [
  transition(":enter", [
    style({ opacity: 0, transform: "scale(0) translate(50%, -50%)" }),
    animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_OUT_BACK}`, style({
      opacity: 1,
      transform: "scale(1) translate(50%, -50%)"
    }))
  ]),
  transition(":leave", [
    style({ opacity: 1, transform: "scale(1) translate(50%, -50%)" }),
    animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_BACK}`, style({
      opacity: 0,
      transform: "scale(0) translate(50%, -50%)"
    }))
  ])
]);
var thumbMotion = trigger("thumbMotion", [
  state("from", style({ transform: "translateX({{ transform }}px)", width: "{{ width }}px" }), {
    params: { transform: 0, width: 0 }
  }),
  state("to", style({ transform: "translateX({{ transform }}px)", width: "{{ width }}px" }), {
    params: { transform: 100, width: 0 }
  }),
  transition("from => to", animate(`300ms ${AnimationCurves.EASE_IN_OUT}`))
]);

export {
  NzSingletonService,
  NzBreakpointEnum,
  gridResponsiveMap,
  siderResponsiveMap,
  NzBreakpointService,
  NzDestroyService,
  collapseMotion,
  moveUpMotion,
  slideMotion,
  zoomBigMotion
};
//# sourceMappingURL=chunk-QBPPLVZZ.js.map
