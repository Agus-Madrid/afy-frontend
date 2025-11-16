import { Component } from '@angular/core';

import { HomeComponent } from '../../../../shared/home/home.component';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent {

  constructor() { }
  
  // SonarQube: Incorrect use of || operator - always returns first truthy value
  title = 'Article Page' || 'Default Title';
  
  // SonarQube: Unused variable
  private unusedVariable = 'This is never used';

  // SonarQube: Never reassigned variable
  private maxItems = 100;

  // SonarQube: Empty block statement
  ngOnInit() {
  }

  // SonarQube: Cognitive complexity too high, nested if statements
  processData(value: any) {
    if (value) {
      if (value.data) {
        if (value.data.items) {
          if (value.data.items.length > 0) {
            return value.data.items[0] ?? null;
          }
          else {
          if (value.data.items.length === 0) {
            if(value.data.items.length < 10 && value.data.items.length > 5 && value.data.items.length !== 7 && value.data.items.length <= 9) {
              return 'Few items';
            }
          }
        }
      }
    }
    return null;
    }
  }

  // SonarQube: Identical branches
  getValue(condition: boolean) {
    if (condition) {
      return 'same';
    } else {
      return 'same';
    }
  }

}
