import {
  NzTooltipDirective
} from "./chunk-K4F2ZNLP.js";
import {
  NzI18nService
} from "./chunk-FSD4DAVV.js";
import "./chunk-NXAZUMK5.js";
import {
  helpMotion
} from "./chunk-XCYI4HFK.js";
import {
  NzBreakpointService,
  gridResponsiveMap
} from "./chunk-5K5DN6GW.js";
import "./chunk-3Z4XHAHP.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-UZOPNO7X.js";
import {
  NzFormStatusService
} from "./chunk-WCEI55ID.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-564JOTWL.js";
import {
  NzConfigService,
  WithConfig
} from "./chunk-6XPTBKSC.js";
import {
  InputBoolean,
  isNotNil,
  toBoolean
} from "./chunk-33QCSF6J.js";
import "./chunk-ZCKWQGIE.js";
import "./chunk-6ZDUDDOB.js";
import "./chunk-AGLZ46C2.js";
import "./chunk-FNEROLTK.js";
import {
  AbstractControl,
  FormControlDirective,
  FormControlName,
  NgControl,
  NgModel
} from "./chunk-JGHLFU7K.js";
import "./chunk-EWCJVIPH.js";
import {
  MediaMatcher
} from "./chunk-I4UEI3OK.js";
import {
  Directionality
} from "./chunk-7LVMILBJ.js";
import "./chunk-42SIO26Z.js";
import {
  Platform
} from "./chunk-2CIJKQHJ.js";
import {
  NgClass
} from "./chunk-B62JIAQI.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  Host,
  Input,
  NgModule,
  NgZone,
  Optional,
  Renderer2,
  SkipSelf,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3CFXHCEH.js";
