import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
})
export class UnitComponent {
  constructor(
    private titleService: Title,
    private translate: TranslateService,
  ) {
    translate
      .get('Menu.unit')
      .subscribe((value) => this.titleService.setTitle(value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Menu.unit')
        .subscribe((value) => this.titleService.setTitle(value));
    });
  }
}
