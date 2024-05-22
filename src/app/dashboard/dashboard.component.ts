import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../Services/repository.service';

import { ItemFilter } from '../Models/itemFilter';
import { CustomPageList } from '../Models/customPageList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',

})
export class DashboardComponent implements OnInit {
  isGridView: boolean = false;
  isLoading: boolean = false;
  customPageList: CustomPageList = new CustomPageList();
  filter: ItemFilter = new ItemFilter();

  constructor(private readonly repositoryService: RepositoryService) {
  }
  ngOnInit(): void {
    this.initFilter();
    this.loadData();
  }
  initFilter() {
    this.filter.page = 1;
    this.filter.language = "javascript";
    this.filter.sort = "stars";
    this.filter.order = "desc";
    this.filter.per_page = 50;
  }
  loadData() {
    this.isLoading = true;
    this.repositoryService.getRepositories(this.filter).subscribe({
      next: (responsedData: CustomPageList) => {
        this.customPageList = responsedData;
        this.customPageList.page = this.filter.page;
        this.customPageList.per_page = this.filter.per_page;
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        this.isLoading = false;
        this.customPageList = new CustomPageList();
      },
      complete() {
        // console.log("is completed");
      }
    });
  }
  switch() {
    this.isGridView = !this.isGridView;
  }
  onLanguageChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.language = filterValue.trim().toLowerCase();
    if(this.filter.language){

    }else{
      this.filter.language="javascript";
    }
    setTimeout(() => { this.loadData() }, 3000);

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
