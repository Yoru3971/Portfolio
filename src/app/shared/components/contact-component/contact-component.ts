import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-component',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitted = false;
  isLoading = false; 

  socialLinks = {
    linkedin: 'https://linkedin.com/in/emidaverio',
    github: 'https://github.com/Yoru3971',
    gmail: 'https://mail.google.com/mail/?view=cm&fs=1&to=edaverio.contact@gmail.com',
  };

  private formspreeUrl = 'https://formspree.io/f/mwvnngbe';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true; 
      this.http.post(this.formspreeUrl, this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitted = true;
          this.isLoading = false;
          this.contactForm.reset();
          setTimeout(() => {
            this.isSubmitted = false;
          }, 5000);
        },
        error: (err: any) => {
          console.error('Error enviando el mensaje', err);
          this.isLoading = false;
          alert('Hubo un error al enviar el mensaje. Por favor, intentá de nuevo más tarde.');
        },
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
