import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Utente } from '../models/utente';
import { UsersService } from '../services/users.service';

interface UsersData{
  id: number;
  username: string;
  email: string;
  roles: [];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  response: any;
  users!: Utente[];
  displayedColumns: string[] = ['id', 'username', 'email', 'roles'];
  dataSource: any = null;
  pageSize: number = 10;
  pageIndex: number = 0;
  totalElements!: number;

  constructor(private usersSrv: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers(this.pageIndex, this.pageSize);
  }

  getAllUsers(pageIndex:number, pageSize:number){
    this.usersSrv.getAllUsers(pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.users = res.content;
      this.totalElements = this.response.totalElements;
      console.log(this.totalElements);
      this.dataSource = new MatTableDataSource<UsersData>(this.users);
      //this.dataSource.paginator = this.paginator;
      console.log(this.response);
    });
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize
    console.log(this.pageIndex);
    console.log(this.pageSize);
    if(event.pageIndex > this.pageIndex) {
      this.getAllUsers(this.pageIndex, this.pageSize);
    } else {
      this.getAllUsers(this.pageIndex, this.pageSize);
    }
 }

}
