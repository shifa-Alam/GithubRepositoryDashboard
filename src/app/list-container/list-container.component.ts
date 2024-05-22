import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Item } from '../Models/item';
import { CustomPageList } from '../Models/customPageList';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss'
})
export class ListContainerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('customPageList') customPageList: CustomPageList = new CustomPageList();
  @Output() onPageChange = new EventEmitter();
  @Output() onSort = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name', 'description', 'language', 'stargazers_count', 'updated_at', 'owner', 'html_url'];

  dataSource!: MatTableDataSource<Item>;
  constructor() {
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    this.paginator.pageSize = this.customPageList.per_page;
    this.paginator.length = this.customPageList.total_count;

  }
  ngOnInit(): void {
    this.dataSetup();
  }

  dataSetup() {
    this.dataSource = new MatTableDataSource(this.customPageList.items);
    if (this.paginator) {
      this.paginator.pageSize = this.customPageList.per_page;
      this.paginator.length = this.customPageList.total_count;
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
    //   console.log("changes", changes);
    for (let propName in changes) {
      if (propName === "customPageList") {
        let prop = changes[propName];
        if (prop) {
          this.customPageList = new CustomPageList();
          this.customPageList = prop.currentValue;
          this.dataSetup();
        }
      }
    }
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }
}
