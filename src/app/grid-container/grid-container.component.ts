import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '../dashboard/Data';
import { Item } from '../dashboard/Item';


@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss'
})
export class GridContainerComponent implements OnInit, OnChanges {
  @Input('data') data: Data = new Data();
  @Output() onPageChange = new EventEmitter();
  @Output() onSort = new EventEmitter();

  displayedColumns: string[] = ['name', 'description', 'language', 'stargazers_count', 'updated_at', 'owner', 'html_url'];

  dataSource!: MatTableDataSource<Item>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  }
  ngOnInit(): void {
    // this.dataSetup();
  }
  dataSetup() {
    if (this.data.per_page) {
      this.dataSource = new MatTableDataSource(this.data.items);
      // console.log("datasource", this.dataSource);
      this.paginator.pageSize = this.data.per_page;
      this.paginator.length = this.data.total_count;
    }
  }

  getPaginatedData(page: any) {
    this.onPageChange.emit(page);
    // console.log("page", page)
    this.paginator.pageIndex = page.pageIndex;
    this.paginator.pageSize = page.per_page;

  }

  sortData(event: any) {
    this.onSort.emit(event);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("changes", changes);
    for (let propName in changes) {
      if (propName == "data") {
        let prop = changes[propName];
        if (prop) {
          this.data = new Data();
          this.data = prop.currentValue;
          this.dataSetup();
        }
      }
    }
  }
  ngOnDestroy(): void {

  }
}
