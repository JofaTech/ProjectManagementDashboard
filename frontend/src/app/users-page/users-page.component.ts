import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, FullUserDto } from 'src/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  users: FullUserDto[] = [];

  private companyId = 1; // meant to be whichever company

  showUserOverlay = false;

  userForm!: FormGroup;
  dropdownOpen = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        adminRole: [null, Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.loadUsers();
  }

  loadUsers() {
    this.userService.getCompanyUsers(this.companyId).subscribe({
      next: (data: FullUserDto[]) => {
        this.users = data;
        console.log('Loaded users:', data);
      },
      error: (err: any) => console.error('Error loading users:', err)
    });
  }


  passwordMatchValidator = (form: FormGroup) => {
    const pw = form.get('password')!.value;
    const cpw = form.get('confirmPassword')!.value;
    return pw === cpw ? null : { passwordMismatch: true };
  };

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectRole(value: boolean) {
    this.userForm.patchValue({ adminRole: value });
    this.dropdownOpen = false;
  }

  submitNewUser() {
    if (this.userForm.valid) {
    const form = this.userForm.value;

    const newUser = {
      credentials: {
        username: form.email,
        password: form.password
      },
      profile: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || ''
      },
      admin: form.adminRole
    };

    this.userService.addUser(this.companyId, newUser).subscribe({
      next: (user) => {
        console.log('User created:', user);
        this.loadUsers();         // Update list
        this.closeAddUser();           // Close modal
        this.userForm.reset();         // Reset form
      },
      error: (err) => {
        console.error('Failed to create user:', err);
      }
    });

  } else {
    this.userForm.markAllAsTouched();
  }
  }

  // Methods for displaying Modal
  openAddUser() {
    this.showUserOverlay = true;
  }

  closeAddUser() {
    this.userForm.reset();
    this.showUserOverlay = false;
  }
}
