import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashbosrd',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashbosrd.html',
  styleUrl: './admin-dashbosrd.css'
})
export class AdminDashbosrd implements OnInit {
promoteUser(arg0: any) {
throw new Error('Method not implemented.');
}

  users: any[] = [];
  message = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(
      res => this.users = res,
      err => this.message = 'Error fetching users'
    );
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  promoteToAdmin(id: number) {
    this.adminService.promoteToAdmin(id).subscribe(() => this.loadUsers());
  }
}
