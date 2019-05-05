import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { EntityService } from '../services/entity.service';
import { EntitiesViewModel } from '../models/entities-view-model';


@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})

export class EntitiesComponent implements OnInit {
  dataSource: MatTableDataSource<EntitiesViewModel>;
  columnsToDisplay: string[] = ['name', 'acronym', 'entityTypeName', 'country'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpService: EntityService) { }

  ngOnInit() {
    this.httpService.getList().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue && this.dataSource && this.dataSource.filteredData)
    {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}
