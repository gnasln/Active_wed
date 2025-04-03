import {
  NzOptionComponent,
  NzSelectComponent,
  NzSelectModule
} from "./chunk-OMVDI6PN.js";
import {
  NzI18nService
} from "./chunk-FSD4DAVV.js";
import "./chunk-WCEI55ID.js";
import "./chunk-NXAZUMK5.js";
import "./chunk-XCYI4HFK.js";
import {
  NzBreakpointEnum,
  NzBreakpointService,
  gridResponsiveMap
} from "./chunk-5K5DN6GW.js";
import "./chunk-3Z4XHAHP.js";
import "./chunk-UZOPNO7X.js";
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
  InputNumber,
  toNumber
} from "./chunk-33QCSF6J.js";
import "./chunk-ZCKWQGIE.js";
import "./chunk-6ZDUDDOB.js";
import "./chunk-FNEROLTK.js";
import "./chunk-AGLZ46C2.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-JGHLFU7K.js";
import "./chunk-EWCJVIPH.js";
import "./chunk-AGYCIVW2.js";
import "./chunk-I4UEI3OK.js";
import {
  Directionality
} from "./chunk-7LVMILBJ.js";
import "./chunk-42SIO26Z.js";
import "./chunk-2CIJKQHJ.js";
import {
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet
} from "./chunk-B62JIAQI.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Optional,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-3CFXHCEH.js";
import "./chunk-QOAHSALO.js";
import "./chunk-GFVJDENN.js";
import {
  ReplaySubject,
  Subject,
  __decorate,
  takeUntil
} from "./chunk-LOA65BFQ.js";
import "./chunk-PZQZAEDH.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-pagination.mjs
var _c0 = ["nz-pagination-item", ""];
function NzPaginationItemComponent_ng_template_0_a_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const page_r4 = ɵɵnextContext().page;
    ɵɵadvance();
    ɵɵtextInterpolate(page_r4);
  }
}
function NzPaginationItemComponent_ng_template_0_button_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 9);
  }
}
function NzPaginationItemComponent_ng_template_0_button_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 10);
  }
}
function NzPaginationItemComponent_ng_template_0_button_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 6);
    ɵɵelementContainerStart(1, 2);
    ɵɵtemplate(2, NzPaginationItemComponent_ng_template_0_button_2_span_2_Template, 1, 0, "span", 7)(3, NzPaginationItemComponent_ng_template_0_button_2_span_3_Template, 1, 0, "span", 8);
    ɵɵelementContainerEnd();
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = ɵɵnextContext(2);
    ɵɵproperty("disabled", ctx_r6.disabled);
    ɵɵadvance();
    ɵɵproperty("ngSwitch", ctx_r6.direction);
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "rtl");
  }
}
function NzPaginationItemComponent_ng_template_0_button_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 10);
  }
}
function NzPaginationItemComponent_ng_template_0_button_3_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 9);
  }
}
function NzPaginationItemComponent_ng_template_0_button_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 6);
    ɵɵelementContainerStart(1, 2);
    ɵɵtemplate(2, NzPaginationItemComponent_ng_template_0_button_3_span_2_Template, 1, 0, "span", 11)(3, NzPaginationItemComponent_ng_template_0_button_3_span_3_Template, 1, 0, "span", 12);
    ɵɵelementContainerEnd();
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r7 = ɵɵnextContext(2);
    ɵɵproperty("disabled", ctx_r7.disabled);
    ɵɵadvance();
    ɵɵproperty("ngSwitch", ctx_r7.direction);
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "rtl");
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 20);
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0, 2);
    ɵɵtemplate(1, NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_2_span_1_Template, 1, 0, "span", 18)(2, NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_2_span_2_Template, 1, 0, "span", 19);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r15 = ɵɵnextContext(4);
    ɵɵproperty("ngSwitch", ctx_r15.direction);
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "rtl");
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 20);
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0, 2);
    ɵɵtemplate(1, NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_3_span_1_Template, 1, 0, "span", 22)(2, NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_3_span_2_Template, 1, 0, "span", 23);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r16 = ɵɵnextContext(4);
    ɵɵproperty("ngSwitch", ctx_r16.direction);
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "rtl");
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15);
    ɵɵelementContainerStart(1, 2);
    ɵɵtemplate(2, NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_2_Template, 3, 2, "ng-container", 16)(3, NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_ng_container_3_Template, 3, 2, "ng-container", 16);
    ɵɵelementContainerEnd();
    ɵɵelementStart(4, "span", 17);
    ɵɵtext(5, "•••");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const type_r3 = ɵɵnextContext(2).$implicit;
    ɵɵadvance();
    ɵɵproperty("ngSwitch", type_r3);
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "prev_5");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "next_5");
  }
}
function NzPaginationItemComponent_ng_template_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "a", 13);
    ɵɵtemplate(2, NzPaginationItemComponent_ng_template_0_ng_container_4_div_2_Template, 6, 3, "div", 14);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const type_r3 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵproperty("ngSwitch", type_r3);
  }
}
function NzPaginationItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0, 2);
    ɵɵtemplate(1, NzPaginationItemComponent_ng_template_0_a_1_Template, 2, 1, "a", 3)(2, NzPaginationItemComponent_ng_template_0_button_2_Template, 4, 3, "button", 4)(3, NzPaginationItemComponent_ng_template_0_button_3_Template, 4, 3, "button", 4)(4, NzPaginationItemComponent_ng_template_0_ng_container_4_Template, 3, 1, "ng-container", 5);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const type_r3 = ctx.$implicit;
    ɵɵproperty("ngSwitch", type_r3);
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "page");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "prev");
    ɵɵadvance();
    ɵɵproperty("ngSwitchCase", "next");
  }
}
function NzPaginationItemComponent_ng_template_2_Template(rf, ctx) {
}
var _c1 = (a0, a1) => ({
  $implicit: a0,
  page: a1
});
var _c2 = ["nz-pagination-options", ""];
function NzPaginationOptionsComponent_nz_select_0_nz_option_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-option", 4);
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    ɵɵproperty("nzLabel", option_r3.label)("nzValue", option_r3.value);
  }
}
function NzPaginationOptionsComponent_nz_select_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-select", 2);
    ɵɵlistener("ngModelChange", function NzPaginationOptionsComponent_nz_select_0_Template_nz_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r4 = ɵɵnextContext();
      return ɵɵresetView(ctx_r4.onPageSizeChange($event));
    });
    ɵɵtemplate(1, NzPaginationOptionsComponent_nz_select_0_nz_option_1_Template, 1, 2, "nz-option", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("nzDisabled", ctx_r0.disabled)("nzSize", ctx_r0.nzSize)("ngModel", ctx_r0.pageSize);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r0.listOfPageSizeOption)("ngForTrackBy", ctx_r0.trackByOption);
  }
}
function NzPaginationOptionsComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 5);
    ɵɵtext(1);
    ɵɵelementStart(2, "input", 6);
    ɵɵlistener("keydown.enter", function NzPaginationOptionsComponent_div_1_Template_input_keydown_enter_2_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r6 = ɵɵnextContext();
      return ɵɵresetView(ctx_r6.jumpToPageViaInput($event));
    });
    ɵɵelementEnd();
    ɵɵtext(3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.locale.jump_to, " ");
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r1.disabled);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.locale.page, " ");
  }
}
var _c3 = ["containerTemplate"];
function NzPaginationDefaultComponent_ng_template_0_li_1_ng_template_1_Template(rf, ctx) {
}
var _c4 = (a0, a1) => ({
  $implicit: a0,
  range: a1
});
function NzPaginationDefaultComponent_ng_template_0_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 4);
    ɵɵtemplate(1, NzPaginationDefaultComponent_ng_template_0_li_1_ng_template_1_Template, 0, 0, "ng-template", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.showTotal)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c4, ctx_r2.total, ctx_r2.ranges));
  }
}
function NzPaginationDefaultComponent_ng_template_0_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 6);
    ɵɵlistener("gotoIndex", function NzPaginationDefaultComponent_ng_template_0_li_2_Template_li_gotoIndex_0_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r7 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r7.jumpPage($event));
    })("diffIndex", function NzPaginationDefaultComponent_ng_template_0_li_2_Template_li_diffIndex_0_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r9 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r9.jumpDiff($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const page_r6 = ctx.$implicit;
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵproperty("locale", ctx_r3.locale)("type", page_r6.type)("index", page_r6.index)("disabled", !!page_r6.disabled)("itemRender", ctx_r3.itemRender)("active", ctx_r3.pageIndex === page_r6.index)("direction", ctx_r3.dir);
  }
}
function NzPaginationDefaultComponent_ng_template_0_li_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 7);
    ɵɵlistener("pageIndexChange", function NzPaginationDefaultComponent_ng_template_0_li_3_Template_li_pageIndexChange_0_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r10 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r10.onPageIndexChange($event));
    })("pageSizeChange", function NzPaginationDefaultComponent_ng_template_0_li_3_Template_li_pageSizeChange_0_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r12 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r12.onPageSizeChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵproperty("total", ctx_r4.total)("locale", ctx_r4.locale)("disabled", ctx_r4.disabled)("nzSize", ctx_r4.nzSize)("showSizeChanger", ctx_r4.showSizeChanger)("showQuickJumper", ctx_r4.showQuickJumper)("pageIndex", ctx_r4.pageIndex)("pageSize", ctx_r4.pageSize)("pageSizeOptions", ctx_r4.pageSizeOptions);
  }
}
function NzPaginationDefaultComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul");
    ɵɵtemplate(1, NzPaginationDefaultComponent_ng_template_0_li_1_Template, 2, 5, "li", 1)(2, NzPaginationDefaultComponent_ng_template_0_li_2_Template, 1, 7, "li", 2)(3, NzPaginationDefaultComponent_ng_template_0_li_3_Template, 1, 9, "li", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.showTotal);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r0.listOfPageItem)("ngForTrackBy", ctx_r0.trackByPageItem);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.showQuickJumper || ctx_r0.showSizeChanger);
  }
}
function NzPaginationSimpleComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ul")(1, "li", 1);
    ɵɵlistener("click", function NzPaginationSimpleComponent_ng_template_0_Template_li_click_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.prePage());
    });
    ɵɵelementEnd();
    ɵɵelementStart(2, "li", 2)(3, "input", 3);
    ɵɵlistener("keydown.enter", function NzPaginationSimpleComponent_ng_template_0_Template_input_keydown_enter_3_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r4 = ɵɵnextContext();
      return ɵɵresetView(ctx_r4.jumpToPageViaInput($event));
    });
    ɵɵelementEnd();
    ɵɵelementStart(4, "span", 4);
    ɵɵtext(5, "/");
    ɵɵelementEnd();
    ɵɵtext(6);
    ɵɵelementEnd();
    ɵɵelementStart(7, "li", 5);
    ɵɵlistener("click", function NzPaginationSimpleComponent_ng_template_0_Template_li_click_7_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.nextPage());
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r0.isFirstIndex)("direction", ctx_r0.dir)("itemRender", ctx_r0.itemRender);
    ɵɵattribute("title", ctx_r0.locale.prev_page);
    ɵɵadvance();
    ɵɵattribute("title", ctx_r0.pageIndex + "/" + ctx_r0.lastIndex);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r0.disabled)("value", ctx_r0.pageIndex);
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", ctx_r0.lastIndex, " ");
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r0.isLastIndex)("direction", ctx_r0.dir)("itemRender", ctx_r0.itemRender);
    ɵɵattribute("title", ctx_r0.locale == null ? null : ctx_r0.locale.next_page);
  }
}
function NzPaginationComponent_ng_container_0_ng_container_1_ng_template_1_Template(rf, ctx) {
}
function NzPaginationComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NzPaginationComponent_ng_container_0_ng_container_1_ng_template_1_Template, 0, 0, "ng-template", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    ɵɵnextContext(2);
    const _r1 = ɵɵreference(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", _r1.template);
  }
}
function NzPaginationComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NzPaginationComponent_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 5);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const _r2 = ɵɵreference(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.nzSimple)("ngIfElse", _r2.template);
  }
}
var _NzPaginationItemComponent = class _NzPaginationItemComponent {
  constructor() {
    this.active = false;
    this.index = null;
    this.disabled = false;
    this.direction = "ltr";
    this.type = null;
    this.itemRender = null;
    this.diffIndex = new EventEmitter();
    this.gotoIndex = new EventEmitter();
    this.title = null;
  }
  clickItem() {
    if (!this.disabled) {
      if (this.type === "page") {
        this.gotoIndex.emit(this.index);
      } else {
        this.diffIndex.emit({
          next: 1,
          prev: -1,
          prev_5: -5,
          next_5: 5
        }[this.type]);
      }
    }
  }
  ngOnChanges(changes) {
    const {
      locale,
      index,
      type
    } = changes;
    if (locale || index || type) {
      this.title = {
        page: `${this.index}`,
        next: this.locale?.next_page,
        prev: this.locale?.prev_page,
        prev_5: this.locale?.prev_5,
        next_5: this.locale?.next_5
      }[this.type];
    }
  }
};
_NzPaginationItemComponent.ɵfac = function NzPaginationItemComponent_Factory(t) {
  return new (t || _NzPaginationItemComponent)();
};
_NzPaginationItemComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzPaginationItemComponent,
  selectors: [["li", "nz-pagination-item", ""]],
  hostVars: 19,
  hostBindings: function NzPaginationItemComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NzPaginationItemComponent_click_HostBindingHandler() {
        return ctx.clickItem();
      });
    }
    if (rf & 2) {
      ɵɵattribute("title", ctx.title);
      ɵɵclassProp("ant-pagination-prev", ctx.type === "prev")("ant-pagination-next", ctx.type === "next")("ant-pagination-item", ctx.type === "page")("ant-pagination-jump-prev", ctx.type === "prev_5")("ant-pagination-jump-prev-custom-icon", ctx.type === "prev_5")("ant-pagination-jump-next", ctx.type === "next_5")("ant-pagination-jump-next-custom-icon", ctx.type === "next_5")("ant-pagination-disabled", ctx.disabled)("ant-pagination-item-active", ctx.active);
    }
  },
  inputs: {
    active: "active",
    locale: "locale",
    index: "index",
    disabled: "disabled",
    direction: "direction",
    type: "type",
    itemRender: "itemRender"
  },
  outputs: {
    diffIndex: "diffIndex",
    gotoIndex: "gotoIndex"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  attrs: _c0,
  decls: 3,
  vars: 5,
  consts: [["renderItemTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["type", "button", "class", "ant-pagination-item-link", 3, "disabled", 4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["type", "button", 1, "ant-pagination-item-link", 3, "disabled"], ["nz-icon", "", "nzType", "right", 4, "ngSwitchCase"], ["nz-icon", "", "nzType", "left", 4, "ngSwitchDefault"], ["nz-icon", "", "nzType", "right"], ["nz-icon", "", "nzType", "left"], ["nz-icon", "", "nzType", "left", 4, "ngSwitchCase"], ["nz-icon", "", "nzType", "right", 4, "ngSwitchDefault"], [1, "ant-pagination-item-link", 3, "ngSwitch"], ["class", "ant-pagination-item-container", 4, "ngSwitchDefault"], [1, "ant-pagination-item-container"], [3, "ngSwitch", 4, "ngSwitchCase"], [1, "ant-pagination-item-ellipsis"], ["nz-icon", "", "nzType", "double-right", "class", "ant-pagination-item-link-icon", 4, "ngSwitchCase"], ["nz-icon", "", "nzType", "double-left", "class", "ant-pagination-item-link-icon", 4, "ngSwitchDefault"], ["nz-icon", "", "nzType", "double-right", 1, "ant-pagination-item-link-icon"], ["nz-icon", "", "nzType", "double-left", 1, "ant-pagination-item-link-icon"], ["nz-icon", "", "nzType", "double-left", "class", "ant-pagination-item-link-icon", 4, "ngSwitchCase"], ["nz-icon", "", "nzType", "double-right", "class", "ant-pagination-item-link-icon", 4, "ngSwitchDefault"]],
  template: function NzPaginationItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NzPaginationItemComponent_ng_template_0_Template, 5, 4, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, NzPaginationItemComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const _r1 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.itemRender || _r1)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c1, ctx.type, ctx.index));
    }
  },
  dependencies: [NgSwitch, NgSwitchCase, NzIconModule, NzIconDirective, NgSwitchDefault, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
});
var NzPaginationItemComponent = _NzPaginationItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationItemComponent, [{
    type: Component,
    args: [{
      selector: "li[nz-pagination-item]",
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'prev'">
          <ng-container [ngSwitch]="direction">
            <span *ngSwitchCase="'rtl'" nz-icon nzType="right"></span>
            <span *ngSwitchDefault nz-icon nzType="left"></span>
          </ng-container>
        </button>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'next'">
          <ng-container [ngSwitch]="direction">
            <span *ngSwitchCase="'rtl'" nz-icon nzType="left"></span>
            <span *ngSwitchDefault nz-icon nzType="right"></span>
          </ng-container>
        </button>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="'prev_5'" [ngSwitch]="direction">
                  <span
                    *ngSwitchCase="'rtl'"
                    nz-icon
                    nzType="double-right"
                    class="ant-pagination-item-link-icon"
                  ></span>
                  <span *ngSwitchDefault nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></span>
                </ng-container>
                <ng-container *ngSwitchCase="'next_5'" [ngSwitch]="direction">
                  <span *ngSwitchCase="'rtl'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></span>
                  <span *ngSwitchDefault nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></span>
                </ng-container>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `,
      host: {
        "[class.ant-pagination-prev]": `type === 'prev'`,
        "[class.ant-pagination-next]": `type === 'next'`,
        "[class.ant-pagination-item]": `type === 'page'`,
        "[class.ant-pagination-jump-prev]": `type === 'prev_5'`,
        "[class.ant-pagination-jump-prev-custom-icon]": `type === 'prev_5'`,
        "[class.ant-pagination-jump-next]": `type === 'next_5'`,
        "[class.ant-pagination-jump-next-custom-icon]": `type === 'next_5'`,
        "[class.ant-pagination-disabled]": "disabled",
        "[class.ant-pagination-item-active]": "active",
        "[attr.title]": "title",
        "(click)": "clickItem()"
      },
      imports: [NgSwitch, NgSwitchCase, NzIconModule, NgSwitchDefault, NgTemplateOutlet],
      standalone: true
    }]
  }], null, {
    active: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    itemRender: [{
      type: Input
    }],
    diffIndex: [{
      type: Output
    }],
    gotoIndex: [{
      type: Output
    }]
  });
})();
var _NzPaginationOptionsComponent = class _NzPaginationOptionsComponent {
  constructor() {
    this.nzSize = "default";
    this.disabled = false;
    this.showSizeChanger = false;
    this.showQuickJumper = false;
    this.total = 0;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.pageSizeOptions = [];
    this.pageIndexChange = new EventEmitter();
    this.pageSizeChange = new EventEmitter();
    this.listOfPageSizeOption = [];
  }
  onPageSizeChange(size) {
    if (this.pageSize !== size) {
      this.pageSizeChange.next(size);
    }
  }
  jumpToPageViaInput($event) {
    const target = $event.target;
    const index = Math.floor(toNumber(target.value, this.pageIndex));
    this.pageIndexChange.next(index);
    target.value = "";
  }
  trackByOption(_, option) {
    return option.value;
  }
  ngOnChanges(changes) {
    const {
      pageSize,
      pageSizeOptions,
      locale
    } = changes;
    if (pageSize || pageSizeOptions || locale) {
      this.listOfPageSizeOption = [.../* @__PURE__ */ new Set([...this.pageSizeOptions, this.pageSize])].map((item) => ({
        value: item,
        label: `${item} ${this.locale.items_per_page}`
      }));
    }
  }
};
_NzPaginationOptionsComponent.ɵfac = function NzPaginationOptionsComponent_Factory(t) {
  return new (t || _NzPaginationOptionsComponent)();
};
_NzPaginationOptionsComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzPaginationOptionsComponent,
  selectors: [["li", "nz-pagination-options", ""]],
  hostAttrs: [1, "ant-pagination-options"],
  inputs: {
    nzSize: "nzSize",
    disabled: "disabled",
    showSizeChanger: "showSizeChanger",
    showQuickJumper: "showQuickJumper",
    locale: "locale",
    total: "total",
    pageIndex: "pageIndex",
    pageSize: "pageSize",
    pageSizeOptions: "pageSizeOptions"
  },
  outputs: {
    pageIndexChange: "pageIndexChange",
    pageSizeChange: "pageSizeChange"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  attrs: _c2,
  decls: 2,
  vars: 2,
  consts: [["class", "ant-pagination-options-size-changer", 3, "nzDisabled", "nzSize", "ngModel", "ngModelChange", 4, "ngIf"], ["class", "ant-pagination-options-quick-jumper", 4, "ngIf"], [1, "ant-pagination-options-size-changer", 3, "nzDisabled", "nzSize", "ngModel", "ngModelChange"], [3, "nzLabel", "nzValue", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "nzLabel", "nzValue"], [1, "ant-pagination-options-quick-jumper"], [3, "disabled", "keydown.enter"]],
  template: function NzPaginationOptionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NzPaginationOptionsComponent_nz_select_0_Template, 2, 5, "nz-select", 0)(1, NzPaginationOptionsComponent_div_1_Template, 4, 3, "div", 1);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.showSizeChanger);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.showQuickJumper);
    }
  },
  dependencies: [NzSelectModule, NzOptionComponent, NzSelectComponent, NgIf, FormsModule, NgControlStatus, NgModel, NgForOf],
  encapsulation: 2,
  changeDetection: 0
});
var NzPaginationOptionsComponent = _NzPaginationOptionsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationOptionsComponent, [{
    type: Component,
    args: [{
      selector: "li[nz-pagination-options]",
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <nz-select
      class="ant-pagination-options-size-changer"
      *ngIf="showSizeChanger"
      [nzDisabled]="disabled"
      [nzSize]="nzSize"
      [ngModel]="pageSize"
      (ngModelChange)="onPageSizeChange($event)"
    >
      <nz-option
        *ngFor="let option of listOfPageSizeOption; trackBy: trackByOption"
        [nzLabel]="option.label"
        [nzValue]="option.value"
      ></nz-option>
    </nz-select>
    <div class="ant-pagination-options-quick-jumper" *ngIf="showQuickJumper">
      {{ locale.jump_to }}
      <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
      {{ locale.page }}
    </div>
  `,
      host: {
        class: "ant-pagination-options"
      },
      imports: [NzSelectModule, NgIf, FormsModule, NgForOf],
      standalone: true
    }]
  }], () => [], {
    nzSize: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    showSizeChanger: [{
      type: Input
    }],
    showQuickJumper: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageSizeOptions: [{
      type: Input
    }],
    pageIndexChange: [{
      type: Output
    }],
    pageSizeChange: [{
      type: Output
    }]
  });
})();
var _NzPaginationDefaultComponent = class _NzPaginationDefaultComponent {
  constructor(cdr, renderer, elementRef, directionality) {
    this.cdr = cdr;
    this.renderer = renderer;
    this.elementRef = elementRef;
    this.directionality = directionality;
    this.nzSize = "default";
    this.itemRender = null;
    this.showTotal = null;
    this.disabled = false;
    this.showSizeChanger = false;
    this.showQuickJumper = false;
    this.total = 0;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.pageSizeOptions = [10, 20, 30, 40];
    this.pageIndexChange = new EventEmitter();
    this.pageSizeChange = new EventEmitter();
    this.ranges = [0, 0];
    this.listOfPageItem = [];
    this.dir = "ltr";
    this.destroy$ = new Subject();
    renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
  }
  ngOnInit() {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
      this.dir = direction;
      this.updateRtlStyle();
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    this.updateRtlStyle();
  }
  updateRtlStyle() {
    if (this.dir === "rtl") {
      this.renderer.addClass(this.elementRef.nativeElement, "ant-pagination-rtl");
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, "ant-pagination-rtl");
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  jumpPage(index) {
    this.onPageIndexChange(index);
  }
  jumpDiff(diff) {
    this.jumpPage(this.pageIndex + diff);
  }
  trackByPageItem(_, value) {
    return `${value.type}-${value.index}`;
  }
  onPageIndexChange(index) {
    this.pageIndexChange.next(index);
  }
  onPageSizeChange(size) {
    this.pageSizeChange.next(size);
  }
  getLastIndex(total, pageSize) {
    return Math.ceil(total / pageSize);
  }
  buildIndexes() {
    const lastIndex = this.getLastIndex(this.total, this.pageSize);
    this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
  }
  getListOfPageItem(pageIndex, lastIndex) {
    const concatWithPrevNext = (listOfPage) => {
      const prevItem = {
        type: "prev",
        disabled: pageIndex === 1
      };
      const nextItem = {
        type: "next",
        disabled: pageIndex === lastIndex
      };
      return [prevItem, ...listOfPage, nextItem];
    };
    const generatePage = (start, end) => {
      const list = [];
      for (let i = start; i <= end; i++) {
        list.push({
          index: i,
          type: "page"
        });
      }
      return list;
    };
    if (lastIndex <= 9) {
      return concatWithPrevNext(generatePage(1, lastIndex));
    } else {
      const generateRangeItem = (selected, last) => {
        let listOfRange = [];
        const prevFiveItem = {
          type: "prev_5"
        };
        const nextFiveItem = {
          type: "next_5"
        };
        const firstPageItem = generatePage(1, 1);
        const lastPageItem = generatePage(lastIndex, lastIndex);
        if (selected < 5) {
          const maxLeft = selected === 4 ? 6 : 5;
          listOfRange = [...generatePage(2, maxLeft), nextFiveItem];
        } else if (selected < last - 3) {
          listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
        } else {
          const minRight = selected === last - 3 ? last - 5 : last - 4;
          listOfRange = [prevFiveItem, ...generatePage(minRight, last - 1)];
        }
        return [...firstPageItem, ...listOfRange, ...lastPageItem];
      };
      return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
    }
  }
  ngOnChanges(changes) {
    const {
      pageIndex,
      pageSize,
      total
    } = changes;
    if (pageIndex || pageSize || total) {
      this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
      this.buildIndexes();
    }
  }
};
_NzPaginationDefaultComponent.ɵfac = function NzPaginationDefaultComponent_Factory(t) {
  return new (t || _NzPaginationDefaultComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Directionality, 8));
};
_NzPaginationDefaultComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzPaginationDefaultComponent,
  selectors: [["nz-pagination-default"]],
  viewQuery: function NzPaginationDefaultComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c3, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    nzSize: "nzSize",
    itemRender: "itemRender",
    showTotal: "showTotal",
    disabled: "disabled",
    locale: "locale",
    showSizeChanger: "showSizeChanger",
    showQuickJumper: "showQuickJumper",
    total: "total",
    pageIndex: "pageIndex",
    pageSize: "pageSize",
    pageSizeOptions: "pageSizeOptions"
  },
  outputs: {
    pageIndexChange: "pageIndexChange",
    pageSizeChange: "pageSizeChange"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 2,
  vars: 0,
  consts: [["containerTemplate", ""], ["class", "ant-pagination-total-text", 4, "ngIf"], ["nz-pagination-item", "", 3, "locale", "type", "index", "disabled", "itemRender", "active", "direction", "gotoIndex", "diffIndex", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["nz-pagination-options", "", 3, "total", "locale", "disabled", "nzSize", "showSizeChanger", "showQuickJumper", "pageIndex", "pageSize", "pageSizeOptions", "pageIndexChange", "pageSizeChange", 4, "ngIf"], [1, "ant-pagination-total-text"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["nz-pagination-item", "", 3, "locale", "type", "index", "disabled", "itemRender", "active", "direction", "gotoIndex", "diffIndex"], ["nz-pagination-options", "", 3, "total", "locale", "disabled", "nzSize", "showSizeChanger", "showQuickJumper", "pageIndex", "pageSize", "pageSizeOptions", "pageIndexChange", "pageSizeChange"]],
  template: function NzPaginationDefaultComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NzPaginationDefaultComponent_ng_template_0_Template, 4, 4, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
  },
  dependencies: [NgTemplateOutlet, NgForOf, NgIf, NzPaginationItemComponent, NzPaginationOptionsComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NzPaginationDefaultComponent = _NzPaginationDefaultComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationDefaultComponent, [{
    type: Component,
    args: [{
      selector: "nz-pagination-default",
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #containerTemplate>
      <ul>
        <li class="ant-pagination-total-text" *ngIf="showTotal">
          <ng-template
            [ngTemplateOutlet]="showTotal"
            [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
          ></ng-template>
        </li>
        <li
          *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
          nz-pagination-item
          [locale]="locale"
          [type]="page.type"
          [index]="page.index"
          [disabled]="!!page.disabled"
          [itemRender]="itemRender"
          [active]="pageIndex === page.index"
          (gotoIndex)="jumpPage($event)"
          (diffIndex)="jumpDiff($event)"
          [direction]="dir"
        ></li>
        <li
          nz-pagination-options
          *ngIf="showQuickJumper || showSizeChanger"
          [total]="total"
          [locale]="locale"
          [disabled]="disabled"
          [nzSize]="nzSize"
          [showSizeChanger]="showSizeChanger"
          [showQuickJumper]="showQuickJumper"
          [pageIndex]="pageIndex"
          [pageSize]="pageSize"
          [pageSizeOptions]="pageSizeOptions"
          (pageIndexChange)="onPageIndexChange($event)"
          (pageSizeChange)="onPageSizeChange($event)"
        ></li>
      </ul>
    </ng-template>
  `,
      imports: [NgTemplateOutlet, NgForOf, NgIf, NzPaginationItemComponent, NzPaginationOptionsComponent],
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    template: [{
      type: ViewChild,
      args: ["containerTemplate", {
        static: true
      }]
    }],
    nzSize: [{
      type: Input
    }],
    itemRender: [{
      type: Input
    }],
    showTotal: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    showSizeChanger: [{
      type: Input
    }],
    showQuickJumper: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageSizeOptions: [{
      type: Input
    }],
    pageIndexChange: [{
      type: Output
    }],
    pageSizeChange: [{
      type: Output
    }]
  });
})();
var _NzPaginationSimpleComponent = class _NzPaginationSimpleComponent {
  constructor(cdr, renderer, elementRef, directionality) {
    this.cdr = cdr;
    this.renderer = renderer;
    this.elementRef = elementRef;
    this.directionality = directionality;
    this.itemRender = null;
    this.disabled = false;
    this.total = 0;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.pageIndexChange = new EventEmitter();
    this.lastIndex = 0;
    this.isFirstIndex = false;
    this.isLastIndex = false;
    this.dir = "ltr";
    this.destroy$ = new Subject();
    renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
  }
  ngOnInit() {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
      this.dir = direction;
      this.updateRtlStyle();
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    this.updateRtlStyle();
  }
  updateRtlStyle() {
    if (this.dir === "rtl") {
      this.renderer.addClass(this.elementRef.nativeElement, "ant-pagination-rtl");
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, "ant-pagination-rtl");
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  jumpToPageViaInput($event) {
    const target = $event.target;
    const index = toNumber(target.value, this.pageIndex);
    this.onPageIndexChange(index);
    target.value = `${this.pageIndex}`;
  }
  prePage() {
    this.onPageIndexChange(this.pageIndex - 1);
  }
  nextPage() {
    this.onPageIndexChange(this.pageIndex + 1);
  }
  onPageIndexChange(index) {
    this.pageIndexChange.next(index);
  }
  updateBindingValue() {
    this.lastIndex = Math.ceil(this.total / this.pageSize);
    this.isFirstIndex = this.pageIndex === 1;
    this.isLastIndex = this.pageIndex === this.lastIndex;
  }
  ngOnChanges(changes) {
    const {
      pageIndex,
      total,
      pageSize
    } = changes;
    if (pageIndex || total || pageSize) {
      this.updateBindingValue();
    }
  }
};
_NzPaginationSimpleComponent.ɵfac = function NzPaginationSimpleComponent_Factory(t) {
  return new (t || _NzPaginationSimpleComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Directionality, 8));
};
_NzPaginationSimpleComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzPaginationSimpleComponent,
  selectors: [["nz-pagination-simple"]],
  viewQuery: function NzPaginationSimpleComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c3, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    itemRender: "itemRender",
    disabled: "disabled",
    locale: "locale",
    total: "total",
    pageIndex: "pageIndex",
    pageSize: "pageSize"
  },
  outputs: {
    pageIndexChange: "pageIndexChange"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 2,
  vars: 0,
  consts: [["containerTemplate", ""], ["nz-pagination-item", "", "type", "prev", 3, "disabled", "direction", "itemRender", "click"], [1, "ant-pagination-simple-pager"], ["size", "3", 3, "disabled", "value", "keydown.enter"], [1, "ant-pagination-slash"], ["nz-pagination-item", "", "type", "next", 3, "disabled", "direction", "itemRender", "click"]],
  template: function NzPaginationSimpleComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NzPaginationSimpleComponent_ng_template_0_Template, 8, 12, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
  },
  dependencies: [NzPaginationItemComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NzPaginationSimpleComponent = _NzPaginationSimpleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationSimpleComponent, [{
    type: Component,
    args: [{
      selector: "nz-pagination-simple",
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #containerTemplate>
      <ul>
        <li
          nz-pagination-item
          [attr.title]="locale.prev_page"
          [disabled]="isFirstIndex"
          [direction]="dir"
          (click)="prePage()"
          type="prev"
          [itemRender]="itemRender"
        ></li>
        <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
          <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
          <span class="ant-pagination-slash">/</span>
          {{ lastIndex }}
        </li>
        <li
          nz-pagination-item
          [attr.title]="locale?.next_page"
          [disabled]="isLastIndex"
          [direction]="dir"
          (click)="nextPage()"
          type="next"
          [itemRender]="itemRender"
        ></li>
      </ul>
    </ng-template>
  `,
      imports: [NzPaginationItemComponent],
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    template: [{
      type: ViewChild,
      args: ["containerTemplate", {
        static: true
      }]
    }],
    itemRender: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageIndexChange: [{
      type: Output
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "pagination";
var _NzPaginationComponent = class _NzPaginationComponent {
  validatePageIndex(value, lastIndex) {
    if (value > lastIndex) {
      return lastIndex;
    } else if (value < 1) {
      return 1;
    } else {
      return value;
    }
  }
  onPageIndexChange(index) {
    const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
    const validIndex = this.validatePageIndex(index, lastIndex);
    if (validIndex !== this.nzPageIndex && !this.nzDisabled) {
      this.nzPageIndex = validIndex;
      this.nzPageIndexChange.emit(this.nzPageIndex);
    }
  }
  onPageSizeChange(size) {
    this.nzPageSize = size;
    this.nzPageSizeChange.emit(size);
    const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
    if (this.nzPageIndex > lastIndex) {
      this.onPageIndexChange(lastIndex);
    }
  }
  onTotalChange(total) {
    const lastIndex = this.getLastIndex(total, this.nzPageSize);
    if (this.nzPageIndex > lastIndex) {
      Promise.resolve().then(() => {
        this.onPageIndexChange(lastIndex);
        this.cdr.markForCheck();
      });
    }
  }
  getLastIndex(total, pageSize) {
    return Math.ceil(total / pageSize);
  }
  constructor(i18n, cdr, breakpointService, nzConfigService, directionality) {
    this.i18n = i18n;
    this.cdr = cdr;
    this.breakpointService = breakpointService;
    this.nzConfigService = nzConfigService;
    this.directionality = directionality;
    this._nzModuleName = NZ_CONFIG_MODULE_NAME;
    this.nzPageSizeChange = new EventEmitter();
    this.nzPageIndexChange = new EventEmitter();
    this.nzShowTotal = null;
    this.nzItemRender = null;
    this.nzSize = "default";
    this.nzPageSizeOptions = [10, 20, 30, 40];
    this.nzShowSizeChanger = false;
    this.nzShowQuickJumper = false;
    this.nzSimple = false;
    this.nzDisabled = false;
    this.nzResponsive = false;
    this.nzHideOnSinglePage = false;
    this.nzTotal = 0;
    this.nzPageIndex = 1;
    this.nzPageSize = 10;
    this.showPagination = true;
    this.size = "default";
    this.dir = "ltr";
    this.destroy$ = new Subject();
    this.total$ = new ReplaySubject(1);
  }
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData("Pagination");
      this.cdr.markForCheck();
    });
    this.total$.pipe(takeUntil(this.destroy$)).subscribe((total) => {
      this.onTotalChange(total);
    });
    this.breakpointService.subscribe(gridResponsiveMap).pipe(takeUntil(this.destroy$)).subscribe((bp) => {
      if (this.nzResponsive) {
        this.size = bp === NzBreakpointEnum.xs ? "small" : "default";
        this.cdr.markForCheck();
      }
    });
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnChanges(changes) {
    const {
      nzHideOnSinglePage,
      nzTotal,
      nzPageSize,
      nzSize
    } = changes;
    if (nzTotal) {
      this.total$.next(this.nzTotal);
    }
    if (nzHideOnSinglePage || nzTotal || nzPageSize) {
      this.showPagination = this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize || this.nzTotal > 0 && !this.nzHideOnSinglePage;
    }
    if (nzSize) {
      this.size = nzSize.currentValue;
    }
  }
};
_NzPaginationComponent.ɵfac = function NzPaginationComponent_Factory(t) {
  return new (t || _NzPaginationComponent)(ɵɵdirectiveInject(NzI18nService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NzBreakpointService), ɵɵdirectiveInject(NzConfigService), ɵɵdirectiveInject(Directionality, 8));
};
_NzPaginationComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzPaginationComponent,
  selectors: [["nz-pagination"]],
  hostAttrs: [1, "ant-pagination"],
  hostVars: 8,
  hostBindings: function NzPaginationComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-pagination-simple", ctx.nzSimple)("ant-pagination-disabled", ctx.nzDisabled)("mini", !ctx.nzSimple && ctx.size === "small")("ant-pagination-rtl", ctx.dir === "rtl");
    }
  },
  inputs: {
    nzShowTotal: "nzShowTotal",
    nzItemRender: "nzItemRender",
    nzSize: "nzSize",
    nzPageSizeOptions: "nzPageSizeOptions",
    nzShowSizeChanger: "nzShowSizeChanger",
    nzShowQuickJumper: "nzShowQuickJumper",
    nzSimple: "nzSimple",
    nzDisabled: "nzDisabled",
    nzResponsive: "nzResponsive",
    nzHideOnSinglePage: "nzHideOnSinglePage",
    nzTotal: "nzTotal",
    nzPageIndex: "nzPageIndex",
    nzPageSize: "nzPageSize"
  },
  outputs: {
    nzPageSizeChange: "nzPageSizeChange",
    nzPageIndexChange: "nzPageIndexChange"
  },
  exportAs: ["nzPagination"],
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 5,
  vars: 18,
  consts: [[4, "ngIf"], [3, "disabled", "itemRender", "locale", "pageSize", "total", "pageIndex", "pageIndexChange"], ["simplePagination", ""], [3, "nzSize", "itemRender", "showTotal", "disabled", "locale", "showSizeChanger", "showQuickJumper", "total", "pageIndex", "pageSize", "pageSizeOptions", "pageIndexChange", "pageSizeChange"], ["defaultPagination", ""], [4, "ngIf", "ngIfElse"], [3, "ngTemplateOutlet"]],
  template: function NzPaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NzPaginationComponent_ng_container_0_Template, 2, 2, "ng-container", 0);
      ɵɵelementStart(1, "nz-pagination-simple", 1, 2);
      ɵɵlistener("pageIndexChange", function NzPaginationComponent_Template_nz_pagination_simple_pageIndexChange_1_listener($event) {
        return ctx.onPageIndexChange($event);
      });
      ɵɵelementEnd();
      ɵɵelementStart(3, "nz-pagination-default", 3, 4);
      ɵɵlistener("pageIndexChange", function NzPaginationComponent_Template_nz_pagination_default_pageIndexChange_3_listener($event) {
        return ctx.onPageIndexChange($event);
      })("pageSizeChange", function NzPaginationComponent_Template_nz_pagination_default_pageSizeChange_3_listener($event) {
        return ctx.onPageSizeChange($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.showPagination);
      ɵɵadvance();
      ɵɵproperty("disabled", ctx.nzDisabled)("itemRender", ctx.nzItemRender)("locale", ctx.locale)("pageSize", ctx.nzPageSize)("total", ctx.nzTotal)("pageIndex", ctx.nzPageIndex);
      ɵɵadvance(2);
      ɵɵproperty("nzSize", ctx.size)("itemRender", ctx.nzItemRender)("showTotal", ctx.nzShowTotal)("disabled", ctx.nzDisabled)("locale", ctx.locale)("showSizeChanger", ctx.nzShowSizeChanger)("showQuickJumper", ctx.nzShowQuickJumper)("total", ctx.nzTotal)("pageIndex", ctx.nzPageIndex)("pageSize", ctx.nzPageSize)("pageSizeOptions", ctx.nzPageSizeOptions);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet, NzPaginationSimpleComponent, NzPaginationDefaultComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NzPaginationComponent = _NzPaginationComponent;
__decorate([WithConfig()], NzPaginationComponent.prototype, "nzSize", void 0);
__decorate([WithConfig()], NzPaginationComponent.prototype, "nzPageSizeOptions", void 0);
__decorate([WithConfig(), InputBoolean()], NzPaginationComponent.prototype, "nzShowSizeChanger", void 0);
__decorate([WithConfig(), InputBoolean()], NzPaginationComponent.prototype, "nzShowQuickJumper", void 0);
__decorate([WithConfig(), InputBoolean()], NzPaginationComponent.prototype, "nzSimple", void 0);
__decorate([InputBoolean()], NzPaginationComponent.prototype, "nzDisabled", void 0);
__decorate([InputBoolean()], NzPaginationComponent.prototype, "nzResponsive", void 0);
__decorate([InputBoolean()], NzPaginationComponent.prototype, "nzHideOnSinglePage", void 0);
__decorate([InputNumber()], NzPaginationComponent.prototype, "nzTotal", void 0);
__decorate([InputNumber()], NzPaginationComponent.prototype, "nzPageIndex", void 0);
__decorate([InputNumber()], NzPaginationComponent.prototype, "nzPageSize", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationComponent, [{
    type: Component,
    args: [{
      selector: "nz-pagination",
      exportAs: "nzPagination",
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-container *ngIf="showPagination">
      <ng-container *ngIf="nzSimple; else defaultPagination.template">
        <ng-template [ngTemplateOutlet]="simplePagination.template"></ng-template>
      </ng-container>
    </ng-container>
    <nz-pagination-simple
      #simplePagination
      [disabled]="nzDisabled"
      [itemRender]="nzItemRender"
      [locale]="locale"
      [pageSize]="nzPageSize"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    ></nz-pagination-simple>
    <nz-pagination-default
      #defaultPagination
      [nzSize]="size"
      [itemRender]="nzItemRender"
      [showTotal]="nzShowTotal"
      [disabled]="nzDisabled"
      [locale]="locale"
      [showSizeChanger]="nzShowSizeChanger"
      [showQuickJumper]="nzShowQuickJumper"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      [pageSize]="nzPageSize"
      [pageSizeOptions]="nzPageSizeOptions"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    ></nz-pagination-default>
  `,
      host: {
        class: "ant-pagination",
        "[class.ant-pagination-simple]": "nzSimple",
        "[class.ant-pagination-disabled]": "nzDisabled",
        "[class.mini]": `!nzSimple && size === 'small'`,
        "[class.ant-pagination-rtl]": `dir === 'rtl'`
      },
      imports: [NgIf, NgTemplateOutlet, NzPaginationSimpleComponent, NzPaginationDefaultComponent],
      standalone: true
    }]
  }], () => [{
    type: NzI18nService
  }, {
    type: ChangeDetectorRef
  }, {
    type: NzBreakpointService
  }, {
    type: NzConfigService
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    nzPageSizeChange: [{
      type: Output
    }],
    nzPageIndexChange: [{
      type: Output
    }],
    nzShowTotal: [{
      type: Input
    }],
    nzItemRender: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzPageSizeOptions: [{
      type: Input
    }],
    nzShowSizeChanger: [{
      type: Input
    }],
    nzShowQuickJumper: [{
      type: Input
    }],
    nzSimple: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input
    }],
    nzResponsive: [{
      type: Input
    }],
    nzHideOnSinglePage: [{
      type: Input
    }],
    nzTotal: [{
      type: Input
    }],
    nzPageIndex: [{
      type: Input
    }],
    nzPageSize: [{
      type: Input
    }]
  });
})();
var _NzPaginationModule = class _NzPaginationModule {
};
_NzPaginationModule.ɵfac = function NzPaginationModule_Factory(t) {
  return new (t || _NzPaginationModule)();
};
_NzPaginationModule.ɵmod = ɵɵdefineNgModule({
  type: _NzPaginationModule,
  imports: [NzPaginationComponent, NzPaginationSimpleComponent, NzPaginationOptionsComponent, NzPaginationItemComponent, NzPaginationDefaultComponent],
  exports: [NzPaginationComponent]
});
_NzPaginationModule.ɵinj = ɵɵdefineInjector({
  imports: [NzPaginationComponent, NzPaginationSimpleComponent, NzPaginationOptionsComponent, NzPaginationItemComponent, NzPaginationDefaultComponent]
});
var NzPaginationModule = _NzPaginationModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationModule, [{
    type: NgModule,
    args: [{
      imports: [NzPaginationComponent, NzPaginationSimpleComponent, NzPaginationOptionsComponent, NzPaginationItemComponent, NzPaginationDefaultComponent],
      exports: [NzPaginationComponent]
    }]
  }], null, null);
})();
export {
  NzPaginationComponent,
  NzPaginationDefaultComponent,
  NzPaginationItemComponent,
  NzPaginationModule,
  NzPaginationOptionsComponent,
  NzPaginationSimpleComponent
};
//# sourceMappingURL=ng-zorro-antd_pagination.js.map
