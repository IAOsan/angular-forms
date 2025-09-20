import { Component, signal } from '@angular/core';
import { SignUpComponent } from './auth/signUp/signUp.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [SignUpComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-forms');
}
