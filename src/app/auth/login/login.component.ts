import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

const LOCAL_STORAGE_KEY = 'loginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('loginForm', { static: true }) form!: NgForm;
  subscription: Subscription | undefined;

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      try {
        const data = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '');
        this.form.setValue(data);
      } catch (error) {
          console.error('Error loading from localStorage.');
      }
    })

    this.subscription = this.form.valueChanges
      ?.pipe(debounceTime(500))
      .subscribe((values) => {
        try {
          window.localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
              ...values,
              password: '',
            })
          );
        } catch (error) {
          console.error('Error saving to localStorage.');
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleSubmit(form: NgForm) {
    if (!form.valid) return;

    console.log(form);
    console.log(form.value);
    console.log(form.valid);
    console.log(form.control);
  }
}
