import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RepositoryService } from '../Services/repository.service';
import { Data } from './Data';
import { Item } from './Item';
import { Filter } from './filter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',

})
export class DashboardComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  data: Data = new Data();
  filter: Filter = new Filter();
  displayedColumns: string[] = ['name', 'description', 'language', 'stargazers_count', 'updated_at', 'html_url'];
  dataSource!: MatTableDataSource<Item>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private readonly repositoryService: RepositoryService) {


  }
  ngOnInit(): void {
    this.initFilter();
    this.loadData();
    // this.newLoad();
  }
  loadData() {
    this.isLoading = true;
    this.repositoryService.getRepositories(this.filter).subscribe({
      next: (data: Data) => {
        this.data = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.data.items);
        // this.paginator.pageIndex = 0;
        this.paginator.pageSize = this.filter.per_page;
        this.paginator.length = this.data.total_count;
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        this.isLoading = false;
      },

      complete() {
        console.log("is completed");

      },
    });
  }
  initFilter() {
    this.filter.language = "javascript";
    this.filter.sort = "stars";
    this.filter.order = 'desc';
    this.filter.page = 1;
    this.filter.per_page = 10;
  }
  // loadData() {
  //   this.isLoading = true;
  //   this.repositoryService.getRepositories(this.filter).subscribe(data => {
  //     this.data = data;
  //     this.dataSource = new MatTableDataSource(this.data.items);
  //     this.paginator.pageIndex = 0;
  //     this.paginator.pageSize = this.filter.per_page;
  //     this.paginator.length = this.data.total_count;
  //     this.isLoading = false;

  //   },
  //     error => {
  //       console.log(error);
  //       this.isLoading = false;
  //     });
  // }
  getPaginatedData(event: any) {
    console.log("page",event)
    this.filter.per_page = event.pageSize;
    this.filter.page = event.pageIndex;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = this.filter.per_page;
    this.loadData();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.language = filterValue.trim().toLowerCase();
    this.loadData();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  sortData(event: any) {
    this.filter.sort = event.active;
    this.filter.order = event.direction;
    console.log("sort", event);
    this.loadData();
  }
}
