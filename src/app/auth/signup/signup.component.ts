import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/app/users/user.service';
import { Entity } from 'src/app/classes/entity';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.titleService.setTitle('Signup');
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: [
        'Mianala',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      lastname: [
        'Loharano',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      entity_id: [
        0,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      im: [
        321654,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      title: [
        'Développeur',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phone: [
        '+261320000000',
        Validators.compose([Validators.required, Validators.minLength(9)]),
      ],
      email: [
        'mymail@gmail.com',
        Validators.compose([Validators.required, Validators.email]),
      ],
      username: [
        'myusername',
        Validators.compose([
          Validators.required,
          Validators.minLength(ValidatorService.username_min_length),
        ]),
      ],
      password: [
        'mypassword',
        Validators.compose([
          Validators.required,
          Validators.minLength(ValidatorService.password_min_length),
        ]),
      ],
    });
  }

  submit() {
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

    this.userService.saveNewUser(variables).subscribe((data) => {
      next: console.log(data);
    });
  }

  entitySelected(entity: Entity) {
    this.signUpForm.patchValue({
      entity_id: entity.id,
    });
  }

  typingEntity(e: Event) {
    this.signUpForm.patchValue({
      entity_id: 0,
    });
  }
}