import "./chunk-GFVJDENN.js";
import "./chunk-QOAHSALO.js";
import {
  ReplaySubject,
  Subject,
  Subscription,
  __decorate,
  filter,
  map,
  startWith,
  takeUntil,
  tap
} from "./chunk-LOA65BFQ.js";
import {
  __spreadValues
} from "./chunk-PZQZAEDH.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-grid.mjs
var _NzRowDirective = class _NzRowDirective {
  getGutter() {
    const results = [null, null];
    const gutter = this.nzGutter || 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === "object" && g !== null) {
        results[index] = null;
        Object.keys(gridResponsiveMap).map((screen) => {
          const bp = screen;
          if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
            results[index] = g[bp];
          }
        });
      } else {
        results[index] = Number(g) || null;
      }
    });
    return results;
  }
  setGutterStyle() {
    const [horizontalGutter, verticalGutter] = this.getGutter();
    this.actualGutter$.next([horizontalGutter, verticalGutter]);
    const renderGutter = (name, gutter) => {
      const nativeElement = this.elementRef.nativeElement;
      if (gutter !== null) {
        this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
      }
    };
    renderGutter("margin-left", horizontalGutter);
    renderGutter("margin-right", horizontalGutter);
    renderGutter("margin-top", verticalGutter);
    renderGutter("margin-bottom", verticalGutter);
  }
  constructor(elementRef, renderer, mediaMatcher, ngZone, platform, breakpointService, directionality) {
    this.elementRef = elementRef;
    this.renderer = renderer;
    this.mediaMatcher = mediaMatcher;
    this.ngZone = ngZone;
    this.platform = platform;
    this.breakpointService = breakpointService;
    this.directionality = directionality;
    this.nzAlign = null;
    this.nzJustify = null;
    this.nzGutter = null;
    this.actualGutter$ = new ReplaySubject(1);
    this.dir = "ltr";
    this.destroy$ = new Subject();
  }
  ngOnInit() {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
      this.dir = direction;
    });
    this.setGutterStyle();
  }
  ngOnChanges(changes) {
    if (changes.nzGutter) {
      this.setGutterStyle();
    }
  }
  ngAfterViewInit() {
    if (this.platform.isBrowser) {
      this.breakpointService.subscribe(gridResponsiveMap).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.setGutterStyle();
      });
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
};
_NzRowDirective.ɵfac = function NzRowDirective_Factory(t) {
  return new (t || _NzRowDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(MediaMatcher), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(NzBreakpointService), ɵɵdirectiveInject(Directionality, 8));
};
_NzRowDirective.ɵdir = ɵɵdefineDirective({
  type: _NzRowDirective,
  selectors: [["", "nz-row", ""], ["nz-row"], ["nz-form-item"]],
  hostAttrs: [1, "ant-row"],
  hostVars: 20,
  hostBindings: function NzRowDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-row-top", ctx.nzAlign === "top")("ant-row-middle", ctx.nzAlign === "middle")("ant-row-bottom", ctx.nzAlign === "bottom")("ant-row-start", ctx.nzJustify === "start")("ant-row-end", ctx.nzJustify === "end")("ant-row-center", ctx.nzJustify === "center")("ant-row-space-around", ctx.nzJustify === "space-around")("ant-row-space-between", ctx.nzJustify === "space-between")("ant-row-space-evenly", ctx.nzJustify === "space-evenly")("ant-row-rtl", ctx.dir === "rtl");
    }
  },
  inputs: {
    nzAlign: "nzAlign",
    nzJustify: "nzJustify",
    nzGutter: "nzGutter"
  },
  exportAs: ["nzRow"],
  standalone: true,
  features: [ɵɵNgOnChangesFeature]
});
var NzRowDirective = _NzRowDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRowDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-row],nz-row,nz-form-item",
      exportAs: "nzRow",
      host: {
        class: "ant-row",
        "[class.ant-row-top]": `nzAlign === 'top'`,
        "[class.ant-row-middle]": `nzAlign === 'middle'`,
        "[class.ant-row-bottom]": `nzAlign === 'bottom'`,
        "[class.ant-row-start]": `nzJustify === 'start'`,
        "[class.ant-row-end]": `nzJustify === 'end'`,
        "[class.ant-row-center]": `nzJustify === 'center'`,
        "[class.ant-row-space-around]": `nzJustify === 'space-around'`,
        "[class.ant-row-space-between]": `nzJustify === 'space-between'`,
        "[class.ant-row-space-evenly]": `nzJustify === 'space-evenly'`,
        "[class.ant-row-rtl]": `dir === "rtl"`
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: MediaMatcher
  }, {
    type: NgZone
  }, {
    type: Platform
  }, {
    type: NzBreakpointService
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    nzAlign: [{
      type: Input
    }],
    nzJustify: [{
      type: Input
    }],
    nzGutter: [{
      type: Input
    }]
  });
})();
var _NzColDirective = class _NzColDirective {
  setHostClassMap() {
    const hostClassMap = __spreadValues({
      ["ant-col"]: true,
      [`ant-col-${this.nzSpan}`]: isNotNil(this.nzSpan),
      [`ant-col-order-${this.nzOrder}`]: isNotNil(this.nzOrder),
      [`ant-col-offset-${this.nzOffset}`]: isNotNil(this.nzOffset),
      [`ant-col-pull-${this.nzPull}`]: isNotNil(this.nzPull),
      [`ant-col-push-${this.nzPush}`]: isNotNil(this.nzPush),
      ["ant-col-rtl"]: this.dir === "rtl"
    }, this.generateClass());
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i)) {
        this.renderer.removeClass(this.elementRef.nativeElement, i);
      }
    }
    this.classMap = __spreadValues({}, hostClassMap);
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
        this.renderer.addClass(this.elementRef.nativeElement, i);
      }
    }
  }
  setHostFlexStyle() {
    this.hostFlexStyle = this.parseFlex(this.nzFlex);
  }
  parseFlex(flex) {
    if (typeof flex === "number") {
      return `${flex} ${flex} auto`;
    } else if (typeof flex === "string") {
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
    }
    return flex;
  }
  generateClass() {
    const listOfSizeInputName = ["nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"];
    const listClassMap = {};
    listOfSizeInputName.forEach((name) => {
      const sizeName = name.replace("nz", "").toLowerCase();
      if (isNotNil(this[name])) {
        if (typeof this[name] === "number" || typeof this[name] === "string") {
          listClassMap[`ant-col-${sizeName}-${this[name]}`] = true;
        } else {
          const embedded = this[name];
          const prefixArray = ["span", "pull", "push", "offset", "order"];
          prefixArray.forEach((prefix) => {
            const prefixClass = prefix === "span" ? "-" : `-${prefix}-`;
            listClassMap[`ant-col-${sizeName}${prefixClass}${embedded[prefix]}`] = embedded && isNotNil(embedded[prefix]);
          });
        }
      }
    });
    return listClassMap;
  }
  constructor(elementRef, nzRowDirective, renderer, directionality) {
    this.elementRef = elementRef;
    this.nzRowDirective = nzRowDirective;
    this.renderer = renderer;
    this.directionality = directionality;
    this.classMap = {};
    this.destroy$ = new Subject();
    this.hostFlexStyle = null;
    this.dir = "ltr";
    this.nzFlex = null;
    this.nzSpan = null;
    this.nzOrder = null;
    this.nzOffset = null;
    this.nzPush = null;
    this.nzPull = null;
    this.nzXs = null;
    this.nzSm = null;
    this.nzMd = null;
    this.nzLg = null;
    this.nzXl = null;
    this.nzXXl = null;
  }
  ngOnInit() {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
      this.dir = direction;
      this.setHostClassMap();
    });
    this.setHostClassMap();
    this.setHostFlexStyle();
  }
  ngOnChanges(changes) {
    this.setHostClassMap();
    const {
      nzFlex
    } = changes;
    if (nzFlex) {
      this.setHostFlexStyle();
    }
  }
  ngAfterViewInit() {
    if (this.nzRowDirective) {
      this.nzRowDirective.actualGutter$.pipe(takeUntil(this.destroy$)).subscribe(([horizontalGutter, verticalGutter]) => {
        const renderGutter = (name, gutter) => {
          const nativeElement = this.elementRef.nativeElement;
          if (gutter !== null) {
            this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
          }
        };
        renderGutter("padding-left", horizontalGutter);
        renderGutter("padding-right", horizontalGutter);
        renderGutter("padding-top", verticalGutter);
        renderGutter("padding-bottom", verticalGutter);
      });
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
};
_NzColDirective.ɵfac = function NzColDirective_Factory(t) {
  return new (t || _NzColDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NzRowDirective, 9), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(Directionality, 8));
};
_NzColDirective.ɵdir = ɵɵdefineDirective({
  type: _NzColDirective,
  selectors: [["", "nz-col", ""], ["nz-col"], ["nz-form-control"], ["nz-form-label"]],
  hostVars: 2,
  hostBindings: function NzColDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵstyleProp("flex", ctx.hostFlexStyle);
    }
  },
  inputs: {
    nzFlex: "nzFlex",
    nzSpan: "nzSpan",
    nzOrder: "nzOrder",
    nzOffset: "nzOffset",
    nzPush: "nzPush",
    nzPull: "nzPull",
    nzXs: "nzXs",
    nzSm: "nzSm",
    nzMd: "nzMd",
    nzLg: "nzLg",
    nzXl: "nzXl",
    nzXXl: "nzXXl"
  },
  exportAs: ["nzCol"],
  standalone: true,
  features: [ɵɵNgOnChangesFeature]
});
var NzColDirective = _NzColDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzColDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-col],nz-col,nz-form-control,nz-form-label",
      exportAs: "nzCol",
      host: {
        "[style.flex]": "hostFlexStyle"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NzRowDirective,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    nzFlex: [{
      type: Input
    }],
    nzSpan: [{
      type: Input
    }],
    nzOrder: [{
      type: Input
    }],
    nzOffset: [{
      type: Input
    }],
    nzPush: [{
      type: Input
    }],
    nzPull: [{
      type: Input
    }],
    nzXs: [{
      type: Input
    }],
    nzSm: [{
      type: Input
    }],
    nzMd: [{
      type: Input
    }],
    nzLg: [{
      type: Input
    }],
    nzXl: [{
      type: Input
    }],
    nzXXl: [{
      type: Input
    }]
  });
})();
var _NzGridModule = class _NzGridModule {
};
_NzGridModule.ɵfac = function NzGridModule_Factory(t) {
  return new (t || _NzGridModule)();
};
_NzGridModule.ɵmod = ɵɵdefineNgModule({
  type: _NzGridModule,
  imports: [NzColDirective, NzRowDirective],
  exports: [NzColDirective, NzRowDirective]
});
_NzGridModule.ɵinj = ɵɵdefineInjector({});
var NzGridModule = _NzGridModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzGridModule, [{
    type: NgModule,
    args: [{
      imports: [NzColDirective, NzRowDirective],
      exports: [NzColDirective, NzRowDirective]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-form.mjs
var _c0 = ["*"];
function NzFormControlComponent_Conditional_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.innerTip);
  }
}
var _c1 = (a0) => [a0];
var _c2 = (a0) => ({
  $implicit: a0
});
function NzFormControlComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4)(1, "div", 5);
    ɵɵtemplate(2, NzFormControlComponent_Conditional_3_ng_container_2_Template, 2, 1, "ng-container", 6);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("@helpMotion", void 0);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c1, "ant-form-item-explain-" + ctx_r0.status));
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.innerTip)("nzStringTemplateOutletContext", ɵɵpureFunction1(6, _c2, ctx_r0.validateControl));
  }
}
function NzFormControlComponent_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r3.nzExtra);
  }
}
function NzFormControlComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵtemplate(1, NzFormControlComponent_Conditional_4_ng_container_1_Template, 2, 1, "ng-container", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r1.nzExtra);
  }
}
function NzFormLabelComponent_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "span", 3);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const tooltipIconType_r2 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzType", tooltipIconType_r2)("nzTheme", ctx_r1.tooltipIcon.theme);
  }
}
function NzFormLabelComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 1);
    ɵɵtemplate(1, NzFormLabelComponent_Conditional_2_ng_container_1_Template, 2, 2, "ng-container", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("nzTooltipTitle", ctx_r0.nzTooltipTitle);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.tooltipIcon.type);
  }
}
var _NzFormItemComponent = class _NzFormItemComponent {
  setWithHelpViaTips(value) {
    this.withHelpClass = value;
    this.cdr.markForCheck();
  }
  setStatus(status) {
    this.status = status;
    this.cdr.markForCheck();
  }
  setHasFeedback(hasFeedback) {
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
  }
  constructor(cdr) {
    this.cdr = cdr;
    this.status = "";
    this.hasFeedback = false;
    this.withHelpClass = false;
    this.destroy$ = new Subject();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
};
_NzFormItemComponent.ɵfac = function NzFormItemComponent_Factory(t) {
  return new (t || _NzFormItemComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
};
_NzFormItemComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzFormItemComponent,
  selectors: [["nz-form-item"]],
  hostAttrs: [1, "ant-form-item"],
  hostVars: 12,
  hostBindings: function NzFormItemComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-form-item-has-success", ctx.status === "success")("ant-form-item-has-warning", ctx.status === "warning")("ant-form-item-has-error", ctx.status === "error")("ant-form-item-is-validating", ctx.status === "validating")("ant-form-item-has-feedback", ctx.hasFeedback && ctx.status)("ant-form-item-with-help", ctx.withHelpClass);
    }
  },
  exportAs: ["nzFormItem"],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function NzFormItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var NzFormItemComponent = _NzFormItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormItemComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-item",
      exportAs: "nzFormItem",
      preserveWhitespaces: false,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "ant-form-item",
        "[class.ant-form-item-has-success]": 'status === "success"',
        "[class.ant-form-item-has-warning]": 'status === "warning"',
        "[class.ant-form-item-has-error]": 'status === "error"',
        "[class.ant-form-item-is-validating]": 'status === "validating"',
        "[class.ant-form-item-has-feedback]": "hasFeedback && status",
        "[class.ant-form-item-with-help]": "withHelpClass"
      },
      template: ` <ng-content></ng-content> `,
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], null);
})();
var NZ_CONFIG_MODULE_NAME = "form";
var DefaultTooltipIcon = {
  type: "question-circle",
  theme: "outline"
};
var _NzFormDirective = class _NzFormDirective {
  getInputObservable(changeType) {
    return this.inputChanges$.pipe(filter((changes) => changeType in changes), map((value) => value[changeType]));
  }
  constructor(nzConfigService, directionality) {
    this.nzConfigService = nzConfigService;
    this.directionality = directionality;
    this._nzModuleName = NZ_CONFIG_MODULE_NAME;
    this.nzLayout = "horizontal";
    this.nzNoColon = false;
    this.nzAutoTips = {};
    this.nzDisableAutoTips = false;
    this.nzTooltipIcon = DefaultTooltipIcon;
    this.nzLabelAlign = "right";
    this.nzLabelWrap = false;
    this.dir = "ltr";
    this.destroy$ = new Subject();
    this.inputChanges$ = new Subject();
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
      this.dir = direction;
    });
  }
  ngOnChanges(changes) {
    this.inputChanges$.next(changes);
  }
  ngOnDestroy() {
    this.inputChanges$.complete();
    this.destroy$.next(true);
    this.destroy$.complete();
  }
};
_NzFormDirective.ɵfac = function NzFormDirective_Factory(t) {
  return new (t || _NzFormDirective)(ɵɵdirectiveInject(NzConfigService), ɵɵdirectiveInject(Directionality, 8));
};
_NzFormDirective.ɵdir = ɵɵdefineDirective({
  type: _NzFormDirective,
  selectors: [["", "nz-form", ""]],
  hostAttrs: [1, "ant-form"],
  hostVars: 8,
  hostBindings: function NzFormDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-form-horizontal", ctx.nzLayout === "horizontal")("ant-form-vertical", ctx.nzLayout === "vertical")("ant-form-inline", ctx.nzLayout === "inline")("ant-form-rtl", ctx.dir === "rtl");
    }
  },
  inputs: {
    nzLayout: "nzLayout",
    nzNoColon: "nzNoColon",
    nzAutoTips: "nzAutoTips",
    nzDisableAutoTips: "nzDisableAutoTips",
    nzTooltipIcon: "nzTooltipIcon",
    nzLabelAlign: "nzLabelAlign",
    nzLabelWrap: "nzLabelWrap"
  },
  exportAs: ["nzForm"],
  standalone: true,
  features: [ɵɵNgOnChangesFeature]
});
var NzFormDirective = _NzFormDirective;
__decorate([WithConfig(), InputBoolean()], NzFormDirective.prototype, "nzNoColon", void 0);
__decorate([WithConfig()], NzFormDirective.prototype, "nzAutoTips", void 0);
__decorate([InputBoolean()], NzFormDirective.prototype, "nzDisableAutoTips", void 0);
__decorate([WithConfig()], NzFormDirective.prototype, "nzTooltipIcon", void 0);
__decorate([WithConfig(), InputBoolean()], NzFormDirective.prototype, "nzLabelWrap", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-form]",
      exportAs: "nzForm",
      host: {
        class: "ant-form",
        "[class.ant-form-horizontal]": `nzLayout === 'horizontal'`,
        "[class.ant-form-vertical]": `nzLayout === 'vertical'`,
        "[class.ant-form-inline]": `nzLayout === 'inline'`,
        "[class.ant-form-rtl]": `dir === 'rtl'`
      },
      standalone: true
    }]
  }], () => [{
    type: NzConfigService
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    nzLayout: [{
      type: Input
    }],
    nzNoColon: [{
      type: Input
    }],
    nzAutoTips: [{
      type: Input
    }],
    nzDisableAutoTips: [{
      type: Input
    }],
    nzTooltipIcon: [{
      type: Input
    }],
    nzLabelAlign: [{
      type: Input
    }],
    nzLabelWrap: [{
      type: Input
    }]
  });
})();
var _NzFormControlComponent = class _NzFormControlComponent {
  get disableAutoTips() {
    return this.nzDisableAutoTips !== "default" ? toBoolean(this.nzDisableAutoTips) : this.nzFormDirective?.nzDisableAutoTips;
  }
  set nzHasFeedback(value) {
    this._hasFeedback = toBoolean(value);
    this.nzFormStatusService.formStatusChanges.next({
      status: this.status,
      hasFeedback: this._hasFeedback
    });
    if (this.nzFormItemComponent) {
      this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
    }
  }
  get nzHasFeedback() {
    return this._hasFeedback;
  }
  set nzValidateStatus(value) {
    if (value instanceof AbstractControl || value instanceof NgModel) {
      this.validateControl = value;
      this.validateString = null;
      this.watchControl();
    } else if (value instanceof FormControlName) {
      this.validateControl = value.control;
      this.validateString = null;
      this.watchControl();
    } else {
      this.validateString = value;
      this.validateControl = null;
      this.setStatus();
    }
  }
  watchControl() {
    this.validateChanges.unsubscribe();
    if (this.validateControl && this.validateControl.statusChanges) {
      this.validateChanges = this.validateControl.statusChanges.pipe(startWith(null), takeUntil(this.destroyed$)).subscribe(() => {
        if (!this.disableAutoTips) {
          this.updateAutoErrorTip();
        }
        this.setStatus();
        this.cdr.markForCheck();
      });
    }
  }
  setStatus() {
    this.status = this.getControlStatus(this.validateString);
    this.innerTip = this.getInnerTip(this.status);
    this.nzFormStatusService.formStatusChanges.next({
      status: this.status,
      hasFeedback: this.nzHasFeedback
    });
    if (this.nzFormItemComponent) {
      this.nzFormItemComponent.setWithHelpViaTips(!!this.innerTip);
      this.nzFormItemComponent.setStatus(this.status);
    }
  }
  getControlStatus(validateString) {
    let status;
    if (validateString === "warning" || this.validateControlStatus("INVALID", "warning")) {
      status = "warning";
    } else if (validateString === "error" || this.validateControlStatus("INVALID")) {
      status = "error";
    } else if (validateString === "validating" || validateString === "pending" || this.validateControlStatus("PENDING")) {
      status = "validating";
    } else if (validateString === "success" || this.validateControlStatus("VALID")) {
      status = "success";
    } else {
      status = "";
    }
    return status;
  }
  validateControlStatus(validStatus, statusType) {
    if (!this.validateControl) {
      return false;
    } else {
      const {
        dirty,
        touched,
        status
      } = this.validateControl;
      return (!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status === validStatus);
    }
  }
  getInnerTip(status) {
    switch (status) {
      case "error":
        return !this.disableAutoTips && this.autoErrorTip || this.nzErrorTip || null;
      case "validating":
        return this.nzValidatingTip || null;
      case "success":
        return this.nzSuccessTip || null;
      case "warning":
        return this.nzWarningTip || null;
      default:
        return null;
    }
  }
  updateAutoErrorTip() {
    if (this.validateControl) {
      const errors = this.validateControl.errors || {};
      let autoErrorTip = "";
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          autoErrorTip = errors[key]?.[this.localeId] ?? this.nzAutoTips?.[this.localeId]?.[key] ?? this.nzAutoTips.default?.[key] ?? this.nzFormDirective?.nzAutoTips?.[this.localeId]?.[key] ?? this.nzFormDirective?.nzAutoTips.default?.[key];
        }
        if (!!autoErrorTip) {
          break;
        }
      }
      this.autoErrorTip = autoErrorTip;
    }
  }
  subscribeAutoTips(observable) {
    observable?.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (!this.disableAutoTips) {
        this.updateAutoErrorTip();
        this.setStatus();
        this.cdr.markForCheck();
      }
    });
  }
  constructor(nzFormItemComponent, cdr, i18n, nzFormDirective, nzFormStatusService) {
    this.nzFormItemComponent = nzFormItemComponent;
    this.cdr = cdr;
    this.nzFormDirective = nzFormDirective;
    this.nzFormStatusService = nzFormStatusService;
    this._hasFeedback = false;
    this.validateChanges = Subscription.EMPTY;
    this.validateString = null;
    this.destroyed$ = new Subject();
    this.status = "";
    this.validateControl = null;
    this.innerTip = null;
    this.nzAutoTips = {};
    this.nzDisableAutoTips = "default";
    this.subscribeAutoTips(i18n.localeChange.pipe(tap((locale) => this.localeId = locale.locale)));
    this.subscribeAutoTips(this.nzFormDirective?.getInputObservable("nzAutoTips"));
    this.subscribeAutoTips(this.nzFormDirective?.getInputObservable("nzDisableAutoTips").pipe(filter(() => this.nzDisableAutoTips === "default")));
  }
  ngOnChanges(changes) {
    const {
      nzDisableAutoTips,
      nzAutoTips,
      nzSuccessTip,
      nzWarningTip,
      nzErrorTip,
      nzValidatingTip
    } = changes;
    if (nzDisableAutoTips || nzAutoTips) {
      this.updateAutoErrorTip();
      this.setStatus();
    } else if (nzSuccessTip || nzWarningTip || nzErrorTip || nzValidatingTip) {
      this.setStatus();
    }
  }
  ngOnInit() {
    this.setStatus();
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngAfterContentInit() {
    if (!this.validateControl && !this.validateString) {
      if (this.defaultValidateControl instanceof FormControlDirective) {
        this.nzValidateStatus = this.defaultValidateControl.control;
      } else {
        this.nzValidateStatus = this.defaultValidateControl;
      }
    }
  }
};
_NzFormControlComponent.ɵfac = function NzFormControlComponent_Factory(t) {
  return new (t || _NzFormControlComponent)(ɵɵdirectiveInject(NzFormItemComponent, 9), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NzI18nService), ɵɵdirectiveInject(NzFormDirective, 8), ɵɵdirectiveInject(NzFormStatusService));
};
_NzFormControlComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzFormControlComponent,
  selectors: [["nz-form-control"]],
  contentQueries: function NzFormControlComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, NgControl, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.defaultValidateControl = _t.first);
    }
  },
  hostAttrs: [1, "ant-form-item-control"],
  inputs: {
    nzSuccessTip: "nzSuccessTip",
    nzWarningTip: "nzWarningTip",
    nzErrorTip: "nzErrorTip",
    nzValidatingTip: "nzValidatingTip",
    nzExtra: "nzExtra",
    nzAutoTips: "nzAutoTips",
    nzDisableAutoTips: "nzDisableAutoTips",
    nzHasFeedback: "nzHasFeedback",
    nzValidateStatus: "nzValidateStatus"
  },
  exportAs: ["nzFormControl"],
  standalone: true,
  features: [ɵɵProvidersFeature([NzFormStatusService]), ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 5,
  vars: 2,
  consts: [[1, "ant-form-item-control-input"], [1, "ant-form-item-control-input-content"], ["class", "ant-form-item-explain ant-form-item-explain-connected"], ["class", "ant-form-item-extra"], [1, "ant-form-item-explain", "ant-form-item-explain-connected"], ["role", "alert", 3, "ngClass"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [1, "ant-form-item-extra"], [4, "nzStringTemplateOutlet"]],
  template: function NzFormControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0)(1, "div", 1);
      ɵɵprojection(2);
      ɵɵelementEnd()();
      ɵɵtemplate(3, NzFormControlComponent_Conditional_3_Template, 3, 8, "div", 2)(4, NzFormControlComponent_Conditional_4_Template, 2, 1, "div", 3);
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵconditional(3, ctx.innerTip ? 3 : -1);
      ɵɵadvance();
      ɵɵconditional(4, ctx.nzExtra ? 4 : -1);
    }
  },
  dependencies: [NgClass, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  data: {
    animation: [helpMotion]
  },
  changeDetection: 0
});
var NzFormControlComponent = _NzFormControlComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormControlComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-control",
      exportAs: "nzFormControl",
      preserveWhitespaces: false,
      animations: [helpMotion],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div class="ant-form-item-control-input">
      <div class="ant-form-item-control-input-content">
        <ng-content></ng-content>
      </div>
    </div>
    @if (innerTip) {
      <div @helpMotion class="ant-form-item-explain ant-form-item-explain-connected">
        <div role="alert" [ngClass]="['ant-form-item-explain-' + status]">
          <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{
            innerTip
          }}</ng-container>
        </div>
      </div>
    }

    @if (nzExtra) {
      <div class="ant-form-item-extra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    }
  `,
      providers: [NzFormStatusService],
      host: {
        class: "ant-form-item-control"
      },
      imports: [NgClass, NzOutletModule],
      standalone: true
    }]
  }], () => [{
    type: NzFormItemComponent,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: NzI18nService
  }, {
    type: NzFormDirective,
    decorators: [{
      type: Optional
    }]
  }, {
    type: NzFormStatusService
  }], {
    defaultValidateControl: [{
      type: ContentChild,
      args: [NgControl, {
        static: false
      }]
    }],
    nzSuccessTip: [{
      type: Input
    }],
    nzWarningTip: [{
      type: Input
    }],
    nzErrorTip: [{
      type: Input
    }],
    nzValidatingTip: [{
      type: Input
    }],
    nzExtra: [{
      type: Input
    }],
    nzAutoTips: [{
      type: Input
    }],
    nzDisableAutoTips: [{
      type: Input
    }],
    nzHasFeedback: [{
      type: Input
    }],
    nzValidateStatus: [{
      type: Input
    }]
  });
})();
function toTooltipIcon(value) {
  const icon = typeof value === "string" ? {
    type: value
  } : value;
  return __spreadValues(__spreadValues({}, DefaultTooltipIcon), icon);
}
var _NzFormLabelComponent = class _NzFormLabelComponent {
  set nzNoColon(value) {
    this.noColon = toBoolean(value);
  }
  get nzNoColon() {
    return this.noColon !== "default" ? this.noColon : this.nzFormDirective?.nzNoColon;
  }
  set nzTooltipIcon(value) {
    this._tooltipIcon = toTooltipIcon(value);
  }
  // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
  get tooltipIcon() {
    return this._tooltipIcon !== "default" ? this._tooltipIcon : toTooltipIcon(this.nzFormDirective?.nzTooltipIcon || DefaultTooltipIcon);
  }
  set nzLabelAlign(value) {
    this.labelAlign = value;
  }
  get nzLabelAlign() {
    return this.labelAlign !== "default" ? this.labelAlign : this.nzFormDirective?.nzLabelAlign || "right";
  }
  set nzLabelWrap(value) {
    this.labelWrap = toBoolean(value);
  }
  get nzLabelWrap() {
    return this.labelWrap !== "default" ? this.labelWrap : this.nzFormDirective?.nzLabelWrap;
  }
  constructor(cdr, nzFormDirective) {
    this.cdr = cdr;
    this.nzFormDirective = nzFormDirective;
    this.nzRequired = false;
    this.noColon = "default";
    this._tooltipIcon = "default";
    this.labelAlign = "default";
    this.labelWrap = "default";
    this.destroy$ = new Subject();
    if (this.nzFormDirective) {
      this.nzFormDirective.getInputObservable("nzNoColon").pipe(filter(() => this.noColon === "default"), takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzTooltipIcon").pipe(filter(() => this._tooltipIcon === "default"), takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzLabelAlign").pipe(filter(() => this.labelAlign === "default"), takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzLabelWrap").pipe(filter(() => this.labelWrap === "default"), takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
};
_NzFormLabelComponent.ɵfac = function NzFormLabelComponent_Factory(t) {
  return new (t || _NzFormLabelComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NzFormDirective, 12));
};
_NzFormLabelComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzFormLabelComponent,
  selectors: [["nz-form-label"]],
  hostAttrs: [1, "ant-form-item-label"],
  hostVars: 4,
  hostBindings: function NzFormLabelComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-form-item-label-left", ctx.nzLabelAlign === "left")("ant-form-item-label-wrap", ctx.nzLabelWrap);
    }
  },
  inputs: {
    nzFor: "nzFor",
    nzRequired: "nzRequired",
    nzNoColon: "nzNoColon",
    nzTooltipTitle: "nzTooltipTitle",
    nzTooltipIcon: "nzTooltipIcon",
    nzLabelAlign: "nzLabelAlign",
    nzLabelWrap: "nzLabelWrap"
  },
  exportAs: ["nzFormLabel"],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 3,
  vars: 6,
  consts: [["class", "ant-form-item-tooltip", "nz-tooltip", "", 3, "nzTooltipTitle"], ["nz-tooltip", "", 1, "ant-form-item-tooltip", 3, "nzTooltipTitle"], [4, "nzStringTemplateOutlet"], ["nz-icon", "", 3, "nzType", "nzTheme"]],
  template: function NzFormLabelComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "label");
      ɵɵprojection(1);
      ɵɵtemplate(2, NzFormLabelComponent_Conditional_2_Template, 2, 2, "span", 0);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassProp("ant-form-item-no-colon", ctx.nzNoColon)("ant-form-item-required", ctx.nzRequired);
      ɵɵattribute("for", ctx.nzFor);
      ɵɵadvance(2);
      ɵɵconditional(2, ctx.nzTooltipTitle ? 2 : -1);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzTooltipDirective, NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
});
var NzFormLabelComponent = _NzFormLabelComponent;
__decorate([InputBoolean()], NzFormLabelComponent.prototype, "nzRequired", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormLabelComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-label",
      exportAs: "nzFormLabel",
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
      @if (nzTooltipTitle) {
        <span class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
          <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
            <span nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme"></span>
          </ng-container>
        </span>
      }
    </label>
  `,
      host: {
        class: "ant-form-item-label",
        "[class.ant-form-item-label-left]": `nzLabelAlign === 'left'`,
        "[class.ant-form-item-label-wrap]": `nzLabelWrap`
      },
      imports: [NzOutletModule, NzTooltipDirective, NzIconModule],
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: NzFormDirective,
    decorators: [{
      type: Optional
    }, {
      type: SkipSelf
    }]
  }], {
    nzFor: [{
      type: Input
    }],
    nzRequired: [{
      type: Input
    }],
    nzNoColon: [{
      type: Input
    }],
    nzTooltipTitle: [{
      type: Input
    }],
    nzTooltipIcon: [{
      type: Input
    }],
    nzLabelAlign: [{
      type: Input
    }],
    nzLabelWrap: [{
      type: Input
    }]
  });
})();
var _NzFormSplitComponent = class _NzFormSplitComponent {
};
_NzFormSplitComponent.ɵfac = function NzFormSplitComponent_Factory(t) {
  return new (t || _NzFormSplitComponent)();
};
_NzFormSplitComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzFormSplitComponent,
  selectors: [["nz-form-split"]],
  hostAttrs: [1, "ant-form-split"],
  exportAs: ["nzFormSplit"],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function NzFormSplitComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var NzFormSplitComponent = _NzFormSplitComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormSplitComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-split",
      exportAs: "nzFormSplit",
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: ` <ng-content></ng-content> `,
      host: {
        class: "ant-form-split"
      },
      standalone: true
    }]
  }], null, null);
})();
var _NzFormTextComponent = class _NzFormTextComponent {
};
_NzFormTextComponent.ɵfac = function NzFormTextComponent_Factory(t) {
  return new (t || _NzFormTextComponent)();
};
_NzFormTextComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzFormTextComponent,
  selectors: [["nz-form-text"]],
  hostAttrs: [1, "ant-form-text"],
  exportAs: ["nzFormText"],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function NzFormTextComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var NzFormTextComponent = _NzFormTextComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormTextComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-text",
      exportAs: "nzFormText",
      preserveWhitespaces: false,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      template: ` <ng-content></ng-content> `,
      host: {
        class: "ant-form-text"
      },
      standalone: true
    }]
  }], null, null);
})();
var _NzFormModule = class _NzFormModule {
};
_NzFormModule.ɵfac = function NzFormModule_Factory(t) {
  return new (t || _NzFormModule)();
};
_NzFormModule.ɵmod = ɵɵdefineNgModule({
  type: _NzFormModule,
  imports: [NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent],
  exports: [NzGridModule, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent]
});
_NzFormModule.ɵinj = ɵɵdefineInjector({
  imports: [NzFormLabelComponent, NzFormControlComponent, NzGridModule]
});
var NzFormModule = _NzFormModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormModule, [{
    type: NgModule,
    args: [{
      imports: [NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent],
      exports: [NzGridModule, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent]
    }]
  }], null, null);
})();
export {
  DefaultTooltipIcon,
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule,
  NzFormSplitComponent,
  NzFormTextComponent
};
//# sourceMappingURL=ng-zorro-antd_form.js.map
