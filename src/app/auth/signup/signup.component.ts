import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Entity } from 'src/app/classes/entity';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});
  entity: Entity = new Entity();
  loading = false;
  constructor(
    private router: Router,
    private titleService: Title,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.titleService.setTitle('Signup');
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      lastname: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      entity: [
        ,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      im: [
        0,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      title: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phone: [
        '+261',
        Validators.compose([Validators.required, Validators.minLength(9)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(ValidatorService.username_min_length),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(ValidatorService.password_min_length),
        ]),
      ],
    });
  }

  submit() {
    this.loading = true;

    const form = this.signUpForm.value;
    const variables = {
      firstname: form.firstname,
      lastname: form.lastname,
      im: form.im,
      title: form.title,
      entity_id: form.entity_id,
      email: form.email,
      username: form.username,
      hashed: form.password,
      phone: form.phone,
    };

    this.userService.saveNewUser(variables).subscribe(this.signedUp.bind(this));
  }

  signedUp(data: any) {
    this.loading = false;

    data.data.insert_user.returning[0].id &&
      this.router.navigate(['/auth/signed-up']);
  }
}
