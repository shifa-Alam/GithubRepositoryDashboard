import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RepositoryService } from '../Services/repository.service';
import { Data } from './Data';
import { Filter } from './filter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',

})
export class DashboardComponent implements OnInit {
  isCardView: boolean = false;
  isLoading: boolean = false;
  data: Data = new Data();
  filter: Filter = new Filter();

  constructor(private readonly repositoryService: RepositoryService) {
  }


  ngOnInit(): void {
    this.initFilter();
    this.loadData();

  }
  initFilter() {
    this.filter.page = 1;
    this.filter.language = "java";
    this.filter.sort = "stars";
    this.filter.order = "desc";
    this.filter.per_page = 50;
  }
  loadData() {
    this.isLoading = true;
    this.repositoryService.getRepositories(this.filter).subscribe({
      next: (data: Data) => {
        this.data = data;
        this.data.page = this.filter.page;
        this.data.per_page = this.filter.per_page;
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        this.isLoading = false;
        this.data = new Data();
      },

      complete() {
        // console.log("is completed");

      },
    });
  }
  swith(event: any) {
    this.isCardView = event.checked;
    // this.loadData();
  }
  onLanguageChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.language = filterValue.trim().toLowerCase();
    this.loadData();

  }
  onPageChange(page: any) {
    // console.log("page", page);
    this.filter.page = page.pageIndex + 1;
    this.filter.per_page = page.pageSize;
    this.loadData();
  }
  onSort(sort: any) {
    // console.log("sort", sort);
    this.filter.sort = sort.active;
    this.filter.order = sort.direction;
    this.loadData();
  }
 
}
