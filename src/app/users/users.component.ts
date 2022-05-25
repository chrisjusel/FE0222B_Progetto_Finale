import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../services/users.service';

interface UsersData{
  id: number;
  username: string;
  email: string;
  roles: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'username', 'email', 'roles'];
  dataSource: any = null;

  constructor(private usersSrv: UsersService) {
    this.getAllUsersByPage();
  }

  ngOnInit(): void {

  }

  getAllUsersByPage(){
    this.usersSrv.getAllUsers().subscribe((res) => {
      //console.log(res.content[0].roles[0].roleName);
      this.dataSource = new MatTableDataSource<UsersData>(res.content)
      console.log(res);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

}
