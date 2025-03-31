import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  constructor(
    private titleService: Title,
    private translate: TranslateService,
  ) {
    translate
      .get('Menu.task')
      .subscribe((value) => this.titleService.setTitle(value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Menu.task')
        .subscribe((value) => this.titleService.setTitle(value));
    });
  }
}
