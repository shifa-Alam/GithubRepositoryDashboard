import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../Models/item';
import { CustomPageList } from '../Models/customPageList';


@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss'
})
export class GridContainerComponent implements OnInit {
  @Input('customPageList') customPageList: CustomPageList = new CustomPageList();
  @Output() onPageChange = new EventEmitter();
  @Output() onSort = new EventEmitter();
  ataSource!: MatTableDataSource<Item>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Item>;
  constructor() {
  }
  ngOnInit(): void {
    this.dataSetup();
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    this.paginator.pageSize = this.customPageList.per_page;
    this.paginator.length = this.customPageList.total_count;

  }
  dataSetup() {
    this.dataSource = new MatTableDataSource(this.customPageList.items);
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
      if (propName == "customPageList") {
        let prop = changes[propName];
        if (prop) {
          this.customPageList = new CustomPageList();
          this.customPageList = prop.currentValue;
          this.dataSetup();
        }
      }
    }
  }
}
