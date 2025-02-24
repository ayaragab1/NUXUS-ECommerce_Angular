import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories/category.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {

  private readonly categoryService = inject(CategoryService);

  categoriesData:Icategory[] = [] ; 
  ngOnInit(): void {
    this.getCategorties();
  }

  getCategorties(): any {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
      this.categoriesData = res.data;
      },
    });
  }
}
