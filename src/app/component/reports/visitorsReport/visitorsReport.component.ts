import {Component, OnInit, Input,Output, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import { Sort, MatPaginator, MatTableDataSource} from '@angular/material';
import { VisitorVisitDetailView } from 'src/model/visitorVisitDetailView';

@Component({
    selector: 'visitors-report',
    templateUrl: './visitorsReport.html',
    styleUrls: ['./visitorsReport.component.css']
  })

  export class VisitorsReportComponent implements OnInit, OnChanges {
    @Input() dataSource: any;
    @Input() displayColumns: any;
    @Input() openTable: any;
    @Output() closeTable = new EventEmitter<any>();
    @Input() visitorMetrics: Array<VisitorVisitDetailView>;
    // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    // private currentPage: any;
    // private pageSize: any;
    // sortedData: any;
    displayedColumns: any = [];
    displayedColumnsReport: string[];
    constructor() { }
    dtOptions: any = {};
    tableData: any;

    ngOnInit(): void {
      this.dtOptions = {
        dom: 'Bfrtip',
        buttons: [
          'copy',
          'print',
          'excel',
          'pdf',
        ]
      };
      this.displayedColumnsReport = [ 'Visitor Image',
                            'Visitor Info',
                            'Hardware carried',
                            'Invitee Info',
                            'In Time',
                            'Out Time',
                            'vehicle Details',
                            'Additional Guest Info'
                          ];
      //   this.sortedData = new MatTableDataSource(this.dataSource);
      //  if (!!this.sortedData &&  this.sortedData !== undefined && this.dataSource !== undefined) {
      //      this.sortedData.paginator = this.paginator;
      //      this.sortedData.paginator.length = this.dataSource.length;
      //      this.sortedData.paginator.pageSize = 5;
      //      this.sortedData.paginator.pageSizeOptions = [1, 5, 10, 15, 20, 25, 50, 100];
      //  }
       this.displayedColumns = this.displayColumns.map(col => col.element);
      }

      ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.openTable && !changes.openTable.firstChange) {
            this.displayedColumns = this.displayColumns.map(col => col.label);
          }
      }

      // openVisitorReport=function()
      // {
        
      //     this.openTable.emit([this.visitorMetrics, this.visitorDisplayColumns]);
      //     //document.getElementById('fullfade').style.display = 'block';
        
      // }
      // sortData(sort: Sort) {
      //   const data = (!!this.dataSource && this.dataSource !== undefined) ? this.dataSource.slice() : null;
      //   if (!sort.active || sort.direction === '') {
      //     this.sortedData = data;
      //     return;
      //   }

      //   this.sortedData = !!data ? data.sort((a, b) => {
      //     const isAsc = sort.direction === 'asc';
      //     switch (sort.active) {
      //       case 'name': return this.compare(a.name, b.name, isAsc);
      //       case 'mobile number': return this.compare(a.mobile, b.mobile, isAsc);
      //       case 'vehicle number': return this.compare(a.vehicle_number, b.vehicle_number, isAsc);
      //       case 'vehicle type': return this.compare(a.vehicle_type, b.vehicle_type, isAsc);
      //       case 'in time': return this.compare(a.in_time, b.in_time, isAsc);
      //       case 'out time': return this.compare(a.out_time, b.out_time, isAsc);
      //       case 'parking time': return this.compare(a.parking_time, b.parking_time, isAsc);
      //       case 'qr code': return this.compare(a.qr_code, b.qr_code, isAsc);
      //       default: return 0;
      //     }
      //   }) : null;
      // }

      // compare(a: number | string, b: number | string, isAsc: boolean) {
      //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      //   }

      //   updatePage(e) {
      //     this.currentPage = e.pageIndex;
      //     this.pageSize = e.pageSize;
      //     this.iterator();
      //   }

      //   private iterator() {
      //     const end = (this.currentPage + 1) * this.pageSize;
      //     const start = this.currentPage * this.pageSize;
      //     const part = this.dataSource.slice(start, end);
      //     this.sortedData = part;
      //   }

      //   setupFilter(column: string) {
      //     this.sortedData.filterPredicate = function(data, filter) {
      //     const textToSearch = data[column] && data[column].toLowerCase() || '';
      //     return textToSearch.indexOf(filter) !== -1;
      //     };
      //   }

      //   applyFilter(filterValue: string) {
      //     this.sortedData.filter = filterValue.trim().toLowerCase();
      //   }

        closeTabularReport = function() {
           this.closeTable.emit(true);
           document.getElementById('fade').style.display = 'none';
      //      $('.visitor-mat-tbl').hide();
          };

  }
