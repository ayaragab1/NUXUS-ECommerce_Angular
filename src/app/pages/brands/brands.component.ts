import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandsData: IBrand[] = [];
  private readonly brandService = inject(BrandsService);

  ngOnInit(): void {
    this.getBrands(); 
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
      },
    });
  }
}
